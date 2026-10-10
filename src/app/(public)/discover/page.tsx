import Link from 'next/link';
import Image from 'next/image';
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
  TreePine,
  type LucideIcon,
} from 'lucide-react';
import { TOGO_REGIONS } from '@/lib/togo-regions';

export const metadata = {
  title: 'Découvrir le Togo | Kpalimé-Trade',
  description:
    'Explorez les destinations, les cultures, les traditions, les saveurs, les arts et les expériences qui font la richesse du Togo.',
};

const ICON_MAP: Record<string, LucideIcon> = {
  MapPin,
  Hotel,
  UtensilsCrossed,
  Palette,
  Compass,
  CalendarDays,
  Hiking: Compass,
  Droplets: MapPin,
  Hammer: Palette,
  PawPrint: MapPin,
  Landmark,
  Home: MapPin,
  Mountain: MapPin,
  Image: MapPin,
};

/**
 * Les 9 grandes rubriques du Pôle 2 — Découvrir le Togo
 */
const DISCOVER_SECTIONS = [
  {
    id: 'destinations',
    name: 'Destinations & Tourisme',
    description: 'Découvrir les différentes destinations et lieux touristiques du Togo.',
    icon: Map,
    href: '/tourism',
    color: 'from-emerald-brand/20 to-emerald-brand/5',
    accent: 'text-emerald-brand',
  },
  {
    id: 'hotels',
    name: 'Hôtels & Hébergements',
    description: 'Trouver des hôtels, hébergements et établissements pour votre séjour.',
    icon: Hotel,
    href: '/hotels',
    color: 'from-gold/20 to-gold/5',
    accent: 'text-gold',
  },
  {
    id: 'restaurants',
    name: 'Restaurants & Gastronomie',
    description: 'Découvrir les restaurants, la cuisine et les spécialités locales.',
    icon: UtensilsCrossed,
    href: '/restaurants',
    color: 'from-orange-500/20 to-orange-500/5',
    accent: 'text-orange-400',
  },
  {
    id: 'culture',
    name: 'Culture & Patrimoine',
    description: "Découvrir l'histoire, les traditions, le patrimoine et la diversité culturelle.",
    icon: Landmark,
    href: '/culture',
    color: 'from-purple-500/20 to-purple-500/5',
    accent: 'text-purple-400',
  },
  {
    id: 'arts-artisanat',
    name: 'Arts & Artisanat',
    description: 'Découvrir les artistes, artisans, savoir-faire et créations du Togo.',
    icon: Palette,
    href: '/culture',
    color: 'from-pink-500/20 to-pink-500/5',
    accent: 'text-pink-400',
  },
  {
    id: 'musique',
    name: 'Musique & Divertissement',
    description: 'Découvrir les artistes, musiciens, spectacles et activités culturelles.',
    icon: Music,
    href: '/events',
    color: 'from-fuchsia-500/20 to-fuchsia-500/5',
    accent: 'text-fuchsia-400',
  },
  {
    id: 'evenements',
    name: 'Événements',
    description: 'Découvrir les événements, festivals, manifestations et rendez-vous au Togo.',
    icon: CalendarDays,
    href: '/events',
    color: 'from-cyan-500/20 to-cyan-500/5',
    accent: 'text-cyan-400',
  },
  {
    id: 'experiences',
    name: 'Expériences & Activités',
    description: 'Découvrir les activités, excursions, visites et expériences proposées aux visiteurs.',
    icon: Compass,
    href: '/tourism',
    color: 'from-amber-500/20 to-amber-500/5',
    accent: 'text-amber-400',
  },
  {
    id: 'vegetation',
    name: 'La végétation',
    description: 'Découvrir la flore, les forêts, les parcs naturels et la biodiversité du Togo.',
    icon: TreePine,
    href: '/tourism',
    color: 'from-green-600/20 to-green-600/5',
    accent: 'text-green-400',
  },
];

/**
 * Les 4 images à afficher entre le Hero et les 5 régions
 */
const SHOWCASE_IMAGES = [
  {
    src: '/images/discover/monuments/carte-togo-regions.jpg',
    alt: 'Carte administrative du Togo montrant les 5 régions économiques',
    caption: 'Les 5 régions du Togo',
  },
  {
    src: '/images/discover/monuments/colonne-paix-lions.jpg',
    alt: 'Monument de la Colonne de la Paix à Lomé avec les deux lions blancs',
    caption: 'Colonne de la Paix — Lomé',
  },
  {
    src: '/images/discover/monuments/drapeau-togolais-affiche.jpg',
    alt: 'Affiche éducative du drapeau togolais',
    caption: 'Le drapeau togolais',
  },
  {
    src: '/images/discover/monuments/monuments-colonne-paix.jpg',
    alt: 'Affiche éducative sur les monuments du Togo',
    caption: 'Monuments du Togo',
  },
  {
    src: '/images/discover/monuments/monument-independance.jpg',
    alt: 'Monument de l\'Indépendance du Togo à Lomé, commémorant le 27 avril 1960',
    caption: 'Monument de l\'Indépendance — Lomé',
  },
];

