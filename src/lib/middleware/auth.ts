import { verifyAccessToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

export interface AuthenticatedUser {
  id: string;
  email: string;
  fullName: string | null;
  avatar: string | null;
  totalXP: number;
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
    throw new Error('Missing authentication token');
  }

  if (!authHeader.startsWith('Bearer ')) {
    throw new Error('Invalid authorization format. Use Bearer <token>');
  }

  const token = authHeader.substring(7).trim();
  if (!token) {
    throw new Error('Token content cannot be empty');
  }

  // verifyAccessToken will throw if expired or invalid signature
  const decoded = verifyAccessToken(token);

  // Fetch the latest user record to ensure the account still exists
  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      email: true,
      fullName: true,
      avatar: true,
      totalXP: true,
      currentStreak: true,
      maxStreak: true,
    },
  });

  if (!user) {
    throw new Error('User account no longer exists');
  }

  return user;
}

/**
 * Catch-all response utility for auth errors.
 */
export function handleAuthError(error: unknown) {
  const message = error instanceof Error ? error.message : 'Unauthorized';

  // Choose standard HTTP statuses depending on the type of error
  let status = 401;
  if (message.includes('Missing') || message.includes('format')) {
    status = 401;
  }

  return {
    error: message,
    status,
  };
}
