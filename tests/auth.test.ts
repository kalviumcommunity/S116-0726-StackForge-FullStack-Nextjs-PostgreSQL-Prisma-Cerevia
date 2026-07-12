import { prisma } from '../src/lib/prisma';
import { signAccessToken, verifyAccessToken } from '../src/lib/jwt';
import { authenticateRequest } from '../src/lib/middleware/auth';
import { AuthenticationError } from '../src/lib/errors';
import bcrypt from 'bcryptjs';

async function runAuthTests() {
  console.log('🧪 Starting Authentication Integration Tests...');
  const testEmail = `tester-auth-${Date.now()}@cerevia.com`;
  const testPassword = 'SecurePassword123!';
  const testFullName = 'Auth Tester';
  let createdUserId: string | null = null;

  try {
    // 1. Test registration functionality
    console.log('- Testing User Registration & Password Hashing...');
    const existing = await prisma.user.findUnique({
      where: { email: testEmail },
    });
    if (existing) {
      throw new Error('Test isolation failed: User already exists');
    }

    const hashedPassword = await bcrypt.hash(testPassword, 10);
    const user = await prisma.user.create({
      data: {
        email: testEmail,
        password: hashedPassword,
        fullName: testFullName,
      },
    });
    createdUserId = user.id;
    console.log('✅ User registered successfully in DB.');

    // 2. Test duplicate registration (Conflict)
    console.log('- Testing Duplicate User Registration (Conflict)...');
    try {
      await prisma.user.create({
        data: {
          email: testEmail,
          password: hashedPassword,
          fullName: testFullName,
        },
      });
      throw new Error(
        'Expected duplicate email creation to fail but it succeeded',
      );
    } catch (err: any) {
      if (err.code !== 'P2002') {
        throw err;
      }
      console.log(
        '✅ Duplicate registration throws database unique conflict error as expected.',
      );
    }

    // 3. Test user login validation
    console.log('- Testing User Login Credential Matching...');
    const userFetch = await prisma.user.findUnique({
      where: { email: testEmail },
    });
    if (!userFetch) {
      throw new Error('User not found');
    }

    // Correct password
    const isPassMatch = await bcrypt.compare(testPassword, userFetch.password);
    if (!isPassMatch) {
      throw new Error('Expected password compare to match, but it failed');
    }
    console.log('✅ Valid credentials match successfully.');

    // Incorrect password
    const isBadPassMatch = await bcrypt.compare(
      'WrongPassword',
      userFetch.password,
    );
    if (isBadPassMatch) {
      throw new Error(
        'Expected incorrect password comparison to fail, but it succeeded',
      );
    }
    console.log('✅ Invalid password fails correctly.');

    // 4. Test JWT Sign & Verification
    console.log('- Testing JWT sign and verification...');
    const token = signAccessToken({
      userId: userFetch.id,
      email: userFetch.email,
    });
    if (!token) {
      throw new Error('Failed to generate JWT access token');
    }

    const decoded = verifyAccessToken(token);
    if (decoded.userId !== userFetch.id || decoded.email !== userFetch.email) {
      throw new Error('Decoded JWT payload mismatch');
    }
    console.log('✅ JWT signature and payload verification passed.');

    // Test tampered JWT token rejection
    console.log('- Testing JWT signature tampering detection...');
    const tamperedToken = token.substring(0, token.length - 5) + 'xxxxx';
    try {
      verifyAccessToken(tamperedToken);
      throw new Error(
        'Expected tampered token to fail verification but it succeeded',
      );
    } catch (err: any) {
      if (!err.message.includes('Invalid token')) {
        throw err;
      }
      console.log('✅ Tampered signature rejected successfully.');
    }

    // 5. Test authenticateRequest middleware logic
    console.log('- Testing authenticateRequest middleware...');

    // Valid Authorization header
    const mockRequestOk = new Request('http://localhost/api/streak', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const authenticatedUser = await authenticateRequest(mockRequestOk);
    if (authenticatedUser.id !== userFetch.id) {
      throw new Error('Middleware failed to identify authenticated user');
    }
    console.log('✅ authenticateRequest succeeds with a valid JWT.');

    // Unauthorized - Missing Authorization header
    const mockRequestNoAuth = new Request('http://localhost/api/streak');
    try {
      await authenticateRequest(mockRequestNoAuth);
      throw new Error(
        'Expected missing auth header to throw AuthenticationError but it succeeded',
      );
    } catch (err: any) {
      if (
        !(err instanceof AuthenticationError) ||
        !err.message.includes('Missing')
      ) {
        throw err;
      }
      console.log('✅ authenticateRequest rejects missing tokens.');
    }

    // Unauthorized - Invalid token format
    const mockRequestBadFormat = new Request('http://localhost/api/streak', {
      headers: { Authorization: `Token ${token}` },
    });
    try {
      await authenticateRequest(mockRequestBadFormat);
      throw new Error(
        'Expected bad auth header format to throw but it succeeded',
      );
    } catch (err: any) {
      if (
        !(err instanceof AuthenticationError) ||
        !err.message.includes('format')
      ) {
        throw err;
      }
      console.log(
        '✅ authenticateRequest rejects invalid header prefix format.',
      );
    }
  } catch (error) {
    console.error('❌ Authentication tests failed:', error);
    process.exit(1);
  } finally {
    // Cleanup
    if (createdUserId) {
      await prisma.user.delete({ where: { id: createdUserId } });
      console.log('- Cleaned up temporary test user.');
    }
    await prisma.$disconnect();
  }

  console.log(
    '🎉 All Authentication Integration Tests Passed Successfully! ✅',
  );
  process.exit(0);
}

runAuthTests();
