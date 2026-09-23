import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Hors ligne' };

export default function OfflinePage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center space-y-4">
      <p className="text-6xl">📡</p>
      <h1 className="text-2xl font-bold">Vous êtes hors ligne</h1>
      <p className="text-gray-500 max-w-md">
        Vérifiez votre connexion Internet puis réessayez. Certaines pages déjà visitées peuvent être disponibles hors ligne.
      </p>
      <button onClick={() => window.location.reload()} className="touch-target inline-flex items-center px-6 py-3 bg-kpalime-green text-white rounded-lg font-medium hover:bg-kpalime-green-light transition-colors">
        Réessayer
      </button>
    </div>
  );
}
