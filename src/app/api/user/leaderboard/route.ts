import { NextResponse } from 'next/server';
import { authenticateRequest, handleAuthError } from '@/lib/middleware/auth';
import { getWeeklyLeaderboard, PaginatedLeaderboardResponse } from '@/lib/services/leaderboard';
import { leaderboardQuerySchema } from '@/lib/validation/leaderboard';
import { getWeekNumber } from '@/utils/date';
import { getCache, setCache } from '@/lib/redis';

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

    // Resolve deterministic week and year for the cache key
    const now = new Date();
    const currentWeekInfo = getWeekNumber(now);
    const targetWeek = week ?? currentWeekInfo.week;
    const targetYear = year ?? currentWeekInfo.year;

    // Create unique cache key representing the query parameters
    const cacheKey = `leaderboard:weekly:${targetYear}:${targetWeek}:limit_${limit}:skip_${skip}`;

    // Try retrieving from Redis cache
    const cachedData = await getCache<PaginatedLeaderboardResponse>(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData, { status: 200 });
    }

    // 4. Retrieve leaderboard entries from PostgreSQL database
    const leaderboardData = await getWeeklyLeaderboard({
      week,
      year,
      limit,
      skip,
    });

    // Populate Redis cache
    const ttlSeconds = parseInt(
      process.env.LEADERBOARD_CACHE_TTL || '3600',
      10,
    );
    await setCache(cacheKey, leaderboardData, ttlSeconds);

    return NextResponse.json(leaderboardData, { status: 200 });
  } catch (error) {
    const { error: message, status } = handleAuthError(error);
    return NextResponse.json({ error: message }, { status });
  }
}
