import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center space-y-4">
      <p className="text-6xl">🔍</p>
      <h1 className="text-2xl font-bold">Page introuvable</h1>
      <p className="text-gray-500">La page que vous recherchez n'existe pas ou a été déplacée.</p>
      <Link href="/" className="touch-target inline-flex items-center px-6 py-3 bg-kpalime-green text-white rounded-lg font-medium hover:bg-kpalime-green-light transition-colors">
        Retour à l'accueil
      </Link>
    </div>
  );
}
