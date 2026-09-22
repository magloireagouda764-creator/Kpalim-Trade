import mongoose, { Schema, Model } from 'mongoose';

export interface IReview {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  reviewableType: 'product' | 'shop' | 'hotel' | 'restaurant' | 'guide' | 'professional';
  reviewableId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  status: 'visible' | 'hidden' | 'reported';
}

const schema = new Schema<IReview>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reviewableType: { type: String, enum: ['product', 'shop', 'hotel', 'restaurant', 'guide', 'professional'], required: true },
    reviewableId: { type: Schema.Types.ObjectId, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, maxlength: 1000 },
    status: { type: String, enum: ['visible', 'hidden', 'reported'], default: 'visible' },
  },
  { timestamps: true }
);

// Un utilisateur ne peut laisser qu'un avis par entité
schema.index({ userId: 1, reviewableType: 1, reviewableId: 1 }, { unique: true });
schema.index({ reviewableType: 1, reviewableId: 1, status: 1 });

export const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', schema);
