'use client';

import { cn } from '@/lib/utils';

interface Props {
  activeType: string;
  onTypeChange: (type: string) => void;
}

const TYPES = [
  { id: 'all', label: 'Tout' },
  { id: 'product', label: 'Produits' },
  { id: 'shop', label: 'Boutiques' },
  { id: 'site', label: 'Tourisme' },
  { id: 'restaurant', label: 'Restaurants' },
  { id: 'event', label: 'Événements' },
];

export function SearchFilters({ activeType, onTypeChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {TYPES.map((t) => (
        <button
          key={t.id}
          onClick={() => onTypeChange(t.id)}
          className={cn(
            'shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors touch-target',
            activeType === t.id ? 'bg-kpalime-green text-white' : 'border border-gray-200 hover:border-kpalime-green hover:text-kpalime-green',
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
