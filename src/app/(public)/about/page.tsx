import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = { title: 'À propos', description: `Découvrez ${APP_NAME}, la plateforme numérique de Kpalimé` };

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-kpalime-green">À propos de {APP_NAME}</h1>
      <p className="text-lg text-gray-600 leading-relaxed">
        {APP_NAME} est la plateforme numérique de référence de Kpalimé. Notre mission est de connecter les commerçants, artisans, professionnels du tourisme, restaurateurs et habitants de Kpalimé dans un écosystème numérique unique.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-kpalime-sand/50">
          <h2 className="font-bold text-lg mb-2">🛍️ Commerce local</h2>
          <p className="text-sm text-gray-600">Achetez et vendez des produits locaux en toute simplicité.</p>
        </div>
        <div className="p-5 rounded-xl bg-kpalime-sand/50">
          <h2 className="font-bold text-lg mb-2">🌴 Tourisme</h2>
          <p className="text-sm text-gray-600">Découvrez les cascades, montagnes et richesses naturelles de Kpalimé.</p>
        </div>
        <div className="p-5 rounded-xl bg-kpalime-sand/50">
          <h2 className="font-bold text-lg mb-2">🎭 Culture</h2>
          <p className="text-sm text-gray-600">Valorisons le patrimoine, l'artisanat et les traditions locales.</p>
        </div>
        <div className="p-5 rounded-xl bg-kpalime-sand/50">
          <h2 className="font-bold text-lg mb-2">👨‍💼 Services</h2>
          <p className="text-sm text-gray-600">Trouvez facilement les professionnels dont vous avez besoin.</p>
        </div>
      </div>
    </div>
  );
}
