import { NextResponse } from 'next/server';
import { authenticateRequest, handleAuthError } from '@/lib/middleware/auth';
import { getUserStreak } from '@/lib/services/streak';

export async function GET(request: Request) {
  try {
    // 1. Authenticate the request
    const sessionUser = await authenticateRequest(request);

    // 2. Fetch streak details for current user
    const streakInfo = await getUserStreak(sessionUser.id);

    // 3. Return response with 200 OK
    return NextResponse.json(streakInfo, { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    const { error: message, status } = handleAuthError(error);
    return NextResponse.json({ error: message }, { status });
  }
}