export default function DiscoverTogoPage() {
  return (
    <div className="bg-night min-h-screen">
      {/* ============================================
          1. HERO — Présentation forte du Pôle 2
      ============================================ */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute top-20 -left-40 w-96 h-96 rounded-full bg-emerald-brand/10 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -right-40 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gold/30 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles size={14} />
            Pôle 2 — Découvrir le Togo
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Découvrez le <span className="text-gold">Togo</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
            Explorez les destinations, les cultures, les traditions, les saveurs,
            les arts et les expériences qui font la richesse du Togo.
          </p>
        </div>
      </section>

      {/* ============================================
          2. GALERIE VISUELLE — 4 images du Togo
      ============================================ */}
      <section className="py-12 md:py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Symboles et richesses du Togo
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Quelques repères visuels pour commencer votre découverte
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SHOWCASE_IMAGES.map((img, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-md border border-white/10 bg-white/5"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-white">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-3 text-center bg-night-light">
                  <p className="text-white text-sm font-medium">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          3. LES 5 RÉGIONS DU TOGO — Cartes détaillées
      ============================================ */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Les 5 régions du Togo
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Chaque région offre des richesses uniques à découvrir
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {TOGO_REGIONS.map((region) => (
              <div
                key={region.id}
                className="group relative overflow-hidden rounded-md border border-white/10 bg-gradient-to-br from-night-light to-night p-6 hover:border-gold/50 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{region.emoji}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {region.name}
                    </h3>
                    <p className="text-sm text-gold font-medium">
                      Chef-lieu : {region.chefLieu}
                    </p>
                  </div>
                </div>

                <p className="text-muted text-sm leading-relaxed mb-5">
                  {region.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
                  {region.subCategories.map((sub) => {
                    const IconComponent = ICON_MAP[sub.icon] || MapPin;
                    return (
                      <div
                        key={sub.id}
                        className="flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 border border-white/5"
                      >
                        <IconComponent size={16} className="text-emerald-brand shrink-0" />
                        <span className="text-xs text-white font-medium truncate">
                          {sub.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <Link
                  href={`/discover/regions/${region.slug}`}
                  prefetch
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-emerald-brand text-white text-sm font-semibold hover:bg-emerald-light transition-all"
                >
                  Explorer cette région
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          4. BARRE DE RECHERCHE
      ============================================ */}
      <section className="py-8 md:py-12 bg-night-light/30 border-y border-white/5">
        <div className="max-w-3xl mx-auto px-4">
          <form action="/search" method="GET" className="flex gap-2">
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
              />
              <input
                type="text"
                name="q"
                placeholder="Que souhaitez-vous découvrir au Togo ?"
                className="w-full pl-12 pr-4 py-4 rounded-md bg-night border border-white/10 text-white placeholder-muted text-base focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
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
          5. LES 9 GRANDES RUBRIQUES — Explorez le Togo
      ============================================ */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Explorez le Togo
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Neuf grandes portes d'entrée pour découvrir toutes les richesses du pays
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <div className="w-12 h-12 rounded-md bg-white/10 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-all duration-300">
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
                    <div className={`flex items-center gap-1 ${section.accent} text-xs font-semibold mt-auto`}>
                      <span>Explorer</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-all duration-300" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          6. INVITATION FINALE
      ============================================ */}
      <section className="py-16 md:py-20 bg-night-light/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-md bg-gradient-to-br from-gold/10 via-night-light to-emerald-brand/10 border border-gold/30 p-8 md:p-12 text-center">
            <Sparkles size={40} className="text-gold mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Une richesse infinie à explorer
            </h2>
            <p className="text-muted max-w-2xl mx-auto mb-6 leading-relaxed">
              Du littoral aux montagnes, des marchés traditionnels aux festivals
              contemporains, le Togo offre une diversité culturelle et naturelle
              unique. Kpalimé-Trade vous accompagne dans cette découverte.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/tourism"
                prefetch
                className="touch-target inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-all"
              >
                <Map size={18} />
                Commencer l'exploration
              </Link>
              <Link
                href="/"
                prefetch
                className="touch-target inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-white/10 text-white font-semibold hover:bg-white/20 border border-white/20 transition-all"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}