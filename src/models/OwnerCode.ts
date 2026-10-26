import mongoose, { Schema, Model, Document } from 'mongoose';

// 1. Interface pour le document (inclut les champs + les méthodes d'instance)
export interface IOwnerCodeDocument extends Document {
  _id: mongoose.Types.ObjectId;
  code: string;
  ownerId: mongoose.Types.ObjectId;
  establishmentName: string;
  accommodationId: mongoose.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected';
  attempts: number;
  blockedUntil: Date | null;
  expiresAt: Date;
  lastActivity: Date;
  createdAt: Date;
  updatedAt: Date;

  // Méthodes d'instance
  isBlocked(): boolean;
  isExpired(): boolean;
  incrementAttempts(): Promise<boolean>;
  resetAttempts(): Promise<void>;
  refreshExpiration(): Promise<void>;
}

// 2. Interface pour les méthodes statiques du modèle
export interface OwnerCodeModel extends Model<IOwnerCodeDocument> {
  generateCode(): Promise<string>;
}

const ownerCodeSchema = new Schema<IOwnerCodeDocument, OwnerCodeModel>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      match: /^[A-Z]{2}-[A-Z0-9]{4}$/, // Format: KT-4A8B2X
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    establishmentName: {
      type: String,
      required: true,
      trim: true,
    },
    accommodationId: {
      type: Schema.Types.ObjectId,
      ref: 'Accommodation',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    attempts: {
      type: Number,
      default: 0,
      min: 0,
    },
    blockedUntil: {
      type: Date,
      default: null,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index pour recherches rapides
ownerCodeSchema.index({ code: 1 });
ownerCodeSchema.index({ ownerId: 1 });
ownerCodeSchema.index({ accommodationId: 1 });
ownerCodeSchema.index({ expiresAt: 1 });

// ✅ Méthodes d'instance
ownerCodeSchema.methods.isBlocked = function (this: IOwnerCodeDocument) {
  if (!this.blockedUntil) return false;
  return new Date() < this.blockedUntil;
};

ownerCodeSchema.methods.isExpired = function (this: IOwnerCodeDocument) {
  return new Date() > this.expiresAt;
};

ownerCodeSchema.methods.incrementAttempts = async function (this: IOwnerCodeDocument) {
  this.attempts += 1;
  this.lastActivity = new Date();

  if (this.attempts >= 5) {
    this.blockedUntil = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    this.attempts = 0;
  }

  await this.save();
  return this.isBlocked();
};

ownerCodeSchema.methods.resetAttempts = async function (this: IOwnerCodeDocument) {
  this.attempts = 0;
  this.blockedUntil = null;
  this.lastActivity = new Date();
  await this.save();
};

ownerCodeSchema.methods.refreshExpiration = async function (this: IOwnerCodeDocument) {
  this.expiresAt = new Date(Date.now() + 30 * 60 * 1000);
  this.lastActivity = new Date();
  await this.save();
};

// ✅ Méthode statique
ownerCodeSchema.statics.generateCode = async function (this: OwnerCodeModel): Promise<string> {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  let code: string;
  let isUnique = false;

  while (!isUnique) {
    const prefix = Array.from({ length: 2 }, () =>
      letters.charAt(Math.floor(Math.random() * letters.length))
    ).join('');

    const suffix = Array.from({ length: 4 }, () =>
      alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length))
    ).join('');

    code = `${prefix}-${suffix}`;

    const existing = await this.findOne({ code });
    if (!existing) {
      isUnique = true;
    }
  }

  return code;
};

// ✅ Export avec le bon typage
export const OwnerCode: OwnerCodeModel =
  (mongoose.models.OwnerCode as OwnerCodeModel) ||
  mongoose.model<IOwnerCodeDocument, OwnerCodeModel>('OwnerCode', ownerCodeSchema);