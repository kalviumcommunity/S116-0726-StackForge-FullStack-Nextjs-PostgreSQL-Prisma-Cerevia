import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protect these routes: must be authenticated
const PROTECTED_PREFIXES = [
  '/dashboard',
  '/lessons',
  '/leaderboard',
  '/profile',
  '/settings',
  '/xp'
];

// Authenticating routes: must NOT be logged in to visit
const AUTH_ROUTES = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const isProtectedRoute = PROTECTED_PREFIXES.some(prefix => 
    pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  // 1. If trying to access protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    // Optionally preserve the destination URL for post-login redirect
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. If logged in and visiting login/register, redirect to dashboard
  if (isAuthRoute && token) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Let request proceed normally
  return NextResponse.next();
}

// Optimization: only match dashboard pages and login/register
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/lessons/:path*',
    '/leaderboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/xp/:path*',
    '/login',
    '/register',
  ],
};
