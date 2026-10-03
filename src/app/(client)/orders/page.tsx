import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { connectDB } from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = { title: 'Mes Commandes' };

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  preparing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  preparing: 'En préparation',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
};

export default async function OrdersPage() {
  const cookieStore = await cookies();
  const token = getTokenFromCookie(cookieStore.toString());
  const payload = token ? await verifyToken(token) : null;

  if (!payload) return <p>Non autorisé</p>;

  await connectDB();

  const ordersData = await Order.find({ userId: payload.userId })
    .sort({ createdAt: -1 })
    .lean();

  const orders = ordersData as any[];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Mes commandes</h1>

      <div className="space-y-3">
        {orders.map((order: any) => (
          <Link
            key={order._id?.toString()}
            href={`/orders/${order._id?.toString()}`}
            prefetch
            className="block p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <p className="font-bold">{order.reference}</p>
              <Badge className={STATUS_STYLES[order.status] || ''}>
                {STATUS_LABELS[order.status] || order.status}
              </Badge>
            </div>

            <p className="text-sm text-gray-500">
              {order.createdAt
                ? new Date(order.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'Date inconnue'}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              {(order.items || []).length} article(s) • Paiement à la livraison
            </p>

            <p className="font-bold text-kpalime-green mt-2">
              {Number(order.total || 0).toLocaleString('fr-FR')} FCFA
            </p>
          </Link>
        ))}

        {orders.length === 0 && (
          <p className="text-center py-16 text-gray-400">
            Aucune commande pour le moment
          </p>
        )}
      </div>
    </div>
  );
}