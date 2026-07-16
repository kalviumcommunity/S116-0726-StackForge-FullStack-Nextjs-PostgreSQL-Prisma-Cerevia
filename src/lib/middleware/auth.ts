import { verifyAccessToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { AuthenticationError } from '@/lib/errors';

export interface AuthenticatedUser {
  id: string;
  email: string;
  fullName: string | null;
  avatar: string | null;
  totalXP: number;
  currentXP: number;
  currentStreak: number;
  maxStreak: number;
}

/**
 * Validates the Authorization Bearer token from the request.
 * Resolves the authenticated user from the database or throws an appropriate error.
 */
export async function authenticateRequest(
  request: Request,
): Promise<AuthenticatedUser> {
  const authHeader = request.headers.get('authorization');

  if (!authHeader) {
    throw new AuthenticationError('Missing authentication token');
  }

  if (!authHeader.startsWith('Bearer ')) {
    throw new AuthenticationError(
      'Invalid authorization format. Use Bearer <token>',
    );
  }

  const token = authHeader.substring(7).trim();
  if (!token) {
    throw new AuthenticationError('Token content cannot be empty');
  }

  // verifyAccessToken will throw if expired or invalid signature
  let decoded;
  try {
    decoded = verifyAccessToken(token);
  } catch (error) {
    throw new AuthenticationError(
      error instanceof Error ? error.message : 'Invalid or expired token',
    );
  }

  // Fetch the latest user record to ensure the account still exists
  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      email: true,
      fullName: true,
      avatar: true,
      totalXP: true,
      currentXP: true,
      currentStreak: true,
      maxStreak: true,
    },
  });

  if (!user) {
    throw new AuthenticationError('User account no longer exists');
  }

  return user;
}
