import { Suspense } from 'react';
import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Restaurant } from '@/models/Restaurant';
import { RestaurantCard } from '@/components/restaurants/RestaurantCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';

export const metadata: Metadata = { title: 'Restaurants à Kpalimé', description: 'Découvrez les restaurants et la gastronomie de Kpalimé' };

async function RestaurantsContent() {
  await connectDB();
  const restaurants = await Restaurant.find({ isActive: true }).sort({ isFeatured: -1, name: 1 }).lean();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <div className="text-center space-y-3 py-4">
        <h1 className="text-3xl font-bold text-kpalime-green">Restaurants à Kpalimé</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Cuisine locale, internationale, spécialités togolaises... Découvrez les saveurs de Kpalimé.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.map((r) => <RestaurantCard key={r._id.toString()} restaurant={JSON.parse(JSON.stringify(r))} />)}
      </div>
      {restaurants.length === 0 && <p className="text-center py-16 text-gray-400">Aucun restaurant pour le moment</p>}
    </div>
  );
}

export default function RestaurantsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-6"><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}</div></div>}>
      <RestaurantsContent />
    </Suspense>
  );
}
