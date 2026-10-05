import {
  Wheat,
  Coffee,
  Droplets,
  Fish,
  Palette,
  Shirt,
  Footprints,
  Factory,
  Cpu,
  Sparkles,
  Home,
  Car,
  type LucideIcon,
} from 'lucide-react';

export interface MarketplaceCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

/**
 * Catégories du Marketplace Kpalimé-Trade
 * 
 * Principe : descriptions ouvertes, jamais limitatives.
 * Chaque catégorie peut contenir bien plus que les exemples affichés.
 */
export const MARKETPLACE_CATEGORIES: MarketplaceCategory[] = [
  {
    id: 'agriculture-agroalimentaire',
    slug: 'agriculture-agroalimentaire',
    name: 'Agriculture & Agroalimentaire',
    description:
      'Céréales, tubercules, légumineuses, fruits, légumes, produits agricoles, produits transformés et autres produits agroalimentaires.',
    icon: Wheat,
    color: 'from-green-500/20 to-green-500/5',
  },
  {
    id: 'cafe-cacao-produits-agricoles',
    slug: 'cafe-cacao-produits-agricoles',
    name: 'Café, Cacao & Produits agricoles',
    description:
      'Café, cacao, coton, grains, fèves, produits transformés, chocolat, produits dérivés et autres produits agricoles destinés au marché national et international.',
    icon: Coffee,
    color: 'from-amber-600/20 to-amber-600/5',
  },
  {
    id: 'huiles-epices',
    slug: 'huiles-epices',
    name: 'Huiles & Épices',
    description:
      'Huiles végétales, beurres, épices, condiments, plantes et produits naturels destinés au marché local et international.',
    icon: Droplets,
    color: 'from-yellow-500/20 to-yellow-500/5',
  },
  {
    id: 'produits-de-la-mer',
    slug: 'produits-de-la-mer',
    name: 'Produits de la mer',
    description:
      'Poissons, crevettes, fruits de mer et autres produits de la mer frais, congelés, séchés ou transformés.',
    icon: Fish,
    color: 'from-blue-500/20 to-blue-500/5',
  },
  {
    id: 'arts-artisanat',
    slug: 'arts-artisanat',
    name: 'Arts & Artisanat',
    description:
      'Créations artisanales, objets d\'art, sculptures, poteries, tissages, vannerie, objets décoratifs et autres créations.',
    icon: Palette,
    color: 'from-purple-500/20 to-purple-500/5',
  },
  {
    id: 'textile-vetements',
    slug: 'textile-vetements',
    name: 'Textile & Vêtements',
    description:
      'Pagnes, wax, bazin, tissus, vêtements traditionnels, vêtements modernes et autres articles textiles.',
    icon: Shirt,
    color: 'from-pink-500/20 to-pink-500/5',
  },
  {
    id: 'chaussures-accessoires',
    slug: 'chaussures-accessoires',
    name: 'Chaussures & Accessoires',
    description:
      'Chaussures, sandales, sacs, accessoires de mode et autres articles.',
    icon: Footprints,
    color: 'from-rose-500/20 to-rose-500/5',
  },
  {
    id: 'produits-manufactures',
    slug: 'produits-manufactures',
    name: 'Produits manufacturés',
    description:
      'Produits industriels, articles de consommation courante, biens manufacturés et autres produits fabriqués.',
    icon: Factory,
    color: 'from-slate-500/20 to-slate-500/5',
  },
  {
    id: 'technologie-equipements',
    slug: 'technologie-equipements',
    name: 'Technologie & Équipements',
    description:
      'Électronique, informatique, équipements professionnels, outils technologiques et autres produits high-tech.',
    icon: Cpu,
    color: 'from-cyan-500/20 to-cyan-500/5',
  },
  {
    id: 'beaute-soins',
    slug: 'beaute-soins',
    name: 'Beauté & Soins',
    description:
      'Cosmétiques, produits de soin, parfums, articles de beauté et autres produits pour le bien-être.',
    icon: Sparkles,
    color: 'from-fuchsia-500/20 to-fuchsia-500/5',
  },
  {
    id: 'maison-decoration',
    slug: 'maison-decoration',
    name: 'Maison & Décoration',
    description:
      'Mobilier, articles de maison, décoration intérieure, ustensiles et autres produits pour l\'habitat.',
    icon: Home,
    color: 'from-orange-500/20 to-orange-500/5',
  },
  {
    id: 'automobile-pieces',
    slug: 'automobile-pieces',
    name: 'Automobile & Pièces',
    description:
      'Véhicules, pièces détachées, accessoires automobiles, équipements et autres produits liés au transport.',
    icon: Car,
    color: 'from-gray-500/20 to-gray-500/5',
  },
];

/**
 * Récupérer une catégorie par son slug
 */
export function getCategoryBySlug(slug: string): MarketplaceCategory | undefined {
  return MARKETPLACE_CATEGORIES.find((cat) => cat.slug === slug);
}

/**
 * Récupérer toutes les catégories (pour affichage)
 */
export function getAllCategories(): MarketplaceCategory[] {
  return MARKETPLACE_CATEGORIES;
}