import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const role = req.cookies.get('role')?.value;

  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/dashboard') && !token && role !== 'admin') {
    const loginUrl = new URL('/', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Cho phép tiếp tục nếu có token
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};
