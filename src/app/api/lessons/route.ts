import { authenticateRequest } from '@/lib/middleware/auth';
import { lessonQuerySchema } from '@/lib/validation/lessons';
import { getLessons } from '@/lib/services/lessons';
import { withApiHandler, successResponse } from '@/lib/api-response';

export const GET = withApiHandler(async (request: Request) => {
  // 1. Authenticate the user
  await authenticateRequest(request);

  // 2. Parse query parameters
  const { searchParams } = new URL(request.url);
  const queryParams = {
    page: searchParams.get('page') || undefined,
    limit: searchParams.get('limit') || undefined,
    search: searchParams.get('search') || undefined,
    sortBy: searchParams.get('sortBy') || undefined,
    sortOrder: searchParams.get('sortOrder') || undefined,
    difficulty: searchParams.get('difficulty') || undefined,
  };

  // 3. Validate queries using Zod
  const validatedData = lessonQuerySchema.parse(queryParams);

  // 4. Query database via lessons service
  const result = await getLessons(validatedData);

  return successResponse('Lessons fetched successfully', result);
});
