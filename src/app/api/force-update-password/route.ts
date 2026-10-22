import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, newPassword } = await request.json();

    await connectDB();

    // Hacher le mot de passe
    const hashedPassword = await hashPassword(newPassword);

    // Forcer la mise à jour avec findOneAndUpdate
    const result = await User.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé', success: false },
        { status: 404 }
      );
    }

    // Vérifier que le mot de passe est bien sauvegardé
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    
    return NextResponse.json({
      success: true,
      message: 'Mot de passe forcé avec succès',
      user: {
        email: user.email,
        role: user.role,
        hasPassword: !!user.password,
        passwordLength: user.password?.length || 0
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