import { NextResponse, type NextRequest } from 'next/server';
import { getTokenFromCookie, verifyToken } from '@/lib/auth';

const AUTH_ROUTES = ['/auth/login', '/auth/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getTokenFromCookie();
  const payload = token ? verifyToken(token) : null;

  // 1. Si pas de token et route protégée → rediriger vers admin-login
  if (!payload && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL('/admin-login', request.url));
  }

  // 2. Si connecté et essaie d'aller sur login/register → rediriger selon rôle
  if (payload && AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    if (payload.role === 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.redirect(new URL('/dashboard/accommodations', request.url));
  }

  // 3. Routes ADMIN : laisser passer si admin
  if (pathname.startsWith('/admin')) {
    if (!payload || payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
    return NextResponse.next();
  }

  // 4. /dashboard sans sous-page → rediriger selon rôle
  if (pathname === '/dashboard') {
    if (payload?.role === 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.redirect(new URL('/dashboard/accommodations', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/auth/login',
    '/auth/register',
  ],
};