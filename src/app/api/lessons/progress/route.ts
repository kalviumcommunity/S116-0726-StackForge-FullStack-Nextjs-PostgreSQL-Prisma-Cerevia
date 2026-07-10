import { NextResponse } from 'next/server';
import { authenticateRequest, handleAuthError } from '@/lib/middleware/auth';
import { getUserProgress } from '@/lib/services/progress';

export async function GET(request: Request) {
  try {
    // 1. Authenticate the request
    const sessionUser = await authenticateRequest(request);

    // 2. Fetch progress stats for current user
    const stats = await getUserProgress(sessionUser.id);

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    const { error: message, status } = handleAuthError(error);
    return NextResponse.json({ error: message }, { status });
  }
}
