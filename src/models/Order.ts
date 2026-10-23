import mongoose, { Schema, Model } from 'mongoose';

export interface IOrder {
  _id: mongoose.Types.ObjectId;
  orderNumber: string;
  buyerId: mongoose.Types.ObjectId;
  buyerName: string;
  sellerId: mongoose.Types.ObjectId;
  sellerName: string;
  items: Array<{ productId: mongoose.Types.ObjectId; name: string; quantity: number; price: number }>;
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  region: string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    buyerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    buyerName: { type: String, required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sellerName: { type: String, required: true },
    items: [{
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    },
    region: { type: String },
  },
  { timestamps: true }
);

schema.index({ status: 1 });
schema.index({ buyerId: 1 });
schema.index({ sellerId: 1 });

export const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', schema);