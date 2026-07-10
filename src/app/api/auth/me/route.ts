import { NextResponse } from 'next/server';
import { authenticateRequest, handleAuthError } from '@/lib/middleware/auth';

export async function GET(request: Request) {
  try {
    // Authenticate the request
    const user = await authenticateRequest(request);

    // Return authenticated user details
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    const { error: message, status } = handleAuthError(error);
    return NextResponse.json({ error: message }, { status });
  }
}
