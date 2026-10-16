import mongoose, { Schema, Model } from 'mongoose';
import { 
  IRestaurant, 
  RestaurantType, 
  RestaurantStatus, 
  TogoRegion, 
  Currency,
  PriceRange
} from '@/types/restaurant';

// ============================================
// SCHÉMA POUR LES HORAIRES D'OUVERTURE
// ============================================

const DayHoursSchema = new Schema({
  open: { type: String, default: '08:00' },
  close: { type: String, default: '22:00' },
  closed: { type: Boolean, default: false },
}, { _id: false });

const OpeningHoursSchema = new Schema({
  monday: { type: DayHoursSchema, default: () => ({}) },
  tuesday: { type: DayHoursSchema, default: () => ({}) },
  wednesday: { type: DayHoursSchema, default: () => ({}) },
  thursday: { type: DayHoursSchema, default: () => ({}) },
  friday: { type: DayHoursSchema, default: () => ({}) },
  saturday: { type: DayHoursSchema, default: () => ({}) },
  sunday: { type: DayHoursSchema, default: () => ({}) },
}, { _id: false });

// ============================================
// SCHÉMA PRINCIPAL RESTAURANT
// ============================================

const RestaurantSchema = new Schema<IRestaurant>(
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
      enum: ['restaurant', 'maquis', 'fast_food', 'street_food', 'cafeteria', 'snack'],
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

    // --- SPÉCIALITÉS ET TARIFS ---
    cuisines: [{ 
      type: String,
      required: true,
    }],
    specialties: [{ type: String }],
    priceRange: {
      type: String,
      enum: ['budget', 'moderate', 'expensive', 'luxury'],
      required: [true, 'La gamme de prix est obligatoire'],
    },
    averagePrice: { 
      type: Number,
      min: 0,
    },
    currency: {
      type: String,
      enum: ['XOF', 'EUR', 'USD'],
      default: 'XOF',
    },

    // --- HORAIRES D'OUVERTURE ---
    openingHours: {
      type: OpeningHoursSchema,
      default: () => ({}),
    },

    // --- SERVICES ---
    services: [{ type: String }],
    paymentMethods: [{ type: String }],

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
    timestamps: true,
  }
);

// ============================================
// INDEX POUR OPTIMISER LES REQUÊTES
// ============================================

// Index unique sur le slug
RestaurantSchema.index({ slug: 1 }, { unique: true });

// Index composé pour filtrer par statut et région
RestaurantSchema.index({ status: 1, region: 1 });

// Index pour retrouver les restaurants d'un propriétaire
RestaurantSchema.index({ ownerId: 1 });

// Index pour les recherches par type et statut
RestaurantSchema.index({ type: 1, status: 1 });

// Index pour les restaurants en vedette
RestaurantSchema.index({ isFeatured: -1, status: 1 });

// Index pour les recherches par cuisine
RestaurantSchema.index({ cuisines: 1 });

// Index pour les recherches par ville
RestaurantSchema.index({ city: 1, status: 1 });

// Index texte pour la recherche full-text
RestaurantSchema.index({ 
  name: 'text', 
  description: 'text', 
  city: 'text',
  cuisines: 'text',
  specialties: 'text'
});

// ============================================
// MÉTHODES STATIQUES
// ============================================

RestaurantSchema.statics.findBySlug = async function(slug: string) {
  return this.findOne({ slug, status: 'approved', isActive: true });
};

RestaurantSchema.statics.findByOwner = async function(ownerId: string) {
  return this.find({ ownerId }).sort({ createdAt: -1 });
};

RestaurantSchema.statics.findPending = async function() {
  return this.find({ status: 'pending' }).sort({ createdAt: -1 });
};

RestaurantSchema.statics.findByRegion = async function(region: string) {
  return this.find({ region, status: 'approved', isActive: true })
    .sort({ isFeatured: -1, createdAt: -1 });
};

// ============================================
// EXPORT DU MODÈLE
// ============================================

export const Restaurant: Model<IRestaurant> =
  mongoose.models.Restaurant ||
  mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);