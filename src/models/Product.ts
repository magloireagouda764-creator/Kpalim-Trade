import mongoose, { Schema, Model } from 'mongoose';

export interface IProduct {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  category: string;
  price: number;
  region: string;
  ownerId: mongoose.Types.ObjectId;
  ownerName: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs_correction';
  rejectionReason?: string;
  correctionRequest?: string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    region: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ownerName: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'needs_correction'],
      default: 'pending'
    },
    rejectionReason: { type: String },
    correctionRequest: { type: String },
  },
  { timestamps: true }
);

schema.index({ status: 1 });
schema.index({ region: 1 });
schema.index({ category: 1 });

export const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', schema);