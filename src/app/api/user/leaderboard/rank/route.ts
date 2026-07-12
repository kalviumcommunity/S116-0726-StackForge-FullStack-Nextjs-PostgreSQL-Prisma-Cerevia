import { NextResponse } from 'next/server';
import { authenticateRequest, handleAuthError } from '@/lib/middleware/auth';
import { getCurrentUserRank } from '@/lib/services/leaderboard';
import { leaderboardQuerySchema } from '@/lib/validation/leaderboard';

export async function GET(request: Request) {
  try {
    // 1. Authenticate the request
    const sessionUser = await authenticateRequest(request);

    // 2. Parse query parameters
    const { searchParams } = new URL(request.url);
    const queryParams = {
      week: searchParams.get('week') || undefined,
      year: searchParams.get('year') || undefined,
    };

    // 3. Validate request parameters using Zod
    const validationResult = leaderboardQuerySchema
      .pick({ week: true, year: true })
      .safeParse(queryParams);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { week, year } = validationResult.data;

    // 4. Retrieve user rank details
    const rankData = await getCurrentUserRank(sessionUser.id, { week, year });

    return NextResponse.json(rankData, { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    const { error: message, status } = handleAuthError(error);
    return NextResponse.json({ error: message }, { status });
  }
}
