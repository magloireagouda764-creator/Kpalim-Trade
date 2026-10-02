import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { connectDB } from '@/lib/mongodb';
import { Shop } from '@/models/Shop';
import { Order } from '@/models/Order';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';
import { StatusBadge } from '@/components/admin/StatusBadge';

export const metadata: Metadata = { title: 'Commandes Vendeur' };

export default async function VendorOrdersPage() {
  const cookieStore = await cookies();
  const token = getTokenFromCookie(cookieStore.toString());
  const payload = token ? await verifyToken(token) : null;
  if (!payload) return <p>Non autorisé</p>;

  await connectDB();
  const shop = await Shop.findOne({ ownerId: payload.userId }).lean();
  if (!shop) return <p>Aucune boutique trouvée</p>;

  // Récupérer les commandes contenant au moins un produit de cette boutique
  const orders = await Order.find({ 'items.shopId': shop._id }).sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Commandes reçues</h1>
      <div className="space-y-3">
        {orders.map((order) => {
          const shopItems = order.items.filter((i) => i.shopId.toString() === shop._id.toString());
          const shopTotal = shopItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
          return (
            <div key={order._id.toString()} className="p-4 rounded-xl border border-gray-100 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">{order.reference}</p>
                  <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString('fr-FR')} • {shopItems.length} article(s)</p>
                </div>
                <StatusBadge status={order.status} />
              </div>
              <div className="text-sm text-gray-600">
                {shopItems.map((i) => <p key={i._id.toString()}>• {i.name} × {i.quantity}</p>)}
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                <span className="font-bold text-kpalime-green">{shopTotal.toLocaleString('fr-FR')} FCFA</span>
                <span className="text-xs text-gray-500">Paiement : {order.paymentStatus === 'paid' ? '✅ Payé' : '⏳ En attente'}</span>
              </div>
            </div>
          );
        })}
        {orders.length === 0 && <p className="text-center py-16 text-gray-400">Aucune commande pour le moment</p>}
      </div>
    </div>
  );
}
