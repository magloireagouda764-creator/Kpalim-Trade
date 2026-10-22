import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { createToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('_vercel_jwt')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Non connecté' }, { status: 401 });
    }

    // Décoder le token pour avoir l'email
    const payload = JSON.parse(atob(token.split('.')[1]));
    const email = payload.email;

    if (!email) {
      return NextResponse.json({ error: 'Email non trouvé dans le token' }, { status: 400 });
    }

    // Se connecter à la DB et trouver l'utilisateur
    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    // Créer un NOUVEAU token avec le rôle à jour
    const newToken = createToken({
      userId: user._id,
      email: user.email,
      role: user.role, // Rôle ACTUEL de la DB
      name: user.name
    });

    // Définir le nouveau cookie
    cookieStore.set('_vercel_jwt', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: '/'
    });

    return NextResponse.json({
      success: true,
      message: 'Token régénéré avec succès',
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}