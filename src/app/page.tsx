import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import { Price } from '@/components/currency/Price';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';

const CATEGORIES = [
  { name: 'Artisanat', slug: 'artisanat', emoji: '🎨' },
  { name: 'Mode', slug: 'mode', emoji: '👗' },
  { name: 'Alimentation', slug: 'alimentation', emoji: '🍫' },
  { name: 'Cosmétiques', slug: 'cosmetiques', emoji: '✨' },
  { name: 'Décoration', slug: 'decoration', emoji: '🏡' },
  { name: 'Culture', slug: 'culture', emoji: '🎭' },
];

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Hero */}
      <section className="text-center space-y-4 py-8">
        <h1 className="text-3xl md:text-5xl font-bold text-kpalime-green">
          Bienvenue sur {APP_NAME}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Commerce, tourisme, culture, artisanat, hébergement et services locaux de Kpalimé réunis en un seul endroit.
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <Link href="/marketplace" className="touch-target inline-flex items-center px-6 py-3 bg-kpalime-green text-white rounded-lg font-medium hover:bg-kpalime-green-light transition-colors" prefetch>
            Explorer la boutique
          </Link>
          <Link href="/tourism" className="touch-target inline-flex items-center px-6 py-3 border-2 border-kpalime-green text-kpalime-green rounded-lg font-medium hover:bg-kpalime-green hover:text-white transition-colors" prefetch>
            Découvrir Kpalimé
          </Link>
        </div>
      </section>

      {/* Catégories */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Catégories populaires</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/marketplace/categories/${cat.slug}`}
              prefetch
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-kpalime-sand/50 hover:bg-kpalime-sand transition-colors touch-target"
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className="text-sm font-medium text-center">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Produits vedette (placeholder skeleton) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Produits en vedette</h2>
          <Link href="/marketplace" className="text-kpalime-green font-medium hover:underline" prefetch>
            Voir tout →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
