import { prisma } from '@/lib/prisma';
import { getWeekNumber, getWeekRange, getMondayOfIsoWeek } from '@/utils/date';

export interface LeaderboardEntry {
  userId: string;
  fullName: string | null;
  avatar: string | null;
  weeklyXP: number;
  rank: number;
}

export interface PaginatedLeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  pagination: {
    limit: number;
    skip: number;
    totalCount: number;
  };
  metadata: {
    week: number;
    year: number;
    startDate: Date;
    endDate: Date;
  };
}

/**
 * Retrieves the weekly leaderboard with pagination.
 */
export async function getWeeklyLeaderboard(filters: {
  week?: number;
  year?: number;
  limit?: number;
  skip?: number;
}): Promise<PaginatedLeaderboardResponse> {
  const limit = filters.limit ?? 10;
  const skip = filters.skip ?? 0;

  // Determine week and year
  const now = new Date();
  const currentWeekInfo = getWeekNumber(now);
  const week = filters.week ?? currentWeekInfo.week;
  const year = filters.year ?? currentWeekInfo.year;

  // Calculate the dates for the week range. Derive the actual Monday of the
  // requested ISO week so the date window matches the reported week/year.
  let targetDate = now;
  if (filters.week !== undefined || filters.year !== undefined) {
    const targetYear = filters.year ?? currentWeekInfo.year;
    const targetWeek = filters.week ?? currentWeekInfo.week;
    targetDate = getMondayOfIsoWeek(targetYear, targetWeek);
  }

  const { start, end } = getWeekRange(targetDate);

  // 1. Fetch all users from the system
  const users = await prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      avatar: true,
    },
  });

  // 2. Query XP logs for the week range to sum weekly XP per user
  const weeklyXpLogs = await prisma.xPHistory.groupBy({
    by: ['userId'],
    where: {
      timestamp: {
        gte: start,
        lt: end,
      },
    },
    _sum: {
      xpEarned: true,
    },
  });

  // Fast map lookup
  const xpMap = new Map<string, number>();
  for (const log of weeklyXpLogs) {
    xpMap.set(log.userId, log._sum.xpEarned ?? 0);
  }

  // 3. Map users to entries and sort by weekly XP (Highest First)
  // Sub-sort by userId to ensure consistent tie breaking order
  const entries: Omit<LeaderboardEntry, 'rank'>[] = users.map((user) => {
    const weeklyXP = xpMap.get(user.id) ?? 0;
    return {
      userId: user.id,
      fullName: user.fullName,
      avatar: user.avatar,
      weeklyXP,
    };
  });

  entries.sort((a, b) => {
    if (b.weeklyXP !== a.weeklyXP) {
      return b.weeklyXP - a.weeklyXP;
    }
    const nameA = a.fullName || '';
    const nameB = b.fullName || '';
    if (nameA !== nameB) {
      return nameA.localeCompare(nameB);
    }
    return a.userId.localeCompare(b.userId);
  });

  // 4. Assign ranks (Standard Competition Ranking: "1-2-2-4")
  const rankedEntries: LeaderboardEntry[] = [];
  let currentRank = 1;
  let skipped = 0;

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (i > 0) {
      const prevEntry = entries[i - 1];
      if (entry.weeklyXP < prevEntry.weeklyXP) {
        currentRank = currentRank + skipped + 1;
        skipped = 0;
      } else {
        skipped++;
      }
    }
    rankedEntries.push({
      ...entry,
      rank: currentRank,
    });
  }

  // 5. Slice for pagination
  const paginatedEntries = rankedEntries.slice(skip, skip + limit);
  const totalCount = rankedEntries.length;

  return {
    leaderboard: paginatedEntries,
    pagination: {
      limit,
      skip,
      totalCount,
    },
    metadata: {
      week,
      year,
      startDate: start,
      endDate: end,
    },
  };
}

export interface UserRankResponse {
  userId: string;
  fullName: string | null;
  avatar: string | null;
  weeklyXP: number;
  rank: number;
  totalParticipants: number;
}

/**
 * Resolves the leaderboard rank and weekly XP stats for a specific user.
 */
export async function getCurrentUserRank(
  userId: string,
  filters: { week?: number; year?: number } = {},
): Promise<UserRankResponse> {
  // 1. Verify user exists
  const targetUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, fullName: true, avatar: true },
  });

  if (!targetUser) {
    throw new Error('User not found');
  }

  // 2. Fetch the entire weekly leaderboard (all users ranked)
  const leaderboardResult = await getWeeklyLeaderboard({
    week: filters.week,
    year: filters.year,
    limit: 1000000,
    skip: 0,
  });

  const matchedEntry = leaderboardResult.leaderboard.find(
    (entry) => entry.userId === userId,
  );

  if (!matchedEntry) {
    return {
      userId: targetUser.id,
      fullName: targetUser.fullName,
      avatar: targetUser.avatar,
      weeklyXP: 0,
      rank: leaderboardResult.pagination.totalCount + 1,
      totalParticipants: leaderboardResult.pagination.totalCount + 1,
    };
  }

  return {
    userId: matchedEntry.userId,
    fullName: matchedEntry.fullName,
    avatar: matchedEntry.avatar,
    weeklyXP: matchedEntry.weeklyXP,
    rank: matchedEntry.rank,
    totalParticipants: leaderboardResult.pagination.totalCount,
  };
}
