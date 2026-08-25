import Image from 'next/image';

interface Props {
  guide: {
    _id: string;
    name: string;
    photo?: string;
    phone: string;
    whatsapp?: string;
    languages: string[];
    zone: string;
    specialties: string[];
    dailyRate?: number;
  };
}

export function GuideCard({ guide }: Props) {
  return (
    <div className="p-4 rounded-xl border border-gray-100 bg-white space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 relative shrink-0">
          <Image src={guide.photo || '/placeholder.jpg'} alt={guide.name} fill className="object-cover" sizes="56px" />
        </div>
        <div>
          <h3 className="font-bold">{guide.name}</h3>
          <p className="text-xs text-gray-500">📍 {guide.zone}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {guide.languages.map((lang) => (
          <span key={lang} className="px-2 py-0.5 text-xs bg-kpalime-sand rounded-full">{lang}</span>
        ))}
      </div>
      {guide.specialties.length > 0 && (
        <p className="text-xs text-gray-500">Spécialités : {guide.specialties.join(', ')}</p>
      )}
      <div className="flex gap-2 pt-1">
        <a href={`tel:${guide.phone}`} className="flex-1 touch-target inline-flex items-center justify-center px-3 py-2 text-sm font-medium bg-kpalime-green text-white rounded-lg hover:bg-kpalime-green-light transition-colors">
          📞 Appeler
        </a>
        {guide.whatsapp && (
          <a href={`https://wa.me/${guide.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1 touch-target inline-flex items-center justify-center px-3 py-2 text-sm font-medium border border-kpalime-green text-kpalime-green rounded-lg hover:bg-kpalime-green hover:text-white transition-colors">
            💬 WhatsApp
          </a>
        )}
      </div>
      {guide.dailyRate && (
        <p className="text-xs text-gray-500 text-center">Tarif journalier : {guide.dailyRate.toLocaleString('fr-FR')} FCFA</p>
      )}
    </div>
  );
}
