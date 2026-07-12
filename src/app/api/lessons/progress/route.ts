import { authenticateRequest } from '@/lib/middleware/auth';
import { getUserProgress } from '@/lib/services/progress';
import { withApiHandler, successResponse } from '@/lib/api-response';

export const GET = withApiHandler(async (request: Request) => {
  // 1. Authenticate the request
  const sessionUser = await authenticateRequest(request);

  // 2. Fetch progress stats for current user
  const stats = await getUserProgress(sessionUser.id);

  return successResponse('User progress stats fetched successfully', stats);
});
