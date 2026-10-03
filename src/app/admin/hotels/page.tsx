import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Accommodation } from '@/models/Accommodation';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = { title: 'Gestion Hôtels' };

export default async function AdminHotelsPage() {
  await connectDB();

  const hotelsData = await Accommodation.find().sort({ name: 1 }).lean();
  const hotels = hotelsData as any[];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion Hébergements</h1>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Nom</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Ville</th>
              <th className="px-4 py-3 font-medium">Vedette</th>
              <th className="px-4 py-3 font-medium">Actif</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {hotels.map((h: any) => (
              <tr key={h._id?.toString()} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium">{h.name}</td>
                <td className="px-4 py-3 text-gray-500 capitalize">{h.type}</td>
                <td className="px-4 py-3 text-gray-500">{h.city}</td>
                <td className="px-4 py-3">{h.isFeatured ? '⭐' : ''}</td>
                <td className="px-4 py-3">
                  <Badge
                    className={
                      h.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }
                  >
                    {h.isActive ? 'Actif' : 'Inactif'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {hotels.length === 0 && (
          <p className="text-center py-12 text-gray-400">Aucun hébergement</p>
        )}
      </div>
    </div>
  );
}