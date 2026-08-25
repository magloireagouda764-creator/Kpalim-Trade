import mongoose, { Schema, Model } from 'mongoose';

export interface IRoom {
  _id: mongoose.Types.ObjectId;
  accommodationId: mongoose.Types.ObjectId;
  name: string;
  type: string;
  description?: string;
  pricePerNight: number; // En XOF
  capacity: number;
  beds: string;
  amenities: string[];
  images: { public_id: string; secure_url: string }[];
  isActive: boolean;
}

const schema = new Schema<IRoom>(
  {
    accommodationId: { type: Schema.Types.ObjectId, ref: 'Accommodation', required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    pricePerNight: { type: Number, required: true, min: 0 },
    capacity: { type: Number, required: true, min: 1 },
    beds: { type: String, required: true },
    amenities: [{ type: String }],
    images: [{ public_id: String, secure_url: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

schema.index({ accommodationId: 1, isActive: 1 });

export const Room: Model<IRoom> = mongoose.models.Room || mongoose.model<IRoom>('Room', schema);
