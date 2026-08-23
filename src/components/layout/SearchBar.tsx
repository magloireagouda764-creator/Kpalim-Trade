'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher produits, lieux, services…"
        className="w-full touch-target pl-4 pr-10 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:border-kpalime-green focus:bg-white focus:outline-none transition-all"
      />
      <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline text-xs text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">
        ⌘K
      </kbd>
    </form>
  );
}
