'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Building2 } from 'lucide-react';

export default function PendingAccommodationPage() {
  const searchParams = useSearchParams();
  const region = searchParams.get('region') || 'Maritime';

  return (
    <div className="min-h-screen bg-night py-12 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Message de succès */}
        <div className="bg-night-light border border-emerald-brand/30 rounded-lg p-8 text-center mb-8">
          <CheckCircle className="w-20 h-20 text-emerald-brand mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">
            Établissement enregistré !
          </h1>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-4 mb-6">
            <p className="text-yellow-300 text-lg font-semibold mb-2">
              ⏳ En attente de validation par l'admin
            </p>
            <p className="text-muted text-sm">
              Votre établissement a été créé avec succès. Il sera examiné par notre équipe 
              et apparaîtra sur la plateforme une fois validé.
            </p>
          </div>
          <p className="text-muted">
            Vous recevrez une notification lorsque votre établissement sera approuvé.
          </p>
        </div>

        {/* Bouton Découvrir les hôtels */}
        <div className="bg-gradient-to-br from-emerald-brand/10 to-gold/10 border border-emerald-brand/20 rounded-lg p-8 text-center">
          <Building2 className="w-16 h-16 text-emerald-brand mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">
            Découvrez les hôtels de la région {region}
          </h2>
          <p className="text-muted mb-6">
            Explorez les autres établissements déjà disponibles dans votre région
          </p>
          <Link
            href={`/discover/regions/${region.toLowerCase()}/hotels`}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-all text-lg"
          >
            Découvrir les hôtels de {region}
            <ArrowRight size={24} />
          </Link>
        </div>

        {/* Lien retour au tableau de bord */}
        <div className="text-center mt-6">
          <Link
            href="/dashboard/accommodations"
            className="text-muted hover:text-white transition-colors text-sm"
          >
            ← Retour au tableau de bord
          </Link>
        </div>

      </div>
    </div>
  );
}