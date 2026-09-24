'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface Props {
  categories: { _id: string; name: string; slug: string }[];
}

export function ProductFilter({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(name, value);
      else params.delete(name);
      return params.toString();
    },
    [searchParams],
  );

  const activeCategory = searchParams.get('category');
  const minPrice = searchParams.get('min');
  const maxPrice = searchParams.get('max');

  const handlePriceChange = (key: 'min' | 'max', value: string) => {
    router.push(`/marketplace?${createQueryString(key, value)}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-sm mb-3 uppercase tracking-wide text-gray-500">Catégories</h3>
        <div className="space-y-1">
          <button
            onClick={() => router.push('/marketplace')}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors touch-target ${!activeCategory ? 'bg-kpalime-green text-white font-medium' : 'hover:bg-gray-100'}`}
          >
            Toutes
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => router.push(`/marketplace?${createQueryString('category', cat._id)}`)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors touch-target ${activeCategory === cat._id ? 'bg-kpalime-green text-white font-medium' : 'hover:bg-gray-100'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-sm mb-3 uppercase tracking-wide text-gray-500">Prix (FCFA)</h3>
        <div className="space-y-2">
          <Input type="number" placeholder="Min" value={minPrice || ''} onChange={(e) => handlePriceChange('min', e.target.value)} min="0" />
          <Input type="number" placeholder="Max" value={maxPrice || ''} onChange={(e) => handlePriceChange('max', e.target.value)} min="0" />
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => router.push('/marketplace')}
      >
        Réinitialiser les filtres
      </Button>
    </div>
  );
}
