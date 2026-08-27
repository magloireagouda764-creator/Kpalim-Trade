import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Artisan } from '@/models/Artisan';
import { ArtisanCard } from '@/components/culture/ArtisanCard';

export const metadata: Metadata = {
  title: 'Artisans de Kpalimé',
  description: 'Découvrez les artisans et leur savoir-faire à Kpalimé',
};

export default async function ArtisansPage() {
  await connectDB();
  const artisans = await Artisan.find({ isActive: true }).sort({ isFeatured: -1, name: 1 }).lean();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <div className="text-center space-y-3 py-4">
        <h1 className="text-3xl font-bold text-kpalime-green">Artisans de Kpalimé</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Sculpteurs, tisserands, couturiers, bijoutiers... Rencontre avec celles et ceux qui font vivre le savoir-faire local.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {artisans.map((artisan) => (
          <ArtisanCard key={artisan._id.toString()} artisan={JSON.parse(JSON.stringify(artisan))} />
        ))}
      </div>
      {artisans.length === 0 && (
        <p className="text-center py-16 text-gray-400">Aucun artisan pour le moment</p>
      )}
    </div>
  );
}
