import mongoose, { Schema, Model } from 'mongoose';

export interface ITourismSite {
  _id: mongoose.Types.ObjectId;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  images: Array<{ secure_url: string; public_id: string }>;
  category?: string;
  type: string;
  region: string;
  city: string;
  activities: string[];
  entranceFee?: number;
  openingHours?: string;
  duration?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  bestPeriod?: string;
  contactPhone?: string;
  isActive: boolean;
  isFeatured?: boolean;
  ownerId?: mongoose.Types.ObjectId;
  ownerName?: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs_correction' | 'published';
  rejectionReason?: string;
  correctionRequest?: string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<ITourismSite>(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    images: [{
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true }
    }],
    category: { type: String },
    type: { type: String, required: true },
    region: { type: String, required: true },
    city: { type: String, required: true },
    activities: [{ type: String }],
    entranceFee: { type: Number },
    openingHours: { type: String },
    duration: { type: String },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
    bestPeriod: { type: String },
    contactPhone: { type: String },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
    ownerName: { type: String },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'needs_correction', 'published'],
      default: 'pending'
    },
    rejectionReason: { type: String },
    correctionRequest: { type: String },
  },
  { timestamps: true }
);

schema.index({ status: 1 });
schema.index({ region: 1 });
schema.index({ slug: 1 });
schema.index({ isActive: 1 });
schema.index({ isFeatured: -1 });

export const TourismSite: Model<ITourismSite> = mongoose.models.TourismSite || mongoose.model<ITourismSite>('TourismSite', schema);