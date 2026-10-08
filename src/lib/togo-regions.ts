/**
 * Structure des 5 régions économiques du Togo
 * Chaque région contient des sous-catégories spécifiques
 */

export interface RegionSubCategory {
  id: string;
  name: string;
  icon: string; // Nom de l'icône Lucide
  description: string;
}

export interface Region {
  id: string;
  slug: string;
  name: string;
  chefLieu: string;
  emoji: string;
  description: string;
  subCategories: RegionSubCategory[];
}

export const TOGO_REGIONS: Region[] = [
  {
    id: 'maritime',
    slug: 'maritime',
    name: 'Région Maritime',
    chefLieu: 'Lomé',
    emoji: '🏖️',
    description:
      'La région Maritime, avec Lomé comme capitale économique, offre des plages, des sites historiques et une vie culturelle dynamique.',
    subCategories: [
      { id: 'sites', name: 'Sites', icon: 'MapPin', description: 'Lieux touristiques et sites d\'intérêt' },
      { id: 'hotels', name: 'Hôtels', icon: 'Hotel', description: 'Hébergements et établissements' },
      { id: 'restaurants', name: 'Restaurants', icon: 'UtensilsCrossed', description: 'Cuisine locale et restaurants' },
      { id: 'culture', name: 'Culture', icon: 'Palette', description: 'Traditions et patrimoine culturel' },
      { id: 'activites', name: 'Activités', icon: 'Compass', description: 'Activités et expériences' },
      { id: 'evenements', name: 'Événements', icon: 'CalendarDays', description: 'Festivals et manifestations' },
    ],
  },
  {
    id: 'plateaux',
    slug: 'plateaux',
    name: 'Région des Plateaux',
    chefLieu: 'Atakpamé',
    emoji: '🌿',
    description:
      'La région des Plateaux, avec ses montagnes, cascades et forêts, est un paradis pour la randonnée et l\'écotourisme.',
    subCategories: [
      { id: 'sites', name: 'Sites', icon: 'MapPin', description: 'Lieux touristiques et sites d\'intérêt' },
      { id: 'hotels', name: 'Hôtels', icon: 'Hotel', description: 'Hébergements et établissements' },
      { id: 'randonnees', name: 'Randonnées', icon: 'Hiking', description: 'Sentiers et parcours de randonnée' },
      { id: 'cascades', name: 'Cascades', icon: 'Droplets', description: 'Cascades et chutes d\'eau' },
      { id: 'culture', name: 'Culture', icon: 'Palette', description: 'Traditions et patrimoine culturel' },
      { id: 'artisanat', name: 'Artisanat', icon: 'Hammer', description: 'Artisans et savoir-faire locaux' },
    ],
  },
  {
    id: 'centrale',
    slug: 'centrale',
    name: 'Région Centrale',
    chefLieu: 'Sokodé',
    emoji: '🐘',
    description:
      'La région Centrale, carrefour du Togo, abrite des parcs naturels, une faune riche et un patrimoine culturel diversifié.',
    subCategories: [
      { id: 'sites', name: 'Sites', icon: 'MapPin', description: 'Lieux touristiques et sites d\'intérêt' },
      { id: 'hotels', name: 'Hôtels', icon: 'Hotel', description: 'Hébergements et établissements' },
      { id: 'faune', name: 'Faune', icon: 'PawPrint', description: 'Parcs naturels et vie sauvage' },
      { id: 'culture', name: 'Culture', icon: 'Palette', description: 'Traditions et patrimoine culturel' },
      { id: 'patrimoine', name: 'Patrimoine', icon: 'Landmark', description: 'Sites historiques et patrimoniaux' },
    ],
  },
  {
    id: 'kara',
    slug: 'kara',
    name: 'Région de la Kara',
    chefLieu: 'Kara',
    emoji: '⛰️',
    description:
      'La région de la Kara, avec le Koutammakou (site UNESCO) et la Faille d\'Alédjo, offre des paysages montagneux spectaculaires.',
    subCategories: [
      { id: 'sites', name: 'Sites', icon: 'MapPin', description: 'Lieux touristiques et sites d\'intérêt' },
      { id: 'hotels', name: 'Hôtels', icon: 'Hotel', description: 'Hébergements et établissements' },
      { id: 'koutammakou', name: 'Koutammakou', icon: 'Home', description: 'Paysage culturel des Batammariba (UNESCO)' },
      { id: 'faille-aledjo', name: 'Faille d\'Alédjo', icon: 'Mountain', description: 'Site géologique remarquable' },
      { id: 'faune', name: 'Faune', icon: 'PawPrint', description: 'Parcs naturels et vie sauvage' },
      { id: 'culture', name: 'Culture', icon: 'Palette', description: 'Traditions et patrimoine culturel' },
    ],
  },
  {
    id: 'savanes',
    slug: 'savanes',
    name: 'Région des Savanes',
    chefLieu: 'Dapaong',
    emoji: '🪨',
    description:
      'La région des Savanes, au nord du Togo, abrite des grottes, des peintures rupestres et une faune sauvage unique.',
    subCategories: [
      { id: 'sites', name: 'Sites', icon: 'MapPin', description: 'Lieux touristiques et sites d\'intérêt' },
      { id: 'hotels', name: 'Hôtels', icon: 'Hotel', description: 'Hébergements et établissements' },
      { id: 'grottes', name: 'Grottes', icon: 'Mountain', description: 'Grottes et formations rocheuses' },
      { id: 'peintures-rupestres', name: 'Peintures rupestres', icon: 'Image', description: 'Art rupestre ancien' },
      { id: 'faune', name: 'Faune', icon: 'PawPrint', description: 'Parcs naturels et vie sauvage' },
      { id: 'culture', name: 'Culture', icon: 'Palette', description: 'Traditions et patrimoine culturel' },
    ],
  },
];

/**
 * Récupérer une région par son slug
 */
export function getRegionBySlug(slug: string): Region | undefined {
  return TOGO_REGIONS.find((region) => region.slug === slug);
}

/**
 * Récupérer toutes les régions
 */
export function getAllRegions(): Region[] {
  return TOGO_REGIONS;
}