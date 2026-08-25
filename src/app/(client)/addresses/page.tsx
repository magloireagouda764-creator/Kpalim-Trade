import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Mes Adresses' };

export default function AddressesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Mes adresses</h1>
      <div className="p-8 rounded-xl border border-dashed border-gray-300 text-center">
        <p className="text-gray-400 text-lg mb-2">📍</p>
        <p className="text-gray-500">La gestion des adresses sera disponible prochainement.</p>
        <p className="text-sm text-gray-400 mt-1">Pour l'instant, renseignez votre adresse lors de chaque commande.</p>
      </div>
    </div>
  );
}
