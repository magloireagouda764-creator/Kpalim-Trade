'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/', label: 'Accueil', icon: '🏠' },
  { href: '/marketplace', label: 'Boutique', icon: '🛍️' },
  { href: '/tourism', label: 'Tourisme', icon: '🌴' },
  { href: '/events', label: 'Événements', icon: '🎉' },
  { href: '/login', label: 'Compte', icon: '👤' },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 safe-bottom">
      <div className="flex items-center justify-around h-16">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch
              className={cn(
                'flex flex-col items-center justify-center w-full h-full touch-target text-xs transition-colors',
                isActive ? 'text-kpalime-green font-semibold' : 'text-gray-500'
              )}
            >
              <span className="text-lg mb-0.5">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
