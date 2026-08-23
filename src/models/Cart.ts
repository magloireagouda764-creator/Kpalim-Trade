import mongoose, { Schema, Model } from 'mongoose';

export interface ICartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number; // Prix unitaire en XOF au moment de l'ajout
}

export interface ICart {
  _id: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  sessionId?: string;
  items: ICartItem[];
}

const schema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', sparse: true },
    sessionId: { type: String, sparse: true },
    items: [{
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true, min: 0 },
    }],
  },
  { timestamps: true }
);

schema.index({ userId: 1 });
schema.index({ sessionId: 1 });

export const Cart: Model<ICart> = mongoose.models.Cart || mongoose.model<ICart>('Cart', schema);
