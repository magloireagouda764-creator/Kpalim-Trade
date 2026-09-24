'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDebounce } from '@/hooks/useDebounce';
import { flattenSearchResults, type SearchResult } from '@/lib/search';
import { Skeleton } from '@/components/ui/Skeleton';

const TYPE_LABELS: Record<string, string> = {
  product: '🛍️ Produit', shop: '🏪 Boutique', site: '🌴 Site', restaurant: '🍽️ Restaurant', event: '🎉 Événement',
};

export function SearchResults({ query }: { query: string }) {
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (debouncedQuery.length < 2) { setResults([]); return; }
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setResults(flattenSearchResults(d.data)); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  if (debouncedQuery.length < 2) {
    return <p className="text-center py-8 text-gray-400">Tapez au moins 2 caractères pour rechercher.</p>;
  }

  if (loading) {
    return <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}</div>;
  }

  if (results.length === 0) {
    return <p className="text-center py-8 text-gray-400">Aucun résultat pour « {debouncedQuery} »</p>;
  }

  return (
    <div className="space-y-2">
      {results.map((r) => (
        <Link key={`${r.type}-${r.id}`} href={r.href} prefetch className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:shadow-sm hover:border-kpalime-green/30 transition-all">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 relative shrink-0">
            {r.image && <Image src={r.image} alt="" fill className="object-cover" sizes="48px" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{r.title}</p>
            {r.subtitle && <p className="text-xs text-gray-500 truncate">{r.subtitle}</p>}
          </div>
          <span className="text-xs text-gray-400 shrink-0">{TYPE_LABELS[r.type]}</span>
        </Link>
      ))}
    </div>
  );
}
