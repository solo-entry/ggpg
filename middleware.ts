import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/dashboard') && !token) {
    const loginUrl = new URL('/', req.url);
    return NextResponse.redirect(loginUrl);
  }
  console.log(pathname);

  // Cho phép tiếp tục nếu có token
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};
