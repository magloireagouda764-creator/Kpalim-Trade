import { NextResponse } from 'next/server';
import { getTokenFromCookie } from '@/lib/auth';
import { verifyToken } from '@/lib/jwt';

export async function GET(request: Request) {
  try {
    const token = await getTokenFromCookie();
    
    if (!token) {
      return NextResponse.json({ 
        error: 'Non connecté',
        role: null 
      });
    }

    const payload = await verifyToken(token);
    
    if (!payload) {
      return NextResponse.json({ 
        error: 'Token invalide',
        role: null 
      });
    }

    return NextResponse.json({ 
      success: true,
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      message: payload.role === 'admin' 
        ? '✅ Tu es admin ! Tu devrais pouvoir accéder à /admin/dashboard' 
        : `❌ Ton rôle est "${payload.role}", pas "admin"`
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Erreur serveur',
      role: null 
    });
  }
}