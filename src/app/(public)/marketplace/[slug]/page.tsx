import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { ProductImageGallery } from '@/components/marketplace/ProductImageGallery';
import { AddToCartButton } from '@/components/marketplace/AddToCartButton';
import { Price } from '@/components/currency/Price';
import Link from 'next/link';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const product = await Product.findOne({ slug }).lean();
  if (!product) return { title: 'Produit introuvable' };
  return { title: product.name, description: product.description.slice(0, 160) };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  const product = await Product.findOne({ slug, status: 'active' })
    .populate('shopId', 'name slug phone whatsapp')
    .populate('categoryId', 'name slug')
    .lean();

  if (!product) notFound();

  const p = JSON.parse(JSON.stringify(product));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav className="text-sm text-gray-500 mb-4 flex gap-1 flex-wrap">
        <Link href="/marketplace" className="hover:text-kpalime-green" prefetch>Boutique</Link>
        <span>/</span>
        {p.categoryId && <><Link href={`/marketplace/categories/${p.categoryId.slug}`} className="hover:text-kpalime-green" prefetch>{p.categoryId.name}</Link><span>/</span></>}
        <span className="text-kpalime-dark font-medium truncate">{p.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8">
        <ProductImageGallery images={p.images} alt={p.name} />

        <div className="space-y-5">
          <h1 className="text-2xl md:text-3xl font-bold">{p.name}</h1>
          <Price amount={p.discountPrice || p.price} className="text-3xl text-kpalime-green" showOriginal={!!p.discountPrice} />

          {p.shopId && (
            <Link href={`/shops/${p.shopId.slug}`} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-kpalime-green" prefetch>
              🏪 {p.shopId.name}
            </Link>
          )}

          <p className="text-gray-600 leading-relaxed whitespace-pre-line">{p.description}</p>

          <div className="pt-4 border-t space-y-3">
            <p className="text-sm text-gray-500">Stock : {p.stock > 0 ? `${p.stock} disponible(s)` : 'Rupture de stock'}</p>
            <AddToCartButton productId={p._id} name={p.name} price={p.discountPrice || p.price} image={p.images[0]?.secure_url} stock={p.stock} />
          </div>
        </div>
      </div>
    </div>
  );
}
