'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createToken } from '@/lib/auth';

// ⚠️ IMPORTANT : 'prevState' doit être le premier argument pour useActionState
export async function adminLoginAction(prevState: any, formData: FormData) {
  const code = formData.get('code') as string;

  if (code !== '48574857') {
    return { error: 'Code incorrect' };
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

    // Next.js gère cette redirection automatiquement sans planter
    redirect('/admin/dashboard');
  } catch (error: any) {
    return { error: error.message || 'Erreur serveur' };
  }
}