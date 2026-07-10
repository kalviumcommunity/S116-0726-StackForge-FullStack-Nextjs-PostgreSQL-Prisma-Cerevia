import { prisma } from '@/lib/prisma';

export type StreakStatus = 'active' | 'at_risk' | 'inactive';

export interface StreakCalculationResult {
  currentStreak: number;
  maxStreak: number;
  status: StreakStatus;
  action: 'continue' | 'increase' | 'reset';
}

/**
 * Pure function to calculate user's streak based on their current streak, max streak,
 * last activity timestamp, and the current time of completion.
 */
export function calculateStreak(
  currentStreak: number,
  maxStreak: number,
  lastActivityAt: Date | null,
  now: Date,
): StreakCalculationResult {
  if (!lastActivityAt) {
    // First activity ever starts a streak of 1
    return {
      currentStreak: 1,
      maxStreak: Math.max(maxStreak, 1),
      status: 'active',
      action: 'reset',
    };
  }

  // Calculate day difference in UTC
  const lastDate = Date.UTC(
    lastActivityAt.getUTCFullYear(),
    lastActivityAt.getUTCMonth(),
    lastActivityAt.getUTCDate(),
  );
  const nowDate = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );

  const dayDifference = Math.floor(
    (nowDate - lastDate) / (1000 * 60 * 60 * 24),
  );

  if (dayDifference <= 0) {
    // Same calendar day: streak continues (no increase, no reset)
    return {
      currentStreak,
      maxStreak,
      status: 'active',
      action: 'continue',
    };
  } else if (dayDifference === 1) {
    // Consecutive calendar day: streak increases by 1
    const nextStreak = currentStreak + 1;
    return {
      currentStreak: nextStreak,
      maxStreak: Math.max(maxStreak, nextStreak),
      status: 'active',
      action: 'increase',
    };
  } else {
    // Missed day(s): streak resets to 1
    return {
      currentStreak: 1,
      maxStreak: Math.max(maxStreak, 1),
      status: 'active',
      action: 'reset',
    };
  }
}

/**
 * Evaluates the current streak status without updating it.
 */
export function evaluateStreakStatus(
  currentStreak: number,
  lastActivityAt: Date | null,
  now: Date,
): StreakStatus {
  if (!lastActivityAt || currentStreak === 0) {
    return 'inactive';
  }

  const lastDate = Date.UTC(
    lastActivityAt.getUTCFullYear(),
    lastActivityAt.getUTCMonth(),
    lastActivityAt.getUTCDate(),
  );
  const nowDate = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );

  const dayDifference = Math.floor(
    (nowDate - lastDate) / (1000 * 60 * 60 * 24),
  );

  if (dayDifference <= 0) {
    return 'active';
  } else if (dayDifference === 1) {
    return 'at_risk';
  } else {
    return 'inactive';
  }
}

/**
 * Service to fetch current user's streak details.
 */
export async function getUserStreak(userId: string, now: Date = new Date()) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      currentStreak: true,
      lastActivityAt: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const status = evaluateStreakStatus(
    user.currentStreak,
    user.lastActivityAt,
    now,
  );

  return {
    currentStreak: user.currentStreak,
    lastActivityAt: user.lastActivityAt,
    status,
  };
}
