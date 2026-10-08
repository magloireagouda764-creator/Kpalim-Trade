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

/**
 * Interface d'une catégorie du Marketplace
 * 
 * Structure évolutive permettant :
 * - Catégories principales (featured: true)
 * - Sous-catégories (via parentId)
 * - Ajout facile de nouvelles catégories
 * - Ouverture internationale (pas limité au Togo)
 */
export interface MarketplaceCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  featured?: boolean;        // Affichée en priorité sur la page Marketplace
  parentId?: string;         // Pour les sous-catégories
  position?: number;         // Ordre d'affichage
}

/**
 * Catégories principales du Marketplace Kpalimé-Trade
 * 
 * PRINCIPE : descriptions ouvertes, jamais limitatives.
 * Chaque catégorie peut contenir bien plus que les exemples affichés.
 * 
 * VISION : plateforme internationale, pas limitée au Togo.
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
    featured: true,
    position: 1,
  },
  {
    id: 'cafe-cacao-produits-agricoles',
    slug: 'cafe-cacao-produits-agricoles',
    name: 'Café, Cacao & Produits agricoles',
    description:
      'Café, cacao, coton, grains, fèves, produits transformés, chocolat, produits dérivés et autres produits agricoles destinés au marché national et international.',
    icon: Coffee,
    color: 'from-amber-600/20 to-amber-600/5',
    featured: true,
    position: 2,
  },
  {
    id: 'huiles-epices',
    slug: 'huiles-epices',
    name: 'Huiles, Épices & Produits naturels',
    description:
      'Huiles végétales, beurres, épices, condiments, plantes et produits naturels destinés au marché local et international.',
    icon: Droplets,
    color: 'from-yellow-500/20 to-yellow-500/5',
    featured: true,
    position: 3,
  },
  {
    id: 'produits-de-la-mer',
    slug: 'produits-de-la-mer',
    name: 'Produits de la mer & Aquaculture',
    description:
      'Poissons, crevettes, fruits de mer et autres produits de la mer frais, congelés, séchés ou transformés.',
    icon: Fish,
    color: 'from-blue-500/20 to-blue-500/5',
    featured: true,
    position: 4,
  },
  {
    id: 'arts-artisanat',
    slug: 'arts-artisanat',
    name: 'Arts & Artisanat',
    description:
      'Créations artisanales, objets d\'art, sculptures, poteries, tissages, vannerie, objets décoratifs et autres créations.',
    icon: Palette,
    color: 'from-purple-500/20 to-purple-500/5',
    featured: true,
    position: 5,
  },
  {
    id: 'textile-vetements-chaussures',
    slug: 'textile-vetements-chaussures',
    name: 'Textile, Vêtements & Chaussures',
    description:
      'Pagnes, wax, bazin, tissus, vêtements traditionnels, vêtements modernes, chaussures, sandales, sacs, accessoires de mode et autres articles.',
    icon: Shirt,
    color: 'from-pink-500/20 to-pink-500/5',
    featured: true,
    position: 6,
  },
  {
    id: 'technologie-equipements',
    slug: 'technologie-equipements',
    name: 'Technologie & Équipements',
    description:
      'Électronique, informatique, équipements professionnels, outils technologiques et autres produits high-tech.',
    icon: Cpu,
    color: 'from-cyan-500/20 to-cyan-500/5',
    featured: true,
    position: 7,
  },
  {
    id: 'maison-automobile-manufactures',
    slug: 'maison-automobile-manufactures',
    name: 'Maison, Automobile & Produits manufacturés',
    description:
      'Mobilier, articles de maison, décoration, véhicules, pièces détachées, produits industriels et autres produits manufacturés.',
    icon: Home,
    color: 'from-orange-500/20 to-orange-500/5',
    featured: true,
    position: 8,
  },
  // Catégories secondaires (non featured, mais disponibles)
  {
    id: 'elevage-produits-animaux',
    slug: 'elevage-produits-animaux',
    name: 'Élevage & Produits animaux',
    description:
      'Animaux d\'élevage, produits laitiers, viandes, cuirs et autres produits d\'origine animale.',
    icon: Factory,
    color: 'from-stone-500/20 to-stone-500/5',
    featured: false,
    position: 9,
  },
  {
    id: 'bois-produits-forestiers',
    slug: 'bois-produits-forestiers',
    name: 'Bois & Produits forestiers',
    description:
      'Bois d\'œuvre, bois de chauffe, produits forestiers non ligneux et autres ressources forestières.',
    icon: Factory,
    color: 'from-emerald-700/20 to-emerald-700/5',
    featured: false,
    position: 10,
  },
  {
    id: 'construction-materiaux',
    slug: 'construction-materiaux',
    name: 'Construction & Matériaux',
    description:
      'Matériaux de construction, outillage, équipements BTP et autres produits pour la construction.',
    icon: Factory,
    color: 'from-gray-500/20 to-gray-500/5',
    featured: false,
    position: 11,
  },
  {
    id: 'beaute-hygiene-soins',
    slug: 'beaute-hygiene-soins',
    name: 'Beauté, Hygiène & Soins',
    description:
      'Cosmétiques, produits de soin, parfums, articles d\'hygiène et autres produits pour le bien-être.',
    icon: Sparkles,
    color: 'from-fuchsia-500/20 to-fuchsia-500/5',
    featured: false,
    position: 12,
  },
  {
    id: 'boissons-alimentaires',
    slug: 'boissons-alimentaires',
    name: 'Boissons & Produits alimentaires',
    description:
      'Boissons locales et importées, produits alimentaires transformés, conserves et autres denrées.',
    icon: Factory,
    color: 'from-red-500/20 to-red-500/5',
    featured: false,
    position: 13,
  },
  {
    id: 'matieres-premieres-mineraux',
    slug: 'matieres-premieres-mineraux',
    name: 'Matières premières & Produits minéraux',
    description:
      'Minéraux, métaux, matières premières industrielles et autres ressources naturelles.',
    icon: Factory,
    color: 'from-slate-500/20 to-slate-500/5',
    featured: false,
    position: 14,
  },
];

/**
 * Récupérer une catégorie par son slug
 */
export function getCategoryBySlug(slug: string): MarketplaceCategory | undefined {
  return MARKETPLACE_CATEGORIES.find((cat) => cat.slug === slug);
}

/**
 * Récupérer toutes les catégories
 */
export function getAllCategories(): MarketplaceCategory[] {
  return MARKETPLACE_CATEGORIES;
}

/**
 * Récupérer uniquement les catégories principales (featured)
 * Utilisé pour l'affichage sur la page Marketplace
 */
export function getFeaturedCategories(): MarketplaceCategory[] {
  return MARKETPLACE_CATEGORIES
    .filter((cat) => cat.featured)
    .sort((a, b) => (a.position || 0) - (b.position || 0));
}

/**
 * Récupérer les sous-catégories d'une catégorie parent
 */
export function getSubCategories(parentId: string): MarketplaceCategory[] {
  return MARKETPLACE_CATEGORIES.filter((cat) => cat.parentId === parentId);
}

/**
 * Récupérer toutes les catégories secondaires (non featured)
 */
export function getSecondaryCategories(): MarketplaceCategory[] {
  return MARKETPLACE_CATEGORIES
    .filter((cat) => !cat.featured)
    .sort((a, b) => (a.position || 0) - (b.position || 0));
}