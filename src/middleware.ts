import { NextResponse, type NextRequest } from 'next/server';
import { decodeToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Lire le cookie
  const token = request.cookies.get('kpalime_token')?.value;
  const isAuthenticated = !!token;
  
  // 2. Décoder le token pour obtenir le rôle (sans vérification crypto, compatible Edge)
  const payload = token ? decodeToken(token) : null;
  const isAdmin = payload?.role === 'admin';

  // 3. Routes publiques
  if (pathname === '/' || pathname.startsWith('/api') || pathname.startsWith('/propose')) {
    return NextResponse.next();
  }

  // 4. Si PAS connecté et route protégée → rediriger vers admin-login
  if (!isAuthenticated && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL('/admin-login', request.url));
  }

  // 5. ⭐ NOUVEAU : Si admin va sur /dashboard (utilisateur) → rediriger vers /admin/dashboard
  if (isAdmin && pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // 6. Si non-admin essaie d'accéder à /admin → rediriger vers /dashboard
  if (pathname.startsWith('/admin') && !isAdmin) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 7. Sinon, laisser passer
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/admin-login',
  ],
};