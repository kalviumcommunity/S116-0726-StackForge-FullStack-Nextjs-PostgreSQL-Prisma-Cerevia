import { authenticateRequest } from '@/lib/middleware/auth';
import { getUserProfile, updateUserProfile } from '@/lib/services/profile';
import { updateProfileSchema } from '@/lib/validation/profile';
import { withApiHandler, successResponse } from '@/lib/api-response';

export const GET = withApiHandler(async (request: Request) => {
  // 1. Authenticate the request
  const sessionUser = await authenticateRequest(request);

  // 2. Fetch the profile details
  const profile = await getUserProfile(sessionUser.id);

  return successResponse('User profile fetched successfully', profile);
});

export const PUT = withApiHandler(async (request: Request) => {
  // 1. Authenticate the request
  const sessionUser = await authenticateRequest(request);

  // 2. Parse request body
  const body = await request.json().catch(() => ({}));

  // 3. Validate input with Zod
  const validatedData = updateProfileSchema.parse(body);

  // 4. Update database user record
  const updatedProfile = await updateUserProfile(sessionUser.id, validatedData);

  return successResponse('User profile updated successfully', updatedProfile);
});
