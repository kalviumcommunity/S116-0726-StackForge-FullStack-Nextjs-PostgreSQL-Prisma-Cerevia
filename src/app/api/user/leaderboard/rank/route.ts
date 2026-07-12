import { authenticateRequest } from '@/lib/middleware/auth';
import { getCurrentUserRank } from '@/lib/services/leaderboard';
import { leaderboardQuerySchema } from '@/lib/validation/leaderboard';
import { withApiHandler, successResponse } from '@/lib/api-response';
import { NotFoundError } from '@/lib/errors';

export const GET = withApiHandler(async (request: Request) => {
  // 1. Authenticate the request
  const sessionUser = await authenticateRequest(request);

  // 2. Parse query parameters
  const { searchParams } = new URL(request.url);
  const queryParams = {
    week: searchParams.get('week') || undefined,
    year: searchParams.get('year') || undefined,
  };

  // 3. Validate request parameters using Zod
  const { week, year } = leaderboardQuerySchema
    .pick({ week: true, year: true })
    .parse(queryParams);

  // 4. Retrieve user rank details
  let rankData;
  try {
    rankData = await getCurrentUserRank(sessionUser.id, { week, year });
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      throw new NotFoundError(error.message);
    }
    throw error;
  }

  return successResponse('User rank retrieved successfully', rankData);
});
