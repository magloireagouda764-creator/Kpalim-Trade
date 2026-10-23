import mongoose, { Schema, Model } from 'mongoose';

export interface IProduct {
  _id: mongoose.Types.ObjectId;
  slug: string;
  name: string;
  description: string;
  category: string;
  price: number;
  discountPrice?: number;
  images?: Array<{ secure_url: string; public_id: string }>; // ✅ AJOUTÉ
  region: string;
  ownerId: mongoose.Types.ObjectId;
  ownerName: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs_correction' | 'active';
  rejectionReason?: string;
  correctionRequest?: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IProduct>(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    images: [{ // ✅ AJOUTÉ
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true }
    }],
    region: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ownerName: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'needs_correction', 'active'],
      default: 'pending'
    },
    rejectionReason: { type: String },
    correctionRequest: { type: String },
    stock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

schema.index({ status: 1 });
schema.index({ region: 1 });
schema.index({ category: 1 });

export const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', schema);