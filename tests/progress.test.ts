import { prisma } from '../src/lib/prisma';
import { completeLesson, getUserProgress } from '../src/lib/services/progress';
import { User } from '@prisma/client';

async function runProgressTests() {
  console.log('🧪 Starting Progress & Completion Service Integration Tests...');

  let testUser: User | null = null;
  const createdLessonIds: string[] = [];

  try {
    // 1. Setup - Create a test user
    testUser = await prisma.user.create({
      data: {
        email: `progress-test-${Date.now()}@example.com`,
        fullName: 'Progress Tester',
        password: 'testpassword123',
      },
    });
    console.log(`- Created temporary test user: ${testUser.email}`);

    // 2. Setup - Create 2 test lessons
    const lessonsData = [
      {
        title: 'Progress Lesson 1',
        description: 'First test lesson for progress',
        difficulty: 'Beginner',
        xpReward: 10,
      },
      {
        title: 'Progress Lesson 2',
        description: 'Second test lesson for progress',
        difficulty: 'Intermediate',
        xpReward: 20,
      },
    ];

    for (const data of lessonsData) {
      const lesson = await prisma.lesson.create({ data });
      createdLessonIds.push(lesson.id);
    }
    console.log(`- Seeded ${createdLessonIds.length} temporary test lessons.`);

    // 3. Test getUserProgress - Initial State (no completed lessons)
    const initialProgress = await getUserProgress(testUser.id);
    if (initialProgress.totalCompleted !== 0) {
      throw new Error(
        `Expected 0 completed lessons, got ${initialProgress.totalCompleted}`,
      );
    }
    const initialRemainingIds = initialProgress.remainingLessons.map(
      (l) => l.id,
    );
    if (!createdLessonIds.every((id) => initialRemainingIds.includes(id))) {
      throw new Error('Not all seeded lessons are in remaining lessons');
    }
    console.log('✅ getUserProgress initial state verified successfully.');

    // 4. Test completeLesson - Successful completion
    const firstLessonId = createdLessonIds[0];
    const progressRecord = await completeLesson(testUser.id, firstLessonId);
    if (
      !progressRecord ||
      progressRecord.lessonId !== firstLessonId ||
      progressRecord.userId !== testUser.id
    ) {
      throw new Error('Failed to create correct progress record');
    }
    console.log('✅ completeLesson successfully marked lesson as completed.');

    // 5. Test completeLesson - Duplicate completion protection
    try {
      await completeLesson(testUser.id, firstLessonId);
      throw new Error(
        'Expected duplicate completion to fail, but it succeeded',
      );
    } catch (err: unknown) {
      if (err instanceof Error && err.message !== 'Lesson already completed') {
        throw err;
      }
    }
    console.log(
      '✅ Duplicate completion protection throws "Lesson already completed".',
    );

    // 6. Test completeLesson - Lesson not found error
    try {
      await completeLesson(testUser.id, '00000000-0000-0000-0000-000000000000');
      throw new Error(
        'Expected nonexistent lesson completion to fail, but it succeeded',
      );
    } catch (err: unknown) {
      if (err instanceof Error && err.message !== 'Lesson not found') {
        throw err;
      }
    }
    console.log(
      '✅ completeLesson throws "Lesson not found" for nonexistent UUID.',
    );

    // 7. Test completeLesson - User not found error
    try {
      await completeLesson(
        '00000000-0000-0000-0000-000000000000',
        firstLessonId,
      );
      throw new Error(
        'Expected nonexistent user completion to fail, but it succeeded',
      );
    } catch (err: unknown) {
      if (err instanceof Error && err.message !== 'User not found') {
        throw err;
      }
    }
    console.log(
      '✅ completeLesson throws "User not found" for nonexistent UUID.',
    );

    // 8. Test getUserProgress - Updated state
    const updatedProgress = await getUserProgress(testUser.id);
    if (updatedProgress.totalCompleted !== 1) {
      throw new Error(
        `Expected 1 completed lesson, got ${updatedProgress.totalCompleted}`,
      );
    }
    if (updatedProgress.completedLessons[0].id !== firstLessonId) {
      throw new Error('Completed lesson details mismatch');
    }
    const updatedRemainingIds = updatedProgress.remainingLessons.map(
      (l) => l.id,
    );
    if (updatedRemainingIds.includes(firstLessonId)) {
      throw new Error('Completed lesson still exists in remaining lessons');
    }
    if (!updatedRemainingIds.includes(createdLessonIds[1])) {
      throw new Error('Non-completed lesson missing from remaining lessons');
    }
    console.log('✅ getUserProgress updated state verified successfully.');
  } catch (error) {
    console.error('❌ Integration test failed:', error);
    process.exit(1);
  } finally {
    // Cleanup
    if (testUser) {
      await prisma.user.delete({
        where: { id: testUser.id },
      });
      console.log('- Cleaned up temporary test user.');
    }
    if (createdLessonIds.length > 0) {
      await prisma.lesson.deleteMany({
        where: { id: { in: createdLessonIds } },
      });
      console.log('- Cleaned up temporary test lessons.');
    }
    await prisma.$disconnect();
  }

  console.log(
    '🎉 All Progress & Completion Integration Tests Passed Successfully! ✅',
  );
}

runProgressTests();
