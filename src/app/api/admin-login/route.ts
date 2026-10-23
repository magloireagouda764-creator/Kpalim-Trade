import { NextResponse } from 'next/server';
import { createToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    const SECRET_ADMIN_CODE = '48574857';

    if (code !== SECRET_ADMIN_CODE) {
      return NextResponse.json({ error: 'Code incorrect' }, { status: 401 });
    }

    // ✅ CORRECTION : Utiliser un faux ObjectId valide (24 caractères hex) pour éviter le crash Mongoose
    const token = createToken({
      userId: '650000000000000000000001', 
      email: 'magloireagouda764@gmail.com',
      role: 'admin',
      name: 'Admin Magloire'
    });

    const cookieStore = await cookies();
    cookieStore.set('_vercel_jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });

    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    
  } catch (error: any) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}