import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { Shop } from '@/models/Shop';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';
import { cookies } from 'next/headers';

export const metadata: Metadata = { title: 'Dashboard Vendeur' };

export default async function VendorDashboard() {
  const cookieStore = await cookies();
  const token = getTokenFromCookie(cookieStore.toString());
  const payload = token ? await verifyToken(token) : null;

  if (!payload) return <p>Non autorisé</p>;

  await connectDB();
  const shop = await Shop.findOne({ ownerId: payload.userId }).lean();

  if (!shop) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-lg text-gray-600">Vous n'avez pas encore de boutique.</p>
        <a href="/vendor/shop-settings" className="inline-flex items-center px-6 py-3 bg-kpalime-green text-white rounded-lg font-medium hover:bg-kpalime-green-light transition-colors">Créer ma boutique</a>
      </div>
    );
  }

  const stats = await Product.aggregate([
    { $match: { shopId: shop._id } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  const totalProducts = stats.reduce((sum, s) => sum + s.count, 0);
  const activeProducts = stats.find((s) => s._id === 'active')?.count || 0;
  const pendingProducts = stats.find((s) => s._id === 'pending')?.count || 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tableau de bord</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-kpalime-sand/50 border border-kpalime-sand">
          <p className="text-sm text-gray-500">Total produits</p>
          <p className="text-3xl font-bold mt-1">{totalProducts}</p>
        </div>
        <div className="p-5 rounded-xl bg-green-50 border border-green-100">
          <p className="text-sm text-gray-500">Produits actifs</p>
          <p className="text-3xl font-bold mt-1 text-kpalime-green">{activeProducts}</p>
        </div>
        <div className="p-5 rounded-xl bg-yellow-50 border border-yellow-100">
          <p className="text-sm text-gray-500">En attente</p>
          <p className="text-3xl font-bold mt-1 text-yellow-600">{pendingProducts}</p>
        </div>
      </div>
    </div>
  );
}
