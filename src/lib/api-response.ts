import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import {
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  InternalServerError,
} from './errors';
import { logger } from './logger';
import {
  applyHelmet,
  applyCors,
  sanitizeData,
  checkRateLimit,
  getClientIp,
} from './security';

export interface StandardSuccessResponse<T = unknown> {
  success: true;
  message: string;
  data?: T;
}

export interface StandardErrorResponse {
  success: false;
  message: string;
  errorCode: string;
  details?: unknown;
}

/**
 * Standardized success response builder.
 */
export function successResponse<T = unknown>(
  message: string,
  data?: T,
  statusCode: number = 200,
): NextResponse {
  const body: StandardSuccessResponse<T> = {
    success: true,
    message,
    data,
  };
  return NextResponse.json(body, { status: statusCode });
}

/**
 * Standardized error response builder.
 */
export function errorResponse(
  message: string,
  errorCode: string,
  statusCode: number,
  details?: unknown,
): NextResponse {
  const body: StandardErrorResponse = {
    success: false,
    message,
    errorCode,
    details,
  };
  return NextResponse.json(body, { status: statusCode });
}

/**
 * Handles errors globally and maps them to standard JSON error responses.
 */
export function handleGlobalError(error: unknown): NextResponse {
  // Log server-side error securely (masking secrets)
  logger.error('Unhandled API exception occurred', error);

  if (error instanceof ValidationError) {
    return errorResponse(
      error.message,
      error.errorCode,
      error.statusCode,
      error.details,
    );
  }

  if (error instanceof AuthenticationError) {
    return errorResponse(error.message, error.errorCode, error.statusCode);
  }

  if (error instanceof AuthorizationError) {
    return errorResponse(error.message, error.errorCode, error.statusCode);
  }

  if (error instanceof NotFoundError) {
    return errorResponse(error.message, error.errorCode, error.statusCode);
  }

  if (error instanceof ConflictError) {
    return errorResponse(error.message, error.errorCode, error.statusCode);
  }

  if (error instanceof InternalServerError) {
    return errorResponse(error.message, error.errorCode, error.statusCode);
  }

  // Handle Zod Validation Errors
  if (error instanceof ZodError) {
    const details = error.issues.map((e) => ({
      path: e.path.join('.'),
      message: e.message,
    }));
    return errorResponse('Validation failed', 'VALIDATION_ERROR', 400, details);
  }

  // Handle Prisma Database Errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (error.code === 'P2002') {
      return errorResponse(
        'A record with this unique identifier already exists',
        'CONFLICT',
        409,
      );
    }
    // Record not found
    if (error.code === 'P2025') {
      return errorResponse('Requested record was not found', 'NOT_FOUND', 404);
    }
    return errorResponse('Database operation failed', 'DATABASE_ERROR', 400);
  }

  // Unknown or generic JavaScript Errors
  const fallbackMessage =
    error instanceof Error ? error.message : 'An unexpected error occurred';
  return errorResponse(fallbackMessage, 'INTERNAL_SERVER_ERROR', 500);
}

/**
 * A higher-order function to wrap route handlers, providing global error handling and security policies.
 */
export function withApiHandler<T = { params: Promise<Record<string, string>> }>(
  handler: (request: Request, context: T) => Promise<NextResponse>,
) {
  return async (request: Request, context: T) => {
    // 1. CORS Preflight Preemption
    if (request.method === 'OPTIONS') {
      const preflightResponse = new NextResponse(null, { status: 204 });
      applyCors(request, preflightResponse);
      return preflightResponse;
    }

    // 2. Rate Limiting Protection
    const { pathname } = new URL(request.url);
    const isAuthLimit =
      pathname.startsWith('/api/auth/login') ||
      pathname.startsWith('/api/auth/register');
    const limit = isAuthLimit ? 5 : 60;
    const windowSeconds = 60;
    const ip = getClientIp(request);

    const rateLimitResult = await checkRateLimit(
      ip,
      pathname,
      limit,
      windowSeconds,
    );
    if (!rateLimitResult.allowed) {
      const limitResponse = errorResponse(
        'Too many requests. Please try again later.',
        'TOO_MANY_REQUESTS',
        429,
      );
      limitResponse.headers.set(
        'Retry-After',
        String(
          Math.max(
            0,
            rateLimitResult.reset - Math.floor(Date.now() / 1000),
          ),
        ),
      );
      limitResponse.headers.set('X-RateLimit-Limit', String(limit));
      limitResponse.headers.set(
        'X-RateLimit-Remaining',
        String(rateLimitResult.remaining),
      );
      limitResponse.headers.set('X-RateLimit-Reset', String(rateLimitResult.reset));

      applyCors(request, limitResponse);
      applyHelmet(limitResponse);
      return limitResponse;
    }

    // 3. Request Sanitization & Malformed JSON validation
    let sanitizedRequest = request;
    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      const contentType = request.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        let bodyText: string;
        try {
          bodyText = await request.clone().text();
        } catch {
          bodyText = '';
        }

        if (bodyText.trim()) {
          try {
            const parsed = JSON.parse(bodyText);
            const sanitized = sanitizeData(parsed);

            sanitizedRequest = new Request(request.url, {
              method: request.method,
              headers: request.headers,
              body: JSON.stringify(sanitized),
            });
          } catch {
            const badRequestResponse = errorResponse(
              'Malformed JSON payload',
              'BAD_REQUEST',
              400,
            );
            applyCors(request, badRequestResponse);
            applyHelmet(badRequestResponse);
            return badRequestResponse;
          }
        }
      }
    }

    // 4. Handler Execution & Response Formatting
    let response: NextResponse;
    try {
      response = await handler(sanitizedRequest, context);
    } catch (error) {
      response = handleGlobalError(error);
    }

    // 5. Apply Outbound Security Headers & CORS policies
    applyCors(request, response);
    applyHelmet(response);
    return response;
  };
}
