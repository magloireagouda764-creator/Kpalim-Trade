/**
 * Script pour créer un administrateur initial.
 * Usage : node scripts/create-admin.mjs
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI manquant dans .env.local');
  process.exit(1);
}

async function main() {
  await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB });
  console.log('✅ Connecté à MongoDB');

  const db = mongoose.connection;
  const usersCollection = db.collection('users');

  const existingAdmin = await usersCollection.findOne({ role: 'admin' });
  if (existingAdmin) {
    console.log('⚠️ Un admin existe déjà :', existingAdmin.email);
    await mongoose.disconnect();
    return;
  }

  const email = 'admin@kpalime-trad.tg';
  const password = 'Admin@Kpalime2026'; // ⚠️ À CHANGER EN PRODUCTION
  const hashed = await bcrypt.hash(password, 12);

  await usersCollection.insertOne({
    name: 'Administrateur',
    email,
    phone: '+22890000000',
    password: hashed,
    role: 'admin',
    isVerified: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log('✅ Admin créé avec succès');
  console.log(`   Email : ${email}`);
  console.log(`   Mot de passe : ${password}`);
  console.log('⚠️ Changez ce mot de passe immédiatement en production !');

  await mongoose.disconnect();
}

main().catch((err) => { console.error('❌ Erreur :', err); process.exit(1); });
