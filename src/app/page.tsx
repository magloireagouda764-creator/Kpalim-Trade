import Link from 'next/link';
import {
  ShoppingBag,
  Building2,
  Hotel,
  Palmtree,
  UtensilsCrossed,
  Wrench,
  CalendarDays,
  Palette,
  ArrowRight,
  Search,
  Globe,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';

const APP_NAME = 'Kpalimé-Trade';

const CATEGORIES = [
  { name: 'Agriculture & Agroalimentaire', slug: '/marketplace', icon: ShoppingBag, color: 'from-green-500/20 to-green-500/5' },
  { name: 'Café, Cacao & Produits agricoles', slug: '/marketplace', icon: Palmtree, color: 'from-amber-600/20 to-amber-600/5' },
  { name: 'Huiles & Épices', slug: '/marketplace', icon: UtensilsCrossed, color: 'from-yellow-500/20 to-yellow-500/5' },
  { name: 'Produits de la mer', slug: '/marketplace', icon: Globe, color: 'from-blue-500/20 to-blue-500/5' },
  { name: 'Arts & Artisanat', slug: '/marketplace', icon: Palette, color: 'from-purple-500/20 to-purple-500/5' },
  { name: 'Textile & Vêtements', slug: '/marketplace', icon: Building2, color: 'from-pink-500/20 to-pink-500/5' },
  { name: 'Chaussures & Accessoires', slug: '/marketplace', icon: Wrench, color: 'from-rose-500/20 to-rose-500/5' },
  { name: 'Produits manufacturés', slug: '/marketplace', icon: ShoppingBag, color: 'from-slate-500/20 to-slate-500/5' },
  { name: 'Technologie & Équipements', slug: '/marketplace', icon: TrendingUp, color: 'from-cyan-500/20 to-cyan-500/5' },
  { name: 'Beauté & Soins', slug: '/marketplace', icon: ShieldCheck, color: 'from-fuchsia-500/20 to-fuchsia-500/5' },
  { name: 'Maison & Décoration', slug: '/marketplace', icon: Hotel, color: 'from-orange-500/20 to-orange-500/5' },
  { name: 'Automobile & Pièces', slug: '/marketplace', icon: CalendarDays, color: 'from-gray-500/20 to-gray-500/5' },
];

const FEATURES = [
  {
    icon: Globe,
    title: 'Marché local & international',
    description: 'Connectez-vous aux meilleurs producteurs et services du Togo.',
  },
  {
    icon: ShieldCheck,
    title: 'Transactions sécurisées',
    description: 'Paiement à la livraison et vérification des vendeurs.',
  },
  {
    icon: TrendingUp,
    title: 'Croissance continue',
    description: 'Une plateforme en pleine expansion pour votre business.',
  },
];

export default function HomePage() {
  return (
    <div className="bg-night min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-emerald-brand/10 blur-3xl" />
        <div className="pointer-events-none absolute top-20 -left-40 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -right-40 w-96 h-96 rounded-full bg-emerald-brand/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gold/30 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider mb-6">
            <Globe size={14} />
            Le Togo ouvre ses portes au monde
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            {APP_NAME}
          </h1>

          <p className="text-2xl md:text-3xl font-light text-white/90 mb-4">
            Le Togo ouvre ses portes au monde.
          </p>

          <p className="text-base md:text-lg text-muted max-w-3xl mx-auto mb-10 leading-relaxed">
            Découvrez les produits, entreprises, services, destinations, établissements
            et richesses culturelles du Togo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <Link
              href="/marketplace"
              prefetch
              className="touch-target flex items-center justify-center gap-3 px-8 py-4 rounded-md bg-emerald-brand text-white font-semibold text-lg hover:bg-emerald-light transition-all shadow-xl shadow-emerald-brand/30 hover:shadow-emerald-brand/50 hover:-translate-y-0.5"
            >
              <ShoppingBag size={24} />
              Explorer les produits
              <ArrowRight size={20} />
            </Link>

            <Link
              href="/tourism"
              prefetch
              className="touch-target flex items-center justify-center gap-3 px-8 py-4 rounded-md bg-gold text-night font-semibold text-lg hover:bg-gold-light transition-all shadow-xl shadow-gold/30 hover:shadow-gold/50 hover:-translate-y-0.5"
            >
              <Palmtree size={24} />
              Découvrir le Togo
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION CATÉGORIES */}
      <section className="relative py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider mb-3">
              <Search size={16} />
              Marketplace Kpalimé-Trade
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Que recherchez-vous ?
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Explorez nos catégories de produits — du local à l'international
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  href={cat.slug}
                  prefetch
                  className={`group relative overflow-hidden rounded-md border border-white/10 bg-gradient-to-br ${cat.color} p-5 hover:border-emerald-brand/50 hover:-translate-y-1 transition-all duration-300 touch-target`}
                >
                  <div className="relative z-10 flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-md bg-white/10 backdrop-blur flex items-center justify-center group-hover:bg-emerald-brand group-hover:scale-110 transition-all duration-300">
                      <Icon size={24} className="text-white" />
                    </div>
                    <span className="text-white font-semibold text-sm">
                      {cat.name}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-emerald-brand/0 group-hover:bg-emerald-brand/10 transition-all duration-300" />
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/marketplace"
              prefetch
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-all"
            >
              Voir tout le marketplace
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION PRODUITS VEDETTE */}
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
              href="/marketplace"
              prefetch
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-light transition-colors"
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

      {/* SECTION POURQUOI */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Pourquoi choisir {APP_NAME} ?
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Une plateforme pensée pour le Togo et ouverte au monde
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-md border border-white/10 bg-night-light p-6 hover:border-emerald-brand/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-md bg-emerald-brand/20 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-emerald-brand" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}