import mongoose, { Schema, Model } from 'mongoose';

export interface ITouristSiteImage {
  public_id: string;
  secure_url: string;
}

export interface ITouristSite {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  images: ITouristSiteImage[];
  gpsLat?: number;
  gpsLng?: number;
  address?: string;
  city: string;
  entranceFee?: number;
  openingHours?: string;
  contactPhone?: string;
  activities: string[];
  duration?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  bestPeriod?: string;
  isFeatured: boolean;
  isActive: boolean;
}

const schema = new Schema<ITouristSite>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['cascade', 'montagne', 'foret', 'village', 'marche', 'culturel', 'naturel'], required: true },
    images: [{ public_id: String, secure_url: String }],
    gpsLat: { type: Number },
    gpsLng: { type: Number },
    address: { type: String },
    city: { type: String, default: 'Kpalimé' },
    entranceFee: { type: Number, min: 0 },
    openingHours: { type: String },
    contactPhone: { type: String },
    activities: [{ type: String }],
    duration: { type: String },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
    bestPeriod: { type: String },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

schema.index({ slug: 1 });
schema.index({ category: 1, isFeatured: -1 });

export const TouristSite: Model<ITouristSite> = mongoose.models.TouristSite || mongoose.model<ITouristSite>('TouristSite', schema);
