import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';

// On ajoute la méthode GET pour pouvoir le faire via un simple lien cliquable
export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email requis dans l\'URL (ex: ?email=ton@email.com)' }, { status: 400 });
    }

    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { $set: { role: 'admin' } },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé avec cet email' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Succès ! Le rôle de ${user.name} est maintenant "admin". Tu peux te reconnecter.`,
      user: { name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}