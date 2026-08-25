import mongoose, { Schema, Model } from 'mongoose';

export interface IEvent {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  category: 'concert' | 'festival' | 'exposition' | 'conference' | 'sport' | 'culturel' | 'marche' | 'autre';
  poster?: string;
  images: { public_id: string; secure_url: string }[];
  startDate: Date;
  endDate?: Date;
  startTime?: string;
  endTime?: string;
  location: string;
  address?: string;
  organizer?: string;
  contactPhone?: string;
  contactEmail?: string;
  price?: number; // En XOF, 0 = gratuit
  isFree: boolean;
  status: 'pending' | 'published' | 'cancelled' | 'finished';
  isFeatured: boolean;
}

const schema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['concert', 'festival', 'exposition', 'conference', 'sport', 'culturel', 'marche', 'autre'],
      required: true,
    },
    poster: { type: String },
    images: [{ public_id: String, secure_url: String }],
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    startTime: { type: String },
    endTime: { type: String },
    location: { type: String, required: true },
    address: { type: String },
    organizer: { type: String },
    contactPhone: { type: String },
    contactEmail: { type: String },
    price: { type: Number, min: 0, default: 0 },
    isFree: { type: Boolean, default: true },
    status: { type: String, enum: ['pending', 'published', 'cancelled', 'finished'], default: 'published' },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

schema.index({ slug: 1 });
schema.index({ status: 1, startDate: -1 });
schema.index({ category: 1, startDate: -1 });

export const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', schema);
