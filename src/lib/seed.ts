import { connectDB } from '@/lib/mongodb';
import { Category } from '@/models/Category';
import { Currency } from '@/models/Currency';

export async function seedEssentialData() {
  await connectDB();

  // Devises
  const currencyCount = await Currency.countDocuments();
  if (currencyCount === 0) {
    await Currency.insertMany([
      { code: 'XOF', name: 'Franc CFA', symbol: 'FCFA', rateToXOF: 1, isDefault: true, isActive: true },
      { code: 'USD', name: 'Dollar américain', symbol: '$', rateToXOF: Number(process.env.DEFAULT_USD_RATE) || 600, isDefault: false, isActive: true },
      { code: 'EUR', name: 'Euro', symbol: '€', rateToXOF: Number(process.env.DEFAULT_EUR_RATE) || 655.957, isDefault: false, isActive: true },
    ]);
  }

  // Catégories par défaut
  const categoryCount = await Category.countDocuments();
  if (categoryCount === 0) {
    await Category.insertMany([
      { name: 'Artisanat', slug: 'artisanat', position: 1, isActive: true },
      { name: 'Mode', slug: 'mode', position: 2, isActive: true },
      { name: 'Alimentation', slug: 'alimentation', position: 3, isActive: true },
      { name: 'Cosmétiques', slug: 'cosmetiques', position: 4, isActive: true },
      { name: 'Décoration', slug: 'decoration', position: 5, isActive: true },
      { name: 'Culture', slug: 'culture', position: 6, isActive: true },
    ]);
  }

  return { seeded: true };
}
