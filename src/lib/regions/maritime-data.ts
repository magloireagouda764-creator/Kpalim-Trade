export const MARITIME_REGION = {
  id: 'maritime',
  name: 'Région Maritime',
  chefLieu: 'Lomé',
  emoji: '🏖️',
  description:
    'La région Maritime, avec Lomé comme capitale économique, offre des plages, des sites historiques et une vie culturelle dynamique.',
  banner: '/images/discover/regions/maritime/banner-coastline.jpg',
  sections: [
    {
      id: 'destinations',
      title: 'Destinations à explorer',
      icon: 'MapPin',
      items: [
        { name: 'Lomé', description: 'Capitale économique et culturelle' },
        { name: 'Agbodrafo', description: 'Ville historique au bord du lac Togo' },
        { name: 'Aného', description: 'Ancienne capitale, patrimoine colonial' },
        { name: 'Lac Togo', description: 'Plus grand lac du pays' },
      ],
    },
    {
      id: 'sites',
      title: 'Sites touristiques et patrimoniaux',
      icon: 'Landmark',
      items: [
        { name: 'Palais de Lomé', description: 'Architecture coloniale' },
        { name: 'Marché d\'Assigamé', description: 'Plus grand marché de la région' },
        { name: 'Fort de San Salvador', description: 'Patrimoine historique à Agbodrafo' },
      ],
    },
    {
      id: 'plages',
      title: 'Plages et littoral',
      icon: 'Waves',
      items: [
        { name: 'Plage de Lomé', description: 'Plage urbaine animée' },
        { name: 'Plage d\'Aneho', description: 'Plage calme et traditionnelle' },
        { name: 'Plage de Bè', description: 'Quartier balnéaire' },
      ],
    },
    {
      id: 'culture',
      title: 'Culture, artisanat et traditions',
      icon: 'Palette',
      items: [
        { name: 'Tissage traditionnel', description: 'Savoir-faire ancestral' },
        { name: 'Cérémonie Vaudou', description: 'Traditions spirituelles' },
        { name: 'Musique et danse', description: 'Expressions culturelles' },
      ],
    },
    {
      id: 'hotels',
      title: 'Hôtels et hébergements',
      icon: 'Hotel',
      items: [],
      note: 'Liste en cours de constitution',
    },
    {
      id: 'restaurants',
      title: 'Restaurants et gastronomie',
      icon: 'UtensilsCrossed',
      items: [],
      note: 'Liste en cours de constitution',
    },
    {
      id: 'activites',
      title: 'Activités et expériences',
      icon: 'Compass',
      items: [
        { name: 'Excursion sur le lac Togo', description: 'Navigation en pirogue' },
        { name: 'Visite des marchés', description: 'Immersion culturelle' },
        { name: 'Détente sur les plages', description: 'Loisirs balnéaires' },
      ],
    },
  ],
  gallery: [
    '/images/discover/regions/maritime/banner-coastline.jpg',
    '/images/discover/regions/maritime/banner-lome-city.jpg',
    '/images/discover/regions/maritime/lake-togo.jpg',
    '/images/discover/regions/maritime/cultural-heritage.jpg',
    '/images/discover/regions/maritime/hotel-resort.jpg',
  ],
};