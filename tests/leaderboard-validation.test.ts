import { leaderboardQuerySchema } from '../src/lib/validation/leaderboard';

async function runLeaderboardValidationTests() {
  console.log('🧪 Starting Leaderboard Validation Integration Tests...');

  try {
    // Test 1: Valid inputs
    const validResult = leaderboardQuerySchema.safeParse({
      week: '28',
      year: '2026',
      limit: '15',
      skip: '5',
    });
    if (!validResult.success) {
      throw new Error(`Expected validation to succeed, but failed: ${JSON.stringify(validResult.error.format())}`);
    }
    const data = validResult.data;
    if (data.week !== 28 || data.year !== 2026 || data.limit !== 15 || data.skip !== 5) {
      throw new Error(`Parsed values mismatch: ${JSON.stringify(data)}`);
    }
    console.log('✅ Valid inputs parsed and transformed successfully.');

    // Test 2: Invalid week
    const invalidWeek = leaderboardQuerySchema.safeParse({
      week: '60', // Max week is 53
    });
    if (invalidWeek.success) {
      throw new Error('Expected invalid week to fail, but it succeeded');
    }
    console.log('✅ Out-of-bounds week validation check rejected successfully.');

    // Test 3: Invalid limit
    const invalidLimit = leaderboardQuerySchema.safeParse({
      limit: '150', // Max limit is 100
    });
    if (invalidLimit.success) {
      throw new Error('Expected invalid limit to fail, but it succeeded');
    }
    console.log('✅ Out-of-bounds limit validation check rejected successfully.');

    // Test 4: Default fallback values
    const defaultResult = leaderboardQuerySchema.safeParse({});
    if (!defaultResult.success) {
      throw new Error('Expected empty options to succeed using defaults');
    }
    const defaults = defaultResult.data;
    if (defaults.limit !== 10 || defaults.skip !== 0 || defaults.week !== undefined || defaults.year !== undefined) {
      throw new Error(`Default fallbacks incorrect: ${JSON.stringify(defaults)}`);
    }
    console.log('✅ Default query fallbacks resolved correctly.');

  } catch (error) {
    console.error('❌ Validation test failed:', error);
    process.exit(1);
  }

  console.log('🎉 Leaderboard Validation Integration Tests Passed Successfully! ✅');
}

runLeaderboardValidationTests();
