import type { Metadata } from 'next';
import Image from 'next/image';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = { title: 'Gestion Produits' };

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  rejected: 'bg-red-100 text-red-700',
  inactive: 'bg-gray-100 text-gray-700',
};

export default async function AdminProductsPage() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 }).populate('shopId', 'name').lean();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion des produits</h1>
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Produit</th>
              <th className="px-4 py-3 font-medium">Boutique</th>
              <th className="px-4 py-3 font-medium">Prix</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((p) => (
              <tr key={p._id.toString()} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded overflow-hidden bg-gray-100 relative shrink-0">
                      <Image src={p.images[0]?.secure_url || '/placeholder.jpg'} alt="" fill className="object-cover" sizes="32px" />
                    </div>
                    <span className="font-medium truncate max-w-[180px]">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500">{(p.shopId as any)?.name || '-'}</td>
                <td className="px-4 py-3 tabular-nums">{p.price.toLocaleString('fr-FR')}</td>
                <td className="px-4 py-3 tabular-nums">{p.stock}</td>
                <td className="px-4 py-3"><Badge className={STATUS_STYLES[p.status] || ''}>{p.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && <p className="text-center py-12 text-gray-400">Aucun produit</p>}
      </div>
    </div>
  );
}
