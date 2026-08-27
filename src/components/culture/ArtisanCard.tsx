import Image from 'next/image';

interface Props {
  artisan: {
    _id: string;
    name: string;
    specialty: string;
    bio: string;
    photo?: string;
    location?: string;
    whatsapp?: string;
    phone?: string;
  };
}

export function ArtisanCard({ artisan }: Props) {
  return (
    <div className="p-4 rounded-xl border border-gray-100 bg-white space-y-3 hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 relative shrink-0">
          <Image src={artisan.photo || '/placeholder.jpg'} alt={artisan.name} fill className="object-cover" sizes="56px" />
        </div>
        <div className="min-w-0">
          <h3 className="font-bold truncate">{artisan.name}</h3>
          <p className="text-xs text-kpalime-earth font-medium">{artisan.specialty}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 line-clamp-2">{artisan.bio}</p>
      {artisan.location && <p className="text-xs text-gray-500">📍 {artisan.location}</p>}
      <div className="flex gap-2 pt-1">
        {artisan.phone && (
          <a href={`tel:${artisan.phone}`} className="flex-1 touch-target inline-flex items-center justify-center px-3 py-2 text-sm font-medium bg-kpalime-green text-white rounded-lg hover:bg-kpalime-green-light transition-colors">
            📞 Appeler
          </a>
        )}
        {artisan.whatsapp && (
          <a href={`https://wa.me/${artisan.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1 touch-target inline-flex items-center justify-center px-3 py-2 text-sm font-medium border border-kpalime-green text-kpalime-green rounded-lg hover:bg-kpalime-green hover:text-white transition-colors">
            💬 WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
