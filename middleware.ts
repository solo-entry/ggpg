import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const allowedPathsForRoles: Record<string, string[]> = {
  admin: [
    '/dashboard',
    '/dashboard/projects',
    '/dashboard/accounts',
    '/dashboard/comments',
    '/dashboard/categories',
    '/dashboard/settings',
    '/dashboard/change-password'
  ],
  user: ['/dashboard/settings', '/dashboard/change-password', '/dashboard']
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const role = req.cookies.get('role')?.value;

  const { pathname } = req.nextUrl;

  // If no token or role is found, redirect to login
  if (!token || !role) {
    const loginUrl = new URL('/auth/sign-in', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Check for dashboard path
  if (pathname.startsWith('/dashboard')) {
    const allowedPaths = allowedPathsForRoles[role] || [];
    const isAllowed = allowedPaths.some((path) => pathname.startsWith(path));

    // Redirect to 403 if user is not authorized
    if (!isAllowed) {
      const forbiddenUrl = new URL('/403', req.url);
      return NextResponse.redirect(forbiddenUrl);
    }
  }

  // Proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};
