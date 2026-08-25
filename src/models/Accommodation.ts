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
}

const schema = new Schema<IAccommodation>(
  {
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
  },
  { timestamps: true }
);

schema.index({ slug: 1 });
schema.index({ type: 1, isFeatured: -1 });

export const Accommodation: Model<IAccommodation> = mongoose.models.Accommodation || mongoose.model<IAccommodation>('Accommodation', schema);
