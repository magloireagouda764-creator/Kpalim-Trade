import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { MARKETPLACE_CATEGORIES } from '@/lib/marketplace-categories';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';

export const metadata = {
  title: 'Marketplace | Kpalimé-Trade',
  description:
    'Achetez, vendez et découvrez des produits du Togo et d\'ailleurs. Marketplace internationale de Kpalimé-Trade.',
};

export default function MarketplacePage() {
  return (
    <div className="bg-night min-h-screen">
      {/* ============================================
          HERO MARKETPLACE
      ============================================ */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-emerald-brand/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-emerald-brand/30 bg-emerald-brand/10 text-emerald-brand text-xs font-semibold uppercase tracking-wider mb-6">
            <Search size={14} />
            Marketplace internationale
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            Marketplace <span className="text-emerald-brand">Kpalimé-Trade</span>
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto mb-8 leading-relaxed">
            Achetez, vendez et découvrez des produits du Togo et d'ailleurs.
            Une plateforme ouverte aux producteurs, fournisseurs, entreprises et opportunités commerciales.
          </p>

          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto">
            <form
              action="/search"
              method="GET"
              className="flex gap-2"
            >
              <input
                type="text"
                name="q"
                placeholder="Rechercher un produit, un fournisseur, une entreprise..."
                className="flex-1 px-5 py-3.5 rounded-md bg-night-light border border-white/10 text-white placeholder-muted text-base focus:border-emerald-brand focus:outline-none focus:ring-1 focus:ring-emerald-brand transition-all"
              />
              <button
                type="submit"
                className="touch-target px-6 py-3.5 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-all shadow-lg shadow-emerald-brand/30"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ============================================
          CATÉGORIES DU MARKETPLACE
      ============================================ */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Explorez nos catégories
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Des produits agricoles aux technologies, en passant par l'artisanat et la mode — 
              trouvez tout ce dont vous avez besoin sur une seule plateforme.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {MARKETPLACE_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  href={`/marketplace/categories/${cat.slug}`}
                  prefetch
                  className={`group relative overflow-hidden rounded-md border border-white/10 bg-gradient-to-br ${cat.color} p-6 hover:border-emerald-brand/50 hover:-translate-y-1 transition-all duration-300 touch-target`}
                >
                  <div className="relative z-10 flex flex-col items-start text-left gap-4">
                    <div className="w-12 h-12 rounded-md bg-white/10 backdrop-blur flex items-center justify-center group-hover:bg-emerald-brand group-hover:scale-110 transition-all duration-300">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base mb-1.5">
                        {cat.name}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed line-clamp-3">
                        {cat.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-brand text-xs font-semibold mt-auto">
                      <span>Voir les produits</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Effet hover lumineux */}
                  <div className="absolute inset-0 bg-emerald-brand/0 group-hover:bg-emerald-brand/10 transition-all duration-300" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          PRODUITS EN VEDETTE (placeholder)
      ============================================ */}
      <section className="py-16 md:py-20 bg-night-light/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                Produits en vedette
                <span className="h-1 w-12 bg-gold rounded-full" />
              </h2>
              <p className="text-muted mt-2">Les meilleures offres du moment</p>
            </div>
            <Link
              href="/marketplace?sort=featured"
              prefetch
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-light transition-colors"
            >
              Voir tout <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>

          <div className="sm:hidden mt-6 text-center">
            <Link
              href="/marketplace?sort=featured"
              prefetch
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-colors"
            >
              Voir tous les produits <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          BANDEAU APPEL À L'ACTION VENDEUR
      ============================================ */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-md bg-gradient-to-br from-emerald-brand/20 via-night-light to-gold/10 border border-emerald-brand/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Vous êtes producteur, fournisseur ou entreprise ?
              </h2>
              <p className="text-muted max-w-xl">
                Rejoignez Kpalimé-Trade et touchez des clients au Togo et à l'international.
                Créez votre boutique gratuitement et publiez vos produits.
              </p>
            </div>
            <Link
              href="/auth/register"
              prefetch
              className="touch-target inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-gold text-night font-semibold hover:bg-gold-light transition-all shadow-lg shadow-gold/25 shrink-0"
            >
              Ouvrir ma boutique
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}