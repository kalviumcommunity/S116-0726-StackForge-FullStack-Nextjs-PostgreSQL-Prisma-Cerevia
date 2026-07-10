import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { registerSchema } from '@/lib/validation/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    // 1. Validate request body with Zod
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { email, password, fullName, avatar } = validationResult.data;

    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email is already registered' },
        { status: 409 }, // 409 Conflict is standard for duplicate resources
      );
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

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
