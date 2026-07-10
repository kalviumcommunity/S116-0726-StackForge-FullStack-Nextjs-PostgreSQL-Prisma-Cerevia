import { prisma } from '@/lib/prisma';
import { LessonQueryInput } from '@/lib/validation/lessons';
import { Prisma } from '@prisma/client';

export interface PaginatedLessonsResponse {
  lessons: {
    id: string;
    title: string;
    description: string | null;
    xpReward: number;
    difficulty: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}

/**
 * Fetches a list of lessons matching pagination, sorting, and search filters.
 */
export async function getLessons(
  filters: LessonQueryInput,
): Promise<PaginatedLessonsResponse> {
  const { page, limit, search, sortBy, sortOrder, difficulty } = filters;

  const skip = (page - 1) * limit;

  // Build the dynamic where clause
  const where: Prisma.LessonWhereInput = {};

  if (search) {
    where.title = {
      contains: search,
      mode: 'insensitive',
    };
  }

  if (difficulty) {
    where.difficulty = difficulty;
  }

  // Build the dynamic order clause
  const orderBy: Prisma.LessonOrderByWithRelationInput = {};
  if (sortBy) {
    orderBy[sortBy] = sortOrder || 'asc';
  }

  // Run database count and select queries concurrently for speed
  const [lessons, totalCount] = await Promise.all([
    prisma.lesson.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      select: {
        id: true,
        title: true,
        description: true,
        xpReward: true,
        difficulty: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.lesson.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    lessons,
    pagination: {
      page,
      limit,
      totalCount,
      totalPages,
    },
  };
}

/**
 * Retrieves a single lesson by its ID. Throws an error if not found.
 */
export async function getLessonById(id: string) {
  const lesson = await prisma.lesson.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      xpReward: true,
      difficulty: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!lesson) {
    throw new Error('Lesson not found');
  }

  return lesson;
}
