'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignJWT } from 'jose';

export async function adminLoginAction(formData: FormData) {
  const code = formData.get('code') as string;

  if (code !== '48574857') {
    redirect('/admin-login?error=incorrect');
  }

  try {
    // Création manuelle du token JWT sans passer par createToken
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'fallback-secret-for-dev-only-change-in-production'
    );
    
    const token = await new SignJWT({
      userId: '650000000000000000000001',
      email: 'magloireagouda764@gmail.com',
      role: 'admin',
      name: 'Admin Magloire',
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);

    console.log('✅ Token JWT créé avec succès');

    const cookieStore = await cookies();
    cookieStore.set('_vercel_jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    console.log('✅ Cookie défini, redirection vers /admin/dashboard');
    redirect('/admin/dashboard');
  } catch (error: any) {
    console.error(' ERREUR CRITIQUE dans adminLoginAction:', error);
    redirect('/admin-login?error=server');
  }
}