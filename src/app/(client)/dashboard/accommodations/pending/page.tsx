'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Building2, Clock, ArrowLeft } from 'lucide-react';

export default function PendingAccommodationPage() {
  const searchParams = useSearchParams();
  const region = searchParams.get('region') || 'Maritime';

  // Ce lien correspond exactement au chemin que tu as confirmé dans ton terminal
  const discoverLink = `/discover/regions/${region.toLowerCase()}/hotels`;

  return (
    <div className="min-h-screen bg-night py-12 px-4 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        
        {/* Message de succès et d'attente */}
        <div className="bg-night-light border border-emerald-brand/30 rounded-2xl p-8 text-center mb-8 shadow-2xl">
          <div className="w-24 h-24 bg-emerald-brand/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-emerald-brand" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Établissement enregistré avec succès !
          </h1>
          
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Clock className="w-6 h-6 text-yellow-400" />
              <p className="text-yellow-300 text-xl font-bold">
                En attente de validation par l'admin
              </p>
            </div>
            <p className="text-muted text-base leading-relaxed">
              Votre établissement a été créé en tant que <strong>brouillon</strong>. 
              Il sera examiné par notre équipe et apparaîtra publiquement sur la plateforme 
              une fois validé.
            </p>
          </div>
          
          <p className="text-sm text-white/60">
            Vous recevrez une notification dès que votre établissement sera approuvé.
          </p>
        </div>

        {/* Bouton Découvrir les hôtels */}
        <div className="bg-gradient-to-br from-emerald-brand/10 to-gold/10 border border-emerald-brand/20 rounded-2xl p-8 text-center">
          <Building2 className="w-16 h-16 text-emerald-brand mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">
            Découvrez les hôtels de la région {region}
          </h2>
          <p className="text-muted mb-8 max-w-md mx-auto">
            En attendant la validation, explorez les autres établissements déjà disponibles et vérifiés dans votre région.
          </p>
          
          <Link
            href={discoverLink}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-emerald-brand text-white font-bold hover:bg-emerald-light transition-all text-lg shadow-lg hover:shadow-emerald-brand/25 w-full sm:w-auto"
          >
            Découvrir les hôtels de {region}
            <ArrowRight size={24} />
          </Link>
        </div>

        {/* Lien retour */}
        <div className="text-center mt-8">
          <Link
            href="/dashboard/accommodations"
            className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} /> Retour au tableau de bord
          </Link>
        </div>

      </div>
    </div>
  );
}