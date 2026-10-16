import mongoose, { Schema, Model } from 'mongoose';
import { 
  IAccommodation, 
  AccommodationType, 
  AccommodationStatus, 
  TogoRegion, 
  Currency 
} from '@/types/accommodation';

// ============================================
// SCHÉMA MONGOOSE
// ============================================

const AccommodationSchema = new Schema<IAccommodation>(
  {
    // --- INFORMATIONS GÉNÉRALES ---
    name: {
      type: String,
      required: [true, 'Le nom est obligatoire'],
      trim: true,
      minlength: [3, 'Le nom doit faire au moins 3 caractères'],
      maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['hotel', 'guesthouse', 'auberge', 'apartment', 'campement', 'gite'],
      required: [true, 'Le type est obligatoire'],
    },
    description: {
      type: String,
      required: [true, 'La description est obligatoire'],
      minlength: [10, 'La description doit faire au moins 10 caractères'],
    },

    // --- MÉDIAS ---
    logo: { type: String },
    banner: { type: String },
    images: [
      {
        public_id: { type: String, required: true },
        secure_url: { type: String, required: true },
      },
    ],

    // --- LOCALISATION ---
    address: {
      type: String,
      required: [true, 'L\'adresse est obligatoire'],
    },
    city: {
      type: String,
      required: [true, 'La ville est obligatoire'],
    },
    district: { type: String },
    region: {
      type: String,
      enum: ['Maritime', 'Plateaux', 'Centrale', 'Kara', 'Savanes'],
      required: [true, 'La région est obligatoire'],
    },
    prefecture: { type: String },
    landmark: { type: String },
    gpsLat: { type: Number, min: -90, max: 90 },
    gpsLng: { type: Number, min: -180, max: 180 },

    // --- CONTACT ---
    phone: {
      type: String,
      required: [true, 'Le téléphone est obligatoire'],
    },
    email: {
      type: String,
      match: [/^\S+@\S+\.\S+$/, 'Email invalide'],
    },
    whatsapp: { type: String },
    website: { type: String },
    socialMedia: {
      facebook: { type: String },
      instagram: { type: String },
      twitter: { type: String },
    },

    // --- CAPACITÉ ET TARIFS ---
    capacity: {
      type: Number,
      required: true,
      min: [1, 'La capacité doit être au moins 1'],
    },
    roomsCount: {
      type: Number,
      required: true,
      min: [1, 'Le nombre de chambres doit être au moins 1'],
    },
    priceRange: { type: String },
    currency: {
      type: String,
      enum: ['XOF', 'EUR', 'USD'],
      default: 'XOF',
    },

    // --- ÉQUIPEMENTS ---
    amenities: [{ type: String }],
    checkInTime: { type: String, default: '14:00' },
    checkOutTime: { type: String, default: '11:00' },

    // --- PROPRIÉTAIRE ---
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'L\'ID du propriétaire est obligatoire'],
    },
    ownerName: {
      type: String,
      required: [true, 'Le nom du propriétaire est obligatoire'],
    },

    // --- STATUT ET VALIDATION ---
    status: {
      type: String,
      enum: ['draft', 'pending', 'approved', 'rejected', 'needs_correction', 'suspended'],
      default: 'draft',
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    publishedAt: { type: Date },

    // --- NOTES ADMIN ---
    adminNote: { type: String },
    rejectionReason: { type: String },
    correctionRequest: { type: String },

    // --- DOCUMENTS JUSTIFICATIFS ---
    documents: [
      {
        public_id: { type: String, required: true },
        secure_url: { type: String, required: true },
        type: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],

    // --- VÉRIFICATION ---
    verificationConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
  }
);

// ============================================
// INDEX POUR OPTIMISER LES REQUÊTES
// ============================================

// Index unique sur le slug
AccommodationSchema.index({ slug: 1 }, { unique: true });

// Index composé pour filtrer par statut et région (très utilisé)
AccommodationSchema.index({ status: 1, region: 1 });

// Index pour retrouver les établissements d'un propriétaire
AccommodationSchema.index({ ownerId: 1 });

// Index pour les recherches par type et statut
AccommodationSchema.index({ type: 1, status: 1 });

// Index pour les établissements en vedette
AccommodationSchema.index({ isFeatured: -1, status: 1 });

// Index texte pour la recherche full-text
AccommodationSchema.index({ 
  name: 'text', 
  description: 'text', 
  city: 'text' 
});

// ============================================
// MÉTHODES STATIQUES (optionnel)
// ============================================

AccommodationSchema.statics.findBySlug = async function(slug: string) {
  return this.findOne({ slug, status: 'approved', isActive: true });
};

AccommodationSchema.statics.findByOwner = async function(ownerId: string) {
  return this.find({ ownerId }).sort({ createdAt: -1 });
};

AccommodationSchema.statics.findPending = async function() {
  return this.find({ status: 'pending' }).sort({ createdAt: -1 });
};

// ============================================
// EXPORT DU MODÈLE
// ============================================

export const Accommodation: Model<IAccommodation> =
  mongoose.models.Accommodation ||
  mongoose.model<IAccommodation>('Accommodation', AccommodationSchema);