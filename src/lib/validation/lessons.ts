import { z } from 'zod';

export const lessonQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .pipe(z.number().int().min(1, { message: 'Page must be at least 1' })),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .pipe(
      z
        .number()
        .int()
        .min(1, { message: 'Limit must be at least 1' })
        .max(100, { message: 'Limit cannot exceed 100' }),
    ),
  search: z
    .string()
    .optional()
    .transform((val) => val?.trim() || undefined),
  sortBy: z
    .enum(['createdAt', 'difficulty', 'title'])
    .optional()
    .default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
});

export const lessonIdSchema = z.object({
  id: z
    .string()
    .uuid({ message: 'Invalid lesson ID format. Must be a valid UUID.' }),
});

// Mirrors the output of `lessonQuerySchema`. `sortBy`/`sortOrder` are required
// because the schema applies `.default(...)`; `search` stays optional (its
// transform yields `string | undefined` but the key need not be present).
export type LessonQueryInput = {
  page: number;
  limit: number;
  search?: string;
  sortBy: 'createdAt' | 'difficulty' | 'title';
  sortOrder: 'asc' | 'desc';
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
};
export type LessonIdInput = z.infer<typeof lessonIdSchema>;
