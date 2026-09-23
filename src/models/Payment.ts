import mongoose, { Schema, Model } from 'mongoose';

export interface IPayment {
  _id: mongoose.Types.ObjectId;
  orderId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  amount: number; // En XOF
  currency: string;
  method: 'cod' | 'mobile_money' | 'card';
  provider?: string; // Nom de l'agrégateur (cinetpay, fedapay, etc.)
  providerTransactionId?: string;
  providerPayload?: Record<string, unknown>;
  status: 'pending' | 'processing' | 'success' | 'failed' | 'refunded';
  phoneNumber?: string;
  operator?: 't-money' | 'flooz' | 'autre';
  paidAt?: Date;
  refundedAt?: Date;
}

const schema = new Schema<IPayment>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'XOF' },
    method: { type: String, enum: ['cod', 'mobile_money', 'card'], required: true },
    provider: { type: String },
    providerTransactionId: { type: String },
    providerPayload: { type: Schema.Types.Mixed },
    status: { type: String, enum: ['pending', 'processing', 'success', 'failed', 'refunded'], default: 'pending' },
    phoneNumber: { type: String },
    operator: { type: String, enum: ['t-money', 'flooz', 'autre'] },
    paidAt: { type: Date },
    refundedAt: { type: Date },
  },
  { timestamps: true }
);

schema.index({ orderId: 1 });
schema.index({ userId: 1, createdAt: -1 });
schema.index({ providerTransactionId: 1 });
schema.index({ status: 1 });

export const Payment: Model<IPayment> = mongoose.models.Payment || mongoose.model<IPayment>('Payment', schema);
