import Link from 'next/link';
import {
  Wheat,
  Droplets,
  Leaf,
  Package,
  ArrowRight,
  Globe,
  ShieldCheck,
  Truck,
  Award,
  Sprout,
  ChevronRight,
} from 'lucide-react';

export const metadata = {
  title: 'Produits Agricoles & Agroalimentaires | Kpalimé-Trade',
  description:
    'Découvrez les produits agricoles et agroalimentaires du Togo : matières premières, huiles, épices et produits transformés. Commerce national et international.',
};

const CATEGORIES = [
  {
    id: 'matieres-premieres',
    name: 'Produits agricoles & matières premières',
    description:
      'Cacao, café, coton, maïs, riz, soja et autres cultures vivrières et de rente du Togo.',
    icon: Wheat,
    color: 'from-emerald-brand/25 to-emerald-brand/5',
    accent: 'text-emerald-brand',
    slug: '/produits/matieres-premieres',
  },
  {
    id: 'huiles',
    name: 'Huiles & produits oléagineux',
    description:
      'Huile de palme, huile d’arachide, beurre de karité, huile de coco et dérivés naturels.',
    icon: Droplets,
    color: 'from-gold/25 to-gold/5',
    accent: 'text-gold',
    slug: '/produits/huiles',
  },
  {
    id: 'epices',
    name: 'Épices & produits naturels',
    description:
      'Poivre, piment, gingembre, curcuma, moringa et plantes médicinales du terroir.',
    icon: Leaf,
    color: 'from-orange-500/25 to-orange-500/5',
    accent: 'text-orange-400',
    slug: '/produits/epices',
  },
  {
    id: 'transformes',
    name: 'Produits transformés',
    description:
      'Chocolat, biscuits, conserves, jus naturels, farine et produits finis made in Togo.',
    icon: Package,
    color: 'from-purple-500/25 to-purple-500/5',
    accent: 'text-purple-400',
    slug: '/produits/transformes',
  },
];

const AVANTAGES = [
  {
    icon: Sprout,
    title: 'Origine Togo garantie',
    description: 'Tous nos produits sont sourcés directement auprès de producteurs locaux vérifiés.',
  },
  {
    icon: ShieldCheck,
    title: 'Qualité & traçabilité',
    description: 'Contrôle qualité rigoureux et traçabilité complète de la récolte à la livraison.',
  },
  {
    icon: Award,
    title: 'Standards internationaux',
    description: 'Conformité aux normes d’exportation : ISO, HACCP, certifications bio disponibles.',
  },
  {
    icon: Truck,
    title: 'Logistique maîtrisée',
    description: 'Partenaires logistiques fiables pour l’acheminement national et international.',
  },
];

export default function ProduitsPage() {
  return (
    <div className="bg-night min-h-screen">
      {/* ============================================
          1. HERO — POLE COMMERCE
      ============================================ */}
      <section className="relative overflow-hidden">
        {/* Halos décoratifs */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-emerald-brand/10 blur-3xl" />
        <div className="pointer-events-none absolute top-20 -left-40 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">
          {/* Fil d'Ariane */}
          <nav className="flex items-center gap-2 text-sm text-muted mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">Produits agricoles & agroalimentaires</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-emerald-brand/40 bg-emerald-brand/10 text-emerald-brand text-xs font-semibold uppercase tracking-wider mb-6">
            <Wheat size={14} />
            Pôle Commerce & Produits
          </div>

          {/* Titre */}
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl">
            Produits agricoles &{' '}
            <span className="text-emerald-brand">agroalimentaires</span>
          </h1>

          {/* Sous-titre */}
          <p className="text-lg md:text-xl text-muted max-w-3xl mb-10 leading-relaxed">
            Le Togo, terre d’abondance. Découvrez nos quatre grandes familles de
            produits, cultivés et transformés selon les traditions locales, prêts
            pour le commerce national et l’exportation internationale.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#categories"
              className="touch-target inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-all shadow-xl shadow-emerald-brand/30"
            >
              Explorer les catégories
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="touch-target inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md border-2 border-white/20 text-white font-semibold hover:bg-white/10 transition-all"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          2. LES 4 GRANDES FAMILLES DE PRODUITS
      ============================================ */}
      <section id="categories" className="py-16 md:py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider mb-3">
              <Package size={16} />
              Nos catégories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Les 4 grandes familles de produits
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Une offre complète, de la matière première au produit fini, pour
              répondre à tous les besoins du commerce local et international.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  href={cat.slug}
                  prefetch
                  className={`group relative overflow-hidden rounded-md border border-white/10 bg-gradient-to-br ${cat.color} p-8 hover:border-emerald-brand/50 hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 rounded-md bg-white/10 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={28} className={cat.accent} />
                      </div>
                      <ArrowRight
                        size={20}
                        className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all"
                      />
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                      {cat.name}
                    </h3>
                    <p className="text-muted text-sm md:text-base leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                      Découvrir cette catégorie
                      <ChevronRight size={16} />
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
          3. POURQUOI NOS PRODUITS
      ============================================ */}
      <section className="py-16 md:py-20 bg-night-light/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider mb-3">
              <Award size={16} />
              Nos engagements
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Pourquoi choisir nos produits ?
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Une filière agricole togolaise rigoureuse, tournée vers l’excellence
              et l’international.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AVANTAGES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-md border border-white/10 bg-night p-6 hover:border-emerald-brand/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-md bg-emerald-brand/20 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-emerald-brand" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          4. VERS L'EXPORT & VENTE EN GROS
      ============================================ */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-md bg-gradient-to-br from-emerald-brand/20 via-night-light to-gold/10 border border-emerald-brand/30 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gold/20 text-gold text-xs font-semibold uppercase tracking-wider mb-4">
                  <Globe size={14} />
                  Commerce international
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Prêts pour l’exportation et la vente en gros
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                  Notre plateforme se développe pour accompagner les acheteurs
                  professionnels, les importateurs et les distributeurs
                  internationaux. Demande de devis, échantillons, logistique
                  export : tout sera bientôt disponible.
                </p>
                <div className="space-y-3">
                  {[
                    'Vente en gros et demi-gros',
                    'Demande de devis professionnels',
                    'Échantillons et certifications',
                    'Accompagnement export (CEDEAO, UE, international)',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-brand/30 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-brand" />
                      </div>
                      <span className="text-white text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="touch-target flex items-center justify-center gap-2 px-6 py-4 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-all shadow-lg shadow-emerald-brand/30"
                >
                  <Globe size={18} />
                  Devenir partenaire export
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/contact"
                  className="touch-target flex items-center justify-center gap-2 px-6 py-4 rounded-md bg-gold text-night font-semibold hover:bg-gold-light transition-all shadow-lg shadow-gold/30"
                >
                  <Package size={18} />
                  Demander un devis professionnel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          5. CTA FINAL — RETOUR ACCUEIL
      ============================================ */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted mb-4">Vous explorez un autre pôle de la plateforme ?</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-emerald-brand font-semibold hover:text-emerald-light transition-colors"
          >
            Retour à l’accueil
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}