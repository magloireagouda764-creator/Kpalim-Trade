import { NextResponse } from 'next/server';
import { createToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (code !== '48574857') {
      return NextResponse.json({ error: 'Code incorrect' }, { status: 401 });
    }

    // ✅ On attend maintenant que le token soit créé
    const token = await createToken({
      userId: '650000000000000000000001',
      email: 'magloireagouda764@gmail.com',
      role: 'admin',
      name: 'Admin Magloire',
    });

    const response = NextResponse.json({ success: true });

    response.cookies.set('_vercel_jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    console.log('✅ Connexion admin réussie, cookie défini');
    return response;
  } catch (error: any) {
    console.error('Erreur login admin:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}