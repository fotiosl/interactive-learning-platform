import crypto from 'crypto';

if (typeof window !== 'undefined') {
  throw new Error('src/lib/auth.ts is a server-only module and must never be imported on the client.');
}

const DEFAULT_PASSWORD = 'demo2026';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
const AUTH_SECRET = process.env.AUTH_SECRET || 'interactive-learning-auth-salt-2026';

let warnedInsecureProdDefaults = false;

function warnIfInsecureProdDefaults() {
  if (
    warnedInsecureProdDefaults ||
    process.env.NODE_ENV !== 'production' ||
    process.env.NEXT_PHASE === 'phase-production-build'
  ) {
    return;
  }
  const missingPassword =
    process.env.NEXT_PUBLIC_APP_MODE !== 'public' && !process.env.ADMIN_PASSWORD;
  if (missingPassword || !process.env.AUTH_SECRET) {
    warnedInsecureProdDefaults = true;
    console.warn(
      '[auth] WARNUNG: ADMIN_PASSWORD oder AUTH_SECRET ist in Produktion nicht gesetzt – Fallback-Standardwerte aktiv.'
    );
  }
}

function constantTimeEquals(a: string, b: string): boolean {
  const hashA = crypto.createHash('sha256').update(a).digest();
  const hashB = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

export const AUTH_COOKIE_NAME = 'admin_auth';
/**
 * Non-sensitive UI hint cookie (non-httpOnly) indicating a teacher session may exist.
 * Actual privilege checks ALWAYS validate the httpOnly HMAC AUTH_COOKIE_NAME on the server.
 */
export const TEACHER_HINT_COOKIE_NAME = 'teacher_mode';

/**
 * Generates a deterministic HMAC-SHA256 signature token for the admin session.
 */
export function getAdminSessionToken(): string {
  warnIfInsecureProdDefaults();
  return crypto.createHmac('sha256', AUTH_SECRET).update(ADMIN_PASSWORD).digest('hex');
}

/**
 * Validates whether the provided session token matches the configured HMAC token.
 */
export function verifyAdminToken(token?: string | null): boolean {
  if (!token || typeof token !== 'string') return false;
  const expected = getAdminSessionToken();
  return constantTimeEquals(token, expected);
}

/**
 * Checks whether the submitted password matches the configured admin password (constant-time).
 */
export function verifyAdminPassword(password: string): boolean {
  if (!password || typeof password !== 'string') return false;
  warnIfInsecureProdDefaults();
  return constantTimeEquals(password, ADMIN_PASSWORD);
}
