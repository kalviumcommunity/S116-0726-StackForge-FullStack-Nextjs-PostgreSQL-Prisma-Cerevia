import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
      select: { currentStreak: true, maxStreak: true, lastActivityAt: true },
    });

    if (!user) throw new Error('User not found');

    // 2. Fetch the lesson to know the points
    const lesson = await tx.lesson.findUnique({
      where: { id: lessonId },
      select: { points: true },
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
        // Prevent multiple lesson completions in a very short window (e.g. same minute/hour)
        // from incrementing the streak count continuously, if we want a daily streak.
        // If we want a strict "daily" streak, we verify if it is a new calendar day.
        const isSameDay = lastActivity.toDateString() === now.toDateString();
        if (!isSameDay) {
          newStreak += 1;
        }
      }
    }

    const newMaxStreak = Math.max(user.maxStreak, newStreak);

    // 3. Update User Streak & Last Activity
    const updatedUser = await tx.user.update({
      where: { id: userId },
      data: {
        currentStreak: newStreak,
        maxStreak: newMaxStreak,
        lastActivityAt: now,
      },
    });

    // 4. Record Lesson Completion
    const completion = await tx.lessonCompletion.create({
      data: {
        userId,
        lessonId,
        completedAt: now,
      },
    });

    return {
      user: updatedUser,
      completion,
    };
  });
}

/**
 * Hourly Cron job runner or database action to refresh the leaderboard cache.
 * Restores public-facing leaderboard data by calculating current weekly scores.
 */
export async function refreshLeaderboardCache() {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // 1. Fetch total points for each user based on completions in the last 7 days
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const activeScores = await prisma.lessonCompletion.groupBy({
    by: ['userId'],
    where: {
      completedAt: {
        gte: oneWeekAgo,
      },
    },
    _count: {
      id: true,
    },
    // We assume each completion awards points, or we aggregate points.
    // For simplicity, we fetch completions and join, or map points.
  });

  // Fetch users with their corresponding point totals
  // (In a real scenario, this would aggregate actual Lesson points)
  const users = await prisma.user.findMany({
    include: {
      completions: {
        where: { completedAt: { gte: oneWeekAgo } },
        include: { lesson: true },
      },
    },
  });

  const leaderboards = users
    .map((user) => {
      const totalScore = user.completions.reduce(
        (acc, curr) => acc + curr.lesson.points,
        0,
      );
      return {
        userId: user.id,
        score: totalScore,
      };
    })
    .sort((a, b) => b.score - a.score); // Sort in descending order of score

  // 2. Update LeaderboardCache within a transaction
  return await prisma.$transaction(async (tx) => {
    // Clear old cache
    await tx.leaderboardCache.deleteMany({});

    // Write new rankings
    const cacheCreates = leaderboards.map((entry, index) => {
      return tx.leaderboardCache.create({
        data: {
          userId: entry.userId,
          score: entry.score,
          rank: index + 1,
        },
      });
    });

    await Promise.all(cacheCreates);
  });
}
