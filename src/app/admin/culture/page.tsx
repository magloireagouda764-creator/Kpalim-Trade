import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { CulturalArticle } from '@/models/CulturalArticle';
import { Artisan } from '@/models/Artisan';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = { title: 'Gestion Culture' };

export default async function AdminCulturePage() {
  await connectDB();

  const [articlesData, artisansData] = await Promise.all([
    CulturalArticle.find().sort({ createdAt: -1 }).lean(),
    Artisan.find().sort({ name: 1 }).lean(),
  ]);

  const articles = articlesData as any[];
  const artisans = artisansData as any[];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Gestion Culture & Artisanat</h1>

      <div>
        <h2 className="text-lg font-bold mb-3">
          Articles culturels ({articles.length})
        </h2>

        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Titre</th>
                <th className="px-4 py-3 font-medium">Catégorie</th>
                <th className="px-4 py-3 font-medium">Vedette</th>
                <th className="px-4 py-3 font-medium">Actif</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles.map((a: any) => (
                <tr key={a._id?.toString()} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium truncate max-w-[250px]">
                    {a.title}
                  </td>
                  <td className="px-4 py-3 text-gray-500 capitalize">
                    {a.category}
                  </td>
                  <td className="px-4 py-3">{a.isFeatured ? '⭐' : ''}</td>
                  <td className="px-4 py-3">
                    <Badge
                      className={
                        a.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }
                    >
                      {a.isActive ? 'Actif' : 'Inactif'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {articles.length === 0 && (
            <p className="text-center py-12 text-gray-400">Aucun article</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-3">Artisans ({artisans.length})</h2>

        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Nom</th>
                <th className="px-4 py-3 font-medium">Spécialité</th>
                <th className="px-4 py-3 font-medium">Localisation</th>
                <th className="px-4 py-3 font-medium">Actif</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {artisans.map((a: any) => (
                <tr key={a._id?.toString()} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium">{a.name}</td>
                  <td className="px-4 py-3 text-gray-500">{a.specialty}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {a.location || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={
                        a.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }
                    >
                      {a.isActive ? 'Actif' : 'Inactif'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {artisans.length === 0 && (
            <p className="text-center py-12 text-gray-400">Aucun artisan</p>
          )}
        </div>
      </div>
    </div>
  );
}