import { authenticateRequest } from '@/lib/middleware/auth';
import { getUserStreak } from '@/lib/services/streak';
import { withApiHandler, successResponse } from '@/lib/api-response';
import { NotFoundError } from '@/lib/errors';

export const GET = withApiHandler(async (request: Request) => {
  // 1. Authenticate the request
  const sessionUser = await authenticateRequest(request);

  // 2. Fetch streak details for current user
  let streakInfo;
  try {
    streakInfo = await getUserStreak(sessionUser.id);
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      throw new NotFoundError(error.message);
    }
    throw error;
  }

  // 3. Return response
  return successResponse(
    'User streak details fetched successfully',
    streakInfo,
  );
});
