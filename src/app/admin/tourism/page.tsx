import type { Metadata } from 'next';
import Image from 'next/image';
import { connectDB } from '@/lib/mongodb';
import { TouristSite } from '@/models/TouristSite';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = { title: 'Gestion Tourisme' };

export default async function AdminTourismPage() {
  await connectDB();

  const sitesData = await TouristSite.find().sort({ name: 1 }).lean();
  const sites = sitesData as any[];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion Tourisme</h1>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Site</th>
              <th className="px-4 py-3 font-medium">Catégorie</th>
              <th className="px-4 py-3 font-medium">Ville</th>
              <th className="px-4 py-3 font-medium">Vedette</th>
              <th className="px-4 py-3 font-medium">Actif</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sites.map((s: any) => (
              <tr key={s._id?.toString()} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded overflow-hidden bg-gray-100 relative shrink-0">
                      <Image
                        src={s.images?.[0]?.secure_url || '/placeholder.jpg'}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <span className="font-medium">{s.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500 capitalize">
                  {s.category}
                </td>
                <td className="px-4 py-3 text-gray-500">{s.city}</td>
                <td className="px-4 py-3">{s.isFeatured ? '⭐' : ''}</td>
                <td className="px-4 py-3">
                  <Badge
                    className={
                      s.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }
                  >
                    {s.isActive ? 'Actif' : 'Inactif'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sites.length === 0 && (
          <p className="text-center py-12 text-gray-400">
            Aucun site touristique
          </p>
        )}
      </div>
    </div>
  );
}