import mongoose, { Schema, Model } from 'mongoose';

export interface IReport {
  _id: mongoose.Types.ObjectId;
  reporterId: mongoose.Types.ObjectId;
  reportableType: 'product' | 'shop' | 'user' | 'review' | 'event' | 'professional';
  reportableId: mongoose.Types.ObjectId;
  reason: string;
  details?: string;
  status: 'new' | 'investigating' | 'resolved' | 'dismissed';
  resolvedBy?: mongoose.Types.ObjectId;
  resolvedAt?: Date;
}

const schema = new Schema<IReport>(
  {
    reporterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reportableType: { type: String, enum: ['product', 'shop', 'user', 'review', 'event', 'professional'], required: true },
    reportableId: { type: Schema.Types.ObjectId, required: true },
    reason: { type: String, required: true },
    details: { type: String },
    status: { type: String, enum: ['new', 'investigating', 'resolved', 'dismissed'], default: 'new' },
    resolvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    resolvedAt: { type: Date },
  },
  { timestamps: true }
);

schema.index({ status: 1, createdAt: -1 });
schema.index({ reportableType: 1, reportableId: 1 });

export const Report: Model<IReport> = mongoose.models.Report || mongoose.model<IReport>('Report', schema);
