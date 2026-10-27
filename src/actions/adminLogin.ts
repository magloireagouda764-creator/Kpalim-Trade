'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createToken } from '@/lib/auth';

// Le premier argument 'prevState' est requis par la façon dont on l'appelle
export async function adminLoginAction(prevState: any, formData: FormData) {
  const code = formData.get('code') as string;

  // ⚠️ IMPORTANT : On lance une erreur pour que le catch du frontend puisse l'attraper
  if (code !== '48574857') {
    throw new Error('Code incorrect');
  }

  try {
    const token = createToken({
      userId: '650000000000000000000001',
      email: 'magloireagouda764@gmail.com',
      role: 'admin',
      name: 'Admin Magloire',
    });

    const cookieStore = await cookies();
    cookieStore.set('_vercel_jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    // Cette ligne déclenche la redirection. Next.js lève une erreur interne "NEXT_REDIRECT"
    // qui sera attrapée par ton try/catch dans le frontend pour ne pas bloquer l'interface.
    redirect('/admin/dashboard');
  } catch (error: any) {
    throw new Error(error.message || 'Erreur serveur');
  }
}