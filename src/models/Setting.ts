import mongoose, { Schema, Model } from 'mongoose';

export interface ISetting {
  _id: mongoose.Types.ObjectId;
  key: string;
  value: string;
  group: string;
  description?: string;
}

const schema = new Schema<ISetting>(
  {
    key: { type: String, required: true, unique: true },
    value: { type: String, required: true },
    group: { type: String, required: true, enum: ['general', 'appearance', 'contact', 'legal', 'marketplace'] },
    description: { type: String },
  },
  { timestamps: true }
);

export const Setting: Model<ISetting> = mongoose.models.Setting || mongoose.model<ISetting>('Setting', schema);
