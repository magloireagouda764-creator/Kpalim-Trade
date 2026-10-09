import mongoose, { Schema, Model } from 'mongoose';

export interface IAccommodation {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  type: 'hotel' | 'guesthouse' | 'auberge' | 'apartment' | 'campement' | 'gite';
  description: string;
  logo?: string;
  banner?: string;
  images: { public_id: string; secure_url: string }[];
  address: string;
  city: string;
  district?: string;
  phone: string;
  email?: string;
  whatsapp?: string;
  gpsLat?: number;
  gpsLng?: number;
  amenities: string[];
  checkInTime?: string;
  checkOutTime?: string;
  isFeatured: boolean;
  isActive: boolean;

  // --- NOUVEAUX CHAMPS POUR LE SYSTÈME DE VALIDATION ---
  status: 'draft' | 'pending' | 'needs_correction' | 'approved' | 'rejected' | 'suspended';
  ownerId: mongoose.Types.ObjectId;
  ownerName: string;
  region: string;
  prefecture?: string;
  landmark?: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  priceRange?: string;
  currency: string;
  capacity: number;
  roomsCount: number;
  publishedAt?: Date;
  adminNote?: string;
  rejectionReason?: string;
  correctionRequest?: string;
  documents: { public_id: string; secure_url: string; type: string; uploadedAt: Date }[];
  verificationConfirmed: boolean;
}

const schema = new Schema<IAccommodation>(
  {
    // --- ANCIENS CHAMPS (conservés) ---
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    type: { type: String, enum: ['hotel', 'guesthouse', 'auberge', 'apartment', 'campement', 'gite'], required: true },
    description: { type: String, required: true },
    logo: { type: String },
    banner: { type: String },
    images: [{ public_id: String, secure_url: String }],
    address: { type: String, required: true },
    city: { type: String, default: 'Kpalimé' },
    district: { type: String },
    phone: { type: String, required: true },
    email: { type: String },
    whatsapp: { type: String },
    gpsLat: { type: Number },
    gpsLng: { type: Number },
    amenities: [{ type: String }],
    checkInTime: { type: String, default: '14:00' },
    checkOutTime: { type: String, default: '11:00' },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    // --- NOUVEAUX CHAMPS (intégrés correctement dans le schéma) ---
    status: { 
      type: String, 
      enum: ['draft', 'pending', 'needs_correction', 'approved', 'rejected', 'suspended'],
      default: 'draft'
    },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ownerName: { type: String, required: true },
    region: { type: String, required: true },
    prefecture: { type: String },
    landmark: { type: String },
    website: { type: String },
    socialMedia: {
      facebook: { type: String },
      instagram: { type: String },
      twitter: { type: String },
    },
    priceRange: { type: String },
    currency: { type: String, default: 'XOF' },
    capacity: { type: Number, default: 0 },
    roomsCount: { type: Number, default: 0 },
    publishedAt: { type: Date },
    adminNote: { type: String },
    rejectionReason: { type: String },
    correctionRequest: { type: String },
    documents: [{ 
      public_id: { type: String }, 
      secure_url: { type: String },
      type: { type: String },
      uploadedAt: { type: Date }
    }],
    verificationConfirmed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Index pour optimiser les recherches
schema.index({ slug: 1 });
schema.index({ type: 1, isFeatured: -1 });
schema.index({ status: 1, region: 1 }); // Nouvel index pour filtrer par statut et région
schema.index({ ownerId: 1 }); // Nouvel index pour retrouver les établissements d'un propriétaire

export const Accommodation: Model<IAccommodation> = mongoose.models.Accommodation || mongoose.model<IAccommodation>('Accommodation', schema);