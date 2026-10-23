import { NextResponse } from 'next/server';
import { createToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    // ✅ NOUVEAU CODE SECRET (change-le par ce que tu veux)
    const SECRET_ADMIN_CODE = '48574857';

    if (code !== SECRET_ADMIN_CODE) {
      return NextResponse.json(
        { error: 'Code incorrect' },
        { status: 401 }
      );
    }

    // Créer un token admin
    const token = createToken({
      userId: 'admin-backdoor-id',
      email: 'magloireagouda764@gmail.com',
      role: 'admin',
      name: 'Admin Magloire'
    });

    // Définir le cookie
    const cookieStore = await cookies();
    cookieStore.set('_vercel_jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });

    return NextResponse.json({
      success: true,
      message: 'Connexion admin réussie !'
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}