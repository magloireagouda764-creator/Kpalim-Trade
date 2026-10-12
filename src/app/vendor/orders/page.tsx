import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { connectDB } from '@/lib/mongodb';
import { Shop } from '@/models/Shop';
import { Order } from '@/models/Order';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = { title: 'Commandes Vendeur' };

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

export default async function VendorOrdersPage() {
    const token = await getTokenFromCookie();
  const payload = token ? await verifyToken(token) : null;

  if (!payload) return <p>Non autorisé</p>;

  await connectDB();

  const shop = (await Shop.findOne({ ownerId: payload.userId }).lean()) as any;

  if (!shop) return <p>Aucune boutique trouvée</p>;

  const ordersData = await Order.find({ 'items.shopId': shop._id })
    .sort({ createdAt: -1 })
    .lean();

  const orders = ordersData as any[];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Commandes reçues</h1>

      <div className="space-y-3">
        {orders.map((order: any) => {
          const shopItems = (order.items || []).filter(
            (item: any) => item.shopId?.toString() === shop._id.toString()
          );

          const shopTotal = shopItems.reduce(
            (sum: number, item: any) => sum + item.price * item.quantity,
            0
          );

          return (
            <div
              key={order._id?.toString()}
              className="p-4 rounded-xl border border-gray-100 space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">{order.reference}</p>
                  <p className="text-xs text-gray-500">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString('fr-FR')
                      : 'Date inconnue'}{' '}
                    • {shopItems.length} article(s)
                  </p>
                </div>

                <Badge className={STATUS_STYLES[order.status] || ''}>
                  {STATUS_LABELS[order.status] || order.status}
                </Badge>
              </div>

              <div className="text-sm text-gray-600">
                {shopItems.map((item: any, index: number) => (
                  <p key={index}>
                    • {item.name} × {item.quantity}
                  </p>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                <span className="font-bold text-kpalime-green">
                  {shopTotal.toLocaleString('fr-FR')} FCFA
                </span>

                <span className="text-xs text-gray-500">
                  Paiement :{' '}
                  {order.paymentStatus === 'paid' ? '✅ Payé' : '⏳ En attente'}
                </span>
              </div>
            </div>
          );
        })}

        {orders.length === 0 && (
          <p className="text-center py-16 text-gray-400">
            Aucune commande pour le moment
          </p>
        )}
      </div>
    </div>
  );
}