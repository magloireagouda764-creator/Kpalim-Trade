import { Types } from 'mongoose';

// ============================================
// ENUMS ET TYPES DE BASE
// ============================================

export type AccommodationType = 
  | 'hotel' 
  | 'guesthouse' 
  | 'auberge' 
  | 'apartment' 
  | 'campement' 
  | 'gite';

export type AccommodationStatus = 
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

// ============================================
// INTERFACES PRINCIPALES
// ============================================

export interface IAccommodation {
  _id: Types.ObjectId;
  
  // Informations générales
  name: string;
  slug: string;
  type: AccommodationType;
  description: string;
  
  // Médias
  logo?: string;
  banner?: string;
  images: IAccommodationImage[];
  
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
  
  // Capacité et tarifs
  capacity: number;
  roomsCount: number;
  priceRange?: string;
  currency: Currency;
  
  // Équipements
  amenities: string[];
  checkInTime?: string;
  checkOutTime?: string;
  
  // Propriétaire
  ownerId: Types.ObjectId;
  ownerName: string;
  ownerCode?: string; // ⭐ AJOUTE CETTE LIGNE ICI
  
  // Statut et validation
  status: AccommodationStatus;
  // Statut et validation
  status: AccommodationStatus;
  isActive: boolean;
  isFeatured: boolean;
  publishedAt?: Date;
  
  // Notes admin
  adminNote?: string;
  rejectionReason?: string;
  correctionRequest?: string;
  
  // Documents justificatifs
  documents: IAccommodationDocument[];
  
  // Vérification
  verificationConfirmed: boolean;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// INTERFACES SECONDAIRES
// ============================================

export interface IAccommodationImage {
  public_id: string;
  secure_url: string;
}

export interface IAccommodationDocument {
  public_id: string;
  secure_url: string;
  type: string;
  uploadedAt: Date;
}

// ============================================
// INTERFACES POUR LES REQUÊTES API
// ============================================

export interface ICreateAccommodation {
  name: string;
  type: AccommodationType;
  description: string;
  ownerName: string;
  phone: string;
  email?: string;
  region: TogoRegion;
  city: string;
  district?: string;
  address: string;
  capacity: number;
  roomsCount: number;
  priceRange?: string;
  currency: Currency;
  amenities: string[];
  verificationConfirmed: boolean;
  ownerId: string;
}

export interface IUpdateAccommodation {
  name?: string;
  type?: AccommodationType;
  description?: string;
  phone?: string;
  email?: string;
  region?: TogoRegion;
  city?: string;
  district?: string;
  address?: string;
  capacity?: number;
  roomsCount?: number;
  priceRange?: string;
  currency?: Currency;
  amenities?: string[];
}

export interface IValidateAccommodation {
  status: 'approved' | 'rejected' | 'needs_correction';
  adminNote?: string;
  rejectionReason?: string;
  correctionRequest?: string;
}

// ============================================
// INTERFACES POUR LES RÉPONSES API
// ============================================

export interface IAccommodationResponse {
  success: boolean;
  data?: IAccommodation | IAccommodation[];
  error?: string;
  message?: string;
  count?: number;
}

export interface IAccommodationFilters {
  status?: AccommodationStatus;
  region?: TogoRegion;
  type?: AccommodationType;
  city?: string;
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

export interface IDashboardAccommodation {
  _id: string;
  name: string;
  slug: string;
  type: AccommodationType;
  city: string;
  region: TogoRegion;
  status: AccommodationStatus;
  createdAt: Date;
  updatedAt: Date;
}