import { execSync } from 'child_process';
import path from 'path';

const testFiles = [
  'auth.test.ts',
  'lessons.test.ts',
  'progress.test.ts',
  'streak.test.ts',
  'xp.test.ts',
  'leaderboard-service.test.ts',
  'leaderboard-validation.test.ts',
  'redis-cache.test.ts',
  'security.test.ts',
  'error-handler.test.ts',
  'cron.test.ts',
  'profile.test.ts',
  'health.test.ts',
];

async function runAllTests() {
  console.log('==================================================');
  console.log('🚀 Running Cerevia Backend Automated Test Suite...');
  console.log('==================================================\n');

  let passedCount = 0;
  let failedCount = 0;
  const results: {
    file: string;
    status: 'PASSED' | 'FAILED';
    durationMs: number;
    error?: string;
  }[] = [];

  const startAll = Date.now();

  for (const file of testFiles) {
    const filePath = path.join(process.cwd(), 'tests', file);
    console.log(`🏃 Running ${file}...`);
    const start = Date.now();
    try {
      execSync(`npx tsx "${filePath}"`, { stdio: 'inherit', env: process.env });
      const durationMs = Date.now() - start;
      console.log(`✅ ${file} passed in ${durationMs}ms.\n`);
      results.push({ file, status: 'PASSED', durationMs });
      passedCount++;
    } catch (error: any) {
      const durationMs = Date.now() - start;
      console.error(`❌ ${file} failed in ${durationMs}ms.\n`);
      results.push({
        file,
        status: 'FAILED',
        durationMs,
        error: error.message,
      });
      failedCount++;
    }
  }

  const totalDurationMs = Date.now() - startAll;

  console.log('==================================================');
  console.log('📊 TEST RUN SUMMARY');
  console.log('==================================================');
  console.log(`Total Duration: ${(totalDurationMs / 1000).toFixed(2)}s`);
  console.log(`Passed:         ${passedCount}`);
  console.log(`Failed:         ${failedCount}`);
  console.log('==================================================\n');

  console.log('| Test Suite | Status | Duration |');
  console.log('|---|---|---|');
  for (const r of results) {
    const statusEmoji = r.status === 'PASSED' ? '✅' : '❌';
    console.log(
      `| ${r.file} | ${statusEmoji} ${r.status} | ${r.durationMs}ms |`,
    );
  }
  console.log('\n');

  if (failedCount > 0) {
    console.error('❌ Some tests failed. Exiting with failure status.');
    process.exit(1);
  } else {
    console.log('🎉 All tests passed successfully! ✅');
    process.exit(0);
  }
}

runAllTests();
