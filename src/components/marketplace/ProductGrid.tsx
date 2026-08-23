import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';

interface Product {
  _id: string;
  slug: string;
  name: string;
  price: number;
  discountPrice?: number;
  images: { secure_url: string }[];
  shopId?: { name: string; slug: string };
}

interface Props {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
}

export function ProductGrid({ products, loading, emptyMessage = 'Aucun produit trouvé' }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
      </div>
    );
  }

  if (products.length === 0) {
    return <p className="text-center py-16 text-gray-400 text-lg">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => <ProductCard key={product._id} product={product} />)}
    </div>
  );
}
