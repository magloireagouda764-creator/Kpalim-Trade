import { HeroSection } from '@/components/home/HeroSection';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { InternationalBuyers } from '@/components/home/InternationalBuyers';
import { StatsSection } from '@/components/home/StatsSection';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero principal */}
      <HeroSection />

      {/* Grille des 8 pôles */}
      <CategoryGrid />

      {/* Section acheteurs internationaux */}
      <InternationalBuyers />

      {/* Statistiques */}
      <StatsSection />

      {/* Produits vedettes (placeholder - à connecter aux données réelles) */}
      <section className="py-16 bg-night">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Produits en vedette</h2>
              <p className="text-muted mt-1">Découvrez les meilleurs produits locaux</p>
            </div>
            <Link
              href="/products"
              prefetch
              className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light transition-colors"
            >
              Voir tout <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bandeau appel à l'action */}
      <section className="py-16 bg-gradient-to-r from-emerald-brand to-emerald-light">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Vous êtes producteur ou fournisseur ?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Rejoignez Kpalimé-Trade et vendez vos produits au Togo et dans le monde entier.
          </p>
          <Link
            href="/auth/register"
            prefetch
            className="touch-target inline-flex items-center gap-2 px-8 py-4 rounded-md bg-night text-white font-semibold hover:bg-night-light transition-all shadow-lg"
          >
            Devenir fournisseur
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}