import Link from 'next/link';
import Image from 'next/image';
import { truncate } from '@/lib/utils';

interface Props {
  site: {
    _id: string;
    slug: string;
    name: string;
    shortDescription: string;
    category: string;
    images: { secure_url: string }[];
    entranceFee?: number;
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  cascade: '🌊 Cascade', montagne: '⛰️ Montagne', foret: '🌳 Forêt',
  village: '🏘️ Village', marche: '🛒 Marché', culturel: '🎭 Culturel', naturel: '🌿 Nature',
};

export function SiteCard({ site }: Props) {
  const imageUrl = site.images[0]?.secure_url || '/placeholder.jpg';

  return (
    <Link href={`/tourism/${site.slug}`} prefetch className="group block rounded-xl overflow-hidden border border-gray-100 bg-white hover:shadow-md transition-all duration-200">
      <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
        <Image src={imageUrl} alt={site.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 100vw, 33vw" />
        <span className="absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white bg-black/50 backdrop-blur-sm rounded-md">
          {CATEGORY_LABELS[site.category] || site.category}
        </span>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg leading-tight group-hover:text-kpalime-green transition-colors">{site.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{truncate(site.shortDescription, 100)}</p>
        {site.entranceFee !== undefined && site.entranceFee > 0 && (
          <p className="text-xs text-gray-500">Entrée : {site.entranceFee.toLocaleString('fr-FR')} FCFA</p>
        )}
      </div>
    </Link>
  );
}
