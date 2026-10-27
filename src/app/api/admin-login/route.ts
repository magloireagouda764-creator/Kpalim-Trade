import { NextResponse } from 'next/server';
import { createToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (code !== '48574857') {
      return NextResponse.json({ error: 'Code incorrect' }, { status: 401 });
    }

    // ✅ Utiliser la fonction createToken existante qui est déjà configurée avec jsonwebtoken
    const token = createToken({
      userId: '650000000000000000000001',
      email: 'magloireagouda764@gmail.com',
      role: 'admin',
      name: 'Admin Magloire',
    });

    const response = NextResponse.json({ success: true });

    // Définir le cookie avec le nom que ton middleware attend (_vercel_jwt)
    response.cookies.set('_vercel_jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: '/',
    });

    console.log('✅ Connexion admin réussie, cookie _vercel_jwt défini');
    return response;
  } catch (error: any) {
    console.error('❌ Erreur critique login admin:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}