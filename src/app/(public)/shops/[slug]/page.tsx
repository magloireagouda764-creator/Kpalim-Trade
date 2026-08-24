import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { connectDB } from '@/lib/mongodb';
import { Shop } from '@/models/Shop';
import { Product } from '@/models/Product';
import { ProductGrid } from '@/components/marketplace/ProductGrid';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const shop = await Shop.findOne({ slug, status: 'approved' }).lean();
  if (!shop) return { title: 'Boutique introuvable' };
  return { title: shop.name, description: shop.description.slice(0, 160) };
}

export default async function ShopDetailPage({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  const shop = await Shop.findOne({ slug, status: 'approved' }).lean();
  if (!shop) notFound();

  const products = await Product.find({ shopId: shop._id, status: 'active' }).sort({ createdAt: -1 }).lean();
  const s = JSON.parse(JSON.stringify(shop));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 relative shrink-0">
          <Image src={s.logo || '/placeholder.jpg'} alt={s.name} fill className="object-cover" sizes="80px" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{s.name}</h1>
          <p className="text-gray-500 text-sm mt-1">📍 {s.address}, {s.city}</p>
          <p className="text-gray-600 mt-2">{s.description}</p>
          <div className="flex gap-3 mt-3 text-sm">
            <a href={`tel:${s.phone}`} className="text-kpalime-green font-medium hover:underline">📞 {s.phone}</a>
            {s.whatsapp && <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-kpalime-green font-medium hover:underline">💬 WhatsApp</a>}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Produits de cette boutique</h2>
        <ProductGrid products={JSON.parse(JSON.stringify(products))} emptyMessage="Cette boutique n'a pas encore de produits" />
      </div>
    </div>
  );
}
