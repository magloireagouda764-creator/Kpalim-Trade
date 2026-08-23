import Link from 'next/link';
import Image from 'next/image';
import { Price } from '@/components/currency/Price';
import { truncate } from '@/lib/utils';

interface Props {
  product: {
    _id: string;
    slug: string;
    name: string;
    price: number;
    discountPrice?: number;
    images: { secure_url: string }[];
    shopId?: { name: string; slug: string };
  };
}

export function ProductCard({ product }: Props) {
  const imageUrl = product.images[0]?.secure_url || '/placeholder.jpg';
  const displayPrice = product.discountPrice || product.price;

  return (
    <Link href={`/marketplace/${product.slug}`} prefetch className="group block rounded-xl overflow-hidden border border-gray-100 bg-white hover:shadow-md transition-all duration-200">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image src={imageUrl} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 50vw, 25vw" />
        {product.discountPrice && (
          <span className="absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white bg-kpalime-earth rounded-md">
            Promo
          </span>
        )}
      </div>
      <div className="p-3 space-y-1.5">
        <h3 className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-kpalime-green transition-colors">
          {truncate(product.name, 60)}
        </h3>
        <Price amount={displayPrice} className="text-lg text-kpalime-green" showOriginal={!!product.discountPrice} />
        {product.shopId && (
          <p className="text-xs text-gray-400 truncate">{product.shopId.name}</p>
        )}
      </div>
    </Link>
  );
}
