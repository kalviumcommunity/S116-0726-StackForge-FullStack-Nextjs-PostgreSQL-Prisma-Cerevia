import { authenticateRequest } from '@/lib/middleware/auth';
import { withApiHandler, successResponse } from '@/lib/api-response';

export const GET = withApiHandler(async (request: Request) => {
  const user = await authenticateRequest(request);
  return successResponse('Authenticated user details fetched successfully', user);
});
