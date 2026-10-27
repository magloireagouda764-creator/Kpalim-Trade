'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function adminLoginAction(formData: FormData) {
  const code = formData.get('code') as string;

  console.log('🔑 Tentative de connexion avec code:', code);

  if (code !== '48574857') {
    console.log('❌ Code incorrect');
    redirect('/admin-login?error=incorrect');
  }

  try {
    // Création d'un token simple en base64 (temporaire pour tester)
    const payload = {
      userId: '650000000000000000000001',
      email: 'magloireagouda764@gmail.com',
      role: 'admin',
      name: 'Admin Magloire',
      exp: Date.now() + (7 * 24 * 60 * 60 * 1000)
    };
    
    const token = Buffer.from(JSON.stringify(payload)).toString('base64');

    console.log('✅ Token créé avec succès');

    const cookieStore = await cookies();
    cookieStore.set('_vercel_jwt', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    console.log('✅ Cookie défini, redirection...');
    redirect('/admin/dashboard');
  } catch (error: any) {
    console.error('🚨 ERREUR CRITIQUE:', error.message);
    console.error('Stack trace:', error.stack);
    redirect('/admin-login?error=server');
  }
}