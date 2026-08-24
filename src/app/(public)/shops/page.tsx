import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { connectDB } from '@/lib/mongodb';
import { Shop } from '@/models/Shop';

export const metadata: Metadata = { title: 'Boutiques', description: 'Découvrez les boutiques de Kpalimé' };

export default async function ShopsPage() {
  await connectDB();
  const shops = await Shop.find({ status: 'approved' }).sort({ isFeatured: -1, name: 1 }).lean();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Boutiques à Kpalimé</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shops.map((shop) => (
          <Link key={shop._id.toString()} href={`/shops/${shop.slug}`} prefetch className="block rounded-xl border border-gray-100 bg-white p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 relative shrink-0">
                <Image src={shop.logo || '/placeholder.jpg'} alt={shop.name} fill className="object-cover" sizes="48px" />
              </div>
              <div>
                <h2 className="font-bold truncate">{shop.name}</h2>
                <p className="text-xs text-gray-500 truncate">{shop.city} • {shop.address}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{shop.description}</p>
          </Link>
        ))}
      </div>
      {shops.length === 0 && <p className="text-center py-16 text-gray-400">Aucune boutique pour le moment</p>}
    </div>
  );
}
