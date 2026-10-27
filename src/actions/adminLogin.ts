'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createToken } from '@/lib/auth';

// ⚠️ IMPORTANT : Pour un <form action={...}>, la fonction ne prend QUE formData
export async function adminLoginAction(formData: FormData) {
  const code = formData.get('code') as string;

  if (code !== '48574857') {
    redirect('/admin-login?error=incorrect');
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

    redirect('/admin/dashboard');
  } catch (error: any) {
    redirect('/admin-login?error=server');
  }
}