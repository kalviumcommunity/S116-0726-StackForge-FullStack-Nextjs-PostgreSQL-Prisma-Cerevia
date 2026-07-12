import helmet from 'helmet';
import validator from 'validator';
import { IncomingMessage, ServerResponse } from 'http';
import { NextResponse } from 'next/server';
import { redis } from './redis';

// ----------------------------------------------------
// 1. Helmet Headers Generation
// ----------------------------------------------------
const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      fontSrc: ["'self'", 'https:', 'data:'],
      formAction: ["'self'"],
      frameAncestors: ["'self'"],
      imgSrc: ["'self'", 'data:'],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'"],
      scriptSrcAttr: ["'none'"],
      styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
      upgradeInsecureRequests: [],
    },
  },
});

export function getHelmetHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};
  const dummyReq = {} as IncomingMessage;
  const dummyRes = {
    setHeader(name: string, value: string) {
      headers[name.toLowerCase()] = value;
    },
    getHeader(name: string) {
      return headers[name.toLowerCase()];
    },
    removeHeader(name: string) {
      delete headers[name.toLowerCase()];
    },
    writeHead() {},
    end() {},
  } as unknown as ServerResponse;

  // Execute Helmet synchronously to populate headers
  helmetMiddleware(dummyReq, dummyRes, () => {});
  return headers;
}

export function applyHelmet(response: NextResponse) {
  const helmetHeaders = getHelmetHeaders();
  for (const [key, value] of Object.entries(helmetHeaders)) {
    response.headers.set(key, value);
  }
  response.headers.delete('x-powered-by');
}

// ----------------------------------------------------
// 2. CORS Handling
// ----------------------------------------------------
export function applyCors(request: Request, response: NextResponse) {
  const origin = request.headers.get('origin');
  if (!origin) return;

  const allowedOriginsEnv = process.env.ALLOWED_ORIGINS;
  const allowedOrigins = allowedOriginsEnv
    ? allowedOriginsEnv.split(',').map((o) => o.trim())
    : process.env.NODE_ENV !== 'production'
      ? ['http://localhost:3000']
      : [];

  if (allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS',
    );
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );
    response.headers.set('Access-Control-Max-Age', '86400');
  }
}

// ----------------------------------------------------
// 3. Request Sanitization
// ----------------------------------------------------
export function sanitizeString(val: string): string {
  let sanitized = val.trim();
  sanitized = validator.escape(sanitized);
  return sanitized;
}

export function sanitizeData<T>(input: T): T {
  if (typeof input === 'string') {
    return sanitizeString(input) as unknown as T;
  }
  if (Array.isArray(input)) {
    return input.map((item) => sanitizeData(item)) as unknown as T;
  }
  if (input !== null && typeof input === 'object') {
    const sanitizedObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(input)) {
      sanitizedObj[key] = sanitizeData(value);
    }
    return sanitizedObj as T;
  }
  return input;
}

// ----------------------------------------------------
// 4. Rate Limiting System
// ----------------------------------------------------
const memoryRateLimitCache = new Map<string, number[]>();

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const ip = forwardedFor.split(',')[0].trim();
    if (ip) return ip;
  }
  return '127.0.0.1';
}

export async function checkRateLimit(
  ip: string,
  route: string,
  limit: number,
  windowSeconds: number,
): Promise<{ allowed: boolean; remaining: number; reset: number }> {
  const key = `rate_limit:${ip}:${route}`;
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - windowSeconds;

  // Try Redis first
  if (redis && redis.status === 'ready') {
    try {
      const multi = redis.multi();
      multi.zremrangebyscore(key, 0, windowStart);
      multi.zadd(key, now, `${now}-${Math.random()}`);
      multi.zcard(key);
      multi.zrange(key, 0, 0, 'WITHSCORES');
      multi.expire(key, windowSeconds);

      const results = await multi.exec();
      if (results) {
        const count = results[2][1] as number;
        const oldestScore = results[3][1] as string[];
        const oldestTime =
          oldestScore && oldestScore[1] ? parseInt(oldestScore[1], 10) : now;

        const allowed = count <= limit;
        const remaining = Math.max(0, limit - count);
        const reset = oldestTime + windowSeconds;
        return { allowed, remaining, reset };
      }
    } catch (error) {
      console.error(
        '[Rate Limiter]: Redis rate limiting error, falling back to memory',
        error,
      );
    }
  }

  // Memory Fallback
  const keyMem = `${ip}:${route}`;
  let timestamps = memoryRateLimitCache.get(keyMem) || [];
  timestamps = timestamps.filter((t) => t > windowStart);
  timestamps.push(now);
  memoryRateLimitCache.set(keyMem, timestamps);

  const count = timestamps.length;
  const allowed = count <= limit;
  const remaining = Math.max(0, limit - count);
  const reset = (timestamps[0] || now) + windowSeconds;
  return { allowed, remaining, reset };
}
