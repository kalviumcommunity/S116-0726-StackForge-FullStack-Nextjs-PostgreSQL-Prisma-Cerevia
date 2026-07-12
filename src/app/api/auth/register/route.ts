import { prisma } from '@/lib/prisma';
import { registerSchema } from '@/lib/validation/auth';
import { withApiHandler, successResponse } from '@/lib/api-response';
import { ConflictError } from '@/lib/errors';
import bcryptjs from 'bcryptjs';

export const POST = withApiHandler(async (request: Request) => {
  const body = await request.json().catch(() => ({}));

  // 1. Validate request body with Zod
  const { email, password, fullName, avatar } = registerSchema.parse(body);

  // 2. Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (existingUser) {
    throw new ConflictError('Email is already registered');
  }

  // 3. Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcryptjs.hash(password, saltRounds);

  // 4. Create the new user
  const newUser = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      password: hashedPassword,
      fullName,
      avatar: avatar || null,
    },
  });

  // 5. Exclude password hash from response
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = newUser;

  return successResponse(
    'User registered successfully',
    userWithoutPassword,
    201,
  );
});
