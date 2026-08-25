import mongoose, { Schema, Model } from 'mongoose';

export interface IRestaurant {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  cuisineType: string;
  logo?: string;
  images: { public_id: string; secure_url: string }[];
  address: string;
  city: string;
  district?: string;
  phone: string;
  whatsapp?: string;
  openingHours: string;
  priceRange: 'budget' | 'mid' | 'premium';
  services: string[];
  specialties: string[];
  isFeatured: boolean;
  isActive: boolean;
}

const schema = new Schema<IRestaurant>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    cuisineType: { type: String, required: true },
    logo: { type: String },
    images: [{ public_id: String, secure_url: String }],
    address: { type: String, required: true },
    city: { type: String, default: 'Kpalimé' },
    district: { type: String },
    phone: { type: String, required: true },
    whatsapp: { type: String },
    openingHours: { type: String, required: true },
    priceRange: { type: String, enum: ['budget', 'mid', 'premium'], default: 'mid' },
    services: [{ type: String }],
    specialties: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

schema.index({ slug: 1 });
schema.index({ cuisineType: 1, isFeatured: -1 });

export const Restaurant: Model<IRestaurant> = mongoose.models.Restaurant || mongoose.model<IRestaurant>('Restaurant', schema);
