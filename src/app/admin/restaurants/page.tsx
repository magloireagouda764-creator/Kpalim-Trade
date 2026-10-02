import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Restaurant } from '@/models/Restaurant';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = { title: 'Gestion Restaurants' };

export default async function AdminRestaurantsPage() {
  await connectDB();
  const restaurants = await Restaurant.find().sort({ name: 1 }).lean();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion Restaurants</h1>
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Nom</th>
              <th className="px-4 py-3 font-medium">Cuisine</th>
              <th className="px-4 py-3 font-medium">Gamme</th>
              <th className="px-4 py-3 font-medium">Vedette</th>
              <th className="px-4 py-3 font-medium">Actif</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {restaurants.map((r) => (
              <tr key={r._id.toString()} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium">{r.name}</td>
                <td className="px-4 py-3 text-gray-500">{r.cuisineType}</td>
                <td className="px-4 py-3 text-gray-500 capitalize">{r.priceRange}</td>
                <td className="px-4 py-3">{r.isFeatured ? '⭐' : ''}</td>
                <td className="px-4 py-3"><Badge className={r.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>{r.isActive ? 'Actif' : 'Inactif'}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
        {restaurants.length === 0 && <p className="text-center py-12 text-gray-400">Aucun restaurant</p>}
      </div>
    </div>
  );
}
