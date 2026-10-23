import mongoose, { Schema, Model } from 'mongoose';

export interface IEvent {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  type: string;
  region: string;
  city: string;
  startDate: Date;
  endDate: Date;
  ownerId: mongoose.Types.ObjectId;
  ownerName: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs_correction';
  rejectionReason?: string;
  correctionRequest?: string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IEvent>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    region: { type: String, required: true },
    city: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ownerName: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'needs_correction'],
      default: 'pending'
    },
    rejectionReason: { type: String },
    correctionRequest: { type: String },
  },
  { timestamps: true }
);

schema.index({ status: 1 });
schema.index({ region: 1 });

export const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', schema);