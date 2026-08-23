import mongoose, { Schema, Model } from 'mongoose';
import type { CurrencyCode } from '@/lib/currency';

export interface ICurrency {
  code: CurrencyCode;
  name: string;
  symbol: string;
  rateToXOF: number;
  isDefault: boolean;
  isActive: boolean;
}

const schema = new Schema<ICurrency>(
  {
    code: { type: String, required: true, unique: true, enum: ['XOF', 'USD', 'EUR'] },
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    rateToXOF: { type: Number, required: true, min: 0.001 },
    isDefault: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Currency: Model<ICurrency> =
  mongoose.models.Currency || mongoose.model<ICurrency>('Currency', schema);
