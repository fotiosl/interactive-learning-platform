import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  AUTH_COOKIE_NAME,
  TEACHER_HINT_COOKIE_NAME,
  verifyAdminToken,
  verifyAdminPassword,
  getAdminSessionToken,
} from '@/lib/auth';
import { getStudentRosterDTO, getTeacherTaskSecrets } from '@/data/students';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
const AUTH_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_FAILED_ATTEMPTS = 10;

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, max-age=0',
  Pragma: 'no-cache',
} as const;

interface AttemptRecord {
  count: number;
  resetAt: number;
}

const failedAttemptsByIp = new Map<string, AttemptRecord>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

function pruneExpiredAttempts(now: number) {
  for (const [ip, record] of failedAttemptsByIp) {
    if (record.resetAt <= now) {
      failedAttemptsByIp.delete(ip);
    }
  }
}

function checkRateLimit(ip: string, now: number): { allowed: boolean; retryAfterSec: number } {
  const existing = failedAttemptsByIp.get(ip);
  if (!existing) return { allowed: true, retryAfterSec: 0 };
  if (existing.resetAt <= now) {
    failedAttemptsByIp.delete(ip);
    return { allowed: true, retryAfterSec: 0 };
  }
  if (existing.count >= MAX_FAILED_ATTEMPTS) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }
  return { allowed: true, retryAfterSec: 0 };
}

function recordFailedAttempt(ip: string, now: number) {
  if (failedAttemptsByIp.size >= 1000) {
    pruneExpiredAttempts(now);
  }
  const existing = failedAttemptsByIp.get(ip);
  if (!existing || existing.resetAt <= now) {
    failedAttemptsByIp.set(ip, { count: 1, resetAt: now + AUTH_WINDOW_MS });
  } else {
    existing.count += 1;
  }
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME);
  const isAuthenticated = verifyAdminToken(authCookie?.value);

  if (!isAuthenticated) {
    const res = NextResponse.json({ isAuthenticated: false }, { headers: NO_STORE_HEADERS });
    if (authCookie) {
      res.cookies.set({
        name: AUTH_COOKIE_NAME,
        value: '',
        httpOnly: true,
        path: '/',
        maxAge: 0,
      });
    }
    if (cookieStore.get(TEACHER_HINT_COOKIE_NAME)) {
      res.cookies.set({
        name: TEACHER_HINT_COOKIE_NAME,
        value: '',
        httpOnly: false,
        path: '/',
        maxAge: 0,
      });
    }
    return res;
  }

  const { searchParams } = request.nextUrl;
  const includeRoster = searchParams.get('roster') === '1';
  const studentSlug = searchParams.get('student');
  const taskId = searchParams.get('task');

  const payload: Record<string, unknown> = { isAuthenticated: true };

  if (includeRoster) {
    payload.students = getStudentRosterDTO();
  }

  if (studentSlug && taskId) {
    payload.taskSecrets = getTeacherTaskSecrets(studentSlug, taskId) || null;
  }

  const response = NextResponse.json(payload, { headers: NO_STORE_HEADERS });
  if (!cookieStore.get(TEACHER_HINT_COOKIE_NAME)) {
    response.cookies.set({
      name: TEACHER_HINT_COOKIE_NAME,
      value: '1',
      httpOnly: false,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: COOKIE_MAX_AGE,
    });
  }
  return response;
}

export async function POST(request: NextRequest) {
  try {
    const now = Date.now();
    const clientIp = getClientIp(request);
    const rateStatus = checkRateLimit(clientIp, now);
    if (!rateStatus.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Zu viele fehlgeschlagene Anmeldeversuche. Bitte warte einige Minuten.',
        },
        {
          status: 429,
          headers: {
            ...NO_STORE_HEADERS,
            'Retry-After': String(rateStatus.retryAfterSec),
          },
        }
      );
    }

    const body = await request.json();
    const password = typeof body?.password === 'string' ? body.password : '';

    if (verifyAdminPassword(password)) {
      failedAttemptsByIp.delete(clientIp);
      const token = getAdminSessionToken();
      const response = NextResponse.json({ success: true }, { headers: NO_STORE_HEADERS });
      const isProd = process.env.NODE_ENV === 'production';

      response.cookies.set({
        name: AUTH_COOKIE_NAME,
        value: token,
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: isProd,
        maxAge: COOKIE_MAX_AGE,
      });

      response.cookies.set({
        name: TEACHER_HINT_COOKIE_NAME,
        value: '1',
        httpOnly: false,
        path: '/',
        sameSite: 'lax',
        secure: isProd,
        maxAge: COOKIE_MAX_AGE,
      });

      return response;
    }

    recordFailedAttempt(clientIp, now);
    return NextResponse.json(
      { success: false, error: 'Falsches Passwort' },
      { status: 401, headers: NO_STORE_HEADERS }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Ungültige Anfrage' },
      { status: 400, headers: NO_STORE_HEADERS }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true }, { headers: NO_STORE_HEADERS });
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
  response.cookies.set({
    name: TEACHER_HINT_COOKIE_NAME,
    value: '',
    httpOnly: false,
    path: '/',
    maxAge: 0,
  });
  return response;
}
