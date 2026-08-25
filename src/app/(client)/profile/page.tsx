import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';

export const metadata: Metadata = { title: 'Mon Profil' };

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = getTokenFromCookie(cookieStore.toString());
  const payload = token ? await verifyToken(token) : null;
  if (!payload) return <p>Non autorisé</p>;

  await connectDB();
  const user = await User.findById(payload.userId).select('-password').lean();
  if (!user) return <p>Utilisateur introuvable</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Mon profil</h1>
      <div className="p-6 rounded-xl border border-gray-100 space-y-4 max-w-lg">
        <div><p className="text-sm text-gray-500">Nom</p><p className="font-medium">{user.name}</p></div>
        <div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{user.email}</p></div>
        <div><p className="text-sm text-gray-500">Téléphone</p><p className="font-medium">{user.phone}</p></div>
        <div><p className="text-sm text-gray-500">Rôle</p><p className="font-medium capitalize">{user.role}</p></div>
        <div><p className="text-sm text-gray-500">Membre depuis</p><p className="font-medium">{new Date(user.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p></div>
      </div>
    </div>
  );
}
