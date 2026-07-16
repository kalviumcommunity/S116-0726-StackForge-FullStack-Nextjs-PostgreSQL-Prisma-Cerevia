import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Calculates the ISO 8601 week number for a given date.
 */
function getWeekNumber(date: Date): { week: number; year: number } {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );
  return { week, year: d.getUTCFullYear() };
}

/**
 * Handles completing a lesson for a user.
 * Instantly updates the user's streak and saves the lesson completion.
 */
export async function completeLesson(userId: string, lessonId: string) {
  const now = new Date();

  return await prisma.$transaction(async (tx) => {
    // 1. Get the user's current streak state
    const user = await tx.user.findUnique({
      where: { id: userId },
      select: {
        currentStreak: true,
        maxStreak: true,
        lastActivityAt: true,
        totalXP: true,
      },
    });

    if (!user) throw new Error('User not found');

    // 2. Fetch the lesson to know the XP reward
    const lesson = await tx.lesson.findUnique({
      where: { id: lessonId },
      select: { xpReward: true },
    });

    if (!lesson) throw new Error('Lesson not found');

    let newStreak = user.currentStreak;
    const lastActivity = user.lastActivityAt;

    if (!lastActivity) {
      // First activity ever
      newStreak = 1;
    } else {
      const msDiff = now.getTime() - lastActivity.getTime();
      const hoursDiff = msDiff / (1000 * 60 * 60);

      if (hoursDiff > 24) {
        // More than 24 hours of inactivity -> Reset streak to 1
        newStreak = 1;
      } else {
        // Within 24 hours.
        // Prevent multiple lesson completions in a very short window (e.g. same day)
        // from incrementing the streak count continuously.
        const isSameDay = lastActivity.toDateString() === now.toDateString();
        if (!isSameDay) {
          newStreak += 1;
        }
      }
    }

    const newMaxStreak = Math.max(user.maxStreak, newStreak);
    const newTotalXP = user.totalXP + lesson.xpReward;

    // 3. Update User Streak, XP & Last Activity
    const updatedUser = await tx.user.update({
      where: { id: userId },
      data: {
        currentStreak: newStreak,
        maxStreak: newMaxStreak,
        totalXP: newTotalXP,
        lastActivityAt: now,
      },
    });

    // 4. Record Lesson Progress
    const progress = await tx.lessonProgress.create({
      data: {
        userId,
        lessonId,
        completedAt: now,
      },
    });

    return {
      user: updatedUser,
      progress,
    };
  });
}

/**
 * Hourly Cron job runner or database action to refresh the weekly leaderboard.
 * Restores public-facing leaderboard data by calculating current weekly scores.
 */
export async function refreshLeaderboardCache() {
  const now = new Date();
  const { week, year } = getWeekNumber(now);
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // Fetch users with their corresponding progress totals
  const users = await prisma.user.findMany({
    include: {
      lessonProgress: {
        where: { completedAt: { gte: oneWeekAgo } },
        include: { lesson: true },
      },
    },
  });

  const leaderboards = users
    .map((user) => {
      const totalScore = user.lessonProgress.reduce(
        (acc, curr) => acc + curr.lesson.xpReward,
        0,
      );
      return {
        userId: user.id,
        score: totalScore,
      };
    })
    .sort((a, b) => b.score - a.score); // Sort in descending order of score

  // 2. Update Leaderboard inside a transaction
  return await prisma.$transaction(async (tx) => {
    // Clear old week leaderboard entries before updating
    await tx.leaderboard.deleteMany({
      where: {
        week,
        year,
      },
    });

    // Write new rankings
    const cacheCreates = leaderboards.map((entry, index) => {
      return tx.leaderboard.create({
        data: {
          userId: entry.userId,
          score: entry.score,
          rank: index + 1,
          week,
          year,
        },
      });
    });

    await Promise.all(cacheCreates);
  });
}


