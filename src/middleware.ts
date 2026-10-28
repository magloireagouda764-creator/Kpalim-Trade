import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Lire le cookie directement depuis la requête
  const token = request.cookies.get('kpalime_token')?.value;
  const isAuthenticated = !!token;

  // 2. Routes publiques (laisser passer tout le monde)
  if (pathname === '/' || pathname.startsWith('/api') || pathname.startsWith('/propose')) {
    return NextResponse.next();
  }

  // 3. Si PAS connecté et route protégée → rediriger vers admin-login
  if (!isAuthenticated && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL('/admin-login', request.url));
  }

  // 4. Si connecté, on laisse passer (la vérification du rôle est gérée dans les pages)
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
  ],
};