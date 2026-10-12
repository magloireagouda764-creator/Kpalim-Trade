// Déploiement Vercelimport Link from 'next/link';
import {
  ShoppingBag,
  Palmtree,
  Building2,
  Search,
  ArrowRight,
  Globe,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Hotel,
  UtensilsCrossed,
  CalendarDays,
  Palette,
  Wrench,
  Users,
  FileText,
  MessageCircle,
  Store,
  Briefcase,
  Handshake,
  Sparkles,
  Coffee,
  Shirt,
  Wheat,
} from 'lucide-react';

const APP_NAME = 'Kpalimé-Trade';

// Accès rapides "Que recherchez-vous ?"
const QUICK_LINKS = [
  { name: 'Produits agricoles', href: '/marketplace', icon: Wheat, color: 'from-emerald-brand/20 to-emerald-brand/5' },
  { name: 'Entreprises', href: '/services', icon: Building2, color: 'from-blue-500/20 to-blue-500/5' },
  { name: 'Hôtels', href: '/hotels', icon: Hotel, color: 'from-gold/20 to-gold/5' },
  { name: 'Restaurants', href: '/restaurants', icon: UtensilsCrossed, color: 'from-orange-500/20 to-orange-500/5' },
  { name: 'Tourisme', href: '/tourism', icon: Palmtree, color: 'from-emerald-brand/20 to-emerald-brand/5' },
  { name: 'Services', href: '/services', icon: Wrench, color: 'from-cyan-500/20 to-cyan-500/5' },
  { name: 'Événements', href: '/events', icon: CalendarDays, color: 'from-pink-500/20 to-pink-500/5' },
  { name: 'Culture', href: '/culture', icon: Palette, color: 'from-purple-500/20 to-purple-500/5' },
];

// Exemples de produits du Togo (non limitatifs)
const TOGO_PRODUCTS = [
  { name: 'Café', icon: Coffee, slug: '/marketplace' },
  { name: 'Cacao', icon: Wheat, slug: '/marketplace' },
  { name: 'Coton', icon: Shirt, slug: '/marketplace' },
  { name: 'Artisanat', icon: Palette, slug: '/marketplace' },
  { name: 'Textile', icon: Shirt, slug: '/marketplace' },
  { name: 'Produits agricoles', icon: Wheat, slug: '/marketplace' },
];

