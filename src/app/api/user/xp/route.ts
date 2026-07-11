import { authenticateRequest } from '@/lib/middleware/auth';
import { getLevelInfo, getUserXpHistory } from '@/lib/services/gamification';
import { xpHistoryQuerySchema } from '@/lib/validation/xp';
import { withApiHandler, successResponse } from '@/lib/api-response';
import { NotFoundError } from '@/lib/errors';

export const GET = withApiHandler(async (request: Request) => {
  // 1. Authenticate the request
  const sessionUser = await authenticateRequest(request);

  // 2. Parse and validate query parameters
  const { searchParams } = new URL(request.url);
  const queryParams = {
    limit: searchParams.get('limit') || undefined,
    skip: searchParams.get('skip') || undefined,
  };

  const { limit, skip } = xpHistoryQuerySchema.parse(queryParams);

  // 3. Calculate level info and fetch history
  const levelInfo = getLevelInfo(sessionUser.totalXP);
  let xpHistoryResult;
  try {
    xpHistoryResult = await getUserXpHistory(sessionUser.id, limit, skip);
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      throw new NotFoundError(error.message);
    }
    throw error;
  }

  // 4. Return response
  return successResponse('User XP details and history fetched successfully', {
    currentXP: sessionUser.currentXP,
    totalXP: sessionUser.totalXP,
    levelInfo,
    history: xpHistoryResult.history,
    pagination: xpHistoryResult.pagination,
  });
});
