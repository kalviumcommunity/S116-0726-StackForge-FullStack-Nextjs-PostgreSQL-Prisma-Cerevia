import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { calculateStreak } from './streak';
import { awardXp } from './gamification';
import { deleteCachePattern } from '@/lib/redis';

export interface LessonProgressItem {
  id: string;
  lessonId: string;
  completedAt: Date;
  lesson: {
    title: string;
    difficulty: string;
    xpReward: number;
  };
}

export interface UserProgressResponse {
  completedLessons: {
    id: string;
    title: string;
    difficulty: string;
    xpReward: number;
    completedAt: Date;
  }[];
  totalCompleted: number;
  remainingLessons: {
    id: string;
    title: string;
    difficulty: string;
    xpReward: number;
  }[];
}

/**
 * Marks a lesson as completed for the specified user.
 * Performs validation checks to verify existence and avoid duplicate completions.
 */
export async function completeLesson(
  userId: string,
  lessonId: string,
  now: Date = new Date(),
) {
  // 1. Verify lesson exists
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
  });
  if (!lesson) {
    throw new Error('Lesson not found');
  }

  // 2. Verify user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new Error('User not found');
  }

  // 3. Verify duplicate completions
  const existingProgress = await prisma.lessonProgress.findFirst({
    where: {
      userId,
      lessonId,
    },
  });

  if (existingProgress) {
    throw new Error('Lesson already completed');
  }

  // 4. Update both progress and user streak inside a transaction
  const result = await prisma.$transaction(async (tx) => {
    const dbUser = await tx.user.findUnique({
      where: { id: userId },
      select: {
        currentStreak: true,
        maxStreak: true,
        lastActivityAt: true,
      },
    });

    if (!dbUser) {
      throw new Error('User not found');
    }

    const streakResult = calculateStreak(
      dbUser.currentStreak,
      dbUser.maxStreak,
      dbUser.lastActivityAt,
      now,
    );

    await tx.user.update({
      where: { id: userId },
      data: {
        currentStreak: streakResult.currentStreak,
        maxStreak: streakResult.maxStreak,
        lastActivityAt: now,
      },
    });

    // Award XP to the user
    await awardXp(
      tx,
      userId,
      lesson.xpReward,
      'LESSON_COMPLETION',
      lessonId,
      now,
    );

    let progress;
    try {
      progress = await tx.lessonProgress.create({
        data: {
          userId,
          lessonId,
          completedAt: now,
        },
        include: {
          lesson: {
            select: {
              title: true,
              difficulty: true,
              xpReward: true,
            },
          },
        },
      });
    } catch (error) {
      // Two concurrent completions can both pass the pre-check above. The
      // unique constraint on (userId, lessonId) makes the loser throw P2002;
      // translate that into the same "already completed" error.
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new Error('Lesson already completed');
      }
      throw error;
    }

    return progress;
  }, {
    maxWait: 15000,
    timeout: 25000,
  });

  // Invalidate leaderboard cache wildcard keys
  try {
    await deleteCachePattern('leaderboard:weekly:*');
  } catch (error) {
    console.error('❌ Failed to invalidate leaderboard cache:', error);
  }

  return result;
}

/**
 * Resolves progress stats for a user.
 * Returns arrays of completed/remaining lessons along with counts.
 */
export async function getUserProgress(
  userId: string,
): Promise<UserProgressResponse> {
  // 1. Verify user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new Error('User not found');
  }

  // 2. Fetch completed progress
  const completedRecords = await prisma.lessonProgress.findMany({
    where: { userId },
    include: {
      lesson: {
        select: {
          id: true,
          title: true,
          difficulty: true,
          xpReward: true,
        },
      },
    },
    orderBy: {
      completedAt: 'desc',
    },
  });

  const completedLessons = completedRecords.map((record) => ({
    id: record.lesson.id,
    title: record.lesson.title,
    difficulty: record.lesson.difficulty,
    xpReward: record.lesson.xpReward,
    completedAt: record.completedAt,
  }));

  const completedLessonIds = completedLessons.map((l) => l.id);

  // 3. Fetch remaining lessons
  const remainingLessons = await prisma.lesson.findMany({
    where: {
      id: {
        notIn: completedLessonIds,
      },
    },
    select: {
      id: true,
      title: true,
      difficulty: true,
      xpReward: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return {
    completedLessons,
    totalCompleted: completedLessons.length,
    remainingLessons,
  };
}
