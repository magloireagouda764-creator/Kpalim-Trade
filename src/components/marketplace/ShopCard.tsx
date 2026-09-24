import Link from 'next/link';
import Image from 'next/image';
import { truncate } from '@/lib/utils';

interface Props {
  shop: {
    _id: string;
    slug: string;
    name: string;
    description: string;
    logo?: string;
    city: string;
    isFeatured?: boolean;
  };
}

export function ShopCard({ shop }: Props) {
  return (
    <Link href={`/shops/${shop.slug}`} prefetch className="group block p-4 rounded-xl border border-gray-100 bg-white hover:shadow-md transition-all duration-200 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 relative shrink-0">
          <Image src={shop.logo || '/placeholder.jpg'} alt={shop.name} fill className="object-cover" sizes="48px" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold truncate group-hover:text-kpalime-green transition-colors">{shop.name}</h3>
            {shop.isFeatured && <span className="text-yellow-400 text-xs">⭐</span>}
          </div>
          <p className="text-xs text-gray-500">📍 {shop.city}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 line-clamp-2">{truncate(shop.description, 100)}</p>
    </Link>
  );
}
