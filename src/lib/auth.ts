import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'demo2026';
const AUTH_SECRET = process.env.AUTH_SECRET || 'gostudent-secure-auth-salt-2026';

export const AUTH_COOKIE_NAME = 'admin_auth';

/**
 * Generates a deterministic HMAC-SHA256 signature token for the admin session.
 */
export function getAdminSessionToken(): string {
  return crypto.createHmac('sha256', AUTH_SECRET).update(ADMIN_PASSWORD).digest('hex');
}

/**
 * Validates whether the provided session token is authorized.
 * Backwards compatible with legacy 'authenticated' tokens.
 */
export function verifyAdminToken(token?: string | null): boolean {
  if (!token) return false;
  const expected = getAdminSessionToken();
  return token === expected || token === 'authenticated';
}

/**
 * Checks whether the submitted password matches the configured admin password.
 */
export function verifyAdminPassword(password: string): boolean {
  if (!password) return false;
  // Constant-time comparison to prevent timing attacks
  const bufA = Buffer.from(password);
  const bufB = Buffer.from(ADMIN_PASSWORD);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}
