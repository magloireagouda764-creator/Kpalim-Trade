'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Key, Hotel, Home, Utensils, ArrowRight } from 'lucide-react';

export default function ProfessionalSpacePage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6) {
      setError('Veuillez entrer un code valide à 6 caractères');
      return;
    }
    // Rediriger vers la page de vérification avec le code
    router.push(`/professional-space/access?code=${code}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">
            Espace Professionnel
          </h1>
          <p className="text-gray-400 text-lg">
            Accédez à l'espace de gestion de votre établissement
          </p>
        </div>

        {/* Barre de saisie de code */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Key className="text-emerald-500" size={24} />
              <h2 className="text-2xl font-bold text-white">Accéder à mon espace</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Votre code d'identification à 6 caractères
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="Ex: KT-4A8B"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-center text-2xl font-mono tracking-wider focus:border-emerald-500 focus:outline-none uppercase"
                  maxLength={8}
                />
              </div>
              
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Accéder à mon espace
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="text-gray-400 text-sm text-center mt-4">
              Vous n'avez pas encore de code ?{' '}
              <a href="/propose/accommodation" className="text-emerald-500 hover:text-emerald-400 font-medium">
                Proposer mon établissement
              </a>
            </p>
          </div>
        </div>

        {/* Rectangles des établissements */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Établissements partenaires
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Rectangle Hôtel */}
            <button
              onClick={() => router.push('/professional-space/access?type=hotel')}
              className="aspect-square rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 hover:border-blue-500/60 hover:scale-105 transition-all flex flex-col items-center justify-center gap-3 group"
            >
              <Hotel size={48} className="text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium text-sm">Hôtel</span>
            </button>

            {/* Rectangle Auberge */}
            <button
              onClick={() => router.push('/professional-space/access?type=guesthouse')}
              className="aspect-square rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 hover:border-emerald-500/60 hover:scale-105 transition-all flex flex-col items-center justify-center gap-3 group"
            >
              <Home size={48} className="text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium text-sm">Auberge</span>
            </button>

            {/* Rectangle Restaurant */}
            <button
              onClick={() => router.push('/professional-space/access?type=restaurant')}
              className="aspect-square rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 hover:border-orange-500/60 hover:scale-105 transition-all flex flex-col items-center justify-center gap-3 group"
            >
              <Utensils size={48} className="text-orange-400 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium text-sm">Restaurant</span>
            </button>

            {/* Plus de rectangles seront ajoutés dynamiquement */}
          </div>

          <p className="text-gray-400 text-sm text-center mt-6">
            Cliquez sur un type d'établissement pour accéder à votre espace
          </p>
        </div>
      </div>
    </div>
  );
}