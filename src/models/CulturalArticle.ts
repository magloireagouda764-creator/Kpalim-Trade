import mongoose, { Schema, Model } from 'mongoose';

export interface ICulturalArticle {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: 'histoire' | 'tradition' | 'patrimoine' | 'musique' | 'danse' | 'gastronomie' | 'autre';
  author?: string;
  publishedAt?: Date;
  isFeatured: boolean;
  isActive: boolean;
}

const schema = new Schema<ICulturalArticle>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    category: {
      type: String,
      enum: ['histoire', 'tradition', 'patrimoine', 'musique', 'danse', 'gastronomie', 'autre'],
      required: true,
    },
    author: { type: String },
    publishedAt: { type: Date },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

schema.index({ slug: 1 });
schema.index({ category: 1, isActive: 1, publishedAt: -1 });

export const CulturalArticle: Model<ICulturalArticle> =
  mongoose.models.CulturalArticle || mongoose.model<ICulturalArticle>('CulturalArticle', schema);
