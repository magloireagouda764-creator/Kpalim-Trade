import Link from 'next/link';
import {
  Search,
  Wheat,
  Coffee,
  Leaf,
  Droplets,
  Fish,
  Palette,
  Shirt,
  Footprints,
  Factory,
  Laptop,
  Wrench,
  Sparkles,
  Home,
  Car,
  Package,
  ArrowRight,
  Globe,
  ChevronRight,
} from 'lucide-react';

export const metadata = {
  title: 'Marketplace Kpalimé-Trade | Produits du Togo et du monde',
  description:
    'Découvrez des produits du Togo et du monde entier. Agriculture, artisanat, textile, technologie, beauté et plus encore.',
};

const CATEGORIES = [
  {
    id: 'agriculture',
    name: 'Agriculture & Agroalimentaire',
    description: 'Cacao, café, coton, maïs, riz et produits du terroir',
    icon: Wheat,
    color: 'from-emerald-brand/25 to-emerald-brand/5',
    accent: 'text-emerald-brand',
    slug: '/marketplace/agriculture',
  },
  {
    id: 'cafe-cacao',
    name: 'Café & Cacao',
    description: 'Grains, fèves, chocolat et dérivés premium',
    icon: Coffee,
    color: 'from-amber-600/25 to-amber-600/5',
    accent: 'text-amber-500',
    slug: '/marketplace/cafe-cacao',
  },
  {
    id: 'huiles-epices',
    name: 'Huiles & Épices',
    description: 'Huile de palme, karité, poivre, piment, gingembre',
    icon: Droplets,
    color: 'from-gold/25 to-gold/5',
    accent: 'text-gold',
    slug: '/marketplace/huiles-epices',
  },
  {
    id: 'produits-mer',
    name: 'Produits de la mer',
    description: 'Poissons, crevettes, fruits de mer frais et séchés',
    icon: Fish,
    color: 'from-cyan-500/25 to-cyan-500/5',
    accent: 'text-cyan-400',
    slug: '/marketplace/produits-mer',
  },
  {
    id: 'artisanat',
    name: 'Artisanat & Arts',
    description: 'Sculptures, poteries, tissage, objets décoratifs',
    icon: Palette,
    color: 'from-purple-500/25 to-purple-500/5',
    accent: 'text-purple-400',
    slug: '/marketplace/artisanat',
  },
  {
    id: 'textile-vetements',
    name: 'Textile & Vêtements',
    description: 'Pagnes, wax, bazin, vêtements traditionnels et modernes',
    icon: Shirt,
    color: 'from-pink-500/25 to-pink-500/5',
    accent: 'text-pink-400',
    slug: '/marketplace/textile-vetements',
  },
  {
    id: 'chaussures',
    name: 'Chaussures & Accessoires',
    description: 'Chaussures en cuir, sandales, sacs et maroquinerie',
    icon: Footprints,
    color: 'from-orange-500/25 to-orange-500/5',
    accent: 'text-orange-400',
    slug: '/marketplace/chaussures',
  },
  {
    id: 'manufactures',
    name: 'Produits manufacturés',
    description: 'Articles fabriqués localement et importés',
    icon: Factory,
    color: 'from-blue-500/25 to-blue-500/5',
    accent: 'text-blue-400',
    slug: '/marketplace/manufactures',
  },
  {
    id: 'technologie',
    name: 'Technologie & Équipements',
    description: 'Électronique, informatique, outils professionnels',
    icon: Laptop,
    color: 'from-indigo-500/25 to-indigo-500/5',
    accent: 'text-indigo-400',
    slug: '/marketplace/technologie',
  },
  {
    id: 'beaute-soins',
    name: 'Beauté & Soins',
    description: 'Cosmétiques naturels, soins corporels, parfums',
    icon: Sparkles,
    color: 'from-rose-500/25 to-rose-500/5',
    accent: 'text-rose-400',
    slug: '/marketplace/beaute-soins',
  },
  {
    id: 'maison',
    name: 'Maison & Décoration',
    description: 'Mobilier, décoration intérieure, arts de la table',
    icon: Home,
    color: 'from-teal-500/25 to-teal-500/5',
    accent: 'text-teal-400',
    slug: '/marketplace/maison',
  },
  {
    id: 'automobile',
    name: 'Automobile & Pièces',
    description: 'Véhicules, pièces détachées, accessoires auto',
    icon: Car,
    color: 'from-slate-500/25 to-slate-500/5',
    accent: 'text-slate-400',
    slug: '/marketplace/automobile',
  },
];

