import { authenticateRequest } from '@/lib/middleware/auth';
import { lessonIdSchema } from '@/lib/validation/lessons';
import { getLessonById } from '@/lib/services/lessons';
import { withApiHandler, successResponse } from '@/lib/api-response';
import { NotFoundError } from '@/lib/errors';

export const GET = withApiHandler(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    // 1. Authenticate the request
    await authenticateRequest(request);

    // 2. Dynamic route parameters are a Promise in Next.js 15 and must be awaited
    const resolvedParams = await params;

    // 3. Validate parameter format using Zod
    const { id } = lessonIdSchema.parse(resolvedParams);

    // 4. Fetch lesson details via service layer
    let lesson;
    try {
      lesson = await getLessonById(id);
    } catch (error) {
      if (error instanceof Error && error.message === 'Lesson not found') {
        throw new NotFoundError('Lesson not found');
      }
      throw error;
    }

    return successResponse('Lesson fetched successfully', lesson);
  },
);
