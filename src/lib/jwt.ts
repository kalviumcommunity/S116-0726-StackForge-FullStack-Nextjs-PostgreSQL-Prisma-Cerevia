import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined!');
}

const secret = JWT_SECRET;

export interface TokenPayload {
  userId: string;
  email: string;
}

/**
 * Signs a new JSON Web Token for the user payload.
 */
export function signAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: '7d', // Tokens expire in 7 days
  });
}

/**
 * Verifies a JSON Web Token and returns the decoded payload.
 * Throws if the token is invalid or expired.
 */
export function verifyAccessToken(token: string): TokenPayload {
  try {
    const decoded = jwt.verify(token, secret, {
      algorithms: ['HS256'],
    }) as TokenPayload;
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
