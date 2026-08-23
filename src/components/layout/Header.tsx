import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import { CurrencySelector } from '@/components/currency/CurrencySelector';
import { SearchBar } from './SearchBar';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="text-xl font-bold text-kpalime-green shrink-0" prefetch>
          {APP_NAME}
        </Link>

        <div className="hidden md:flex flex-1 max-w-md">
          <SearchBar />
        </div>

        <nav className="flex items-center gap-3">
          <CurrencySelector />
          <Link href="/marketplace" className="hidden sm:inline-flex touch-target items-center px-3 py-2 text-sm font-medium text-kpalime-dark hover:text-kpalime-green transition-colors" prefetch>
            Boutique
          </Link>
          <Link href="/login" className="touch-target inline-flex items-center px-4 py-2 text-sm font-medium bg-kpalime-green text-white rounded-lg hover:bg-kpalime-green-light transition-colors" prefetch>
            Connexion
          </Link>
        </nav>
      </div>
    </header>
  );
}
