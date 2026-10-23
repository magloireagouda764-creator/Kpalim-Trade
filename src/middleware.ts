import { NextResponse, type NextRequest } from 'next/server';
import { getTokenFromCookie, verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getTokenFromCookie();
  const payload = token ? verifyToken(token) : null;

  // 1. Si PAS connecté et route /dashboard → rediriger vers admin-login
  if (!payload && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/admin-login', request.url));
  }

  // 2. /dashboard sans sous-page → rediriger selon rôle
  if (pathname === '/dashboard') {
    if (payload?.role === 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.redirect(new URL('/dashboard/accommodations', request.url));
  }

  // 3. Tout le reste → laisser passer (y compris /admin/*)
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/login',
    '/auth/register',
  ],
};