import { authenticateRequest } from '@/lib/middleware/auth';
import { getUserProgress } from '@/lib/services/progress';
import { withApiHandler, successResponse } from '@/lib/api-response';
import { NotFoundError } from '@/lib/errors';

export const GET = withApiHandler(async (request: Request) => {
  // 1. Authenticate the request
  const sessionUser = await authenticateRequest(request);

  // 2. Fetch progress stats for current user
  let stats;
  try {
    stats = await getUserProgress(sessionUser.id);
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      throw new NotFoundError(error.message);
    }
    throw error;
  }

  return successResponse('User progress stats fetched successfully', stats);
});
