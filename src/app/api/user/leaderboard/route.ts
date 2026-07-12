import { NextResponse } from 'next/server';
import { authenticateRequest, handleAuthError } from '@/lib/middleware/auth';
import { getWeeklyLeaderboard } from '@/lib/services/leaderboard';
import { leaderboardQuerySchema } from '@/lib/validation/leaderboard';

export async function GET(request: Request) {
  try {
    // 1. Authenticate the request
    await authenticateRequest(request);

    // 2. Parse query parameters
    const { searchParams } = new URL(request.url);
    const queryParams = {
      week: searchParams.get('week') || undefined,
      year: searchParams.get('year') || undefined,
      limit: searchParams.get('limit') || undefined,
      skip: searchParams.get('skip') || undefined,
    };

    // 3. Validate request parameters using Zod
    const validationResult = leaderboardQuerySchema.safeParse(queryParams);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { week, year, limit, skip } = validationResult.data;

    // 4. Retrieve leaderboard entries
    const leaderboardData = await getWeeklyLeaderboard({
      week,
      year,
      limit,
      skip,
    });

    return NextResponse.json(leaderboardData, { status: 200 });
  } catch (error) {
    const { error: message, status } = handleAuthError(error);
    return NextResponse.json({ error: message }, { status });
  }
}
