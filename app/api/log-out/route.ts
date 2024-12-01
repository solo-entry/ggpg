import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json(
    { message: 'Logged out successfully' },
    { status: 200 }
  );

  // Xóa token cookie
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(0)
  });
  response.cookies.set('role', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(0)
  });
  return response;
}
