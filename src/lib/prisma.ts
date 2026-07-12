import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

logger.info('Database client initialized.');

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
