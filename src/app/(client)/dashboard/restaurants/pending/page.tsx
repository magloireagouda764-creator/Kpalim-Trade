'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Utensils, Clock, ArrowLeft } from 'lucide-react';

export default function PendingRestaurantPage() {
  const searchParams = useSearchParams();
  const region = searchParams.get('region') || 'Maritime';

  const discoverLink = `/discover/regions/${region.toLowerCase()}/restaurants`;

  return (
    <div className="min-h-screen bg-night py-12 px-4 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        
        {/* Message de succès et d'attente */}
        <div className="bg-night-light border border-orange-brand/30 rounded-2xl p-8 text-center mb-8 shadow-2xl">
          <div className="w-24 h-24 bg-orange-brand/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-orange-brand" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Restaurant enregistré avec succès !
          </h1>
          
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Clock className="w-6 h-6 text-yellow-400" />
              <p className="text-yellow-300 text-xl font-bold">
                En attente de validation par l'admin
              </p>
            </div>
            <p className="text-muted text-base leading-relaxed">
              Votre restaurant a été créé en tant que <strong>brouillon</strong>. 
              Il sera examiné par notre équipe et apparaîtra publiquement sur la plateforme 
              une fois validé.
            </p>
          </div>
          
          <p className="text-sm text-white/60">
            Vous recevrez une notification dès que votre restaurant sera approuvé.
          </p>
        </div>

        {/* Bouton Découvrir les restaurants */}
        <div className="bg-gradient-to-br from-orange-brand/10 to-yellow-500/10 border border-orange-brand/20 rounded-2xl p-8 text-center">
          <Utensils className="w-16 h-16 text-orange-brand mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">
            Découvrez les restaurants de la région {region}
          </h2>
          <p className="text-muted mb-8 max-w-md mx-auto">
            En attendant la validation, explorez les autres restaurants déjà disponibles et vérifiés dans votre région.
          </p>
          
          <Link
            href={discoverLink}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-orange-brand text-white font-bold hover:bg-orange-600 transition-all text-lg shadow-lg hover:shadow-orange-brand/25 w-full sm:w-auto"
          >
            Découvrir les restaurants de {region}
            <ArrowRight size={24} />
          </Link>
        </div>

        {/* Lien retour */}
        <div className="text-center mt-8">
          <Link
            href="/dashboard/restaurants"
            className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} /> Retour au tableau de bord
          </Link>
        </div>

      </div>
    </div>
  );
}