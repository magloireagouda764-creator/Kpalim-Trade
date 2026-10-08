import Link from 'next/link';
import {
  Wheat,
  Sprout,
  Apple,
  Bean,
  Flower2,
  Package,
  MoreHorizontal,
  ArrowLeft,
  ArrowRight,
  Globe,
  Truck,
  FileText,
  MessageCircle,
  MapPin,
  Users,
  Scale,
  BadgeCheck,
} from 'lucide-react';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata = {
  title: 'Agriculture & Agroalimentaire | Kpalimé-Trade',
  description:
    'Découvrez une large sélection de produits agricoles et agroalimentaires du Togo et d\'ailleurs : céréales, tubercules, légumineuses, fruits, légumes, produits transformés et bien plus encore.',
};

// Sous-catégories évolutives — faciles à étendre
const SUB_CATEGORIES = [
  {
    slug: 'cereales',
    name: 'Céréales',
    description: 'Maïs, riz, mil, sorgho, blé, avoine et autres céréales.',
    icon: Wheat,
    color: 'from-amber-500/20 to-amber-500/5',
  },
  {
    slug: 'tubercules-racines',
    name: 'Tubercules & Racines',
    description: 'Manioc, igname, patate douce, taro et autres racines.',
    icon: Sprout,
    color: 'from-orange-500/20 to-orange-500/5',
  },
  {
    slug: 'fruits-legumes',
    name: 'Fruits & Légumes',
    description: 'Tomates, fruits frais, légumes verts et produits maraîchers.',
    icon: Apple,
    color: 'from-green-500/20 to-green-500/5',
  },
  {
    slug: 'legumineuses',
    name: 'Légumineuses',
    description: 'Haricots, soja, niébé, pois et autres légumineuses.',
    icon: Bean,
    color: 'from-lime-500/20 to-lime-500/5',
  },
  {
    slug: 'graines-oleagineux',
    name: 'Graines & Oléagineux',
    description: 'Arachide, sésame, karité, coton et autres graines.',
    icon: Flower2,
    color: 'from-yellow-500/20 to-yellow-500/5',
  },
  {
    slug: 'produits-transformes',
    name: 'Produits Transformés',
    description: 'Farines, huiles, conserves et produits agroalimentaires.',
    icon: Package,
    color: 'from-rose-500/20 to-rose-500/5',
  },
  {
    slug: 'autres',
    name: 'Autres produits',
    description: 'Tous les autres produits agricoles et agroalimentaires.',
    icon: MoreHorizontal,
    color: 'from-slate-500/20 to-slate-500/5',
  },
];

// Informations clés pour les acheteurs (futur : dynamique)
const BUYER_INFO = [
  {
    icon: Globe,
    title: 'Origine garantie',
    description: 'Produits du Togo et d\'Afrique de l\'Ouest, traçabilité assurée.',
  },
  {
    icon: Truck,
    title: 'Livraison & Export',
    description: 'Livraison locale et possibilité d\'exportation internationale.',
  },
  {
    icon: FileText,
    title: 'Devis sur mesure',
    description: 'Demandez un devis personnalisé selon vos quantités.',
  },
  {
    icon: MessageCircle,
    title: 'Contact direct',
    description: 'Échangez directement avec les producteurs et fournisseurs.',
  },
];

