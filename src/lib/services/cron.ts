import cron, { ScheduledTask } from 'node-cron';
import { getWeeklyLeaderboard } from './leaderboard';
import { setCache } from '@/lib/redis';
import { getWeekNumber } from '@/utils/date';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

/**
 * Recalculates the weekly leaderboard and refreshes the Redis cache
 * for standard page limits (10, 50, 100 entries).
 */
export async function refreshLeaderboardCacheJob(now: Date = new Date()) {
  logger.info(`Leaderboard Refresh: Started.`);
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
      logger.info(`Leaderboard Refresh: Updated cache key "${cacheKey}".`);
    }

    logger.info(`Leaderboard Refresh: Completed.`);
  } catch (error) {
    logger.error(`Leaderboard Refresh: Failed.`, error);
  }
}

/**
 * Scans the database and resets expired user streaks to 0
 */
export async function verifyAndResetExpiredStreaksJob(now: Date = new Date()) {
  logger.info(`Streak Verification: Started.`);
  try {
    // node-cron fires this job at *local* midnight, so the reset cutoff must be
    // measured in the same timezone. Using UTC midnight here would shift the
    // boundary by the server's UTC offset and prematurely reset still-active
    // streaks. Compute local start-of-yesterday instead.
    const startOfYesterday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1,
    );
    startOfYesterday.setHours(0, 0, 0, 0);

    const result = await prisma.user.updateMany({
      where: {
        currentStreak: {
          gt: 0,
        },
        lastActivityAt: {
          lt: startOfYesterday,
        },
      },
      data: {
        currentStreak: 0,
      },
    });

    logger.info(
      `Streak Verification: Reset ${result.count} expired user streaks to 0.`,
    );
    logger.info(`Streak Verification: Completed.`);
    return result.count;
  } catch (error) {
    logger.error(`Streak Verification: Failed.`, error);
    return 0;
  }
}

let leaderboardJobInstance: ScheduledTask | null = null;
let streakJobInstance: ScheduledTask | null = null;

/**
 * Initializes all cron jobs in the system.
 */
export function initCronJobs() {
  logger.info('Initializing background cron jobs...');

  // 1. Leaderboard Refresh Job (Configurable, defaults to every hour)
  const leaderboardCronSpec =
    process.env.LEADERBOARD_REFRESH_CRON || '0 * * * *';

  if (leaderboardJobInstance) {
    leaderboardJobInstance.stop();
  }

  leaderboardJobInstance = cron.schedule(leaderboardCronSpec, async () => {
    await refreshLeaderboardCacheJob();
  });
  logger.info(
    `Scheduled Leaderboard Refresh Job with spec: "${leaderboardCronSpec}"`,
  );

  // 2. Streak Verification Job (Configurable, defaults to daily at midnight)
  const streakCronSpec = process.env.STREAK_VERIFICATION_CRON || '0 0 * * *';

  if (streakJobInstance) {
    streakJobInstance.stop();
  }

  streakJobInstance = cron.schedule(streakCronSpec, async () => {
    await verifyAndResetExpiredStreaksJob();
  });
  logger.info(
    `Scheduled Streak Verification Job with spec: "${streakCronSpec}"`,
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
  logger.info('Stopped all background cron jobs.');
}
