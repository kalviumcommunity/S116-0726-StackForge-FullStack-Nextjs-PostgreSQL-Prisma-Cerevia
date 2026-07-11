import { getCache, setCache, deleteCache, deleteCachePattern, redis } from '../src/lib/redis';

async function runRedisTests() {
  console.log('🧪 Starting Redis Caching Layer Integration Tests...');

  if (!redis) {
    console.log('⚠️ Redis client is not initialized. Skipping cache checks, verifying fallback behavior.');
    return;
  }

  // Wait 4 seconds for connection attempts to resolve
  console.log('- Waiting for Redis connection status to settle...');
  await new Promise((resolve) => setTimeout(resolve, 4000));

  try {
    const status = redis.status;
    console.log(`- Redis client status: ${status}`);

    if (status !== 'ready' && status !== 'connect') {
      console.log('⚠️ Redis server is offline. Testing PostgreSQL/silent fallback behavior...');

      // Verify setCache doesn't throw
      await setCache('test:offline_key', { value: 123 }, 10);
      console.log('✅ setCache offline fallback passed (no errors thrown).');

      // Verify getCache returns null
      const offlineVal = await getCache('test:offline_key');
      if (offlineVal !== null) {
        throw new Error(`Expected getCache to return null when offline, got ${JSON.stringify(offlineVal)}`);
      }
      console.log('✅ getCache offline fallback passed (returned null).');

      // Verify deleteCache doesn't throw
      await deleteCache('test:offline_key');
      console.log('✅ deleteCache offline fallback passed (no errors thrown).');

      // Verify deleteCachePattern doesn't throw
      await deleteCachePattern('test:offline_*');
      console.log('✅ deleteCachePattern offline fallback passed (no errors thrown).');

    } else {
      console.log('- Redis server is online. Running functional tests...');

      const testKey = 'test:leaderboard_cache';
      const testData = {
        leaderboard: [
          { userId: 'user-1', fullName: 'Tester', weeklyXP: 150, rank: 1 }
        ],
        timestamp: Date.now()
      };

      // Test Set & Get
      await setCache(testKey, testData, 60);
      console.log(`- Stored test data under key: ${testKey}`);

      const cached = await getCache<typeof testData>(testKey);
      if (!cached || cached.leaderboard[0].fullName !== 'Tester') {
        throw new Error(`Cached data mismatch: ${JSON.stringify(cached)}`);
      }
      console.log('✅ Cache get/set values match successfully.');

      // Test Delete
      await deleteCache(testKey);
      const afterDel = await getCache(testKey);
      if (afterDel !== null) {
        throw new Error(`Expected key to be deleted, but got: ${JSON.stringify(afterDel)}`);
      }
      console.log('✅ Cache delete verified successfully.');

      // Test Wildcard Pattern Delete
      const patKey1 = 'test:pattern_1';
      const patKey2 = 'test:pattern_2';
      await setCache(patKey1, { active: true }, 60);
      await setCache(patKey2, { active: false }, 60);

      await deleteCachePattern('test:pattern_*');

      const val1 = await getCache(patKey1);
      const val2 = await getCache(patKey2);
      if (val1 !== null || val2 !== null) {
        throw new Error(`Pattern delete failed. val1: ${val1}, val2: ${val2}`);
      }
      console.log('✅ Cache glob pattern deletion verified successfully.');
    }
  } catch (error) {
    console.error('❌ Redis Caching integration tests failed:', error);
    process.exit(1);
  } finally {
    if (redis) {
      redis.disconnect();
      console.log('- Cleaned up Redis connection handle.');
    }
  }

  console.log('🎉 Redis Caching Layer Integration Tests Passed Successfully! ✅');
}

runRedisTests();