export default function MarketplacePage() {
  return (
    <div className="bg-night min-h-screen">
      {/* ============================================
          1. HERO — MARKETPLACE
      ============================================ */}
      <section className="relative overflow-hidden">
        {/* Halos décoratifs */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-emerald-brand/10 blur-3xl" />
        <div className="pointer-events-none absolute top-20 -right-40 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">
          {/* Fil d'Ariane */}
          <nav className="flex items-center gap-2 text-sm text-muted mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">Marketplace</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-emerald-brand/40 bg-emerald-brand/10 text-emerald-brand text-xs font-semibold uppercase tracking-wider mb-6">
            <Globe size={14} />
            Commerce national & international
          </div>

          {/* Titre */}
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl">
            Marketplace{' '}
            <span className="text-emerald-brand">Kpalimé-Trade</span>
          </h1>

          {/* Sous-titre */}
          <p className="text-lg md:text-xl text-muted max-w-3xl mb-10 leading-relaxed">
            Découvrez des produits du Togo et du monde entier. Du champ à
            l'étagère, du producteur au consommateur.
          </p>

          {/* Barre de recherche */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
              />
              <input
                type="text"
                placeholder="Rechercher un produit, une catégorie..."
                className="w-full pl-12 pr-4 py-4 rounded-md bg-night-light border border-white/10 text-white placeholder-muted text-base focus:border-emerald-brand focus:outline-none focus:ring-1 focus:ring-emerald-brand transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          2. CATÉGORIES PRINCIPALES
      ============================================ */}
      <section className="py-16 md:py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider mb-3">
              <Package size={16} />
              Nos catégories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Explorez par catégorie
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Des produits locaux aux importations internationales, trouvez tout
              ce dont vous avez besoin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  href={cat.slug}
                  prefetch
                  className={`group relative overflow-hidden rounded-md border border-white/10 bg-gradient-to-br ${cat.color} p-6 hover:border-emerald-brand/50 hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-md bg-white/10 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon size={24} className={cat.accent} />
                      </div>
                      <ArrowRight
                        size={18}
                        className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all"
                      />
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white/70 group-hover:text-white transition-colors">
                      Découvrir
                      <ChevronRight size={14} />
                    </div>
                  </div>

                  {/* Effet hover */}
                  <div className="absolute inset-0 bg-emerald-brand/0 group-hover:bg-emerald-brand/5 transition-all duration-300" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          3. CTA — DEVENIR VENDEUR (futur)
      ============================================ */}
      <section className="py-16 md:py-20 bg-night-light/30 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-md bg-gradient-to-br from-emerald-brand/20 via-night-light to-gold/10 border border-emerald-brand/30 p-8 md:p-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gold/20 text-gold text-xs font-semibold uppercase tracking-wider mb-4">
              <Globe size={14} />
              Bientôt disponible
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Devenez vendeur sur Kpalimé-Trade
            </h2>
            <p className="text-muted max-w-2xl mx-auto mb-6 leading-relaxed">
              Vous êtes producteur, artisan, fabricant ou distributeur ? Rejoignez
              notre marketplace et touchez des clients au Togo et à l'international.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="touch-target inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-all"
              >
                Nous contacter
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          4. CTA FINAL — RETOUR ACCUEIL
      ============================================ */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted mb-4">
            Vous explorez un autre pôle de la plateforme ?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-emerald-brand font-semibold hover:text-emerald-light transition-colors"
          >
            Retour à l'accueil
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}