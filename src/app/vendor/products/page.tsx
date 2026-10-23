import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { connectDB } from '@/lib/mongodb';
import { Shop } from '@/models/Shop';
import { Product } from '@/models/Product';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = { title: 'Mes Produits' };

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  active: { label: 'Actif', color: 'bg-green-100 text-green-700' },
  pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-700' },
  rejected: { label: 'Refusé', color: 'bg-red-100 text-red-700' },
  inactive: { label: 'Inactif', color: 'bg-gray-100 text-gray-700' },
};

export default async function VendorProductsPage() {
  // ✅ CORRECTION ICI : Une seule ligne, propre et sans imbrication
  const token = await getTokenFromCookie();
  const payload = token ? await verifyToken(token) : null;
  
  if (!payload) return <p>Non autorisé</p>;

  await connectDB();
  const shop = await Shop.findOne({ ownerId: payload.userId }).lean();
  if (!shop) return <p>Aucune boutique trouvée</p>;

  const products = await Product.find({ shopId: shop._id }).sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mes produits</h1>
        <Link href="/vendor/products/new" className="touch-target inline-flex items-center px-4 py-2 bg-kpalime-green text-white rounded-lg text-sm font-medium hover:bg-kpalime-green-light transition-colors">
          ➕ Nouveau produit
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Produit</th>
              <th className="px-4 py-3 font-medium">Prix</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((p) => {
              const status = STATUS_LABELS[p.status] || STATUS_LABELS.inactive;
              return (
                <tr key={p._id.toString()} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 relative shrink-0">
                        {/* ✅ CORRECTION ICI : p.images?.[0]?.secure_url au lieu de p.images[0]?.secure_url */}
                        <Image src={p.images?.[0]?.secure_url || '/placeholder.jpg'} alt="" fill className="object-cover" sizes="40px" />
                      </div>
                      <span className="font-medium truncate max-w-[200px]">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{p.price.toLocaleString('fr-FR')} FCFA</td>
                  <td className="px-4 py-3">{p.stock}</td>
                  <td className="px-4 py-3">
                    <Badge className={status.color}>{status.label}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {products.length === 0 && <p className="text-center py-12 text-gray-400">Aucun produit</p>}
      </div>
    </div>
  );
}