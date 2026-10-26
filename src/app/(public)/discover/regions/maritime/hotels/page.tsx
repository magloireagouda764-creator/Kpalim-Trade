import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Hotel, MapPin, Star, Plus } from 'lucide-react';

interface PublicAccommodation {
  _id: string;
  name: string;
  slug: string;
  type: string;
  description: string;
  banner?: string;
  images?: { secure_url: string }[];
  city: string;
  district?: string;
  priceRange?: string;
  amenities: string[];
}

export const metadata = {
  title: 'Hôtels - Région Maritime | Kpalimé-Trade',
  description: 'Découvrez les meilleurs hôtels et hébergements de la Région Maritime du Togo.',
};

export default async function MaritimeHotelsPage() {
  let accommodations: PublicAccommodation[] = [];
  let error = null;

  try {
    // Utiliser l'URL absolue de Vercel
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://kpalim-trade-54v8.vercel.app';
    const res = await fetch(`${baseUrl}/api/accommodations?type=hotel&region=Maritime&limit=20`, { 
      cache: 'no-store',
      next: { revalidate: 60 } // Revalider toutes les 60 secondes
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    
    if (data.success) {
      accommodations = data.data || [];
    } else {
      console.error('Erreur API:', data.error);
      error = null; // On ignore l'erreur pour afficher l'état vide
    }
  } catch (err) {
    console.error('Erreur fetch hôtels:', err);
    error = null; // On ignore l'erreur pour afficher l'état vide
  }

  return (
    <div className="bg-night min-h-screen">
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-brand/90 to-night/90 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="relative z-20 h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
          <Link href="/discover/regions/maritime" className="text-white/80 hover:text-white mb-4 inline-flex items-center gap-2 text-sm w-fit">
            <ArrowRight className="rotate-180" size={16} /> Retour à la Région Maritime
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Hôtels de la Région Maritime</h1>
          <p className="text-lg text-white/90 max-w-2xl">Trouvez l'hébergement idéal à Lomé, Aného, Agbodrafo et ses environs.</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Établissements disponibles</h2>
              <p className="text-muted text-sm mt-1">{accommodations.length} hôtel(s) approuvé(s)</p>
            </div>
            
            {/* ✅ CORRECTION 1 : Lien vers le formulaire public */}
            <Link href="/propose/accommodation" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-all touch-target w-fit">
              <Plus size={18} /> Ajouter mon établissement
            </Link>
          </div>

          {accommodations.length === 0 && (
            <div className="text-center py-20 rounded-md border border-white/10 bg-night-light">
              <Hotel size={48} className="text-muted mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Aucun hôtel disponible pour le moment</h3>
              <p className="text-muted mb-6 max-w-md mx-auto">
                Les hôtels de la Région Maritime sont en cours de vérification. 
                Vous êtes propriétaire ? Ajoutez votre établissement dès maintenant.
              </p>
              
              {/* ✅ CORRECTION 2 : Lien vers le formulaire public */}
              <Link 
                href="/propose/accommodation"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-all"
              >
                <Plus size={18} />
                Proposer mon établissement
              </Link>
            </div>
          )}

          {accommodations.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accommodations.map((hotel) => (
                <Link key={hotel._id} href={`/discover/regions/maritime/hotels/${hotel.slug}`} className="group rounded-md border border-white/10 bg-night-light overflow-hidden hover:border-emerald-brand/50 transition-all hover:-translate-y-1">
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-800">
                    {hotel.banner || (hotel.images && hotel.images[0]?.secure_url) ? (
                      <Image src={hotel.banner || hotel.images![0].secure_url} alt={hotel.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted"><Hotel size={48} /></div>
                    )}
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur text-white text-xs font-semibold">
                      {hotel.type === 'hotel' ? 'Hôtel' : 'Hébergement'}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-brand transition-colors">{hotel.name}</h3>
                    <div className="flex items-center gap-1 text-muted text-sm mb-3">
                      <MapPin size={14} />
                      <span>{hotel.district ? `${hotel.district}, ` : ''}{hotel.city}</span>
                    </div>
                    <p className="text-muted text-sm line-clamp-2 mb-4">{hotel.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-1 text-gold text-sm font-semibold"><Star size={14} className="fill-gold" /><span>4.5</span></div>
                      {hotel.priceRange && <span className="text-white font-bold text-sm">{hotel.priceRange}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}