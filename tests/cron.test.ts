import {
  initCronJobs,
  stopCronJobs,
  refreshLeaderboardCacheJob,
  verifyAndResetExpiredStreaksJob,
} from '../src/lib/services/cron';

async function runCronTests() {
  console.log('🧪 Starting Background Cron Job System Integration Tests...');

  try {
    // 1. Verify scheduler lifecycle methods (init & stop)
    console.log('- Initializing cron jobs...');
    initCronJobs();
    console.log('✅ Cron jobs initialized successfully.');

    console.log('- Stopping cron jobs...');
    stopCronJobs();
    console.log('✅ Cron jobs stopped successfully.');

    // 2. Verify Leaderboard refresh job fault tolerance
    console.log('- Testing refreshLeaderboardCacheJob in offline/fallback state...');
    await refreshLeaderboardCacheJob(new Date());
    console.log('✅ Leaderboard refresh job completed fallback test (did not crash).');

    // 3. Verify Streak reset job fault tolerance
    console.log('- Testing verifyAndResetExpiredStreaksJob in offline/fallback state...');
    const count = await verifyAndResetExpiredStreaksJob(new Date());
    console.log(
      `✅ Streak verification job completed fallback test (returned: ${count}, did not crash).`,
    );
  } catch (error) {
    console.error('❌ Background Cron Job Integration tests failed:', error);
    process.exit(1);
  }

  console.log('🎉 Background Cron Job System Integration Tests Passed Successfully! ✅');
}

runCronTests();
