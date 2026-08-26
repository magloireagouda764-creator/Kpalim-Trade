import mongoose, { Schema, Model } from 'mongoose';

export interface IProfessional {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  category: string;
  description: string;
  logo?: string;
  portfolio: { public_id: string; secure_url: string }[];
  skills: string[];
  phone: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  city: string;
  availability?: string;
  priceRange?: string;
  isActive: boolean;
  isFeatured: boolean;
}

const schema = new Schema<IProfessional>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String },
    portfolio: [{ public_id: String, secure_url: String }],
    skills: [{ type: String }],
    phone: { type: String, required: true },
    whatsapp: { type: String },
    email: { type: String },
    address: { type: String },
    city: { type: String, default: 'Kpalimé' },
    availability: { type: String },
    priceRange: { type: String },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

schema.index({ slug: 1 });
schema.index({ category: 1, isActive: 1, isFeatured: -1 });

export const Professional: Model<IProfessional> = mongoose.models.Professional || mongoose.model<IProfessional>('Professional', schema);
