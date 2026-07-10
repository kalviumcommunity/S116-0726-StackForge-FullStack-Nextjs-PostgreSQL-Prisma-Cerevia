import { NextResponse } from 'next/server';
import { authenticateRequest, handleAuthError } from '@/lib/middleware/auth';
import { progressLessonIdSchema } from '@/lib/validation/progress';
import { completeLesson } from '@/lib/services/progress';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // 1. Authenticate the request
    const sessionUser = await authenticateRequest(request);

    // 2. Await dynamic parameters (Next.js 15 breaking change)
    const resolvedParams = await params;

    // 3. Validate parameter format using Zod
    const validationResult = progressLessonIdSchema.safeParse(resolvedParams);
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

    // 4. Mark lesson as completed
    const progress = await completeLesson(sessionUser.id, id);

    return NextResponse.json(progress, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      // Map error types to correct HTTP statuses
      if (
        error.message === 'Lesson not found' ||
        error.message === 'User not found'
      ) {
        return NextResponse.json({ error: error.message }, { status: 404 });
      }
      if (error.message === 'Lesson already completed') {
        return NextResponse.json({ error: error.message }, { status: 409 }); // 409 Conflict
      }
    }

    const { error: message, status } = handleAuthError(error);
    return NextResponse.json({ error: message }, { status });
  }
}
