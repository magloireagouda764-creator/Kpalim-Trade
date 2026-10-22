import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, newPassword } = await request.json();

    if (!email || !newPassword) {
      return NextResponse.json(
        { error: 'Email et nouveau mot de passe requis' },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // Hacher le nouveau mot de passe
    const hashedPassword = await hashPassword(newPassword);

    // Mettre à jour le mot de passe
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Mot de passe réinitialisé avec succès',
      user: {
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Erreur reset-password:', error);
    return NextResponse.json(
      { error: 'Erreur serveur: ' + (error.message || 'inconnue') },
      { status: 500 }
    );
  }
}