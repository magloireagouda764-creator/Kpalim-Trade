import Link from 'next/link';
import Image from 'next/image';
import { truncate } from '@/lib/utils';

interface Props {
  professional: {
    _id: string;
    slug: string;
    name: string;
    category: string;
    description: string;
    logo?: string;
    city: string;
    skills: string[];
  };
}

export function ProfessionalCard({ professional }: Props) {
  return (
    <Link href={`/services/${professional.slug}`} prefetch className="group block p-4 rounded-xl border border-gray-100 bg-white hover:shadow-md transition-all duration-200 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 relative shrink-0">
          <Image src={professional.logo || '/placeholder.jpg'} alt={professional.name} fill className="object-cover" sizes="48px" />
        </div>
        <div className="min-w-0">
          <h3 className="font-bold truncate group-hover:text-kpalime-green transition-colors">{professional.name}</h3>
          <p className="text-xs text-kpalime-earth font-medium">{professional.category}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 line-clamp-2">{truncate(professional.description, 100)}</p>
      <p className="text-xs text-gray-500">📍 {professional.city}</p>
      {professional.skills.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {professional.skills.slice(0, 3).map((skill) => (
            <span key={skill} className="px-2 py-0.5 text-[10px] bg-kpalime-sand/50 rounded-full">{skill}</span>
          ))}
          {professional.skills.length > 3 && (
            <span className="px-2 py-0.5 text-[10px] text-gray-400">+{professional.skills.length - 3}</span>
          )}
        </div>
      )}
    </Link>
  );
}
