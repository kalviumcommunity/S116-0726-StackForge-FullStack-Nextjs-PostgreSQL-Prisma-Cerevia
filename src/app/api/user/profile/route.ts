import { authenticateRequest } from '@/lib/middleware/auth';
import { getUserProfile, updateUserProfile } from '@/lib/services/profile';
import { updateProfileSchema } from '@/lib/validation/profile';
import { withApiHandler, successResponse } from '@/lib/api-response';
import { NotFoundError } from '@/lib/errors';

export const GET = withApiHandler(async (request: Request) => {
  // 1. Authenticate the request
  const sessionUser = await authenticateRequest(request);

  // 2. Fetch the profile details
  let profile;
  try {
    profile = await getUserProfile(sessionUser.id);
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      throw new NotFoundError(error.message);
    }
    throw error;
  }

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
  let updatedProfile;
  try {
    updatedProfile = await updateUserProfile(sessionUser.id, validatedData);
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      throw new NotFoundError(error.message);
    }
    throw error;
  }

  return successResponse('User profile updated successfully', updatedProfile);
});
