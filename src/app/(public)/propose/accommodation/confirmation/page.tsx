'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Key, Clock, MapPin } from 'lucide-react';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || 'KT-XXXXXX';
  const accommodationId = searchParams.get('id');

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700 text-center">
          {/* Icône de succès */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/20 rounded-full">
              <CheckCircle className="text-emerald-500" size={48} />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Fiche envoyée avec succès !</h1>
          <p className="text-gray-400 mb-8">
            Votre établissement a été soumis à notre équipe pour validation.
          </p>

          {/* Code d'identification */}
          <div className="mb-8 p-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg shadow-lg">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Key className="text-white" size={24} />
              <h2 className="text-xl font-bold text-white">Votre code d'identification</h2>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
              <p className="text-3xl font-mono font-bold text-white tracking-wider">{code}</p>
            </div>
            <p className="text-white/90 text-sm mt-3">
              ⚠️ <strong>Conservez ce code précieusement.</strong> Vous en aurez besoin pour accéder à votre espace après validation.
            </p>
          </div>

          {/* Deux boutons */}
          <div className="space-y-4">
            {/* Bouton 1: En attente de validation */}
            <div className="p-6 bg-gray-900 border border-gray-700 rounded-lg">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Clock className="text-yellow-500" size={24} />
                <h3 className="text-lg font-semibold text-white">En attente de validation</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Notre équipe examine votre fiche. Vous recevrez une notification avec votre code dès la validation.
              </p>
              <button
                disabled
                className="w-full px-6 py-3 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 font-medium rounded-lg cursor-not-allowed"
              >
                📋 En attente de validation par l'administration
              </button>
            </div>

            {/* Bouton 2: Retrouver les hôtels de ma région */}
            <div className="p-6 bg-gray-900 border border-gray-700 rounded-lg">
              <div className="flex items-center justify-center gap-3 mb-3">
                <MapPin className="text-emerald-500" size={24} />
                <h3 className="text-lg font-semibold text-white">Retrouver les hôtels de ma région</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Explorez les établissements déjà validés dans votre région.
              </p>
              <Link
                href="/discover/regions/maritime/hotels"
                className="block w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-center"
              >
                🔍 Voir les établissements de la Région Maritime
              </Link>
            </div>
          </div>

          {/* Message final */}
          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-300 text-sm">
              💡 <strong>Conseil :</strong> Notez votre code <span className="font-mono font-bold">{code}</span> dans un endroit sûr. 
              Vous en aurez besoin pour gérer votre établissement après validation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}