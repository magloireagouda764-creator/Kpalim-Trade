import { NextResponse, type NextRequest } from 'next/server';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';

const CLIENT_ROUTES = ['/dashboard', '/orders', '/profile', '/addresses', '/favorites', '/notifications'];
const VENDOR_ROUTES = ['/vendor'];
const ADMIN_ROUTES = ['/admin'];
const AUTH_ROUTES = ['/auth/login', '/auth/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
     const token = await getTokenFromCookie();
  const payload = token ? await verifyToken(token) : null;

  if (payload && AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (CLIENT_ROUTES.some((r) => pathname.startsWith(r)) && !payload) {
    return NextResponse.redirect(new URL(`/auth/login?redirect=${pathname}`, request.url));
  }

  if (VENDOR_ROUTES.some((r) => pathname.startsWith(r))) {
    if (!payload) return NextResponse.redirect(new URL(`/auth/login?redirect=${pathname}`, request.url));
    if (payload.role !== 'vendor' && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  if (ADMIN_ROUTES.some((r) => pathname.startsWith(r))) {
    if (!payload) return NextResponse.redirect(new URL(`/auth/login?redirect=${pathname}`, request.url));
    if (payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/orders/:path*',
    '/profile/:path*',
    '/addresses/:path*',
    '/favorites/:path*',
    '/notifications/:path*',
    '/vendor/:path*',
    '/admin/:path*',
    '/auth/login',
    '/auth/register',
  ],
};