import fs from 'fs';
import path from 'path';
import { runRulesAudit } from './audit-rules.ts';

const args = process.argv.slice(2);
let targetStudent: string | undefined;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--student' && args[i + 1]) {
    targetStudent = args[i + 1];
    break;
  }
}

console.log('Running Comprehensive Anti-Spoiler, Didactic & Execution Audit...');
if (targetStudent) {
  console.log(`Targeting student: ${targetStudent}`);
}

const { issues, errorCount, warningCount } = runRulesAudit({
  targetStudent,
  includeWarnings: true,
});

console.log(`\n=== AUDIT RESULTS: ${errorCount} ERRORS, ${warningCount} WARNINGS ===\n`);

const reportPath = path.join(process.cwd(), 'scripts', 'audit-report.json');
fs.writeFileSync(reportPath, JSON.stringify(issues, null, 2), 'utf-8');

if (issues.length > 0) {
  const byRule: Record<string, number> = {};
  for (const i of issues) {
    const key = `[${i.severity.toUpperCase()}] ${i.rule}`;
    byRule[key] = (byRule[key] || 0) + 1;
  }
  console.table(byRule);

  for (const issue of issues) {
    const prefix = issue.severity === 'error' ? '❌' : '⚠️';
    console.log(
      `${prefix} [${issue.student} / ${issue.taskId} / ${issue.questionId}] ${issue.rule}: ${issue.details}`
    );
    if (issue.snippet) {
      console.log(`   Snippet: "${issue.snippet}"`);
    }
  }
}

if (errorCount > 0) {
  console.error(`\n❌ AUDIT FAILED with ${errorCount} error(s).`);
  process.exit(1);
} else {
  console.log(`\n✅ AUDIT PASSED: 0 errors found!`);
  process.exit(0);
}
