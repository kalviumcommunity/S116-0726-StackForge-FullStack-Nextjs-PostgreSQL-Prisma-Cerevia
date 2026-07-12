export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // 1. Environment Variable Integrity Checks
    const databaseUrl = process.env.DATABASE_URL;
    const redisUrl = process.env.REDIS_URL;
    const jwtSecret = process.env.JWT_SECRET;

    const errors: string[] = [];

    if (!databaseUrl) {
      errors.push('DATABASE_URL is missing.');
    } else if (
      !databaseUrl.startsWith('postgresql://') &&
      !databaseUrl.startsWith('postgres://')
    ) {
      errors.push('DATABASE_URL must start with "postgresql://" or "postgres://".');
    }

    if (!redisUrl) {
      errors.push('REDIS_URL is missing.');
    } else if (
      !redisUrl.startsWith('redis://') &&
      !redisUrl.startsWith('rediss://')
    ) {
      errors.push('REDIS_URL must start with "redis://" or "rediss://".');
    }

    if (!jwtSecret) {
      errors.push('JWT_SECRET is missing.');
    } else if (jwtSecret.length < 32) {
      errors.push(
        'JWT_SECRET must be at least 32 characters long to ensure production-grade security.',
      );
    }

    if (errors.length > 0) {
      console.error('\n======================================================================');
      console.error('❌ CEREVIA STARTUP ERROR: ENVIRONMENT VALIDATION FAILED');
      errors.forEach((err) => console.error(`   - ${err}`));
      console.error('======================================================================\n');

      // Fail immediately during local dev or production startups
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'development'
      ) {
        process.exit(1);
      } else {
        throw new Error(`Environment validation failed: ${errors.join('; ')}`);
      }
    }

    // 2. Initialize Cron Jobs
    const { initCronJobs } = await import('./lib/services/cron');
    initCronJobs();
  }
}
