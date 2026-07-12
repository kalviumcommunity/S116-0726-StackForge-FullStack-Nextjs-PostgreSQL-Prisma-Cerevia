import { prisma } from '../src/lib/prisma';
import { getLevelInfo, awardXp, getUserXpHistory, getXpRequiredForLevel } from '../src/lib/services/gamification';
import { completeLesson } from '../src/lib/services/progress';
import { User } from '@prisma/client';

async function runXpTests() {
  console.log('🧪 Starting XP & Gamification Engine Integration Tests...');

  let testUser: User | null = null;
  const createdLessonIds: string[] = [];

  try {
    // ----------------------------------------------------
    // Test 1: Level progression formula logic (getLevelInfo)
    // ----------------------------------------------------
    console.log('- Testing Level Progression calculations...');
    
    // Level 1: 0 XP
    const lvl1Info = getLevelInfo(0);
    if (lvl1Info.level !== 1 || lvl1Info.xpInCurrentLevel !== 0 || lvl1Info.xpRemaining !== 100) {
      throw new Error(`Expected Level 1 for 0 XP, got level ${lvl1Info.level}, xpInCurrentLevel: ${lvl1Info.xpInCurrentLevel}, xpRemaining: ${lvl1Info.xpRemaining}`);
    }

    // Level 1 progress: 50 XP
    const lvl1ProgressInfo = getLevelInfo(50);
    if (lvl1ProgressInfo.level !== 1 || lvl1ProgressInfo.xpInCurrentLevel !== 50 || lvl1ProgressInfo.progressPercentage !== 50) {
      throw new Error(`Expected Level 1 progress of 50%, got level ${lvl1ProgressInfo.level}, progressPercentage: ${lvl1ProgressInfo.progressPercentage}`);
    }

    // Level 2 threshold is 100 XP
    const lvl2Threshold = getXpRequiredForLevel(2);
    if (lvl2Threshold !== 100) {
      throw new Error(`Expected Level 2 threshold to be 100, got ${lvl2Threshold}`);
    }

    // Level 2: 100 XP
    const lvl2Info = getLevelInfo(100);
    if (lvl2Info.level !== 2 || lvl2Info.xpInCurrentLevel !== 0 || lvl2Info.xpRemaining !== 182) {
      throw new Error(`Expected Level 2 for 100 XP, got level ${lvl2Info.level}, xpInCurrentLevel: ${lvl2Info.xpInCurrentLevel}, xpRemaining: ${lvl2Info.xpRemaining}`);
    }

    // Level 3 threshold is 282 XP
    const lvl3Threshold = getXpRequiredForLevel(3);
    if (lvl3Threshold !== 282) {
      throw new Error(`Expected Level 3 threshold to be 282, got ${lvl3Threshold}`);
    }

    // Level 3: 300 XP
    const lvl3Info = getLevelInfo(300);
    if (lvl3Info.level !== 3 || lvl3Info.xpInCurrentLevel !== 18 || lvl3Info.xpRemaining !== 219) {
      throw new Error(`Expected Level 3 for 300 XP, got level ${lvl3Info.level}, xpInCurrentLevel: ${lvl3Info.xpInCurrentLevel}, xpRemaining: ${lvl3Info.xpRemaining}`);
    }

    console.log('✅ Level Progression formula validated successfully.');

    // ----------------------------------------------------
    // Setup for Database Integration tests
    // ----------------------------------------------------
    // Create a test user
    testUser = await prisma.user.create({
      data: {
        email: `xp-test-${Date.now()}@example.com`,
        fullName: 'XP Tester',
        password: 'testpassword123',
      },
    });
    console.log(`- Created temporary test user: ${testUser.email}`);

    // Create a couple of test lessons
    const lessonsData = [
      {
        title: 'XP Lesson 1',
        description: 'First test lesson for XP tracking',
        difficulty: 'Beginner',
        xpReward: 25,
      },
      {
        title: 'XP Lesson 2',
        description: 'Second test lesson for XP tracking',
        difficulty: 'Intermediate',
        xpReward: 35,
      },
    ];

    for (const data of lessonsData) {
      const lesson = await prisma.lesson.create({ data });
      createdLessonIds.push(lesson.id);
    }
    console.log(`- Seeded ${createdLessonIds.length} temporary test lessons.`);

    // Verify initial XP values are 0
    if (testUser.totalXP !== 0 || testUser.currentXP !== 0) {
      throw new Error(`Expected initial XP to be 0, got totalXP: ${testUser.totalXP}, currentXP: ${testUser.currentXP}`);
    }

    // ----------------------------------------------------
    // Test 2: awardXp functionality
    // ----------------------------------------------------
    console.log('- Testing awardXp functionality...');
    await awardXp(prisma, testUser.id, 50, 'DAILY_STREAK_BONUS');

    // Query user and check XP
    const userAfterAward = await prisma.user.findUnique({
      where: { id: testUser.id },
    });
    if (!userAfterAward || userAfterAward.totalXP !== 50 || userAfterAward.currentXP !== 50) {
      throw new Error(`Expected user XP to update to 50, got totalXP: ${userAfterAward?.totalXP}, currentXP: ${userAfterAward?.currentXP}`);
    }

    // Query history and check if it was logged
    const historyResult = await getUserXpHistory(testUser.id);
    if (historyResult.history.length !== 1) {
      throw new Error(`Expected 1 history record, got ${historyResult.history.length}`);
    }
    const record = historyResult.history[0];
    if (record.xpEarned !== 50 || record.reason !== 'DAILY_STREAK_BONUS' || record.lesson !== null) {
      throw new Error(`Incorrect history record details: ${JSON.stringify(record)}`);
    }
    console.log('✅ awardXp and getUserXpHistory validated successfully.');

    // ----------------------------------------------------
    // Test 3: completeLesson integration (automatic XP reward & prevention of duplicates)
    // ----------------------------------------------------
    console.log('- Testing completeLesson integration with XP engine...');
    const firstLessonId = createdLessonIds[0]; // 25 XP
    
    // Complete first lesson
    await completeLesson(testUser.id, firstLessonId);

    // Verify XP was increased by 25
    const userAfterCompletion = await prisma.user.findUnique({
      where: { id: testUser.id },
    });
    // Previous XP was 50, now should be 50 + 25 = 75
    if (!userAfterCompletion || userAfterCompletion.totalXP !== 75 || userAfterCompletion.currentXP !== 75) {
      throw new Error(`Expected user XP to update to 75, got totalXP: ${userAfterCompletion?.totalXP}, currentXP: ${userAfterCompletion?.currentXP}`);
    }

    // Verify history now has 2 entries
    const historyResult2 = await getUserXpHistory(testUser.id);
    if (historyResult2.history.length !== 2) {
      throw new Error(`Expected 2 history records, got ${historyResult2.history.length}`);
    }

    // First record (descending order) should be the lesson completion
    const completionRecord = historyResult2.history[0];
    if (
      completionRecord.xpEarned !== 25 ||
      completionRecord.reason !== 'LESSON_COMPLETION' ||
      !completionRecord.lesson ||
      completionRecord.lesson.id !== firstLessonId ||
      completionRecord.lesson.title !== 'XP Lesson 1'
    ) {
      throw new Error(`Incorrect lesson completion history details: ${JSON.stringify(completionRecord)}`);
    }

    // Test duplicate lesson completion error: should throw and NOT award XP again
    try {
      await completeLesson(testUser.id, firstLessonId);
      throw new Error('Expected duplicate completion to fail but it succeeded');
    } catch (err: unknown) {
      if (err instanceof Error && err.message !== 'Lesson already completed') {
        throw err;
      }
    }

    // Verify XP did NOT increase after failed duplicate completion
    const userAfterFailedDuplicate = await prisma.user.findUnique({
      where: { id: testUser.id },
    });
    if (userAfterFailedDuplicate?.totalXP !== 75) {
      throw new Error(`Expected totalXP to remain 75, got ${userAfterFailedDuplicate?.totalXP}`);
    }
    console.log('✅ completeLesson successfully awards XP and prevents duplicate XP rewards.');

    // ----------------------------------------------------
    // Test 4: Pagination in history
    // ----------------------------------------------------
    console.log('- Testing XP History pagination...');
    
    // Complete second lesson (35 XP)
    await completeLesson(testUser.id, createdLessonIds[1]); // totalXP = 75 + 35 = 110
    
    // Total history size should be 3: 1 streak bonus, 2 lesson completions
    const paginatedResult = await getUserXpHistory(testUser.id, 2, 0);
    if (paginatedResult.history.length !== 2 || paginatedResult.pagination.totalCount !== 3) {
      throw new Error(`Pagination size mismatch: history size: ${paginatedResult.history.length}, total: ${paginatedResult.pagination.totalCount}`);
    }

    const skippedResult = await getUserXpHistory(testUser.id, 2, 2);
    if (skippedResult.history.length !== 1) {
      throw new Error(`Expected 1 remaining record when skipping 2, got ${skippedResult.history.length}`);
    }

    console.log('✅ XP History pagination validated successfully.');

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

  console.log('🎉 All XP & Gamification Engine Integration Tests Passed Successfully! ✅');
  process.exit(0);
}

runXpTests();
