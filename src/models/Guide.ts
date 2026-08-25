import mongoose, { Schema, Model } from 'mongoose';

export interface IGuide {
  _id: mongoose.Types.ObjectId;
  name: string;
  photo?: string;
  phone: string;
  whatsapp?: string;
  languages: string[];
  zone: string;
  specialties: string[];
  description: string;
  dailyRate?: number;
  experienceYears?: number;
  isActive: boolean;
}

const schema = new Schema<IGuide>(
  {
    name: { type: String, required: true, trim: true },
    photo: { type: String },
    phone: { type: String, required: true },
    whatsapp: { type: String },
    languages: [{ type: String }],
    zone: { type: String, required: true },
    specialties: [{ type: String }],
    description: { type: String, required: true },
    dailyRate: { type: Number, min: 0 },
    experienceYears: { type: Number, min: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

schema.index({ zone: 1, isActive: 1 });

export const Guide: Model<IGuide> = mongoose.models.Guide || mongoose.model<IGuide>('Guide', schema);
