import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('_vercel_jwt')?.value;
  
  let payload = null;
  if (token) {
    try {
      payload = await verifyToken(token);
    } catch (error) {
      payload = { error: error.message };
    }
  }
  
  return NextResponse.json({
    tokenPresent: !!token,
    tokenPreview: token ? token.substring(0, 50) + '...' : null,
    payload: payload,
    allCookies: cookieStore.getAll().map(c => ({ name: c.name, hasValue: !!c.value }))
  });
}