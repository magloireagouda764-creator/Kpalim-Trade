'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const SORT_OPTIONS = [
  { value: 'recent', label: 'Plus récents' },
  { value: 'price_asc', label: 'Prix croissant' },
  { value: 'price_desc', label: 'Prix décroissant' },
  { value: 'popular', label: 'Populaires' },
];

export function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'recent';

  const createQueryString = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('sort', value);
      return params.toString();
    },
    [searchParams],
  );

  return (
    <select
      value={currentSort}
      onChange={(e) => router.push(`/marketplace?${createQueryString(e.target.value)}`)}
      className="touch-target px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium focus:border-kpalime-green focus:outline-none transition-colors"
      aria-label="Trier les produits"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
