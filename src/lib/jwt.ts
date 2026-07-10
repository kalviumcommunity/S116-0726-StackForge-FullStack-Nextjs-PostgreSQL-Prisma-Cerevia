import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  // We throw at runtime if this critical security config is missing
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET environment variable is not defined!');
  }
}

// Fallback for dev/testing environment if not loaded yet
const secret = JWT_SECRET || 'dev-secret-key-please-change-in-production';

export interface TokenPayload {
  userId: string;
  email: string;
}

/**
 * Signs a new JSON Web Token for the user payload.
 */
export function signAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, secret, {
    expiresIn: '7d', // Tokens expire in 7 days
  });
}

/**
 * Verifies a JSON Web Token and returns the decoded payload.
 * Throws if the token is invalid or expired.
 */
export function verifyAccessToken(token: string): TokenPayload {
  try {
    const decoded = jwt.verify(token, secret) as TokenPayload;
    if (!decoded.userId || !decoded.email) {
      throw new Error('Invalid token payload');
    }
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token');
    }
    throw error;
  }
}
