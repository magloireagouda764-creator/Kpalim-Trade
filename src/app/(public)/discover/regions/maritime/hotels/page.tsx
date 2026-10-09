import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star, Wifi, Coffee, Car, ArrowRight, Plus } from 'lucide-react';

// Fonction pour récupérer les données côté serveur
async function getMaritimeHotels() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/accommodations?region=Maritime&type=hotel`, {
    cache: 'no-store', // Pour avoir les données à jour
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.data || [];
}

export const metadata = {
  title: 'Hôtels - Région Maritime | Kpalimé-Trade',
  description: 'Découvrez les meilleurs hôtels et hébergements de la Région Maritime du Togo.',
};

export default async function MaritimeHotelsPage() {
  const hotels = await getMaritimeHotels();

  return (
    <div className="bg-night min-h-screen">
      {/* 1. BANNIÈRE HERO */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-brand/90 to-night/90 z-10" />
        {/* Image de fond (placeholder ou image réelle si tu en as une dans public/images/discover/regions/maritime/) */}
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

      {/* 2. CONTENU PRINCIPAL */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* En-tête de section avec bouton d'ajout */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {hotels.length > 0 ? `${hotels.length} établissements trouvés` : 'Aucun établissement pour le moment'}
              </h2>
              <p className="text-muted text-sm mt-1">
                Tous les établissements listés ont été vérifiés par notre équipe.
              </p>
            </div>
            
            {/* Bouton pour les propriétaires connectés (à rendre dynamique avec useAuth plus tard) */}
            <Link 
              href="/dashboard/accommodations/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-all touch-target"
            >
              <Plus size={18} />
              Ajouter mon établissement
            </Link>
          </div>

          {/* 3. GRILLE DES HÔTELS */}
          {hotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel: any) => (
                <Link 
                  key={hotel._id} 
                  href={`/discover/regions/maritime/hotels/${hotel.slug}`}
                  className="group block rounded-md border border-white/10 bg-night-light overflow-hidden hover:border-emerald-brand/50 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image / Banner */}
                  <div className="relative aspect-video w-full bg-white/5">
                    {hotel.banner || (hotel.images && hotel.images[0]?.secure_url) ? (
                      <Image
                        src={hotel.banner || hotel.images[0].secure_url}
                        alt={hotel.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted">
                        <MapPin size={48} />
                      </div>
                    )}
                    {hotel.isFeatured && (
                      <div className="absolute top-3 left-3 px-2 py-1 rounded bg-gold text-night text-xs font-bold flex items-center gap-1">
                        <Star size={12} fill="currentColor" /> Recommandé
                      </div>
                    )}
                  </div>

                  {/* Contenu de la carte */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-emerald-brand transition-colors">
                        {hotel.name}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded bg-white/10 text-muted capitalize">
                        {hotel.type === 'hotel' ? 'Hôtel' : hotel.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-muted text-sm mb-4">
                      <MapPin size={14} />
                      <span className="truncate">{hotel.district || hotel.city}, Région Maritime</span>
                    </div>

                    {/* Équipements (max 3) */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities?.slice(0, 3).map((amenity: string, idx: number) => (
                        <span key={idx} className="text-xs px-2 py-1 rounded bg-emerald-brand/10 text-emerald-brand border border-emerald-brand/20">
                          {amenity}
                        </span>
                      ))}
                      {hotel.amenities?.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded bg-white/5 text-muted">
                          +{hotel.amenities.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Prix et CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div>
                        <p className="text-xs text-muted">À partir de</p>
                        <p className="text-lg font-bold text-gold">
                          {hotel.priceRange || 'Nous consulter'}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-emerald-brand flex items-center gap-1 group-hover:gap-2 transition-all">
                        Voir les détails <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            // État vide (si aucun hôtel n'est encore approuvé)
            <div className="text-center py-20 rounded-md border border-white/10 bg-night-light">
              <MapPin size={48} className="text-muted mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Aucun hôtel disponible pour le moment</h3>
              <p className="text-muted mb-6 max-w-md mx-auto">
                Les établissements de la Région Maritime sont en cours de vérification. 
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
          )}
        </div>
      </section>
    </div>
  );
}