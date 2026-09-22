'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const LINKS = [
  { href: '/admin/dashboard', label: 'Tableau de bord', icon: '📊' },
  { href: '/admin/users', label: 'Utilisateurs', icon: '👥' },
  { href: '/admin/shops', label: 'Boutiques', icon: '🏪' },
  { href: '/admin/products', label: 'Produits', icon: '📦' },
  { href: '/admin/categories', label: 'Catégories', icon: '🏷️' },
  { href: '/admin/orders', label: 'Commandes', icon: '🛒' },
  { href: '/admin/currencies', label: 'Devises', icon: '💱' },
  { href: '/admin/tourism', label: 'Tourisme', icon: '🌴' },
  { href: '/admin/hotels', label: 'Hôtels', icon: '🏨' },
  { href: '/admin/restaurants', label: 'Restaurants', icon: '🍽️' },
  { href: '/admin/culture', label: 'Culture', icon: '🎭' },
  { href: '/admin/events', label: 'Événements', icon: '🎉' },
  { href: '/admin/services', label: 'Services', icon: '👨‍💼' },
  { href: '/admin/reports', label: 'Signalements', icon: '🚩' },
  { href: '/admin/reviews', label: 'Avis', icon: '⭐' },
  { href: '/admin/audit-logs', label: 'Audit', icon: '📋' },
  { href: '/admin/settings', label: 'Paramètres', icon: '⚙️' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="md:w-60 shrink-0 space-y-0.5">
      <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Administration</p>
      {LINKS.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link key={link.href} href={link.href} prefetch className={cn('flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors touch-target', isActive ? 'bg-kpalime-green text-white' : 'hover:bg-kpalime-sand/50 text-kpalime-dark')}>
            <span>{link.icon}</span> {link.label}
          </Link>
        );
      })}
    </aside>
  );
}
