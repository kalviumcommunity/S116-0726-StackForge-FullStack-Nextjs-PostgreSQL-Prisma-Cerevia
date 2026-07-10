import { prisma } from '../src/lib/prisma';
import { completeLesson } from '../src/lib/services/progress';
import { getUserStreak, evaluateStreakStatus } from '../src/lib/services/streak';
import { User } from '@prisma/client';

async function runStreakTests() {
  console.log('🧪 Starting Streak Engine Integration Tests...');

  let testUser: User | null = null;
  const createdLessonIds: string[] = [];

  try {
    // 1. Setup - Create a test user
    testUser = await prisma.user.create({
      data: {
        email: `streak-test-${Date.now()}@example.com`,
        fullName: 'Streak Tester',
        password: 'testpassword123',
      },
    });
    console.log(`- Created temporary test user: ${testUser.email}`);

    // 2. Setup - Create 5 test lessons
    for (let i = 1; i <= 5; i++) {
      const lesson = await prisma.lesson.create({
        data: {
          title: `Streak Lesson ${i}`,
          description: `Test lesson ${i} for streak calculations`,
          difficulty: 'Beginner',
          xpReward: 10,
        },
      });
      createdLessonIds.push(lesson.id);
    }
    console.log(`- Seeded ${createdLessonIds.length} temporary test lessons.`);

    // 3. Test getUserStreak - Initial State (no activity)
    const initialStreak = await getUserStreak(testUser.id);
    if (initialStreak.currentStreak !== 0) {
      throw new Error(`Expected initial currentStreak to be 0, got ${initialStreak.currentStreak}`);
    }
    if (initialStreak.lastActivityAt !== null) {
      throw new Error(`Expected initial lastActivityAt to be null`);
    }
    if (initialStreak.status !== 'inactive') {
      throw new Error(`Expected initial status to be 'inactive', got ${initialStreak.status}`);
    }
    console.log('✅ Initial streak state verified successfully.');

    // 4. Test completeLesson - Day 1 activity (Start Streak)
    const day1Time = new Date('2026-07-10T12:00:00Z');
    await completeLesson(testUser.id, createdLessonIds[0], day1Time);

    const afterDay1 = await getUserStreak(testUser.id, day1Time);
    if (afterDay1.currentStreak !== 1) {
      throw new Error(`Expected currentStreak to be 1, got ${afterDay1.currentStreak}`);
    }
    if (afterDay1.status !== 'active') {
      throw new Error(`Expected status to be 'active', got ${afterDay1.status}`);
    }
    console.log('✅ Day 1 activity successfully initialized streak to 1.');

    // 5. Test completeLesson - Same Day activity (Streak Continue)
    const day1SameTime = new Date('2026-07-10T18:00:00Z');
    await completeLesson(testUser.id, createdLessonIds[1], day1SameTime);

    const afterSameDay = await getUserStreak(testUser.id, day1SameTime);
    if (afterSameDay.currentStreak !== 1) {
      throw new Error(`Expected currentStreak to remain 1, got ${afterSameDay.currentStreak}`);
    }
    if (afterSameDay.status !== 'active') {
      throw new Error(`Expected status to be 'active', got ${afterSameDay.status}`);
    }
    console.log('✅ Same-day activity kept streak at 1 (continue logic).');

    // 6. Test evaluateStreakStatus - Next Day before completing (At Risk)
    const day2BeforeComplete = new Date('2026-07-11T08:00:00Z');
    const statusAtRisk = evaluateStreakStatus(1, day1SameTime, day2BeforeComplete);
    if (statusAtRisk !== 'at_risk') {
      throw new Error(`Expected next-day status to be 'at_risk', got ${statusAtRisk}`);
    }
    console.log('✅ Next-day pre-activity status verified as "at_risk".');

    // 7. Test completeLesson - Day 2 activity (Streak Increase)
    const day2Time = new Date('2026-07-11T14:00:00Z');
    await completeLesson(testUser.id, createdLessonIds[2], day2Time);

    const afterDay2 = await getUserStreak(testUser.id, day2Time);
    if (afterDay2.currentStreak !== 2) {
      throw new Error(`Expected currentStreak to increase to 2, got ${afterDay2.currentStreak}`);
    }
    if (afterDay2.status !== 'active') {
      throw new Error(`Expected status to be 'active', got ${afterDay2.status}`);
    }

    // Verify database record has updated maxStreak as well
    const updatedUserObj = await prisma.user.findUnique({
      where: { id: testUser.id },
      select: { maxStreak: true },
    });
    if (updatedUserObj?.maxStreak !== 2) {
      throw new Error(`Expected maxStreak to update to 2, got ${updatedUserObj?.maxStreak}`);
    }
    console.log('✅ Day 2 consecutive activity increased streak to 2 and updated maxStreak.');

    // 8. Test evaluateStreakStatus - 2 Days Later before completing (Inactive)
    const day4BeforeComplete = new Date('2026-07-13T09:00:00Z');
    const statusInactive = evaluateStreakStatus(2, day2Time, day4BeforeComplete);
    if (statusInactive !== 'inactive') {
      throw new Error(`Expected 2-days-later status to be 'inactive', got ${statusInactive}`);
    }
    console.log('✅ Missed day status evaluated as "inactive".');

    // 9. Test completeLesson - Day 4 activity (Streak Reset to 1)
    const day4Time = new Date('2026-07-13T10:00:00Z');
    await completeLesson(testUser.id, createdLessonIds[3], day4Time);

    const afterDay4 = await getUserStreak(testUser.id, day4Time);
    if (afterDay4.currentStreak !== 1) {
      throw new Error(`Expected currentStreak to reset to 1, got ${afterDay4.currentStreak}`);
    }
    if (afterDay4.status !== 'active') {
      throw new Error(`Expected status to be 'active', got ${afterDay4.status}`);
    }

    // Verify maxStreak remained 2
    const finalUserObj = await prisma.user.findUnique({
      where: { id: testUser.id },
      select: { maxStreak: true },
    });
    if (finalUserObj?.maxStreak !== 2) {
      throw new Error(`Expected maxStreak to remain 2, got ${finalUserObj?.maxStreak}`);
    }
    console.log('✅ Activity after missed day reset streak to 1 and preserved maxStreak.');

    // 10. Test Duplicate Lesson Completion Protection
    try {
      await completeLesson(testUser.id, createdLessonIds[0], new Date());
      throw new Error('Expected duplicate lesson completion to fail but it succeeded');
    } catch (err: unknown) {
      if (err instanceof Error && err.message !== 'Lesson already completed') {
        throw err;
      }
    }
    console.log('✅ Duplicate completion validation correctly throws error.');

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

  console.log('🎉 All Streak Integration Tests Passed Successfully! ✅');
}

runStreakTests();
