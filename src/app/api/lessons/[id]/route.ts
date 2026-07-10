import { NextResponse } from 'next/server';
import { authenticateRequest, handleAuthError } from '@/lib/middleware/auth';
import { lessonIdSchema } from '@/lib/validation/lessons';
import { getLessonById } from '@/lib/services/lessons';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // 1. Authenticate the request
    await authenticateRequest(request);

    // 2. Dynamic route parameters are a Promise in Next.js 15 and must be awaited
    const resolvedParams = await params;

    // 3. Validate parameter format using Zod
    const validationResult = lessonIdSchema.safeParse(resolvedParams);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { id } = validationResult.data;

    // 4. Fetch lesson details via service layer
    const lesson = await getLessonById(id);

    return NextResponse.json(lesson, { status: 200 });
  } catch (error) {
    // If the error is user/lesson not found, map to 404
    if (error instanceof Error && error.message === 'Lesson not found') {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    const { error: message, status } = handleAuthError(error);
    return NextResponse.json({ error: message }, { status });
  }
}
