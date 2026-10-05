import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getCategoryBySlug, MARKETPLACE_CATEGORIES } from '@/lib/marketplace-categories';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Catégorie introuvable' };
  }

  return {
    title: `${category.name} | Marketplace Kpalimé-Trade`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const Icon = category.icon;

  return (
    <div className="bg-night min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Fil d'Ariane */}
        <Breadcrumb
          items={[
            { label: 'Marketplace', href: '/marketplace' },
            { label: category.name },
          ]}
        />

        {/* En-tête de catégorie */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-md bg-emerald-brand/20 flex items-center justify-center">
              <Icon size={32} className="text-emerald-brand" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {category.name}
              </h1>
              <p className="text-muted mt-1 max-w-3xl">
                {category.description}
              </p>
            </div>
          </div>

          {/* Note : description ouverte */}
          <div className="mt-4 px-4 py-3 rounded-md bg-emerald-brand/10 border border-emerald-brand/20">
            <p className="text-sm text-emerald-brand">
              💡 Cette catégorie inclut <strong>{category.name.toLowerCase()}</strong> et bien d'autres produits connexes. 
              Explorez toutes les offres disponibles.
            </p>
          </div>
        </div>

        {/* Filtres et tri (placeholder) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-md bg-night-light border border-white/10">
          <p className="text-muted text-sm">
            Affichage des produits de la catégorie <span className="text-white font-medium">{category.name}</span>
          </p>
          <div className="flex items-center gap-2">
            <select className="px-3 py-2 rounded-md bg-night border border-white/10 text-white text-sm focus:border-emerald-brand focus:outline-none">
              <option>Trier par : Plus récents</option>
              <option>Prix croissant</option>
              <option>Prix décroissant</option>
              <option>Plus populaires</option>
            </select>
          </div>
        </div>

        {/* Grille de produits (placeholder) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>

        {/* Pagination (placeholder) */}
        <div className="mt-10 flex justify-center">
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-md bg-night-light border border-white/10 text-muted hover:text-white transition-colors">
              ← Précédent
            </button>
            <button className="px-4 py-2 rounded-md bg-emerald-brand text-white font-medium">
              1
            </button>
            <button className="px-4 py-2 rounded-md bg-night-light border border-white/10 text-muted hover:text-white transition-colors">
              2
            </button>
            <button className="px-4 py-2 rounded-md bg-night-light border border-white/10 text-muted hover:text-white transition-colors">
              3
            </button>
            <button className="px-4 py-2 rounded-md bg-night-light border border-white/10 text-muted hover:text-white transition-colors">
              Suivant →
            </button>
          </div>
        </div>

        {/* Autres catégories */}
        <div className="mt-16 pt-10 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">
            Autres catégories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {MARKETPLACE_CATEGORIES
              .filter((c) => c.slug !== slug)
              .slice(0, 8)
              .map((cat) => {
                const CatIcon = cat.icon;
                return (
                  <Link
                    key={cat.id}
                    href={`/marketplace/categories/${cat.slug}`}
                    prefetch
                    className="flex items-center gap-3 p-4 rounded-md bg-night-light border border-white/10 hover:border-emerald-brand/50 transition-all"
                  >
                    <CatIcon size={20} className="text-emerald-brand shrink-0" />
                    <span className="text-white text-sm font-medium truncate">
                      {cat.name}
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}