import { prisma } from '../src/lib/prisma';
import { getWeeklyLeaderboard, getCurrentUserRank } from '../src/lib/services/leaderboard';
import { awardXp } from '../src/lib/services/gamification';
import { getWeekNumber } from '../src/utils/date';
import { User } from '@prisma/client';

async function runLeaderboardServiceTests() {
  console.log('🧪 Starting Leaderboard Service Integration Tests...');

  const createdUsers: User[] = [];

  try {
    // 1. Setup - Create 3 test users
    const userData = [
      { email: `leader-a-${Date.now()}@example.com`, fullName: 'User Alpha', password: 'password123' },
      { email: `leader-b-${Date.now()}@example.com`, fullName: 'User Beta', password: 'password123' },
      { email: `leader-c-${Date.now()}@example.com`, fullName: 'User Gamma', password: 'password123' },
    ];

    for (const data of userData) {
      const user = await prisma.user.create({ data });
      createdUsers.push(user);
    }
    console.log(`- Seeded ${createdUsers.length} temporary test users.`);

    // 2. Setup - Award XP differently to simulate rankings
    // User Alpha: 100 XP
    // User Beta: 60 XP
    // User Gamma: 60 XP (Tie with Beta)
    const now = new Date();
    await awardXp(prisma, createdUsers[0].id, 100, 'TEST_REWARD', undefined, now);
    await awardXp(prisma, createdUsers[1].id, 60, 'TEST_REWARD', undefined, now);
    await awardXp(prisma, createdUsers[2].id, 60, 'TEST_REWARD', undefined, now);
    console.log('- Seeded test XP rewards for current week.');

    // 3. Test getWeeklyLeaderboard - Default Fetch
    const { week, year } = getWeekNumber(now);
    const result = await getWeeklyLeaderboard({ week, year });
    
    // Filter down to only our test users to avoid interference from other seed data
    const testIds = createdUsers.map((u) => u.id);
    const relevant = result.leaderboard.filter((entry) => testIds.includes(entry.userId));

    if (relevant.length !== 3) {
      throw new Error(`Expected 3 relevant test users in leaderboard, got ${relevant.length}`);
    }

    // Verify ordering and ranks
    // Rank 1: Alpha (100 XP)
    // Rank 2: Beta (60 XP)
    // Rank 2: Gamma (60 XP) (Tied)
    const entryAlpha = relevant.find((e) => e.userId === createdUsers[0].id);
    const entryBeta = relevant.find((e) => e.userId === createdUsers[1].id);
    const entryGamma = relevant.find((e) => e.userId === createdUsers[2].id);

    if (!entryAlpha || entryAlpha.rank !== 1 || entryAlpha.weeklyXP !== 100) {
      throw new Error(`User Alpha rank or XP incorrect: ${JSON.stringify(entryAlpha)}`);
    }

    if (!entryBeta || entryBeta.rank !== 2 || entryBeta.weeklyXP !== 60) {
      throw new Error(`User Beta rank or XP incorrect: ${JSON.stringify(entryBeta)}`);
    }

    if (!entryGamma || entryGamma.rank !== 2 || entryGamma.weeklyXP !== 60) {
      throw new Error(`User Gamma rank or XP incorrect: ${JSON.stringify(entryGamma)}`);
    }

    console.log('✅ Competition Ranking and tie handling verified successfully.');

    // 4. Test getCurrentUserRank
    const rankAlpha = await getCurrentUserRank(createdUsers[0].id, { week, year });
    if (rankAlpha.rank !== 1 || rankAlpha.weeklyXP !== 100) {
      throw new Error(`getCurrentUserRank Alpha incorrect: ${JSON.stringify(rankAlpha)}`);
    }

    const rankBeta = await getCurrentUserRank(createdUsers[1].id, { week, year });
    if (rankBeta.rank !== 2 || rankBeta.weeklyXP !== 60) {
      throw new Error(`getCurrentUserRank Beta incorrect: ${JSON.stringify(rankBeta)}`);
    }

    console.log('✅ getCurrentUserRank verified successfully.');

  } catch (error) {
    console.error('❌ Integration test failed:', error);
    process.exit(1);
  } finally {
    // Cleanup
    if (createdUsers.length > 0) {
      const ids = createdUsers.map((u) => u.id);
      await prisma.user.deleteMany({
        where: { id: { in: ids } },
      });
      console.log('- Cleaned up temporary test users.');
    }
    await prisma.$disconnect();
  }

  console.log('🎉 Leaderboard Service Integration Tests Passed Successfully! ✅');
}

runLeaderboardServiceTests();
