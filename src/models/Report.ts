import mongoose, { Schema, Model } from 'mongoose';

export interface IReport {
  _id: mongoose.Types.ObjectId;
  reporterId: mongoose.Types.ObjectId;
  reporterName: string;
  targetType: 'user' | 'product' | 'establishment' | 'post' | 'review';
  targetId: mongoose.Types.ObjectId;
  reason: string;
  description: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  resolution?: string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IReport>(
  {
    reporterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reporterName: { type: String, required: true },
    targetType: { type: String, enum: ['user', 'product', 'establishment', 'post', 'review'], required: true },
    targetId: { type: Schema.Types.ObjectId, required: true },
    reason: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'resolved', 'dismissed'],
      default: 'pending'
    },
    resolution: { type: String },
  },
  { timestamps: true }
);

schema.index({ status: 1 });
schema.index({ targetType: 1 });

export const Report: Model<IReport> = mongoose.models.Report || mongoose.model<IReport>('Report', schema);