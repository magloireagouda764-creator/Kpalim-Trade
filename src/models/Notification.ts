import mongoose, { Schema, Model } from 'mongoose';

export interface INotification {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  body: string;
  type: 'order' | 'shop' | 'product' | 'system' | 'promotion';
  link?: string;
  readAt?: Date;
}

const schema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    type: { type: String, enum: ['order', 'shop', 'product', 'system', 'promotion'], required: true },
    link: { type: String },
    readAt: { type: Date },
  },
  { timestamps: true }
);

schema.index({ userId: 1, readAt: 1, createdAt: -1 });

export const Notification: Model<INotification> = mongoose.models.Notification || mongoose.model<INotification>('Notification', schema);
