import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import {
  successResponse,
  errorResponse,
  handleGlobalError,
  withApiHandler,
} from '../src/lib/api-response';
import {
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  InternalServerError,
} from '../src/lib/errors';

async function runErrorHandlerTests() {
  console.log('🧪 Starting Global Error Handling & API Standardization Tests...');

  try {
    // ----------------------------------------------------
    // Test 1: Standard Success Response format
    // ----------------------------------------------------
    console.log('- Testing successResponse helper...');
    const successRes = successResponse('Profile updated', { id: 'user-1' }, 200);
    const successData = await successRes.json();
    if (
      successRes.status !== 200 ||
      successData.success !== true ||
      successData.message !== 'Profile updated' ||
      successData.data.id !== 'user-1'
    ) {
      throw new Error(`Invalid successResponse mapping: ${JSON.stringify(successData)}`);
    }
    console.log('✅ successResponse helper verified.');

    // ----------------------------------------------------
    // Test 2: Standard Error Response format
    // ----------------------------------------------------
    console.log('- Testing errorResponse helper...');
    const errorRes = errorResponse('Invalid input', 'BAD_REQUEST', 400, { field: 'email' });
    const errorData = await errorRes.json();
    if (
      errorRes.status !== 400 ||
      errorData.success !== false ||
      errorData.message !== 'Invalid input' ||
      errorData.errorCode !== 'BAD_REQUEST' ||
      errorData.details.field !== 'email'
    ) {
      throw new Error(`Invalid errorResponse mapping: ${JSON.stringify(errorData)}`);
    }
    console.log('✅ errorResponse helper verified.');

    // ----------------------------------------------------
    // Test 3: Custom Error Class handling
    // ----------------------------------------------------
    console.log('- Testing Custom Error class global handling...');

    // ValidationError
    const valErrRes = handleGlobalError(new ValidationError('Bad parameter', { param: 'id' }));
    const valErrData = await valErrRes.json();
    if (valErrRes.status !== 400 || valErrData.errorCode !== 'VALIDATION_ERROR' || valErrData.details.param !== 'id') {
      throw new Error(`ValidationError failed: ${JSON.stringify(valErrData)}`);
    }

    // AuthenticationError
    const authErrRes = handleGlobalError(new AuthenticationError('Expired token'));
    const authErrData = await authErrRes.json();
    if (authErrRes.status !== 401 || authErrData.errorCode !== 'UNAUTHORIZED') {
      throw new Error(`AuthenticationError failed: ${JSON.stringify(authErrData)}`);
    }

    // AuthorizationError
    const azErrRes = handleGlobalError(new AuthorizationError());
    const azErrData = await azErrRes.json();
    if (azErrRes.status !== 403 || azErrData.errorCode !== 'FORBIDDEN') {
      throw new Error(`AuthorizationError failed: ${JSON.stringify(azErrData)}`);
    }

    // NotFoundError
    const nfErrRes = handleGlobalError(new NotFoundError('Lesson not found'));
    const nfErrData = await nfErrRes.json();
    if (nfErrRes.status !== 404 || nfErrData.errorCode !== 'NOT_FOUND') {
      throw new Error(`NotFoundError failed: ${JSON.stringify(nfErrData)}`);
    }

    // ConflictError
    const cfErrRes = handleGlobalError(new ConflictError('Already exists'));
    const cfErrData = await cfErrRes.json();
    if (cfErrRes.status !== 409 || cfErrData.errorCode !== 'CONFLICT') {
      throw new Error(`ConflictError failed: ${JSON.stringify(cfErrData)}`);
    }

    // InternalServerError
    const iseErrRes = handleGlobalError(new InternalServerError());
    const iseErrData = await iseErrRes.json();
    if (iseErrRes.status !== 500 || iseErrData.errorCode !== 'INTERNAL_SERVER_ERROR') {
      throw new Error(`InternalServerError failed: ${JSON.stringify(iseErrData)}`);
    }

    console.log('✅ Custom Error mapping verified.');

    // ----------------------------------------------------
    // Test 4: Zod Error handling mapping
    // ----------------------------------------------------
    console.log('- Testing ZodError global handling & translation...');
    const dummyZodError = new ZodError([
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'number',
        path: ['user', 'email'],
        message: 'Expected string, received number',
      } as any,
    ]);
    const zodErrRes = handleGlobalError(dummyZodError);
    const zodErrData = await zodErrRes.json();
    if (
      zodErrRes.status !== 400 ||
      zodErrData.errorCode !== 'VALIDATION_ERROR' ||
      zodErrData.message !== 'Validation failed' ||
      !Array.isArray(zodErrData.details) ||
      zodErrData.details[0].path !== 'user.email'
    ) {
      throw new Error(`ZodError translation failed: ${JSON.stringify(zodErrData)}`);
    }
    console.log('✅ ZodError mapping verified.');

    // ----------------------------------------------------
    // Test 5: Prisma Database Error handling mapping
    // ----------------------------------------------------
    console.log('- Testing Prisma Database Error handling...');

    // Unique Constraint violation (P2002)
    const prismaP2002 = new Prisma.PrismaClientKnownRequestError('Dup record', {
      code: 'P2002',
      clientVersion: '5.22.0',
    });
    const p2002Res = handleGlobalError(prismaP2002);
    const p2002Data = await p2002Res.json();
    if (p2002Res.status !== 409 || p2002Data.errorCode !== 'CONFLICT') {
      throw new Error(`Prisma P2002 failed: ${JSON.stringify(p2002Data)}`);
    }

    // Record Not Found violation (P2025)
    const prismaP2025 = new Prisma.PrismaClientKnownRequestError('Missing record', {
      code: 'P2025',
      clientVersion: '5.22.0',
    });
    const p2025Res = handleGlobalError(prismaP2025);
    const p2025Data = await p2025Res.json();
    if (p2025Res.status !== 404 || p2025Data.errorCode !== 'NOT_FOUND') {
      throw new Error(`Prisma P2025 failed: ${JSON.stringify(p2025Data)}`);
    }

    console.log('✅ Prisma Database Error mapping verified.');

    // ----------------------------------------------------
    // Test 6: Higher-Order Handler Wrapper withApiHandler
    // ----------------------------------------------------
    console.log('- Testing withApiHandler wrapper behavior...');

    // Success path
    const successHandler = withApiHandler(async () => {
      return successResponse('OK');
    });
    const wrapSuccessRes = await successHandler({} as Request, {});
    const wrapSuccessData = await wrapSuccessRes.json();
    if (wrapSuccessRes.status !== 200 || wrapSuccessData.success !== true) {
      throw new Error(`withApiHandler success path failed: ${JSON.stringify(wrapSuccessData)}`);
    }

    // Error path throwing Custom Error
    const errorHandler = withApiHandler(async () => {
      throw new AuthenticationError('Invalid credentials');
    });
    const wrapErrorRes = await errorHandler({} as Request, {});
    const wrapErrorData = await wrapErrorRes.json();
    if (wrapErrorRes.status !== 401 || wrapErrorData.errorCode !== 'UNAUTHORIZED') {
      throw new Error(`withApiHandler error path failed: ${JSON.stringify(wrapErrorData)}`);
    }

    console.log('✅ withApiHandler wrapper verified.');

  } catch (error) {
    console.error('❌ Error handler test failed:', error);
    process.exit(1);
  }

  console.log('🎉 Global Error Handling & API Standardization Tests Passed Successfully! ✅');
}

runErrorHandlerTests();
