import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const code = body?.code;

    // 1. Vérification du code
    if (code !== '48574857') {
      return NextResponse.json({ error: 'Code incorrect' }, { status: 401 });
    }

    // 2. Création du token (avec protection d'erreur)
    let token;
    try {
      token = createToken({
        userId: '650000000000000000000001', 
        email: 'magloireagouda764@gmail.com',
        role: 'admin',
        name: 'Admin Magloire'
      });
    } catch (tokenError: any) {
      console.error('❌ Erreur lors de la création du token:', tokenError);
      return NextResponse.json({ error: 'Erreur interne: impossible de créer la session' }, { status: 500 });
    }

    if (!token) {
      return NextResponse.json({ error: 'Erreur: le token est vide' }, { status: 500 });
    }

    // 3. Définition du cookie
    const cookieStore = await cookies();
    cookieStore.set('_vercel_jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: '/'
    });

    console.log('✅ Connexion admin réussie, cookie défini.');
    return NextResponse.json({ success: true, message: 'Connexion réussie' });
    
  } catch (error: any) {
    // 4. Attrape TOUTE autre erreur inattendue
    console.error('🚨 ERREUR CRITIQUE DANS /api/admin-login:', error);
    return NextResponse.json({ 
      error: error.message || 'Erreur serveur inattendue' 
    }, { status: 500 });
  }
}