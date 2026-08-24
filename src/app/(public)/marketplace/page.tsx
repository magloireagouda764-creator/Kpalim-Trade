import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ProductGrid } from '@/components/marketplace/ProductGrid';
import { CategoryList } from '@/components/marketplace/CategoryList';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { Category } from '@/models/Category';

export const metadata: Metadata = { title: 'Boutique', description: 'Découvrez les produits locaux de Kpalimé' };

async function MarketplaceContent() {
  await connectDB();
  const [products, categories] = await Promise.all([
    Product.find({ status: 'active' }).sort({ isFeatured: -1, createdAt: -1 }).limit(12).populate('shopId', 'name slug').lean(),
    Category.find({ isActive: true }).sort({ position: 1 }).lean(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <h1 className="text-2xl font-bold">Boutique</h1>
      <CategoryList categories={JSON.parse(JSON.stringify(categories))} />
      <ProductGrid products={JSON.parse(JSON.stringify(products))} />
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-6"><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}</div></div>}>
      <MarketplaceContent />
    </Suspense>
  );
}
