'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Palmtree, CalendarDays, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

const NAV_ITEMS = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/marketplace', label: 'Boutique', icon: ShoppingBag },
  { href: '/tourism', label: 'Tourisme', icon: Palmtree },
  { href: '/events', label: 'Événements', icon: CalendarDays },
  { href: '/auth/login', label: 'Compte', icon: User, authAware: true },
];

export function MobileNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 safe-bottom shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          let href = item.href;
          let isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          // Pour l'item "Compte", adapter selon connexion
          if (item.authAware) {
            if (user) {
              href = user.role === 'admin' ? '/admin/dashboard' : user.role === 'vendor' ? '/vendor/dashboard' : '/dashboard';
              isActive = pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname.startsWith('/vendor');
            } else {
              href = '/auth/login';
              isActive = pathname.startsWith('/auth');
            }
          }

          return (
            <Link
              key={item.label}
              href={href}
              prefetch
              className={cn(
                'flex flex-col items-center justify-center w-full h-full touch-target transition-colors',
                isActive ? 'text-kpalime-green' : 'text-gray-500',
              )}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={cn('text-[10px] mt-0.5 font-medium', isActive && 'font-semibold')}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}