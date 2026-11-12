import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

process.env.ADMIN_PASSWORD = 'unit-test-admin-password';
process.env.AUTH_SECRET = 'unit-test-auth-secret-hmac-key';

const { getAdminSessionToken, verifyAdminPassword, verifyAdminToken } = await import('../src/lib/auth.ts');

describe('auth security & constant-time verification', () => {
  it('rejects the legacy hardcoded "authenticated" bypass token', () => {
    assert.equal(verifyAdminToken('authenticated'), false);
    assert.equal(verifyAdminToken(''), false);
    assert.equal(verifyAdminToken(null), false);
    assert.equal(verifyAdminToken(undefined), false);
  });

  it('accepts valid HMAC session token and rejects tampered tokens', () => {
    const token = getAdminSessionToken();
    assert.ok(token.length >= 32);
    assert.notEqual(token, 'authenticated');
    assert.equal(verifyAdminToken(token), true);
    assert.equal(verifyAdminToken(`${token}x`), false);
    assert.equal(verifyAdminToken('tampered-token-value'), false);
  });

  it('verifies admin passwords safely without leaking or matching mismatches', () => {
    assert.equal(verifyAdminPassword('unit-test-admin-password'), true);
    assert.equal(verifyAdminPassword('unit-test-admin-passwor'), false);
    assert.equal(verifyAdminPassword(''), false);
  });
});
