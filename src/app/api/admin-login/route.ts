import { NextResponse } from 'next/server';
import { createToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (code !== '48574857') {
      return NextResponse.json({ error: 'Code incorrect' }, { status: 401 });
    }

    // ✅ On crée le token
    const token = await createToken({
      userId: '650000000000000000000001',
      email: 'magloireagouda764@gmail.com',
      role: 'admin',
      name: 'Admin Magloire',
    });

    const response = NextResponse.json({ success: true });

    // ✅ CORRECTION ICI : on utilise 'kpalime_token' au lieu de '_vercel_jwt'
    response.cookies.set('kpalime_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: '/',
    });

    console.log('✅ Connexion admin réussie, cookie kpalime_token défini');
    return response;
  } catch (error: any) {
    console.error('Erreur login admin:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}