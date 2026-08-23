import { NextResponse, type NextRequest } from 'next/server';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';

const PROTECTED_ROUTES = ['/dashboard', '/orders', '/profile', '/addresses', '/favorites', '/notifications'];
const VENDOR_ROUTES = ['/vendor'];
const ADMIN_ROUTES = ['/admin'];
const AUTH_ROUTES = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = getTokenFromCookie(request.headers.get('cookie') || '');
  const payload = token ? await verifyToken(token) : null;

  // Rediriger utilisateur connecté loin des pages auth
  if (payload && AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Protéger routes client
  if (PROTECTED_ROUTES.some((r) => pathname.startsWith(r)) && !payload) {
    return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
  }

  // Protéger routes vendeur
  if (VENDOR_ROUTES.some((r) => pathname.startsWith(r))) {
    if (!payload) return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
    if (payload.role !== 'vendor' && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Protéger routes admin
  if (ADMIN_ROUTES.some((r) => pathname.startsWith(r))) {
    if (!payload) return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
    if (payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/orders/:path*', '/profile/:path*', '/addresses/:path*', '/favorites/:path*', '/notifications/:path*', '/vendor/:path*', '/admin/:path*', '/login', '/register'],
};
