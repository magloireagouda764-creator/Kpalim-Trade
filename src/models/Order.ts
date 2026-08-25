import mongoose, { Schema, Model } from 'mongoose';
import type { OrderStatus } from '@/types';

export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  shopId: mongoose.Types.ObjectId;
  name: string;
  price: number; // Prix unitaire en XOF au moment de la commande
  quantity: number;
  image?: string;
}

export interface IOrder {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  reference: string;
  items: IOrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  deliveryAddress: string;
  city: string;
  district?: string;
  phone: string;
  note?: string;
  deliveredAt?: Date;
}

const schema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reference: { type: String, required: true, unique: true },
    items: [{
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      shopId: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true, min: 0 },
      quantity: { type: Number, required: true, min: 1 },
      image: { type: String },
    }],
    subtotal: { type: Number, required: true, min: 0 },
    deliveryFee: { type: Number, default: 0, min: 0 },
    total: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['pending', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    paymentMethod: { type: String, default: 'cod' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    deliveryAddress: { type: String, required: true },
    city: { type: String, required: true, default: 'Kpalimé' },
    district: { type: String },
    phone: { type: String, required: true },
    note: { type: String },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

schema.index({ userId: 1, createdAt: -1 });
schema.index({ reference: 1 });
schema.index({ status: 1 });

export const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', schema);
