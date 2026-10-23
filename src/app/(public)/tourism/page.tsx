import { Suspense } from 'react';
import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { TouristSite } from '@/models/TourismSite';
import { SiteCard } from '@/components/tourism/SiteCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';

export const metadata: Metadata = { title: 'Tourisme à Kpalimé', description: 'Découvrez les cascades, montagnes et richesses naturelles de Kpalimé' };

async function TourismContent() {
  await connectDB();
  const sites = await TouristSite.find({ isActive: true }).sort({ isFeatured: -1, name: 1 }).lean();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <div className="text-center space-y-3 py-4">
        <h1 className="text-3xl font-bold text-kpalime-green">Découvrir Kpalimé</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Cascades, montagnes, forêts, villages traditionnels... Explorez les richesses naturelles et culturelles de la région des Plateaux.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sites.map((site) => <SiteCard key={site._id.toString()} site={JSON.parse(JSON.stringify(site))} />)}
      </div>
      {sites.length === 0 && <p className="text-center py-16 text-gray-400">Aucun site touristique pour le moment</p>}
    </div>
  );
}

export default function TourismPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-6"><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}</div></div>}>
      <TourismContent />
    </Suspense>
  );
}
