import { Suspense } from 'react';
import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { ProductGrid } from '@/components/marketplace/ProductGrid';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';

export const metadata: Metadata = { title: 'Recherche' };

async function SearchResults({ query }: { query: string }) {
  await connectDB();
  const products = query
    ? await Product.find({ name: { $regex: query, $options: 'i' }, status: 'active' }).sort({ isFeatured: -1 }).limit(24).populate('shopId', 'name slug').lean()
    : [];

  return (
    <div className="space-y-4">
      <p className="text-gray-500">{products.length} résultat(s) pour « {query} »</p>
      <ProductGrid products={JSON.parse(JSON.stringify(products))} emptyMessage="Aucun résultat trouvé. Essayez d'autres mots-clés." />
    </div>
  );
}

export default function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Recherche</h1>
      <Suspense fallback={<div className="grid grid-cols-2 md:grid-cols-4 gap-4">{Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}</div>}>
        <SearchResults query={(searchParams as any).q || ''} />
      </Suspense>
    </div>
  );
}
