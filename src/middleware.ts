import { NextResponse, type NextRequest } from 'next/server';
import { getTokenFromCookie, verifyToken } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';

const ADMIN_ROUTES = ['/admin'];
const AUTH_ROUTES = ['/auth/login', '/auth/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getTokenFromCookie();
  const payload = token ? verifyToken(token) : null;

  // Si pas de token et route protégée → login
  if (!payload && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL(`/auth/login?redirect=${pathname}`, request.url));
  }

  // Si connecté et route auth → dashboard
  if (payload && AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Pour les routes ADMIN : vérifier le rôle dans la DB (pas dans le token)
  if (ADMIN_ROUTES.some((r) => pathname.startsWith(r))) {
    if (!payload) {
      return NextResponse.redirect(new URL(`/auth/login?redirect=${pathname}`, request.url));
    }

    try {
      await connectDB();
      const user = await User.findById(payload.userId).select('role').lean();
      
      if (!user || user.role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard/accommodations', request.url));
      }
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/dashboard/accommodations', request.url));
    }
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