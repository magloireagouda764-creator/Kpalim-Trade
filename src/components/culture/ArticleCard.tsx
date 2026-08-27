import Link from 'next/link';
import Image from 'next/image';
import { truncate, formatDate } from '@/lib/utils';

interface Props {
  article: {
    _id: string;
    slug: string;
    title: string;
    excerpt: string;
    coverImage?: string;
    category: string;
    publishedAt?: string;
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  histoire: '📜 Histoire', tradition: '🏺 Tradition', patrimoine: '🏛️ Patrimoine',
  musique: '🎵 Musique', danse: '💃 Danse', gastronomie: '🍲 Gastronomie', autre: '📌 Culture',
};

export function ArticleCard({ article }: Props) {
  return (
    <Link href={`/culture/${article.slug}`} prefetch className="group block rounded-xl overflow-hidden border border-gray-100 bg-white hover:shadow-md transition-all duration-200">
      <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
        <Image
          src={article.coverImage || '/placeholder.jpg'}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
        <span className="absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white bg-black/50 backdrop-blur-sm rounded-md">
          {CATEGORY_LABELS[article.category] || article.category}
        </span>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg leading-tight group-hover:text-kpalime-green transition-colors">
          {truncate(article.title, 60)}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">{truncate(article.excerpt, 120)}</p>
        {article.publishedAt && (
          <p className="text-xs text-gray-400">{formatDate(article.publishedAt)}</p>
        )}
      </div>
    </Link>
  );
}