export default function AgricultureAgroalimentairePage() {
  return (
    <div className="bg-night min-h-screen">
      {/* ============================================
          BREADCRUMB
      ============================================ */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <Breadcrumb
          items={[
            { label: 'Marketplace', href: '/marketplace' },
            { label: 'Agriculture & Agroalimentaire' },
          ]}
        />
      </div>

      {/* ============================================
          HERO CATÉGORIE
      ============================================ */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-emerald-brand/10 blur-3xl" />
        <div className="pointer-events-none absolute top-20 -right-40 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-md bg-emerald-brand/20 border border-emerald-brand/30 flex items-center justify-center">
              <Wheat size={32} className="text-emerald-brand" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Agriculture & Agroalimentaire
              </h1>
              <p className="text-muted mt-2 flex items-center gap-2 text-sm">
                <MapPin size={14} className="text-gold" />
                Togo & Afrique de l'Ouest
                <span className="mx-2 text-white/20">•</span>
                <Users size={14} className="text-gold" />
                Producteurs & Fournisseurs vérifiés
              </p>
            </div>
          </div>

          <p className="text-lg md:text-xl text-white/90 max-w-4xl leading-relaxed">
            Découvrez une large sélection de <span className="text-emerald-brand font-medium">produits agricoles et agroalimentaires</span> du Togo et d'ailleurs :
            céréales, tubercules, légumineuses, fruits, légumes, produits transformés et bien plus encore.
          </p>

          {/* Stats rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            {[
              { label: 'Sous-catégories', value: SUB_CATEGORIES.length, icon: Package },
              { label: 'Producteurs', value: 'Bientôt', icon: Users },
              { label: 'Pays d\'origine', value: 'Togo +', icon: Globe },
              { label: 'Export disponible', value: 'Oui', icon: Truck },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="rounded-md bg-night-light/60 border border-white/10 p-4">
                  <Icon size={18} className="text-emerald-brand mb-2" />
                  <p className="text-xs text-muted">{stat.label}</p>
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          SOUS-CATÉGORIES
      ============================================ */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                Sous-catégories
                <span className="h-1 w-10 bg-gold rounded-full" />
              </h2>
              <p className="text-muted mt-2">Explorez par type de produit</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUB_CATEGORIES.map((sub) => {
              const Icon = sub.icon;
              return (
                <Link
                  key={sub.slug}
                  href={`/marketplace/categories/agriculture-agroalimentaire/${sub.slug}`}
                  prefetch
                  className={`group relative overflow-hidden rounded-md border border-white/10 bg-gradient-to-br ${sub.color} p-6 hover:border-emerald-brand/50 hover:-translate-y-1 transition-all duration-300 touch-target`}
                >
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-white/10 backdrop-blur flex items-center justify-center shrink-0 group-hover:bg-emerald-brand group-hover:scale-110 transition-all duration-300">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-base mb-1">
                        {sub.name}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed line-clamp-2">
                        {sub.description}
                      </p>
                      <div className="flex items-center gap-1 text-emerald-brand text-xs font-semibold mt-3">
                        <span>Voir les produits</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-emerald-brand/0 group-hover:bg-emerald-brand/10 transition-all duration-300" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          PRODUITS DISPONIBLES (placeholder)
      ============================================ */}
      <section className="py-12 md:py-16 bg-night-light/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                Produits disponibles
                <span className="h-1 w-10 bg-gold rounded-full" />
              </h2>
              <p className="text-muted mt-2">
                Les produits publiés par nos vendeurs apparaîtront ici
              </p>
            </div>
            <Link
              href="/marketplace"
              prefetch
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-light transition-colors"
            >
              Voir tout le marketplace <ArrowRight size={16} />
            </Link>
          </div>

          {/* Zone d'accueil des futurs produits */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>

          {/* Message informatif */}
          <div className="mt-10 p-6 rounded-md bg-emerald-brand/5 border border-emerald-brand/20 text-center">
            <Package size={32} className="text-emerald-brand mx-auto mb-3" />
            <h3 className="text-white font-bold text-lg mb-2">
              Bientôt disponible
            </h3>
            <p className="text-muted max-w-2xl mx-auto text-sm leading-relaxed">
              Les vendeurs pourront publier leurs produits agricoles avec toutes les informations nécessaires :
              photos, description, origine, quantité disponible, prix, vente en gros, export et contact direct.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          INFOS ACHETEURS
      ============================================ */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Informations pour les acheteurs
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Tout ce qu'il faut savoir pour acheter en toute confiance
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BUYER_INFO.map((info) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.title}
                  className="rounded-md border border-white/10 bg-night-light p-5 hover:border-emerald-brand/50 transition-all"
                >
                  <div className="w-11 h-11 rounded-md bg-emerald-brand/20 flex items-center justify-center mb-3">
                    <Icon size={22} className="text-emerald-brand" />
                  </div>
                  <h3 className="text-white font-bold mb-1.5">{info.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{info.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          STRUCTURE FUTUR PRODUIT (info technique)
      ============================================ */}
      <section className="py-12 md:py-16 bg-night-light/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-md border border-white/10 bg-night p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-md bg-gold/20 flex items-center justify-center shrink-0">
                <BadgeCheck size={24} className="text-gold" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  Informations produit (structure évolutive)
                </h2>
                <p className="text-muted text-sm mt-1">
                  Chaque produit publié disposera de ces informations
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { label: 'Nom du produit', icon: Package },
                { label: 'Photos & visuels', icon: FileText },
                { label: 'Description détaillée', icon: FileText },
                { label: 'Pays / Région d\'origine', icon: MapPin },
                { label: 'Producteur / Fournisseur', icon: Users },
                { label: 'Quantité disponible', icon: Scale },
                { label: 'Quantité minimale de commande', icon: Scale },
                { label: 'Prix unitaire', icon: Scale },
                { label: 'Vente en gros disponible', icon: Truck },
                { label: 'Disponibilité', icon: BadgeCheck },
                { label: 'Possibilité d\'exportation', icon: Globe },
                { label: 'Demande de devis', icon: FileText },
                { label: 'Contact du fournisseur', icon: MessageCircle },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 p-3 rounded-md bg-white/5 border border-white/5"
                  >
                    <Icon size={16} className="text-emerald-brand shrink-0" />
                    <span className="text-white text-sm">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          CTA VENDEUR
      ============================================ */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-md bg-gradient-to-br from-emerald-brand/20 via-night-light to-gold/10 border border-emerald-brand/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Vous êtes producteur ou fournisseur ?
              </h2>
              <p className="text-muted max-w-xl">
                Publiez vos produits agricoles sur Kpalimé-Trade et touchez des acheteurs au Togo et à l'international.
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

      {/* ============================================
          RETOUR MARKETPLACE
      ============================================ */}
      <section className="py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/marketplace"
            prefetch
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-emerald-brand transition-colors"
          >
            <ArrowLeft size={16} />
            Retour au Marketplace
          </Link>
        </div>
      </section>
    </div>
  );
}