import mongoose, { Schema, Model } from 'mongoose';

export interface IMenuItem {
  _id: mongoose.Types.ObjectId;
  restaurantId: mongoose.Types.ObjectId;
  category: 'entree' | 'plat' | 'dessert' | 'boisson' | 'autre';
  name: string;
  description?: string;
  price: number; // En XOF
  image?: string;
  isLocal: boolean;
  dietaryTags: string[];
  isActive: boolean;
}

const schema = new Schema<IMenuItem>(
  {
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    category: { type: String, enum: ['entree', 'plat', 'dessert', 'boisson', 'autre'], required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    image: { type: String },
    isLocal: { type: Boolean, default: false },
    dietaryTags: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

schema.index({ restaurantId: 1, category: 1, isActive: 1 });

export const MenuItem: Model<IMenuItem> = mongoose.models.MenuItem || mongoose.model<IMenuItem>('MenuItem', schema);
