import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Professional } from '@/models/Professional';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = { title: 'Gestion Services' };

export default async function AdminServicesPage() {
  await connectDB();
  const professionals = await Professional.find().sort({ name: 1 }).lean();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion des professionnels</h1>
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Nom</th>
              <th className="px-4 py-3 font-medium">Catégorie</th>
              <th className="px-4 py-3 font-medium">Ville</th>
              <th className="px-4 py-3 font-medium">Vedette</th>
              <th className="px-4 py-3 font-medium">Actif</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {professionals.map((p) => (
              <tr key={p._id.toString()} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-gray-500">{p.category}</td>
                <td className="px-4 py-3 text-gray-500">{p.city}</td>
                <td className="px-4 py-3">{p.isFeatured ? '⭐' : ''}</td>
                <td className="px-4 py-3">
                  <Badge className={p.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                    {p.isActive ? 'Actif' : 'Inactif'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {professionals.length === 0 && <p className="text-center py-12 text-gray-400">Aucun professionnel</p>}
      </div>
    </div>
  );
}
