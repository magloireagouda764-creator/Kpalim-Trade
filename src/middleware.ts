import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🚨 TEMPORAIRE : DÉSACTIVATION TOTALE DE LA PROTECTION ADMIN
  // On laisse TOUT passer pour voir si la page s'affiche enfin
  if (pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};