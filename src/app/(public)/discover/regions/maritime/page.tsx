import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Landmark,
  Waves,
  Palette,
  Hotel,
  UtensilsCrossed,
  Compass,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  type LucideIcon,
} from 'lucide-react';
import { MARITIME_REGION } from '@/lib/regions/maritime-data';

export const metadata = {
  title: 'Région Maritime | Découvrir le Togo | Kpalimé-Trade',
  description:
    'Explorez la Région Maritime du Togo : plages, sites historiques, culture, hôtels et activités.',
};

const ICON_MAP: Record<string, LucideIcon> = {
  MapPin,
  Landmark,
  Waves,
  Palette,
  Hotel,
  UtensilsCrossed,
  Compass,
  CalendarDays,
};

export default function MaritimeRegionPage() {
  return (
    <div className="bg-night min-h-screen">
      {/* BANNIÈRE HERO */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <Image
          src={MARITIME_REGION.banner}
          alt="Plage de la Région Maritime au coucher du soleil"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-transparent" />
        
        <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-end pb-12">
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm">Retour à Découvrir le Togo</span>
          </Link>
          
          <div className="text-6xl mb-4">{MARITIME_REGION.emoji}</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            {MARITIME_REGION.name}
          </h1>
          <p className="text-xl text-white/90">
            Chef-lieu : {MARITIME_REGION.chefLieu}
          </p>
        </div>
      </section>

      {/* PRÉSENTATION GÉNÉRALE */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-4">
              Présentation de la région
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              {MARITIME_REGION.description}
            </p>
          </div>
        </div>
      </section>

      {/* SECTIONS THÉMATIQUES */}
      <section className="py-12 md:py-16 bg-night-light/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MARITIME_REGION.sections.map((section) => {
              const IconComponent = ICON_MAP[section.icon] || MapPin;
              return (
                <div
                  key={section.id}
                  className="rounded-md border border-white/10 bg-night p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-md bg-emerald-brand/20 flex items-center justify-center">
                      <IconComponent size={24} className="text-emerald-brand" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {section.title}
                    </h3>
                  </div>

                  {section.items.length > 0 ? (
                    <ul className="space-y-3">
                      {section.items.map((item) => (
                        <li key={item.name} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                          <div>
                            <p className="text-white font-medium">{item.name}</p>
                            <p className="text-sm text-muted">{item.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : section.link ? (
                    <Link 
                      href={section.link}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-emerald-brand text-white text-sm font-semibold hover:bg-emerald-light transition-all"
                    >
                      Voir les établissements
                      <ArrowRight size={16} />
                    </Link>
                  ) : (
                    <p className="text-muted text-sm italic">
                      {section.note || 'Contenu en cours de préparation'}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALERIE PHOTOS */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Galerie photos
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MARITIME_REGION.gallery.map((image, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] rounded-md overflow-hidden border border-white/10"
              >
                <Image
                  src={image}
                  alt={`Image ${index + 1} de la Région Maritime`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFORMATIONS PRATIQUES */}
      <section className="py-12 md:py-16 bg-night-light/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Informations pratiques
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-md border border-white/10 bg-night p-6">
              <CalendarDays size={32} className="text-gold mb-3" />
              <h3 className="text-white font-bold mb-2">Meilleure période</h3>
              <p className="text-muted text-sm">
                Novembre à mars (saison sèche) pour les activités de plein air
              </p>
            </div>
            
            <div className="rounded-md border border-white/10 bg-night p-6">
              <MapPin size={32} className="text-gold mb-3" />
              <h3 className="text-white font-bold mb-2">Comment s'y rendre</h3>
              <p className="text-muted text-sm">
                Lomé est accessible par avion (Aéroport de Lomé-Tokoin) et par route
              </p>
            </div>
            
            <div className="rounded-md border border-white/10 bg-night p-6">
              <Compass size={32} className="text-gold mb-3" />
              <h3 className="text-white font-bold mb-2">À ne pas manquer</h3>
              <p className="text-muted text-sm">
                Les plages de Lomé, le lac Togo, les marchés traditionnels
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RETOUR À DÉCOUVRIR */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-all"
          >
            <ArrowLeft size={20} />
            Retour à Découvrir le Togo
          </Link>
        </div>
      </section>
    </div>
  );
}