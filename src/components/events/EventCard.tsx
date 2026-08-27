import Link from 'next/link';
import Image from 'next/image';
import { truncate } from '@/lib/utils';
import { Price } from '@/components/currency/Price';

interface Props {
  event: {
    _id: string;
    slug: string;
    title: string;
    description: string;
    category: string;
    poster?: string;
    startDate: string;
    startTime?: string;
    location: string;
    price?: number;
    isFree: boolean;
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  concert: '🎵 Concert', festival: '🎉 Festival', exposition: '🖼️ Exposition',
  conference: '🎤 Conférence', sport: '⚽ Sport', culturel: '🎭 Culturel',
  marche: '🛒 Marché', autre: '📌 Événement',
};

export function EventCard({ event }: Props) {
  const date = new Date(event.startDate);

  return (
    <Link href={`/events/${event.slug}`} prefetch className="group block rounded-xl overflow-hidden border border-gray-100 bg-white hover:shadow-md transition-all duration-200">
      <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
        <Image
          src={event.poster || '/placeholder.jpg'}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
        <span className="absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white bg-black/50 backdrop-blur-sm rounded-md">
          {CATEGORY_LABELS[event.category] || event.category}
        </span>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-kpalime-earth">
          <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-kpalime-sand flex-col leading-none">
            <span className="text-sm">{date.getDate()}</span>
            <span className="text-[9px] uppercase">{date.toLocaleDateString('fr-FR', { month: 'short' })}</span>
          </span>
          {event.startTime && <span>🕐 {event.startTime}</span>}
        </div>
        <h3 className="font-bold text-lg leading-tight group-hover:text-kpalime-green transition-colors">
          {truncate(event.title, 50)}
        </h3>
        <p className="text-xs text-gray-500">📍 {event.location}</p>
        <p className="text-sm font-medium">
          {event.isFree ? (
            <span className="text-kpalime-green">Gratuit</span>
          ) : (
            <Price amount={event.price || 0} />
          )}
        </p>
      </div>
    </Link>
  );
}
