import mongoose, { Schema, Model } from 'mongoose';

export interface IEvent {
  _id: mongoose.Types.ObjectId;
  slug: string;
  title: string;
  description: string;
  poster?: string;
  startDate: Date;
  endDate?: Date;
  startTime?: string;
  endTime?: string;
  location?: string;
  address?: string;
  isFree?: boolean;
  price?: number;
  organizer?: string;
  contactPhone?: string;
  region?: string;
  city?: string;
  ownerId?: mongoose.Types.ObjectId;
  ownerName?: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs_correction' | 'published';
  rejectionReason?: string;
  correctionRequest?: string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IEvent>(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    poster: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    startTime: { type: String },
    endTime: { type: String },
    location: { type: String },
    address: { type: String },
    isFree: { type: Boolean, default: false },
    price: { type: Number },
    organizer: { type: String },
    contactPhone: { type: String },
    region: { type: String },
    city: { type: String },
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

export const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', schema);