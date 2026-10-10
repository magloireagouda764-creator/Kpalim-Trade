import Link from 'next/link';
import { ArrowRight, Hotel, Plus } from 'lucide-react';

export const metadata = {
  title: 'Hôtels - Région Maritime | Kpalimé-Trade',
  description: 'Découvrez les meilleurs hôtels et hébergements de la Région Maritime du Togo.',
};

export default function MaritimeHotelsPage() {
  return (
    <div className="bg-night min-h-screen">
      {/* BANNIÈRE HERO */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-brand/90 to-night/90 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        
        <div className="relative z-20 h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
          <Link href="/discover/regions/maritime" className="text-white/80 hover:text-white mb-4 inline-flex items-center gap-2 text-sm">
            <ArrowRight className="rotate-180" size={16} /> Retour à la Région Maritime
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Hôtels de la Région Maritime
          </h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Trouvez l'hébergement idéal à Lomé, Aného, Agbodrafo et ses environs. 
            Des établissements vérifiés pour votre confort.
          </p>
        </div>
      </section>

      {/* CONTENU PRINCIPAL */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Hôtels et hébergements
              </h2>
              <p className="text-muted text-sm mt-1">
                Bientôt : une sélection d'hôtels vérifiés
              </p>
            </div>
            
            <Link 
              href="/dashboard/accommodations/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-all touch-target"
            >
              <Plus size={18} />
              Ajouter mon établissement
            </Link>
          </div>

          {/* État vide */}
          <div className="text-center py-20 rounded-md border border-white/10 bg-night-light">
            <Hotel size={48} className="text-muted mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Aucun hôtel disponible pour le moment</h3>
            <p className="text-muted mb-6 max-w-md mx-auto">
              Les hôtels de la Région Maritime sont en cours de vérification. 
              Vous êtes propriétaire ? Ajoutez votre établissement dès maintenant.
            </p>
            <Link 
              href="/dashboard/accommodations/new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-all"
            >
              <Plus size={18} />
              Proposer mon établissement
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}