'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { user } = useAuth();

  const accountHref = !user
    ? '/auth/login'
    : user.role === 'admin'
      ? '/admin/dashboard'
      : user.role === 'vendor'
        ? '/vendor/dashboard'
        : '/dashboard';

  const items = [
    { href: '/', label: 'Accueil', icon: Home, badge: 0 },
    { href: '/marketplace', label: 'Boutique', icon: ShoppingBag, badge: 0 },
    { href: '/checkout', label: 'Panier', icon: ShoppingCart, badge: totalItems },
    { href: accountHref, label: 'Compte', icon: User, badge: 0 },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-night/95 backdrop-blur border-t border-white/10 safe-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : item.href === accountHref && item.href !== '/auth/login'
                ? pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname.startsWith('/vendor')
                : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              prefetch
              className={cn(
                'relative flex flex-col items-center justify-center w-full h-full touch-target transition-colors',
                isActive ? 'text-emerald-brand' : 'text-muted',
              )}
            >
              <span className="relative">
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 flex items-center justify-center text-[9px] font-bold text-night bg-gold rounded-full">
                    {item.badge}
                  </span>
                )}
              </span>
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