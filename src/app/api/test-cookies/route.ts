import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  
  return NextResponse.json({
    message: 'Test des cookies',
    cookies: allCookies.map(c => ({ name: c.name, value: c.value.substring(0, 30) + '...' })),
    vercel_jwt: cookieStore.get('_vercel_jwt')?.value ? 'PRÉSENT' : 'ABSENT'
  });
}