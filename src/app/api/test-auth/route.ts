import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('_vercel_jwt')?.value;
  
  return NextResponse.json({
    message: 'Test de diagnostic',
    tokenPresent: !!token,
    tokenPreview: token ? token.substring(0, 50) + '...' : 'ABSENT',
    allCookies: cookieStore.getAll().map(c => ({ 
      name: c.name, 
      hasValue: !!c.value 
    }))
  });
}