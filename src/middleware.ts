import { NextResponse, type NextRequest } from 'next/server';
import { getTokenFromCookie, verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getTokenFromCookie();
  const payload = token ? verifyToken(token) : null;

  // 1. Routes publiques (laisser passer tout le monde)
  if (pathname === '/' || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // 2. Si PAS connecté et route protégée → rediriger vers admin-login
  if (!payload && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL('/admin-login', request.url));
  }

  // 3. Si connecté et admin → laisser accéder à /admin/*
  if (pathname.startsWith('/admin') && payload?.role === 'admin') {
    return NextResponse.next();
  }

  // 4. Si connecté mais PAS admin → bloquer l'accès admin
  if (pathname.startsWith('/admin') && payload?.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 5. /dashboard sans sous-page → rediriger selon rôle
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