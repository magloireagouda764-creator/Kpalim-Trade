import Link from 'next/link';
import Image from 'next/image';
import { truncate } from '@/lib/utils';

interface Props {
  hotel: {
    _id: string;
    slug: string;
    name: string;
    type: string;
    description: string;
    images: { secure_url: string }[];
    city: string;
    amenities: string[];
  };
}

const TYPE_LABELS: Record<string, string> = {
  hotel: '🏨 Hôtel', guesthouse: '🏡 Maison d\'hôtes', auberge: '🛖 Auberge',
  apartment: '🏢 Appartement', campement: '⛺ Campement', gite: '🏕️ Gîte',
};

export function HotelCard({ hotel }: Props) {
  const imageUrl = hotel.images[0]?.secure_url || '/placeholder.jpg';

  return (
    <Link href={`/hotels/${hotel.slug}`} prefetch className="group block rounded-xl overflow-hidden border border-gray-100 bg-white hover:shadow-md transition-all duration-200">
      <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
        <Image src={imageUrl} alt={hotel.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 100vw, 33vw" />
        <span className="absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white bg-black/50 backdrop-blur-sm rounded-md">
          {TYPE_LABELS[hotel.type] || hotel.type}
        </span>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg leading-tight group-hover:text-kpalime-green transition-colors">{hotel.name}</h3>
        <p className="text-xs text-gray-500">📍 {hotel.city}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{truncate(hotel.description, 100)}</p>
        {hotel.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {hotel.amenities.slice(0, 3).map((a) => (
              <span key={a} className="px-2 py-0.5 text-[10px] bg-gray-100 text-gray-600 rounded-full">{a}</span>
            ))}
            {hotel.amenities.length > 3 && <span className="px-2 py-0.5 text-[10px] text-gray-400">+{hotel.amenities.length - 3}</span>}
          </div>
        )}
      </div>
    </Link>
  );
}
