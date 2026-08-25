import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Mes Favoris' };

export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Mes favoris</h1>
      <div className="p-8 rounded-xl border border-dashed border-gray-300 text-center">
        <p className="text-gray-400 text-lg mb-2">❤️</p>
        <p className="text-gray-500">Les favoris seront disponibles prochainement.</p>
      </div>
    </div>
  );
}