export default function HomePage() {
  return (
    <div className="bg-night min-h-screen">
      {/* ============================================
          1. HERO PRINCIPAL
      ============================================ */}
      <section className="relative overflow-hidden">
        {/* Halos décoratifs */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-emerald-brand/10 blur-3xl" />
        <div className="pointer-events-none absolute top-20 -left-40 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -right-40 w-96 h-96 rounded-full bg-emerald-brand/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gold/30 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider mb-6">
            <Globe size={14} />
            Plateforme commerciale & économique
          </div>

          {/* Titre principal */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Le Togo ouvre ses portes{' '}
            <span className="text-emerald-brand">au monde</span>
          </h1>

          {/* Sous-titre */}
          <p className="text-base md:text-xl text-muted max-w-3xl mx-auto mb-10 leading-relaxed">
            {APP_NAME} connecte les produits, les entreprises, les services, les talents et les opportunités du Togo avec le marché national et international.
          </p>

          {/* Barre de recherche */}
          <div className="max-w-3xl mx-auto mb-10">
            <form
              action="/search"
              method="GET"
              className="flex gap-2"
            >
              <div className="relative flex-1">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                <input
                  type="text"
                  name="q"
                  placeholder="Rechercher un produit, une entreprise, un fournisseur ou un service..."
                  className="w-full pl-12 pr-4 py-4 rounded-md bg-night-light border border-white/10 text-white placeholder-muted text-base focus:border-emerald-brand focus:outline-none focus:ring-1 focus:ring-emerald-brand transition-all"
                />
              </div>
              <button
                type="submit"
                className="touch-target px-6 py-4 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-all shadow-lg shadow-emerald-brand/30"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* 3 boutons d'accès rapide */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-3xl mx-auto">
            <Link
              href="/marketplace"
              prefetch
              className="touch-target flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-all"
            >
              <ShoppingBag size={20} />
              Explorer les produits
            </Link>
            <Link
              href="/discover"
              prefetch
              className="touch-target flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-gold text-night font-semibold hover:bg-gold-light transition-all"
            >
              <Palmtree size={20} />
              Découvrir le Togo
            </Link>
            <Link
              href="/services"
              prefetch
              className="touch-target flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-white/10 text-white font-semibold hover:bg-white/20 border border-white/20 transition-all"
            >
              <Building2 size={20} />
              Entreprises & Services
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          2. LES 3 PÔLES — Explorez Kpalimé-Trade
      ============================================ */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Explorez {APP_NAME}
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Trois grandes portes d'entrée vers l'écosystème économique et culturel
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Pôle 1 — Marketplace */}
            <div className="group relative overflow-hidden rounded-md border border-white/10 bg-gradient-to-br from-emerald-brand/10 to-night-light p-8 hover:border-emerald-brand/50 transition-all">
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-md bg-emerald-brand/20 flex items-center justify-center mb-5">
                  <ShoppingBag size={28} className="text-emerald-brand" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Marketplace</h3>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  Découvrez des produits du Togo et d'ailleurs, trouvez des fournisseurs et développez vos opportunités commerciales.
                </p>
                <Link
                  href="/marketplace"
                  prefetch
                  className="inline-flex items-center gap-2 text-emerald-brand font-semibold hover:gap-3 transition-all"
                >
                  Explorer les produits <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Pôle 2 — Découvrir le Togo */}
            <div className="group relative overflow-hidden rounded-md border border-white/10 bg-gradient-to-br from-gold/10 to-night-light p-8 hover:border-gold/50 transition-all">
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-md bg-gold/20 flex items-center justify-center mb-5">
                  <Palmtree size={28} className="text-gold" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Découvrir le Togo</h3>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  Explorez les destinations, la culture, le tourisme, les arts, l'artisanat et les expériences du Togo.
                </p>
                <Link
                  href="/discover"
                  prefetch
                  className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all"
                >
                  Découvrir le Togo <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Pôle 3 — Entreprises & Services */}
            <div className="group relative overflow-hidden rounded-md border border-white/10 bg-gradient-to-br from-blue-500/10 to-night-light p-8 hover:border-blue-500/50 transition-all">
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-md bg-blue-500/20 flex items-center justify-center mb-5">
                  <Building2 size={28} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Entreprises & Services</h3>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  Trouvez des entreprises, des professionnels, des fournisseurs et des services adaptés à vos besoins.
                </p>
                <Link
                  href="/services"
                  prefetch
                  className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:gap-3 transition-all"
                >
                  Explorer les entreprises & services <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          3. QUE RECHERCHEZ-VOUS ? (Accès rapides)
      ============================================ */}
      <section className="py-16 md:py-20 bg-night-light/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Que recherchez-vous ?
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Accédez rapidement aux principales catégories
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {QUICK_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  prefetch
                  className={`group relative overflow-hidden rounded-md border border-white/10 bg-gradient-to-br ${link.color} p-5 hover:border-emerald-brand/50 hover:-translate-y-1 transition-all duration-300 touch-target`}
                >
                  <div className="relative z-10 flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-md bg-white/10 backdrop-blur flex items-center justify-center group-hover:bg-emerald-brand group-hover:scale-110 transition-all duration-300">
                      <Icon size={24} className="text-white" />
                    </div>
                    <span className="text-white font-semibold text-sm">
                      {link.name}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-emerald-brand/0 group-hover:bg-emerald-brand/10 transition-all duration-300" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          4. PRODUITS DU TOGO (exemples)
      ============================================ */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                Découvrez les produits du Togo
                <span className="h-1 w-12 bg-gold rounded-full" />
              </h2>
              <p className="text-muted mt-2">
                Quelques exemples de richesses locales (liste non exhaustive)
              </p>
            </div>
            <Link
              href="/marketplace"
              prefetch
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-light transition-colors"
            >
              Voir tous les produits <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {TOGO_PRODUCTS.map((product) => {
              const Icon = product.icon;
              return (
                <Link
                  key={product.name}
                  href={product.slug}
                  prefetch
                  className="flex flex-col items-center gap-3 p-5 rounded-md bg-night-light border border-white/10 hover:border-gold hover:-translate-y-1 transition-all touch-target"
                >
                  <Icon size={28} className="text-emerald-brand" />
                  <span className="text-white font-medium text-sm text-center">
                    {product.name}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="sm:hidden mt-6 text-center">
            <Link
              href="/marketplace"
              prefetch
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-colors"
            >
              Voir tous les produits <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          5. OPPORTUNITÉS COMMERCIALES
      ============================================ */}
      <section className="py-16 md:py-20 bg-night-light/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Opportunités commerciales
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Plus qu'une boutique : une plateforme de mise en relation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-md border border-white/10 bg-night p-6 hover:border-emerald-brand/50 transition-all">
              <div className="w-12 h-12 rounded-md bg-emerald-brand/20 flex items-center justify-center mb-4">
                <ShoppingBag size={24} className="text-emerald-brand" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Acheter</h3>
              <p className="text-muted text-sm leading-relaxed">
                Trouvez les produits dont vous avez besoin auprès de vendeurs vérifiés.
              </p>
            </div>

            <div className="rounded-md border border-white/10 bg-night p-6 hover:border-gold/50 transition-all">
              <div className="w-12 h-12 rounded-md bg-gold/20 flex items-center justify-center mb-4">
                <Users size={24} className="text-gold" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Trouver un fournisseur</h3>
              <p className="text-muted text-sm leading-relaxed">
                Identifiez des producteurs et fournisseurs pour vos besoins commerciaux.
              </p>
            </div>

            <div className="rounded-md border border-white/10 bg-night p-6 hover:border-blue-500/50 transition-all">
              <div className="w-12 h-12 rounded-md bg-blue-500/20 flex items-center justify-center mb-4">
                <FileText size={24} className="text-blue-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Demander un devis</h3>
              <p className="text-muted text-sm leading-relaxed">
                Envoyez une demande personnalisée pour vos besoins commerciaux.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          6. SECTION PROFESSIONNELS
      ============================================ */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-md bg-gradient-to-br from-emerald-brand/20 via-night-light to-gold/10 border border-emerald-brand/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-brand/20 text-emerald-brand text-xs font-semibold uppercase tracking-wider mb-3">
                <Briefcase size={14} />
                Espace professionnels
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Développez votre activité avec {APP_NAME}
              </h2>
              <p className="text-muted max-w-xl">
                Présentez votre entreprise, vos produits ou vos services et développez votre visibilité auprès de nouveaux clients et partenaires au Togo et à l'international.
              </p>
            </div>
            <Link
              href="/auth/register"
              prefetch
              className="touch-target inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-gold text-night font-semibold hover:bg-gold-light transition-all shadow-lg shadow-gold/25 shrink-0"
            >
              Rejoindre {APP_NAME}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          7. VISION INTERNATIONALE
      ============================================ */}
      <section className="py-16 md:py-20 bg-night-light/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Globe size={48} className="text-emerald-brand mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Du Togo vers le monde
          </h2>
          <p className="text-muted text-lg max-w-3xl mx-auto leading-relaxed">
            Les produits, entreprises et opportunités du Togo ouverts au monde.
            Une plateforme en évolution, pensée pour connecter le local à l'international.
          </p>
        </div>
      </section>
    </div>
  );
}