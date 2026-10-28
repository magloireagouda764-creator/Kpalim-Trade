import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Lire le cookie directement depuis la requête (100% compatible Edge Runtime)
  const token = request.cookies.get('kpalime_token')?.value;
  const isAuthenticated = !!token;

  // 2. Si déjà connecté et qu'il essaie d'aller sur la page de login → rediriger vers le dashboard
  if (isAuthenticated && pathname === '/admin-login') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // 3. Routes publiques (laisser passer tout le monde)
  if (pathname === '/' || pathname.startsWith('/api') || pathname.startsWith('/propose')) {
    return NextResponse.next();
  }

  // 4. Si PAS connecté et route protégée → rediriger vers admin-login
  if (!isAuthenticated && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL('/admin-login', request.url));
  }

  // 5. Si connecté, on laisse passer. 
  // La vérification du rôle (admin) est gérée dans les Server Components (page.tsx)
  // où jsonwebtoken fonctionne sans problème.
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/admin-login',
  ],
};