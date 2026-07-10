import { NextResponse } from 'next/server';
import { authenticateRequest, handleAuthError } from '@/lib/middleware/auth';
import { getUserProfile } from '@/lib/services/profile';

export async function GET(request: Request) {
  try {
    // 1. Authenticate the request
    const sessionUser = await authenticateRequest(request);

    // 2. Fetch the profile details
    const profile = await getUserProfile(sessionUser.id);

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    const { error: message, status } = handleAuthError(error);
    return NextResponse.json({ error: message }, { status });
  }
}

export async function PUT(request: Request) {
  try {
    // 1. Authenticate the request
    const sessionUser = await authenticateRequest(request);

    // 2. Parse request body
    const body = await request.json().catch(() => ({}));

    // Import the validation schema and service functions dynamically or statically
    const { updateProfileSchema } = await import('@/lib/validation/profile');
    const { updateUserProfile } = await import('@/lib/services/profile');

    // 3. Validate input with Zod
    const validationResult = updateProfileSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // 4. Update database user record
    const updatedProfile = await updateUserProfile(sessionUser.id, validationResult.data);

    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error) {
    const { error: message, status } = handleAuthError(error);
    return NextResponse.json({ error: message }, { status });
  }
}
