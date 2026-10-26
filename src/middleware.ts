import { NextResponse, type NextRequest } from 'next/server';
import { getTokenFromCookie, verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ EXCLUSION : Ne jamais intercepter les routes /api
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // ✅ EXCLUSION : Ne jamais intercepter les pages publiques
  const publicRoutes = [
    '/admin-login',
    '/auth/login',
    '/auth/register',
    '/professional-space',
    '/propose',
    '/discover',
    '/marketplace',
    '/services',
    '/restaurants',
    '/hotels',
    '/',
  ];

  for (const route of publicRoutes) {
    if (pathname === route || pathname.startsWith(route + '/')) {
      return NextResponse.next();
    }
  }

  // Maintenant on peut vérifier le token en toute sécurité
  const token = await getTokenFromCookie();
  const payload = token ? await verifyToken(token) : null;

  // 1. Protection des routes /dashboard (Espace Propriétaire)
  if (!payload && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/admin-login', request.url));
  }

  // 2. Gestion de la racine /dashboard
  if (pathname === '/dashboard') {
    if (payload?.role === 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.redirect(new URL('/dashboard/accommodations', request.url));
  }

  // 3. Protection des routes /admin (Réservé aux admins)
  if (pathname.startsWith('/admin')) {
    if (!payload || payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/:path*',
    '/auth/login',
    '/auth/register',
  ],
};