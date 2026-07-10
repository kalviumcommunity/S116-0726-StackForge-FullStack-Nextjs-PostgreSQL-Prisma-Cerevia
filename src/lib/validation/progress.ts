import { z } from 'zod';

export const progressLessonIdSchema = z.object({
  id: z
    .string()
    .uuid({ message: 'Invalid lesson ID format. Must be a valid UUID.' }),
});

export type ProgressLessonIdInput = z.infer<typeof progressLessonIdSchema>;
