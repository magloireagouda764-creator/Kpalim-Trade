import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Charger les variables d'environnement
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Définir le schéma directement dans le script
const AccommodationSchema = new mongoose.Schema({
  name: String,
  slug: String,
  type: String,
  description: String,
  address: String,
  city: String,
  region: String,
  phone: String,
  email: String,
  ownerName: String,
  ownerId: mongoose.Schema.Types.ObjectId,
  status: String,
  isActive: Boolean,
  ownerCode: String,
}, { timestamps: true });

const Accommodation = mongoose.models.Accommodation || mongoose.model('Accommodation', AccommodationSchema);

async function addOwnerCodes() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI non défini dans .env.local');
      process.exit(1);
    }

    console.log('🔌 Connexion à MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connecté à MongoDB');

    console.log('🔍 Recherche des établissements sans ownerCode...');

    // Trouver tous les établissements approuvés sans ownerCode
    const accommodations = await Accommodation.find({
      status: 'approved',
      isActive: true,
      ownerCode: { $exists: false }
    });

    console.log(` ${accommodations.length} établissement(s) trouvé(s) sans code`);

    for (const acc of accommodations) {
      // Générer un code unique à 6 caractères
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const prefix = Array.from({ length: 2 }, () => letters.charAt(Math.floor(Math.random() * letters.length))).join('');
      const suffix = Array.from({ length: 4 }, () => alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length))).join('');
      const code = `${prefix}-${suffix}`;

      // Mettre à jour l'établissement avec le code
      await Accommodation.findByIdAndUpdate(acc._id, {
        $set: { ownerCode: code }
      });

      console.log(`✅ ${acc.name} → Code: ${code}`);
    }

    console.log('✨ Tous les établissements ont maintenant un code !');
    
    await mongoose.disconnect();
    console.log('🔌 Déconnecté de MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

addOwnerCodes();