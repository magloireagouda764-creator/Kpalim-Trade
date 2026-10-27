import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (code !== '48574857') {
      return NextResponse.json({ error: 'Code incorrect' }, { status: 401 });
    }

    // Création d'un token simple en base64
    const payload = {
      userId: '650000000000000000000001',
      email: 'magloireagouda764@gmail.com',
      role: 'admin',
      name: 'Admin Magloire',
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };

    const token = Buffer.from(JSON.stringify(payload)).toString('base64');

    // Création de la réponse avec le cookie
    const response = NextResponse.json({ success: true });

    response.cookies.set('_vercel_jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Erreur login admin:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}