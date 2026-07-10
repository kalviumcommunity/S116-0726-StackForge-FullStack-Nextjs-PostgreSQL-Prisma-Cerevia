import { NextResponse } from 'next/server';
import { authenticateRequest, handleAuthError } from '@/lib/middleware/auth';
import { lessonQuerySchema } from '@/lib/validation/lessons';
import { getLessons } from '@/lib/services/lessons';

export async function GET(request: Request) {
  try {
    // 1. Authenticate the user
    await authenticateRequest(request);

    // 2. Parse query parameters
    const { searchParams } = new URL(request.url);
    const queryParams = {
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') || undefined,
      search: searchParams.get('search') || undefined,
      sortBy: searchParams.get('sortBy') || undefined,
      sortOrder: searchParams.get('sortOrder') || undefined,
      difficulty: searchParams.get('difficulty') || undefined,
    };

    // 3. Validate queries using Zod
    const validationResult = lessonQuerySchema.safeParse(queryParams);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    // 4. Query database via lessons service
    const result = await getLessons(validationResult.data);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const { error: message, status } = handleAuthError(error);
    return NextResponse.json({ error: message }, { status });
  }
}
