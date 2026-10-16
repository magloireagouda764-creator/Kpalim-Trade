import { Types } from 'mongoose';

// ============================================
// ENUMS ET TYPES DE BASE
// ============================================

export type RestaurantType = 
  | 'restaurant' 
  | 'maquis' 
  | 'fast_food' 
  | 'street_food' 
  | 'cafeteria' 
  | 'snack';

export type RestaurantStatus = 
  | 'draft'              // Brouillon (non soumis)
  | 'pending'            // En attente de validation
  | 'approved'           // Validé par l'admin
  | 'rejected'           // Refusé
  | 'needs_correction'   // Corrections demandées
  | 'suspended';         // Suspendu

export type TogoRegion = 
  | 'Maritime' 
  | 'Plateaux' 
  | 'Centrale' 
  | 'Kara' 
  | 'Savanes';

export type Currency = 'XOF' | 'EUR' | 'USD';

export type PriceRange = 'budget' | 'moderate' | 'expensive' | 'luxury';

// ============================================
// INTERFACES PRINCIPALES
// ============================================

export interface IRestaurant {
  _id: Types.ObjectId;
  
  // Informations générales
  name: string;
  slug: string;
  type: RestaurantType;
  description: string;
  
  // Médias
  logo?: string;
  banner?: string;
  images: IRestaurantImage[];
  
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
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  
  // Spécialités
  cuisines: string[];
  specialties?: string[];
  priceRange: PriceRange;
  averagePrice?: number;
  currency: Currency;
  
  // Horaires
  openingHours?: {
    monday?: { open: string; close: string; closed?: boolean };
    tuesday?: { open: string; close: string; closed?: boolean };
    wednesday?: { open: string; close: string; closed?: boolean };
    thursday?: { open: string; close: string; closed?: boolean };
    friday?: { open: string; close: string; closed?: boolean };
    saturday?: { open: string; close: string; closed?: boolean };
    sunday?: { open: string; close: string; closed?: boolean };
  };
  
  // Services
  services: string[]; // terrasse, parking, wifi, livraison, etc.
  paymentMethods: string[]; // cash, mobile_money, carte
  
  // Propriétaire
  ownerId: Types.ObjectId;
  ownerName: string;
  
  // Statut et validation
  status: RestaurantStatus;
  isActive: boolean;
  isFeatured: boolean;
  publishedAt?: Date;
  
  // Notes admin
  adminNote?: string;
  rejectionReason?: string;
  correctionRequest?: string;
  
  // Documents justificatifs
  documents: IRestaurantDocument[];
  
  // Vérification
  verificationConfirmed: boolean;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// INTERFACES SECONDAIRES
// ============================================

export interface IRestaurantImage {
  public_id: string;
  secure_url: string;
}

export interface IRestaurantDocument {
  public_id: string;
  secure_url: string;
  type: string;
  uploadedAt: Date;
}

// ============================================
// INTERFACES POUR LES REQUÊTES API
// ============================================

export interface ICreateRestaurant {
  name: string;
  type: RestaurantType;
  description: string;
  ownerName: string;
  phone: string;
  email?: string;
  region: TogoRegion;
  city: string;
  district?: string;
  address: string;
  cuisines: string[];
  specialties?: string[];
  priceRange: PriceRange;
  averagePrice?: number;
  currency: Currency;
  services: string[];
  paymentMethods: string[];
  verificationConfirmed: boolean;
  ownerId: string;
}

export interface IUpdateRestaurant {
  name?: string;
  type?: RestaurantType;
  description?: string;
  phone?: string;
  email?: string;
  region?: TogoRegion;
  city?: string;
  district?: string;
  address?: string;
  cuisines?: string[];
  specialties?: string[];
  priceRange?: PriceRange;
  averagePrice?: number;
  currency?: Currency;
  services?: string[];
  paymentMethods?: string[];
}

export interface IValidateRestaurant {
  status: 'approved' | 'rejected' | 'needs_correction';
  adminNote?: string;
  rejectionReason?: string;
  correctionRequest?: string;
}

// ============================================
// INTERFACES POUR LES RÉPONSES API
// ============================================

export interface IRestaurantResponse {
  success: boolean;
  data?: IRestaurant | IRestaurant[];
  error?: string;
  message?: string;
  count?: number;
}

export interface IRestaurantFilters {
  status?: RestaurantStatus;
  region?: TogoRegion;
  type?: RestaurantType;
  city?: string;
  cuisine?: string;
  priceRange?: PriceRange;
  search?: string;
  page?: number;
  limit?: number;
}

// ============================================
// INTERFACES POUR LE TABLEAU DE BORD
// ============================================

export interface IDashboardStats {
  total: number;
  draft: number;
  pending: number;
  approved: number;
  rejected: number;
  needs_correction: number;
  suspended: number;
}

export interface IDashboardRestaurant {
  _id: string;
  name: string;
  slug: string;
  type: RestaurantType;
  city: string;
  region: TogoRegion;
  status: RestaurantStatus;
  createdAt: Date;
  updatedAt: Date;
}