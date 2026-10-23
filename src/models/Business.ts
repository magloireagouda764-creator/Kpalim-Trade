import mongoose, { Schema, Model } from 'mongoose';

export interface IBusiness {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  sector: string;
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

const businessSchema = new Schema<IBusiness>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    sector: { type: String, required: true },
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

businessSchema.index({ status: 1 });
businessSchema.index({ region: 1 });
businessSchema.index({ ownerId: 1 });

export const Business: Model<IBusiness> = mongoose.models.Business || mongoose.model<IBusiness>('Business', businessSchema);