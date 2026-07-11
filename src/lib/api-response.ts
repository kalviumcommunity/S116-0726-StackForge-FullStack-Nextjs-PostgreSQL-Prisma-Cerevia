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

export interface StandardSuccessResponse<T = any> {
  success: true;
  message: string;
  data?: T;
}

export interface StandardErrorResponse {
  success: false;
  message: string;
  errorCode: string;
  details?: any;
}

/**
 * Standardized success response builder.
 */
export function successResponse<T = any>(
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
  details?: any,
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
export function handleGlobalError(error: any): NextResponse {
  // Log server-side error for debugging (avoiding exposure of internal details to client)
  console.error('[API Error Logger]:', error);

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
    // Unique constraint violation (e.g. email already exists)
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
 * A higher-order function to wrap route handlers, providing global error handling.
 */
export function withApiHandler(
  handler: (request: Request, context: any) => Promise<NextResponse>,
) {
  return async (request: Request, context: any) => {
    try {
      return await handler(request, context);
    } catch (error) {
      return handleGlobalError(error);
    }
  };
}
