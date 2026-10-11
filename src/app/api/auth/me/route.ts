import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromCookie, verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    // ✅ Correction ici : on appelle la fonction sans argument
    const token = await getTokenFromCookie();
    
    if (!token) {
      return NextResponse.json({ success: false, user: null }, { status: 401 });
    }

    const payload = await verifyToken(token);
    
    if (!payload) {
      return NextResponse.json({ success: false, user: null }, { status: 401 });
    }

    // On retourne les informations de l'utilisateur décodées depuis le token
    return NextResponse.json({ 
      success: true, 
      user: {
        id: payload.userId,
        email: payload.email,
        role: payload.role,
        name: payload.name || 'Utilisateur'
      } 
    }, { status: 200 });
    
  } catch (error) {
    console.error('Erreur API GET /api/auth/me:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}