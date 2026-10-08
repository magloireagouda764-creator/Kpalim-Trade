import Link from 'next/link';
import {
  Map,
  Hotel,
  UtensilsCrossed,
  Landmark,
  Palette,
  Music,
  CalendarDays,
  Compass,
  Search,
  ArrowRight,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const metadata = {
  title: 'Découvrir le Togo | Kpalimé-Trade',
  description:
    'Explorez les destinations, les cultures, les traditions, les saveurs, les arts et les expériences qui font la richesse du Togo.',
};

/**
 * Les 8 grandes rubriques du Pôle 2 — Découvrir le Togo
 */
const DISCOVER_SECTIONS = [
  {
    id: 'destinations',
    name: 'Destinations & Tourisme',
    description:
      'Découvrir les différentes destinations et lieux touristiques du Togo.',
    icon: Map,
    href: '/tourism',
    color: 'from-emerald-brand/20 to-emerald-brand/5',
    accent: 'text-emerald-brand',
  },
  {
    id: 'hotels',
    name: 'Hôtels & Hébergements',
    description:
      'Trouver des hôtels, hébergements et établissements pour votre séjour.',
    icon: Hotel,
    href: '/hotels',
    color: 'from-gold/20 to-gold/5',
    accent: 'text-gold',
  },
  {
    id: 'restaurants',
    name: 'Restaurants & Gastronomie',
    description:
      'Découvrir les restaurants, la cuisine et les spécialités locales.',
    icon: UtensilsCrossed,
    href: '/restaurants',
    color: 'from-orange-500/20 to-orange-500/5',
    accent: 'text-orange-400',
  },
  {
    id: 'culture',
    name: 'Culture & Patrimoine',
    description:
      "Découvrir l'histoire, les traditions, le patrimoine et la diversité culturelle.",
    icon: Landmark,
    href: '/culture',
    color: 'from-purple-500/20 to-purple-500/5',
    accent: 'text-purple-400',
  },
  {
    id: 'arts-artisanat',
    name: 'Arts & Artisanat',
    description:
      'Découvrir les artistes, artisans, savoir-faire et créations du Togo.',
    icon: Palette,
    href: '/culture',
    color: 'from-pink-500/20 to-pink-500/5',
    accent: 'text-pink-400',
  },
  {
    id: 'musique',
    name: 'Musique & Divertissement',
    description:
      'Découvrir les artistes, musiciens, spectacles et activités culturelles.',
    icon: Music,
    href: '/events',
    color: 'from-fuchsia-500/20 to-fuchsia-500/5',
    accent: 'text-fuchsia-400',
  },
  {
    id: 'evenements',
    name: 'Événements',
    description:
      'Découvrir les événements, festivals, manifestations et rendez-vous au Togo.',
    icon: CalendarDays,
    href: '/events',
    color: 'from-cyan-500/20 to-cyan-500/5',
    accent: 'text-cyan-400',
  },
  {
    id: 'experiences',
    name: 'Expériences & Activités',
    description:
      'Découvrir les activités, excursions, visites et expériences proposées aux visiteurs.',
    icon: Compass,
    href: '/tourism',
    color: 'from-amber-500/20 to-amber-500/5',
    accent: 'text-amber-400',
  },
];

/**
 * Les 5 régions économiques du Togo
 */
const FEATURED_DESTINATIONS = [
  { name: 'Maritime', region: 'Chef-lieu : Lomé', icon: MapPin },
  { name: 'Plateaux', region: 'Chef-lieu : Atakpamé', icon: MapPin },
  { name: 'Centrale', region: 'Chef-lieu : Sokodé', icon: MapPin },
  { name: 'Kara', region: 'Chef-lieu : Kara', icon: MapPin },
  { name: 'Savanes', region: 'Chef-lieu : Dapaong', icon: MapPin },
];

export default function DiscoverTogoPage() {
  return (
    <div className="bg-night min-h-screen">
      {/* ============================================
          1. HERO — Présentation forte du Pôle 2
      ============================================ */}
      <section className="relative overflow-hidden border-b border-white/10">
        {/* Halos décoratifs */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute top-20 -left-40 w-96 h-96 rounded-full bg-emerald-brand/10 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -right-40 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gold/30 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles size={14} />
            Pôle 2 — Découvrir le Togo
          </div>

          {/* Titre principal */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Découvrez le <span className="text-gold">Togo</span>
          </h1>

          {/* Sous-titre */}
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
            Explorez les destinations, les cultures, les traditions, les saveurs,
            les arts et les expériences qui font la richesse du Togo.
          </p>
        </div>
      </section>

      {/* ============================================
          2. LES 5 RÉGIONS DU TOGO
      ============================================ */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Les 5 régions du Togo
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Découvrez les richesses de chaque région économique du pays
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {FEATURED_DESTINATIONS.map((dest) => {
              const Icon = dest.icon;
              return (
                <Link
                  key={dest.name}
                  href="/tourism"
                  prefetch
                  className="flex flex-col items-center gap-3 p-5 rounded-md bg-night border border-white/10 hover:border-gold hover:-translate-y-1 transition-all touch-target"
                >
                  <Icon size={24} className="text-gold" />
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm">{dest.name}</p>
                    <p className="text-muted text-xs mt-0.5">{dest.region}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          3. UNE RICHESSE INFINIE À EXPLORER
      ============================================ */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-md bg-gradient-to-br from-gold/10 via-night-light to-emerald-brand/10 border border-gold/30 p-8 md:p-12 text-center">
            <Sparkles size={40} className="text-gold mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Une richesse infinie à explorer
            </h2>
            <p className="text-muted max-w-2xl mx-auto leading-relaxed">
              Du littoral aux montagnes, des marchés traditionnels aux festivals
              contemporains, le Togo offre une diversité culturelle et naturelle
              unique. Kpalimé-Trade vous accompagne dans cette découverte.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          4. BARRE DE RECHERCHE
      ============================================ */}
      <section className="py-8 md:py-12">
        <div className="max-w-3xl mx-auto px-4">
          <form
            action="/search"
            method="GET"
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
              />
              <input
                type="text"
                name="q"
                placeholder="Que souhaitez-vous découvrir au Togo ?"
                className="w-full pl-12 pr-4 py-4 rounded-md bg-night-light border border-white/10 text-white placeholder-muted text-base focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
              />
            </div>
            <button
              type="submit"
              className="touch-target px-6 py-4 rounded-md bg-gold text-night font-semibold hover:bg-gold-light transition-all shadow-lg shadow-gold/30"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      </section>

      {/* ============================================
          5. LES 8 GRANDES RUBRIQUES — Explorez le Togo
      ============================================ */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Explorez le Togo
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Huit grandes portes d'entrée pour découvrir toutes les richesses du pays
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DISCOVER_SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.id}
                  href={section.href}
                  prefetch
                  className={`group relative overflow-hidden rounded-md border border-white/10 bg-gradient-to-br ${section.color} p-6 hover:border-gold/50 hover:-translate-y-1 transition-all duration-300 touch-target`}
                >
                  <div className="relative z-10 flex flex-col items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-md bg-white/10 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-all duration-300`}
                    >
                      <Icon size={24} className={section.accent} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base mb-1.5">
                        {section.name}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed line-clamp-3">
                        {section.description}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-1 ${section.accent} text-xs font-semibold mt-auto`}
                    >
                      <span>Explorer</span>
                      <ArrowRight
                        size={12}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-all duration-300" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}