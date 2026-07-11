import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

let redis: Redis | null = null;
let isRedisConnected = false;

try {
  redis = new Redis(redisUrl, {
    maxRetriesPerRequest: 1, // Fail fast if connection fails
    retryStrategy(times) {
      if (times > 3) {
        // Stop retrying to prevent process hanging
        return null;
      }
      // Retry connection every 1 to 3 seconds
      return Math.min(times * 1000, 3000);
    },
  });

  redis.on('connect', () => {
    isRedisConnected = true;
    console.log('✅ Redis connected successfully.');
  });

  redis.on('error', (err) => {
    isRedisConnected = false;
    console.error('❌ Redis connection error:', err.message);
  });

  redis.on('close', () => {
    isRedisConnected = false;
    console.warn('⚠️ Redis connection closed.');
  });
} catch (err) {
  console.error('❌ Failed to initialize Redis client:', err);
}

export { redis };

/**
 * Retrieves a value from the cache.
 * Returns null if cache miss or if Redis is unavailable.
 */
export async function getCache<T>(key: string): Promise<T | null> {
  if (!redis || !isRedisConnected) {
    return null;
  }
  try {
    const cachedData = await redis.get(key);
    if (!cachedData) return null;
    return JSON.parse(cachedData) as T;
  } catch (error) {
    console.error(`❌ Redis error during GET for key "${key}":`, error);
    return null;
  }
}

/**
 * Stores a value in the cache with an optional TTL (Time To Live) in seconds.
 */
export async function setCache(
  key: string,
  value: any,
  ttlSeconds: number = 3600, // Default to 1 hour
): Promise<void> {
  if (!redis || !isRedisConnected) {
    return;
  }
  try {
    const serializedData = JSON.stringify(value);
    await redis.set(key, serializedData, 'EX', ttlSeconds);
  } catch (error) {
    console.error(`❌ Redis error during SET for key "${key}":`, error);
  }
}

/**
 * Deletes a value from the cache.
 */
export async function deleteCache(key: string): Promise<void> {
  if (!redis || !isRedisConnected) {
    return;
  }
  try {
    await redis.del(key);
  } catch (error) {
    console.error(`❌ Redis error during DEL for key "${key}":`, error);
  }
}

/**
 * Deletes all keys matching a specific glob pattern.
 */
export async function deleteCachePattern(pattern: string): Promise<void> {
  if (!redis || !isRedisConnected) {
    return;
  }
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error(
      `❌ Redis error during pattern deletion "${pattern}":`,
      error,
    );
  }
}
