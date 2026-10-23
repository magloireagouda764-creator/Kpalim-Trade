import mongoose, { Schema, Model } from 'mongoose';

export interface IReview {
  _id: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  authorName: string;
  targetType: 'product' | 'establishment' | 'service';
  targetId: mongoose.Types.ObjectId;
  targetName: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IReview>(
  {
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String, required: true },
    targetType: { type: String, enum: ['product', 'establishment', 'service'], required: true },
    targetId: { type: Schema.Types.ObjectId, required: true },
    targetName: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    rejectionReason: { type: String },
  },
  { timestamps: true }
);

schema.index({ status: 1 });
schema.index({ targetType: 1 });

export const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', schema);