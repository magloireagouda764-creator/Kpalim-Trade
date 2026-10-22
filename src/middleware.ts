import { NextResponse, type NextRequest } from 'next/server';
import { getTokenFromCookie, verifyToken } from '@/lib/auth';

const ADMIN_ROUTES = ['/admin'];
const AUTH_ROUTES = ['/auth/login', '/auth/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getTokenFromCookie();
  const payload = token ? verifyToken(token) : null;

  // ✅ EXCEPTION : laisser passer la page force-admin sans redirection
  if (pathname.startsWith('/force-admin')) {
    return NextResponse.next();
  }

  // 1. Si pas de token et route protégée → login
  if (!payload && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL(`/auth/login?redirect=${pathname}`, request.url));
  }

  // 2. Si connecté et route auth → dashboard selon rôle
  if (payload && AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    if (payload.role === 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.redirect(new URL('/dashboard/accommodations', request.url));
  }

  // 3. Routes ADMIN : vérifier le rôle
  if (ADMIN_ROUTES.some((r) => pathname.startsWith(r))) {
    if (!payload || payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/force-admin', request.url));
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
    '/force-admin',
  ],
};