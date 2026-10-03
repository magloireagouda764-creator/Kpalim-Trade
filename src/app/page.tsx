import Link from 'next/link';
import {
  ShoppingBag, Palmtree, Palette, Shirt, Apple, Sparkles, Lamp, BookOpen, ArrowRight, Store,
} from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';

const CATEGORIES = [
  { name: 'Artisanat', slug: 'artisanat', icon: Palette },
  { name: 'Mode', slug: 'mode', icon: Shirt },
  { name: 'Alimentation', slug: 'alimentation', icon: Apple },
  { name: 'Cosmétiques', slug: 'cosmetiques', icon: Sparkles },
  { name: 'Décoration', slug: 'decoration', icon: Lamp },
  { name: 'Culture', slug: 'culture', icon: BookOpen },
];

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-14">
      {/* ===== HERO ===== */}
      <section className="text-center space-y-6 py-10 relative">
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-emerald-brand/10 blur-3xl" />

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md border border-gold/40 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider">
          <Store size={14} />
          La plateforme de Kpalimé
        </span>

        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight relative">
          Bienvenue sur <span className="text-emerald-brand">{APP_NAME}</span>
        </h1>

        <p className="text-lg text-muted max-w-2xl mx-auto relative">
          Commerce, tourisme, culture, artisanat, hébergement et services locaux de Kpalimé réunis en un seul endroit.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 relative">
          <Link
            href="/marketplace"
            prefetch
            className="touch-target inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-colors shadow-lg shadow-emerald-brand/25"
          >
            <ShoppingBag size={24} />
            Explorer la boutique
          </Link>
          <Link
            href="/tourism"
            prefetch
            className="touch-target inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-gold text-night font-semibold hover:bg-gold-light transition-colors shadow-lg shadow-gold/25"
          >
            <Palmtree size={24} />
            Découvrir Kpalimé
          </Link>
        </div>
      </section>

      {/* ===== CATÉGORIES ===== */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            Catégories populaires
            <span className="h-1 w-10 bg-gold rounded-full" />
          </h2>
          <Link
            href="/marketplace"
            prefetch
            className="inline-flex items-center gap-1 text-sm font-medium text-gold hover:text-gold-light transition-colors"
          >
            Voir tout <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/marketplace/categories/${cat.slug}`}
                prefetch
                className="flex flex-col items-center gap-3 p-5 rounded-md bg-night-light border border-white/10 hover:border-gold hover:-translate-y-1 transition-all touch-target"
              >
                <Icon size={24} className="text-emerald-brand" />
                <span className="text-sm font-medium text-white text-center">{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== PRODUITS VEDETTE ===== */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            Produits en vedette
            <span className="h-1 w-10 bg-gold rounded-full" />
          </h2>
          <Link
            href="/marketplace"
            prefetch
            className="inline-flex items-center gap-1 text-sm font-medium text-gold hover:text-gold-light transition-colors"
          >
            Voir tout <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>

      {/* ===== BANDAU VENDEURS ===== */}
      <section className="rounded-md bg-night-light border border-white/10 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-2xl font-bold text-white">Vendez à Kpalimé</h2>
          <p className="text-muted max-w-xl">
            Créez votre boutique gratuitement, publiez vos produits et touchez des clients dans toute la région.
          </p>
        </div>
        <Link
          href="/auth/register"
          prefetch
          className="touch-target inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-gold text-night font-semibold hover:bg-gold-light transition-colors shadow-lg shadow-gold/25 shrink-0"
        >
          <Store size={24} />
          Ouvrir ma boutique
        </Link>
      </section>
    </div>
  );
}