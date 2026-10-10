import { Document, Types } from 'mongoose';

// ============================================
// STATUTS D'UNE FICHE ÉTABLISSEMENT
// ============================================
export type AccommodationStatus =
  | 'draft'              // Brouillon (propriétaire)
  | 'pending'            // En attente de validation
  | 'needs_correction'   // À corriger (demande de l'admin)
  | 'approved'           // Approuvé et publié ✅
  | 'rejected'           // Refusé
  | 'suspended';         // Suspendu

// ============================================
// TYPES D'ÉTABLISSEMENTS
// ============================================
export type AccommodationType =
  | 'hotel'              // Hôtel
  | 'guesthouse'         // Maison d'hôtes
  | 'auberge'            // Auberge
  | 'apartment'          // Résidence meublée / Appartement
  | 'campement'          // Campement
  | 'gite';              // Gîte

// ============================================
// RÉGIONS DU TOGO
// ============================================
export type TogoRegion =
  | 'Maritime'
  | 'Plateaux'
  | 'Centrale'
  | 'Kara'
  | 'Savanes';

// ============================================
// ÉQUIPEMENTS / SERVICES
// ============================================
export type Amenity =
  | 'wifi'
  | 'climatisation'
  | 'parking'
  | 'restaurant'
  | 'piscine'
  | 'petit_dejeuner'
  | 'blanchisserie'
  | 'salle_reunion'
  | 'bar'
  | 'room_service'
  | 'navette_aeroport'
  | 'salle_sport'
  | 'spa'
  | 'accessibilite_pmr'
  | 'animaux_admis'
  | 'autre';

// ============================================
// RÉSEAUX SOCIAUX
// ============================================
export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
  site_web?: string;
}

// ============================================
// PHOTO (Cloudinary)
// ============================================
export interface Photo {
  public_id: string;
  secure_url: string;
  category?: 'banner' | 'facade' | 'chambre' | 'reception' | 'sdb' | 'restaurant' | 'piscine' | 'autre';
  uploadedAt?: Date;
}

// ============================================
// DOCUMENT DE VÉRIFICATION (privé)
// ============================================
export interface VerificationDocument {
  public_id: string;
  secure_url: string;
  type: 'registre_commerce' | 'autorisation' | 'identite' | 'autre';
  uploadedAt: Date;
}

// ============================================
// CHAMBRE
// ============================================
export interface Room {
  _id?: Types.ObjectId;
  type: string;           // ex: "Simple", "Double", "Suite"
  name?: string;          // ex: "Chambre Vue Mer"
  description?: string;
  capacity: number;       // Nombre de personnes
  price: number;          // Prix par nuit en XOF
  amenities?: string[];
  images?: Photo[];
  available?: boolean;
}

// ============================================
// INTERFACE PRINCIPALE : ACCOMMODATION
// ============================================
export interface IAccommodation extends Document {
  _id: Types.ObjectId;

  // Informations générales
  name: string;
  slug: string;
  type: AccommodationType;
  description: string;
  logo?: string;
  banner?: string;
  images: Photo[];

  // Localisation
  address: string;
  city: string;
  district?: string;
  region: TogoRegion;
  prefecture?: string;
  landmark?: string;
  gpsLat?: number;
  gpsLng?: number;

  // Contact
  phone: string;
  email?: string;
  whatsapp?: string;
  website?: string;
  socialMedia?: SocialMedia;

  // Responsable
  ownerId: Types.ObjectId;
  ownerName: string;

  // Capacité & Chambres
  capacity: number;
  roomsCount: number;
  rooms?: Room[];

  // Équipements
  amenities: string[];

  // Réservation
  checkInTime?: string;
  checkOutTime?: string;
  priceRange?: string;
  currency: string;
  reservationPhone?: string;
  reservationLink?: string;
  cancellationPolicy?: string;

  // Statut & Validation
  status: AccommodationStatus;
  isActive: boolean;
  isFeatured: boolean;
  publishedAt?: Date;

  // Administration
  adminNote?: string;
  rejectionReason?: string;
  correctionRequest?: string;

  // Vérification (documents privés)
  documents: VerificationDocument[];
  verificationConfirmed: boolean;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// TYPES POUR LE FORMULAIRE DE CRÉATION
// ============================================
export interface AccommodationFormData {
  // A. Informations générales
  name: string;
  type: AccommodationType;
  description: string;
  ownerName: string;
  phone: string;
  email?: string;
  website?: string;
  socialMedia?: SocialMedia;

  // B. Localisation
  region: TogoRegion;
  prefecture?: string;
  city: string;
  district?: string;
  address: string;
  landmark?: string;
  gpsLat?: number;
  gpsLng?: number;

  // C. Photos (URLs après upload)
  logo?: string;
  banner?: string;
  images?: Photo[];

  // D. Capacité et chambres
  capacity: number;
  roomsCount: number;
  rooms?: Room[];

  // E. Équipements
  amenities: string[];

  // F. Réservation
  checkInTime?: string;
  checkOutTime?: string;
  priceRange?: string;
  currency?: string;
  reservationPhone?: string;
  reservationLink?: string;
  cancellationPolicy?: string;

  // G. Vérification
  verificationConfirmed: boolean;
}

// ============================================
// TYPES POUR LES FILTRES DE RECHERCHE
// ============================================
export interface AccommodationFilters {
  region?: TogoRegion;
  type?: AccommodationType;
  city?: string;
  status?: AccommodationStatus;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  search?: string;
  page?: number;
  limit?: number;
}

// ============================================
// TYPES POUR LES RÉPONSES API
// ============================================
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================
// LABELS POUR L'AFFICHAGE (français)
// ============================================
export const ACCOMMODATION_TYPE_LABELS: Record<AccommodationType, string> = {
  hotel: 'Hôtel',
  guesthouse: 'Maison d\'hôtes',
  auberge: 'Auberge',
  apartment: 'Résidence meublée',
  campement: 'Campement',
  gite: 'Gîte',
};

export const STATUS_LABELS: Record<AccommodationStatus, string> = {
  draft: 'Brouillon',
  pending: 'En attente de validation',
  needs_correction: 'À corriger',
  approved: 'Approuvé et publié',
  rejected: 'Refusé',
  suspended: 'Suspendu',
};

export const STATUS_COLORS: Record<AccommodationStatus, string> = {
  draft: 'bg-gray-500/20 text-gray-300',
  pending: 'bg-yellow-500/20 text-yellow-300',
  needs_correction: 'bg-orange-500/20 text-orange-300',
  approved: 'bg-emerald-brand/20 text-emerald-brand',
  rejected: 'bg-red-500/20 text-red-300',
  suspended: 'bg-purple-500/20 text-purple-300',
};

export const AMENITY_LABELS: Record<string, string> = {
  wifi: 'Wi-Fi',
  climatisation: 'Climatisation',
  parking: 'Parking',
  restaurant: 'Restaurant',
  piscine: 'Piscine',
  petit_dejeuner: 'Petit-déjeuner',
  blanchisserie: 'Blanchisserie',
  salle_reunion: 'Salle de réunion',
  bar: 'Bar',
  room_service: 'Room service',
  navette_aeroport: 'Navette aéroport',
  salle_sport: 'Salle de sport',
  spa: 'Spa',
  accessibilite_pmr: 'Accessible PMR',
  animaux_admis: 'Animaux admis',
  autre: 'Autre',
};