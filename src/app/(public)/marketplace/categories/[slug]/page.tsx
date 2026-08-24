import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/mongodb';
import { Category } from '@/models/Category';
import { Product } from '@/models/Product';
import { ProductGrid } from '@/components/marketplace/ProductGrid';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const cat = await Category.findOne({ slug }).lean();
  if (!cat) return { title: 'Catégorie introuvable' };
  return { title: cat.name, description: cat.description || `Produits ${cat.name} à Kpalimé` };
}

async function CategoryContent({ slug }: { slug: string }) {
  await connectDB();
  const category = await Category.findOne({ slug }).lean();
  if (!category) notFound();

  const products = await Product.find({ categoryId: category._id, status: 'active' })
    .sort({ isFeatured: -1, createdAt: -1 })
    .populate('shopId', 'name slug')
    .lean();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">{category.name}</h1>
      <ProductGrid products={JSON.parse(JSON.stringify(products))} />
    </div>
  );
}

export default function CategoryPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-6"><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}</div></div>}>
      <CategoryContent slug={(params as unknown as { slug: string }).slug} />
    </Suspense>
  );
}
