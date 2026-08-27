import { Suspense } from 'react';
import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Professional } from '@/models/Professional';
import { ProfessionalCard } from '@/components/services/ProfessionalCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';

export const metadata: Metadata = {
  title: 'Services & Professionnels',
  description: 'Trouvez les professionnels et prestataires de services à Kpalimé',
};

async function ServicesContent() {
  await connectDB();
  const professionals = await Professional.find({ isActive: true })
    .sort({ isFeatured: -1, name: 1 })
    .lean();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <div className="text-center space-y-3 py-4">
        <h1 className="text-3xl font-bold text-kpalime-green">Services & Professionnels</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Coiffeurs, couturiers, photographes, mécaniciens, développeurs... Trouvez le professionnel dont vous avez besoin à Kpalimé.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {professionals.map((pro) => (
          <ProfessionalCard key={pro._id.toString()} professional={JSON.parse(JSON.stringify(pro))} />
        ))}
      </div>
      {professionals.length === 0 && (
        <p className="text-center py-16 text-gray-400">Aucun professionnel pour le moment</p>
      )}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      </div>
    }>
      <ServicesContent />
    </Suspense>
  );
}
