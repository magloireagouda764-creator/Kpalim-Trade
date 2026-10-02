import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Shop } from '@/models/Shop';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = { title: 'Gestion Boutiques' };

const STATUS_STYLES: Record<string, string> = {
  approved: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  rejected: 'bg-red-100 text-red-700',
  suspended: 'bg-gray-100 text-gray-700',
};

export default async function AdminShopsPage() {
  await connectDB();
  const shops = await Shop.find().sort({ createdAt: -1 }).populate('ownerId', 'name email').lean();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion des boutiques</h1>
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Boutique</th>
              <th className="px-4 py-3 font-medium">Propriétaire</th>
              <th className="px-4 py-3 font-medium">Ville</th>
              <th className="px-4 py-3 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {shops.map((shop) => (
              <tr key={shop._id.toString()} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium">{shop.name}</td>
                <td className="px-4 py-3 text-gray-500">{(shop.ownerId as any)?.name || '-'}</td>
                <td className="px-4 py-3 text-gray-500">{shop.city}</td>
                <td className="px-4 py-3">
                  <Badge className={STATUS_STYLES[shop.status] || ''}>{shop.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {shops.length === 0 && <p className="text-center py-12 text-gray-400">Aucune boutique</p>}
      </div>
    </div>
  );
}
