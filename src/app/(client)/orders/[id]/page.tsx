import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { connectDB } from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';
import { Price } from '@/components/currency/Price';
import { Badge } from '@/components/ui/Badge';

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = { title: 'Détail Commande' };

const STATUS_LABELS: Record<string, string> = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  preparing: 'En préparation',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
};

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = getTokenFromCookie(cookieStore.toString());
  const payload = token ? await verifyToken(token) : null;

  if (!payload) notFound();

  await connectDB();

  const orderData = await Order.findById(id).lean();
  const order = orderData as any;

  if (!order) notFound();

  if (payload.role !== 'admin' && order.userId?.toString() !== payload.userId) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Commande {order.reference}</h1>
        <Badge className="bg-kpalime-green/10 text-kpalime-green">
          {STATUS_LABELS[order.status] || order.status}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-gray-100">
            <h2 className="font-bold mb-2">Livraison</h2>
            <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
            <p className="text-sm text-gray-600">
              {order.district && `${order.district}, `}
              {order.city}
            </p>
            <p className="text-sm text-gray-600 mt-1">📞 {order.phone}</p>
            {order.note && (
              <p className="text-sm text-gray-500 mt-2 italic">
                Note : {order.note}
              </p>
            )}
          </div>

          <div className="p-4 rounded-xl border border-gray-100">
            <h2 className="font-bold mb-2">Paiement</h2>
            <p className="text-sm text-gray-600">
              Méthode : Paiement à la livraison
            </p>
            <p className="text-sm text-gray-600">
              Statut :{' '}
              {order.paymentStatus === 'paid' ? '✅ Payé' : '⏳ En attente'}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-gray-100 space-y-3">
          <h2 className="font-bold">Articles</h2>

          {(order.items || []).map((item: any, i: number) => (
            <div
              key={i}
              className="flex gap-3 py-2 border-b border-gray-50 last:border-0"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 relative shrink-0">
                <Image
                  src={item.image || '/placeholder.jpg'}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-gray-500">
                  Qté: {item.quantity} ×{' '}
                  {Number(item.price || 0).toLocaleString('fr-FR')} FCFA
                </p>
              </div>

              <p className="text-sm font-medium shrink-0">
                {(item.price * item.quantity).toLocaleString('fr-FR')} FCFA
              </p>
            </div>
          ))}

          <div className="pt-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Sous-total</span>
              <span>
                {Number(order.subtotal || 0).toLocaleString('fr-FR')} FCFA
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Livraison</span>
              <span>
                {Number(order.deliveryFee || 0).toLocaleString('fr-FR')} FCFA
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <Price amount={Number(order.total || 0)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}