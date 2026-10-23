import mongoose, { Schema, Model } from 'mongoose';

export interface IShop {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  type: string;
  region: string;
  city: string;
  ownerId: mongoose.Types.ObjectId;
  ownerName: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs_correction';
  rejectionReason?: string;
  correctionRequest?: string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IShop>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    region: { type: String, required: true },
    city: { type: String, required: true },
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

export const Shop: Model<IShop> = mongoose.models.Shop || mongoose.model<IShop>('Shop', schema);