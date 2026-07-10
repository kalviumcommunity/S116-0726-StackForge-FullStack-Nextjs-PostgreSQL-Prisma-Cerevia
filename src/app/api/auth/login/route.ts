import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { loginSchema } from '@/lib/validation/auth';
import { signAccessToken } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    // 1. Validate request body with Zod
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { email, password } = validationResult.data;

    // 2. Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 },
      );
    }

    // 3. Verify password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 },
      );
    }

    // 4. Generate access token
    const token = signAccessToken({
      userId: user.id,
      email: user.email,
    });

    // 5. Exclude password hash from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        user: userWithoutPassword,
        token,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
