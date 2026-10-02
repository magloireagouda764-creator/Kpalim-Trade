import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { connectDB } from '@/lib/mongodb';
import { Shop } from '@/models/Shop';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';
import { StatusBadge } from '@/components/admin/StatusBadge';

export const metadata: Metadata = { title: 'Paramètres Boutique' };

export default async function ShopSettingsPage() {
  const cookieStore = await cookies();
  const token = getTokenFromCookie(cookieStore.toString());
  const payload = token ? await verifyToken(token) : null;
  if (!payload) return <p>Non autorisé</p>;

  await connectDB();
  const shop = await Shop.findOne({ ownerId: payload.userId }).lean();

  if (!shop) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Ma boutique</h1>
        <div className="p-8 rounded-xl border border-dashed border-gray-300 text-center space-y-3">
          <p className="text-3xl">🏪</p>
          <p className="text-gray-500">Vous n'avez pas encore de boutique.</p>
          <p className="text-sm text-gray-400">La création de boutique sera disponible dans une prochaine mise à jour.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ma boutique</h1>
        <StatusBadge status={shop.status} />
      </div>
      <div className="p-6 rounded-xl border border-gray-100 space-y-4 max-w-lg">
        <div><p className="text-sm text-gray-500">Nom</p><p className="font-medium">{shop.name}</p></div>
        <div><p className="text-sm text-gray-500">Adresse</p><p className="font-medium">{shop.address}, {shop.city}</p></div>
        <div><p className="text-sm text-gray-500">Téléphone</p><p className="font-medium">{shop.phone}</p></div>
        {shop.email && <div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{shop.email}</p></div>}
        <div><p className="text-sm text-gray-500">Description</p><p className="text-sm text-gray-600">{shop.description}</p></div>
      </div>
    </div>
  );
}
