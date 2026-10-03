import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = { title: 'Gestion Commandes' };

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

export default async function AdminOrdersPage() {
  await connectDB();

  const ordersData = await Order.find()
    .sort({ createdAt: -1 })
    .populate('userId', 'name email')
    .lean();

  const orders = ordersData as any[];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion des commandes</h1>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Référence</th>
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((o: any) => (
              <tr key={o._id?.toString()} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs">{o.reference}</td>
                <td className="px-4 py-3">{o.userId?.name || '-'}</td>
                <td className="px-4 py-3 text-gray-500">
                  {o.createdAt
                    ? new Date(o.createdAt).toLocaleDateString('fr-FR')
                    : 'Date inconnue'}
                </td>
                <td className="px-4 py-3 tabular-nums font-medium">
                  {Number(o.total || 0).toLocaleString('fr-FR')} FCFA
                </td>
                <td className="px-4 py-3">
                  <Badge className={STATUS_STYLES[o.status] || ''}>
                    {STATUS_LABELS[o.status] || o.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center py-12 text-gray-400">Aucune commande</p>
        )}
      </div>
    </div>
  );
}