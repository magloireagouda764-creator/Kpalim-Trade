import mongoose, { Schema, Model } from 'mongoose';
import type { ProductStatus } from '@/types';

export interface IProductImage {
  public_id: string;
  secure_url: string;
}

export interface IProduct {
  _id: mongoose.Types.ObjectId;
  shopId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  price: number; // Toujours en XOF
  discountPrice?: number;
  stock: number;
  images: IProductImage[];
  status: ProductStatus;
  isFeatured: boolean;
  soldCount: number;
}

const schema = new Schema<IProduct>(
  {
    shopId: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    images: [{
      public_id: { type: String, required: true },
      secure_url: { type: String, required: true },
    }],
    status: { type: String, enum: ['pending', 'active', 'inactive', 'rejected'], default: 'pending' },
    isFeatured: { type: Boolean, default: false },
    soldCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

schema.index({ slug: 1 });
schema.index({ shopId: 1 });
schema.index({ categoryId: 1 });
schema.index({ status: 1, isFeatured: -1, createdAt: -1 });

export const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', schema);
