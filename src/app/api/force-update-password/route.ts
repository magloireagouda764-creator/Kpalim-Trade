import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, newPassword } = body;

    if (!email || !newPassword) {
      return NextResponse.json(
        { error: 'Email et nouveau mot de passe requis', success: false },
        { status: 400 }
      );
    }

    await connectDB();

    // 1. Hacher le mot de passe
    const hashedPassword = await hashPassword(newPassword);

    // 2. Mettre à jour l'utilisateur
    await User.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { $set: { password: hashedPassword } }
    );

    // 3. ✅ CORRECTION CRITIQUE : .select('+password') pour vérifier qu'il est bien là
    const updatedUser = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé', success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Mot de passe forcé avec succès',
      user: {
        email: updatedUser.email,
        role: updatedUser.role,
        hasPassword: !!updatedUser.password,
        passwordLength: updatedUser.password ? updatedUser.password.length : 0
      }
    });
  } catch (error: any) {
    console.error('Erreur force-update:', error);
    return NextResponse.json(
      { error: 'Erreur serveur: ' + (error.message || 'inconnue'), success: false },
      { status: 500 }
    );
  }
}