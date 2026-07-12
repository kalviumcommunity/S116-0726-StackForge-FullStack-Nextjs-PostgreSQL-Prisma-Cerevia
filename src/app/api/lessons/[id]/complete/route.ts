import { authenticateRequest } from '@/lib/middleware/auth';
import { progressLessonIdSchema } from '@/lib/validation/progress';
import { completeLesson } from '@/lib/services/progress';
import { withApiHandler, successResponse } from '@/lib/api-response';
import { NotFoundError, ConflictError } from '@/lib/errors';

export const POST = withApiHandler(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    // 1. Authenticate the request
    const sessionUser = await authenticateRequest(request);

    // 2. Await dynamic parameters (Next.js 15 breaking change)
    const resolvedParams = await params;

    // 3. Validate parameter format using Zod
    const { id } = progressLessonIdSchema.parse(resolvedParams);

    // 4. Mark lesson as completed
    let progress;
    try {
      progress = await completeLesson(sessionUser.id, id);
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message === 'Lesson not found' ||
          error.message === 'User not found'
        ) {
          throw new NotFoundError(error.message);
        }
        if (error.message === 'Lesson already completed') {
          throw new ConflictError(error.message);
        }
      }
      throw error;
    }

    return successResponse('Lesson completed successfully', progress, 201);
  },
);
