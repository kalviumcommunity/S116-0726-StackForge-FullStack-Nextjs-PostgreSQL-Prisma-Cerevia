import cron, { ScheduledTask } from 'node-cron';
import { getWeeklyLeaderboard } from './leaderboard';
import { setCache } from '@/lib/redis';
import { getWeekNumber } from '@/utils/date';
import { prisma } from '@/lib/prisma';

/**
 * Recalculates the weekly leaderboard and refreshes the Redis cache
 * for standard page limits (10, 50, 100 entries).
 */
export async function refreshLeaderboardCacheJob(now: Date = new Date()) {
  console.log(
    `[Background Job] [${now.toISOString()}] Leaderboard Refresh: Started.`,
  );
  try {
    const { week, year } = getWeekNumber(now);

    const limits = [10, 50, 100];
    for (const limit of limits) {
      const data = await getWeeklyLeaderboard({
        week,
        year,
        limit,
        skip: 0,
      });

      const cacheKey = `leaderboard:weekly:${year}:${week}:limit_${limit}:skip_0`;
      await setCache(cacheKey, data, 3600);
      console.log(
        `[Background Job] Leaderboard Refresh: Updated cache key "${cacheKey}".`,
      );
    }

    console.log(
      `[Background Job] [${new Date().toISOString()}] Leaderboard Refresh: Completed.`,
    );
  } catch (error) {
    console.error(
      `[Background Job] [${new Date().toISOString()}] Leaderboard Refresh: Failed.`,
      error,
    );
  }
}

/**
 * Scans the database and resets expired user streaks to 0
 */
export async function verifyAndResetExpiredStreaksJob(now: Date = new Date()) {
  console.log(
    `[Background Job] [${now.toISOString()}] Streak Verification: Started.`,
  );
  try {
    const startOfYesterdayUTC = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1),
    );

    const result = await prisma.user.updateMany({
      where: {
        currentStreak: {
          gt: 0,
        },
        lastActivityAt: {
          lt: startOfYesterdayUTC,
        },
      },
      data: {
        currentStreak: 0,
      },
    });

    console.log(
      `[Background Job] Streak Verification: Reset ${result.count} expired user streaks to 0.`,
    );
    console.log(
      `[Background Job] [${new Date().toISOString()}] Streak Verification: Completed.`,
    );
    return result.count;
  } catch (error) {
    console.error(
      `[Background Job] [${new Date().toISOString()}] Streak Verification: Failed.`,
      error,
    );
    return 0;
  }
}

let leaderboardJobInstance: ScheduledTask | null = null;
let streakJobInstance: ScheduledTask | null = null;

/**
 * Initializes all cron jobs in the system.
 */
export function initCronJobs() {
  console.log('⏰ Initializing background cron jobs...');

  // 1. Leaderboard Refresh Job (Configurable, defaults to every hour)
  const leaderboardCronSpec =
    process.env.LEADERBOARD_REFRESH_CRON || '0 * * * *';

  if (leaderboardJobInstance) {
    leaderboardJobInstance.stop();
  }

  leaderboardJobInstance = cron.schedule(leaderboardCronSpec, async () => {
    await refreshLeaderboardCacheJob();
  });
  console.log(
    `- Scheduled Leaderboard Refresh Job with spec: "${leaderboardCronSpec}"`,
  );

  // 2. Streak Verification Job (Configurable, defaults to daily at midnight)
  const streakCronSpec = process.env.STREAK_VERIFICATION_CRON || '0 0 * * *';

  if (streakJobInstance) {
    streakJobInstance.stop();
  }

  streakJobInstance = cron.schedule(streakCronSpec, async () => {
    await verifyAndResetExpiredStreaksJob();
  });
  console.log(
    `- Scheduled Streak Verification Job with spec: "${streakCronSpec}"`,
  );
}

/**
 * Stops all active background cron jobs.
 */
export function stopCronJobs() {
  if (leaderboardJobInstance) {
    leaderboardJobInstance.stop();
    leaderboardJobInstance = null;
  }
  if (streakJobInstance) {
    streakJobInstance.stop();
    streakJobInstance = null;
  }
  console.log('🛑 Stopped all background cron jobs.');
}
