import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { runRulesAudit } from '../scripts/audit-rules.ts';

describe('rules audit public-mode default', () => {
  it('defaults to public mode when NEXT_PUBLIC_APP_MODE is unset and passes all curriculum modules', () => {
    const previousMode = process.env.NEXT_PUBLIC_APP_MODE;
    delete process.env.NEXT_PUBLIC_APP_MODE;
    try {
      const result = runRulesAudit();
      assert.equal(result.studentCount, 14);
      assert.equal(result.errorCount, 0);
      assert.deepEqual(result.issues, []);
    } finally {
      if (previousMode !== undefined) {
        process.env.NEXT_PUBLIC_APP_MODE = previousMode;
      } else {
        delete process.env.NEXT_PUBLIC_APP_MODE;
      }
    }
  });
});
