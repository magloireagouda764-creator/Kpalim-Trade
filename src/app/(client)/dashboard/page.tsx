import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { connectDB } from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Mon Tableau de Bord' };

export default async function ClientDashboard() {
  const cookieStore = await cookies();
  const token = getTokenFromCookie(cookieStore.toString());
  const payload = token ? await verifyToken(token) : null;
  if (!payload) return <p>Non autorisé</p>;

  await connectDB();
  const [totalOrders, recentOrders] = await Promise.all([
    Order.countDocuments({ userId: payload.userId }),
    Order.find({ userId: payload.userId }).sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  const STATUS_LABELS: Record<string, string> = {
    pending: 'En attente', confirmed: 'Confirmée', preparing: 'En préparation',
    shipped: 'Expédiée', delivered: 'Livrée', cancelled: 'Annulée',
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Bonjour 👋</h1>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-kpalime-sand/50 border border-kpalime-sand">
          <p className="text-sm text-gray-500">Total commandes</p>
          <p className="text-3xl font-bold mt-1">{totalOrders}</p>
        </div>
        <Link href="/orders" className="p-5 rounded-xl bg-green-50 border border-green-100 hover:bg-green-100 transition-colors">
          <p className="text-sm text-gray-500">Voir toutes mes commandes</p>
          <p className="text-lg font-bold mt-1 text-kpalime-green">→ Consulter</p>
        </Link>
      </div>

      {recentOrders.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3">Commandes récentes</h2>
          <div className="space-y-2">
            {recentOrders.map((order) => (
              <Link key={order._id.toString()} href={`/orders/${order._id}`} prefetch className="block p-4 rounded-xl border border-gray-100 hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{order.reference}</p>
                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString('fr-FR')} • {order.items.length} article(s)</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{order.total.toLocaleString('fr-FR')} FCFA</p>
                    <p className="text-xs text-gray-500">{STATUS_LABELS[order.status] || order.status}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
