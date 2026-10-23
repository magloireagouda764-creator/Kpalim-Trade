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
      {/* ✅ Titre principal en vert */}
      <h1 className="text-2xl font-bold text-green-400">
        Gestion Culture & Artisanat
      </h1>

      {/* Section Articles */}
      <div>
        {/* ✅ Sous-titre en vert */}
        <h2 className="text-lg font-bold mb-3 text-green-400">
          Articles culturels ({articles.length})
        </h2>

        <div className="overflow-x-auto rounded-xl border border-green-900/50 bg-gray-900">
          <table className="w-full text-sm text-left">
            {/* ✅ En-têtes en vert avec fond sombre */}
            <thead className="bg-gray-800 text-green-400 border-b border-green-900/50">
              <tr>
                <th className="px-4 py-3 font-medium">Titre</th>
                <th className="px-4 py-3 font-medium">Catégorie</th>
                <th className="px-4 py-3 font-medium">Vedette</th>
                <th className="px-4 py-3 font-medium">Actif</th>
              </tr>
            </thead>
            {/* ✅ Corps du tableau avec texte blanc */}
            <tbody className="divide-y divide-gray-700 text-gray-200">
              {articles.map((a: any) => (
                <tr key={a._id?.toString()} className="hover:bg-gray-800 transition-colors">
                  <td className="px-4 py-3 font-medium text-white truncate max-w-[250px]">
                    {a.title}
                  </td>
                  <td className="px-4 py-3 text-gray-300 capitalize">
                    {a.category}
                  </td>
                  <td className="px-4 py-3 text-yellow-400">{a.isFeatured ? '⭐' : ''}</td>
                  <td className="px-4 py-3">
                    <Badge
                      className={
                        a.isActive
                          ? 'bg-green-900 text-green-300 border border-green-700'
                          : 'bg-gray-700 text-gray-400 border border-gray-600'
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

      {/* Section Artisans */}
      <div>
        {/* ✅ Sous-titre en vert */}
        <h2 className="text-lg font-bold mb-3 text-green-400">
          Artisans ({artisans.length})
        </h2>

        <div className="overflow-x-auto rounded-xl border border-green-900/50 bg-gray-900">
          <table className="w-full text-sm text-left">
            {/* ✅ En-têtes en vert avec fond sombre */}
            <thead className="bg-gray-800 text-green-400 border-b border-green-900/50">
              <tr>
                <th className="px-4 py-3 font-medium">Nom</th>
                <th className="px-4 py-3 font-medium">Spécialité</th>
                <th className="px-4 py-3 font-medium">Localisation</th>
                <th className="px-4 py-3 font-medium">Actif</th>
              </tr>
            </thead>
            {/* ✅ Corps du tableau avec texte blanc */}
            <tbody className="divide-y divide-gray-700 text-gray-200">
              {artisans.map((a: any) => (
                <tr key={a._id?.toString()} className="hover:bg-gray-800 transition-colors">
                  <td className="px-4 py-3 font-medium text-white">{a.name}</td>
                  <td className="px-4 py-3 text-gray-300">{a.specialty}</td>
                  <td className="px-4 py-3 text-gray-300">
                    {a.location || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={
                        a.isActive
                          ? 'bg-green-900 text-green-300 border border-green-700'
                          : 'bg-gray-700 text-gray-400 border border-gray-600'
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