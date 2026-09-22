import mongoose, { Schema, Model } from 'mongoose';

export interface IAuditLog {
  _id: mongoose.Types.ObjectId;
  adminId: mongoose.Types.ObjectId;
  action: string;
  modelType: string;
  modelId?: string;
  changes?: Record<string, unknown>;
  ip?: string;
}

const schema = new Schema<IAuditLog>(
  {
    adminId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    modelType: { type: String, required: true },
    modelId: { type: String },
    changes: { type: Schema.Types.Mixed },
    ip: { type: String },
  },
  { timestamps: true }
);

schema.index({ createdAt: -1 });
schema.index({ adminId: 1, createdAt: -1 });
schema.index({ modelType: 1, modelId: 1 });

export const AuditLog: Model<IAuditLog> = mongoose.models.AuditLog || mongoose.model<IAuditLog>('AuditLog', schema);
