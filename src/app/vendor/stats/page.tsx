import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Shop } from '@/models/Shop';
import { Order } from '@/models/Order';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';
import { StatsCard } from '@/components/admin/StatsCard';

export const metadata: Metadata = { title: 'Statistiques Vendeur' };

export default async function VendorStatsPage() {
  // ✅ CORRECTION ICI : Une seule ligne, propre et sans imbrication
  const token = await getTokenFromCookie();
  const payload = token ? await verifyToken(token) : null;

  if (!payload) return <p>Non autorisé</p>;

  await connectDB();

  const shop = (await Shop.findOne({ ownerId: payload.userId }).lean()) as any;

  if (!shop) return <p>Aucune boutique trouvée</p>;

  const ordersData = await Order.find({ 'items.shopId': shop._id }).lean();
  const orders = ordersData as any[];

  let totalRevenue = 0;
  let totalItemsSold = 0;

  for (const order of orders) {
    for (const item of order.items || []) {
      if (item.shopId?.toString() === shop._id.toString()) {
        totalRevenue += item.price * item.quantity;
        totalItemsSold += item.quantity;
      }
    }
  }

  const stats = [
    {
      label: 'Revenus totaux',
      value: `${totalRevenue.toLocaleString('fr-FR')} FCFA`,
      icon: '💰',
      color: 'bg-green-50 border-green-100',
    },
    {
      label: 'Articles vendus',
      value: totalItemsSold,
      icon: '📦',
      color: 'bg-blue-50 border-blue-100',
    },
    {
      label: 'Commandes reçues',
      value: orders.length,
      icon: '🛒',
      color: 'bg-kpalime-sand/50 border-kpalime-sand',
    },
    {
      label: 'Panier moyen',
      value:
        orders.length > 0
          ? `${Math.round(totalRevenue / orders.length).toLocaleString('fr-FR')} FCFA`
          : '0 FCFA',
      icon: '📊',
      color: 'bg-purple-50 border-purple-100',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Statistiques</h1>

      <div className="grid sm:grid-cols-2 gap-4">
        {stats.map((s) => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>
    </div>
  );
}