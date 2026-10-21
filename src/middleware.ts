import { NextResponse, type NextRequest } from 'next/server';
import { getTokenFromCookie, verifyToken } from '@/lib/auth';

const ADMIN_ROUTES = ['/admin'];
const AUTH_ROUTES = ['/auth/login', '/auth/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getTokenFromCookie();
  const payload = token ? verifyToken(token) : null;

  // 1. Si pas de token et route protégée → rediriger vers login
  if (!payload && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL(`/auth/login?redirect=${pathname}`, request.url));
  }

  // 2. Si déjà connecté et essaie d'aller sur login/register → rediriger vers dashboard
  if (payload && AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 3. Pour les routes ADMIN : vérifier que le rôle dans le token est 'admin'
  if (ADMIN_ROUTES.some((r) => pathname.startsWith(r))) {
    if (!payload || payload.role !== 'admin') {
      // Pas admin → rediriger vers l'espace propriétaire
      return NextResponse.redirect(new URL('/dashboard/accommodations', request.url));
    }
    // Est admin → laisser passer
    return NextResponse.next();
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