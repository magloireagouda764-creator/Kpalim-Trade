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

    // Création du token avec un ID valide et le rôle admin
    const token = createToken({
      userId: '650000000000000000000001', 
      email: 'magloireagouda764@gmail.com',
      role: 'admin',
      name: 'Admin Magloire'
    });

    // Définition du cookie
    const cookieStore = await cookies();
    cookieStore.set('_vercel_jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: '/'
    });

    // ✅ CORRECTION : Retourner un JSON de succès au lieu d'une redirection.
    // Le frontend se chargera de la redirection après avoir reçu ce JSON.
    return NextResponse.json({ success: true, message: 'Connexion réussie' });
    
  } catch (error: any) {
    console.error('Erreur login admin:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}