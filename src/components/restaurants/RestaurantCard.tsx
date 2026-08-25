import Link from 'next/link';
import Image from 'next/image';
import { truncate } from '@/lib/utils';

interface Props {
  restaurant: {
    _id: string;
    slug: string;
    name: string;
    cuisineType: string;
    description: string;
    images: { secure_url: string }[];
    city: string;
    priceRange: string;
    specialties: string[];
  };
}

const PRICE_LABELS: Record<string, string> = { budget: '💰', mid: '💰💰', premium: '💰💰💰' };

export function RestaurantCard({ restaurant }: Props) {
  const imageUrl = restaurant.images[0]?.secure_url || '/placeholder.jpg';

  return (
    <Link href={`/restaurants/${restaurant.slug}`} prefetch className="group block rounded-xl overflow-hidden border border-gray-100 bg-white hover:shadow-md transition-all duration-200">
      <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
        <Image src={imageUrl} alt={restaurant.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 100vw, 33vw" />
        <span className="absolute top-2 right-2 px-2 py-1 text-xs font-bold text-white bg-black/50 backdrop-blur-sm rounded-md">
          {PRICE_LABELS[restaurant.priceRange] || ''}
        </span>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-lg leading-tight group-hover:text-kpalime-green transition-colors">{restaurant.name}</h3>
        </div>
        <p className="text-xs text-kpalime-earth font-medium">{restaurant.cuisineType}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{truncate(restaurant.description, 100)}</p>
        {restaurant.specialties.length > 0 && (
          <p className="text-xs text-gray-500">⭐ {restaurant.specialties.slice(0, 2).join(', ')}</p>
        )}
      </div>
    </Link>
  );
}
