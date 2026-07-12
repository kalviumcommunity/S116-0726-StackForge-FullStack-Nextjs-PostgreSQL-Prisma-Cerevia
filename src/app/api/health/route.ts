import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';
import { withApiHandler } from '@/lib/api-response';
import { logger } from '@/lib/logger';

export const GET = withApiHandler(async () => {
  let dbStatus = 'UP';
  let redisStatus = 'UP';
  let overallStatus = 'UP';
  const errors: string[] = [];

  // 1. Verify Database Connectivity
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (err) {
    dbStatus = 'DOWN';
    overallStatus = 'DOWN';
    const msg = err instanceof Error ? err.message : String(err);
    errors.push(`PostgreSQL connection failed: ${msg}`);
    logger.error('Health Check - PostgreSQL offline', err);
  }

  // 2. Verify Redis Connectivity
  try {
    if (redis && redis.status === 'ready') {
      const ping = await redis.ping();
      if (ping !== 'PONG') {
        redisStatus = 'DOWN';
        overallStatus = 'DOWN';
        errors.push('Redis ping did not return PONG');
      }
    } else {
      redisStatus = 'DOWN';
      overallStatus = 'DOWN';
      errors.push(`Redis client is in status: ${redis?.status || 'uninitialized'}`);
    }
  } catch (err) {
    redisStatus = 'DOWN';
    overallStatus = 'DOWN';
    const msg = err instanceof Error ? err.message : String(err);
    errors.push(`Redis connection failed: ${msg}`);
    logger.error('Health Check - Redis offline', err);
  }

  const responseBody = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'production',
    services: {
      database: dbStatus,
      redis: redisStatus,
    },
    ...(errors.length > 0 ? { errors } : {}),
  };

  const statusCode = overallStatus === 'UP' ? 200 : 503;
  return new NextResponse(JSON.stringify(responseBody), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
  });
});
