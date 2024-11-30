// app/api/gen/route.ts
import { NextResponse } from 'next/server';
import nookies from 'nookies';
import { fetcher } from '@/service/fetcher';

export async function POST(req: Request) {
  // Get the token from cookies
  const cookies = nookies.get();
  const token = cookies.token || '';
  const body = await req.json();
  const endpoint = body.endpoint;
  if (!endpoint) {
    return NextResponse.json(
      { message: 'Endpoint is required' },
      { status: 400 }
    );
  }
  try {
    const data = await fetcher(token, { method: 'GET' }, endpoint);

    // Return the fetched gen as JSON response
    return NextResponse.json(data);
  } catch (error) {
    // If error occurs, send error response
    return NextResponse.json(
      { message: 'Failed to fetch gen' },
      { status: 500 }
    );
  }
}
