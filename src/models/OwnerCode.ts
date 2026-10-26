import mongoose, { Schema, Model } from 'mongoose';

export interface IOwnerCode {
  _id: mongoose.Types.ObjectId;
  code: string; // ex: KT-4A8B2X
  ownerId: mongoose.Types.ObjectId;
  establishmentName: string; // Nom exact de l'établissement
  accommodationId: mongoose.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected';
  attempts: number; // Nombre de tentatives échouées
  blockedUntil: Date; // Date de fin de blocage
  expiresAt: Date; // Date d'expiration du code
  lastActivity: Date; // Dernière activité
  createdAt: Date;
  updatedAt: Date;
}

const ownerCodeSchema = new Schema<IOwnerCode>(
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

// Méthode pour vérifier si le code est bloqué
ownerCodeSchema.methods.isBlocked = function () {
  if (!this.blockedUntil) return false;
  return new Date() < this.blockedUntil;
};

// Méthode pour vérifier si le code est expiré
ownerCodeSchema.methods.isExpired = function () {
  return new Date() > this.expiresAt;
};

// Méthode pour incrémenter les tentatives
ownerCodeSchema.methods.incrementAttempts = async function () {
  this.attempts += 1;
  this.lastActivity = new Date();

  // Si 5 tentatives échouées, bloquer pour 5 minutes
  if (this.attempts >= 5) {
    this.blockedUntil = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    this.attempts = 0; // Reset pour la prochaine session
  }

  await this.save();
  return this.isBlocked();
};

// Méthode pour réinitialiser après succès
ownerCodeSchema.methods.resetAttempts = async function () {
  this.attempts = 0;
  this.blockedUntil = null;
  this.lastActivity = new Date();
  await this.save();
};

// Méthode pour prolonger l'expiration (30 min d'inactivité)
ownerCodeSchema.methods.refreshExpiration = async function () {
  this.expiresAt = new Date(Date.now() + 30 * 60 * 1000);
  this.lastActivity = new Date();
  await this.save();
};

// Méthode statique pour générer un code unique
ownerCodeSchema.statics.generateCode = async function (): Promise<string> {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  let code: string;
  let isUnique = false;

  while (!isUnique) {
    // 2 lettres aléatoires
    const prefix = Array.from({ length: 2 }, () =>
      letters.charAt(Math.floor(Math.random() * letters.length))
    ).join('');

    // 4 caractères alphanumériques
    const suffix = Array.from({ length: 4 }, () =>
      alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length))
    ).join('');

    code = `${prefix}-${suffix}`;

    // Vérifier l'unicité
    const existing = await this.findOne({ code });
    if (!existing) {
      isUnique = true;
    }
  }

  return code;
};

export const OwnerCode: Model<IOwnerCode> =
  mongoose.models.OwnerCode ||
  mongoose.model<IOwnerCode>('OwnerCode', ownerCodeSchema);