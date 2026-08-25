import mongoose, { Schema, Model } from 'mongoose';

export interface IArtisan {
  _id: mongoose.Types.ObjectId;
  name: string;
  specialty: string;
  bio: string;
  photo?: string;
  gallery: { public_id: string; secure_url: string }[];
  phone?: string;
  whatsapp?: string;
  email?: string;
  location?: string;
  shopId?: mongoose.Types.ObjectId;
  isActive: boolean;
  isFeatured: boolean;
}

const schema = new Schema<IArtisan>(
  {
    name: { type: String, required: true, trim: true },
    specialty: { type: String, required: true },
    bio: { type: String, required: true },
    photo: { type: String },
    gallery: [{ public_id: String, secure_url: String }],
    phone: { type: String },
    whatsapp: { type: String },
    email: { type: String },
    location: { type: String },
    shopId: { type: Schema.Types.ObjectId, ref: 'Shop', default: null },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

schema.index({ specialty: 1, isActive: 1 });

export const Artisan: Model<IArtisan> = mongoose.models.Artisan || mongoose.model<IArtisan>('Artisan', schema);
