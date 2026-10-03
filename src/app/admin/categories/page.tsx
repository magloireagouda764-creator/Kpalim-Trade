import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Category } from '@/models/Category';

export const metadata: Metadata = { title: 'Gestion Catégories' };

export default async function AdminCategoriesPage() {
  await connectDB();

  const categoriesData = await Category.find()
    .sort({ position: 1, name: 1 })
    .lean();

  const categories = categoriesData as any[];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion des catégories</h1>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Nom</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Position</th>
              <th className="px-4 py-3 font-medium">Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((c: any) => (
              <tr key={c._id?.toString()} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3 text-gray-500">{c.slug}</td>
                <td className="px-4 py-3 tabular-nums">{c.position}</td>
                <td className="px-4 py-3">{c.isActive ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {categories.length === 0 && (
          <p className="text-center py-12 text-gray-400">Aucune catégorie</p>
        )}
      </div>
    </div>
  );
}