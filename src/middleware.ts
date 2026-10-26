import { NextResponse, type NextRequest } from 'next/server';
import { getTokenFromCookie, verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getTokenFromCookie();
  const payload = token ? await verifyToken(token) : null;

  // 1. Protection des routes /dashboard (Espace Propriétaire)
  // Si l'utilisateur n'est pas connecté, on le redirige vers la connexion
  if (!payload && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/admin-login', request.url));
  }

  // 2. Gestion de la racine /dashboard
  // On dirige chacun vers son espace dédié selon son rôle
  if (pathname === '/dashboard') {
    if (payload?.role === 'admin') {
      // L'admin va vers son tableau de bord de contrôle global
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    // Les propriétaires/vendeurs vont vers leur espace personnel
    return NextResponse.redirect(new URL('/dashboard/accommodations', request.url));
  }

  // 3. Protection des routes /admin (Réservé strictement aux admins)
  if (pathname.startsWith('/admin')) {
    if (!payload || payload.role !== 'admin') {
      // Si un non-admin essaie d'accéder à l'admin, on le rejette
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
  }

  // 4. Tout le reste (pages publiques comme /professional-space, /propose, etc.) → laisser passer
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