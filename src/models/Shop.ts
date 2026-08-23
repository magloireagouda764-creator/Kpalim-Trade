import mongoose, { Schema, Model } from 'mongoose';
import type { ShopStatus } from '@/types';

export interface IShop {
  _id: mongoose.Types.ObjectId;
  ownerId: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  logo?: string;
  banner?: string;
  description: string;
  categoryId?: mongoose.Types.ObjectId;
  address: string;
  city: string;
  district?: string;
  phone: string;
  email?: string;
  whatsapp?: string;
  gpsLat?: number;
  gpsLng?: number;
  openingHours?: string;
  status: ShopStatus;
  isFeatured: boolean;
  approvedAt?: Date;
}

const schema = new Schema<IShop>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    logo: { type: String },
    banner: { type: String },
    description: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    address: { type: String, required: true },
    city: { type: String, required: true, default: 'Kpalimé' },
    district: { type: String },
    phone: { type: String, required: true },
    email: { type: String },
    whatsapp: { type: String },
    gpsLat: { type: Number },
    gpsLng: { type: Number },
    openingHours: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'suspended'], default: 'pending' },
    isFeatured: { type: Boolean, default: false },
    approvedAt: { type: Date },
  },
  { timestamps: true }
);

schema.index({ slug: 1 });
schema.index({ ownerId: 1 });
schema.index({ status: 1 });

export const Shop: Model<IShop> = mongoose.models.Shop || mongoose.model<IShop>('Shop', schema);
