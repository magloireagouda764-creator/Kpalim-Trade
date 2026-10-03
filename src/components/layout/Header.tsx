'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import {
  Home,
  ShoppingBag,
  Palmtree,
  Hotel,
  UtensilsCrossed,
  CalendarDays,
  Wrench,
  Palette,
  Search,
  User,
  LogIn,
  UserPlus,
  LogOut,
  LayoutDashboard,
  Store,
  Settings,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import { CurrencySelector } from '@/components/currency/CurrencySelector';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/marketplace', label: 'Boutique', icon: ShoppingBag },
  { href: '/tourism', label: 'Tourisme', icon: Palmtree },
  { href: '/hotels', label: 'Hôtels', icon: Hotel },
  { href: '/restaurants', label: 'Restaurants', icon: UtensilsCrossed },
  { href: '/events', label: 'Événements', icon: CalendarDays },
  { href: '/services', label: 'Services', icon: Wrench },
  { href: '/culture', label: 'Culture', icon: Palette },
];

export function Header() {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  // Fermer le menu compte quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fermer le menu mobile au changement de page
  useEffect(() => {
    setMobileMenuOpen(false);
    setAccountMenuOpen(false);
  }, [pathname]);

  const getDashboardLink = () => {
    if (!user) return '/dashboard';
    if (user.role === 'admin') return '/admin/dashboard';
    if (user.role === 'vendor') return '/vendor/dashboard';
    return '/dashboard';
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      {/* Barre principale */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group" prefetch>
          <div className="w-9 h-9 rounded-lg bg-kpalime-green flex items-center justify-center text-white font-bold group-hover:bg-kpalime-green-light transition-colors">
            KT
          </div>
          <span className="text-lg font-bold text-kpalime-green hidden sm:block">
            {APP_NAME}
          </span>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden lg:flex items-center gap-1 flex-1 max-w-3xl">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all touch-target',
                  isActive
                    ? 'bg-kpalime-green/10 text-kpalime-green'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-kpalime-green',
                )}
              >
                <Icon size={16} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Actions droite */}
        <div className="flex items-center gap-2 shrink-0">
          <CurrencySelector />

          {/* Bouton recherche mobile */}
          <button
            className="lg:hidden touch-target p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
            aria-label="Rechercher"
          >
            <Search size={20} />
          </button>

          {/* Zone authentification */}
          {!isLoading && (
            <>
              {user ? (
                /* Utilisateur connecté : menu déroulant */
                <div className="relative" ref={accountMenuRef}>
                  <button
                    onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                    className="touch-target flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Menu compte"
                    aria-expanded={accountMenuOpen}
                  >
                    <div className="w-8 h-8 rounded-full bg-kpalime-green flex items-center justify-center text-white text-sm font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown
                      size={16}
                      className={cn('text-gray-500 transition-transform', accountMenuOpen && 'rotate-180')}
                    />
                  </button>

                  {accountMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        <p className="text-xs text-kpalime-green font-medium capitalize mt-1">{user.role}</p>
                      </div>
                      <Link
                        href={getDashboardLink()}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        prefetch
                      >
                        <LayoutDashboard size={16} className="text-kpalime-green" />
                        Tableau de bord
                      </Link>
                      {user.role === 'vendor' && (
                        <Link
                          href="/vendor/shop-settings"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          prefetch
                        >
                          <Store size={16} className="text-kpalime-green" />
                          Ma boutique
                        </Link>
                      )}
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        prefetch
                      >
                        <Settings size={16} className="text-kpalime-green" />
                        Paramètres
                      </Link>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setAccountMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={16} />
                          Se déconnecter
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Utilisateur non connecté : boutons Connexion / Inscription */
                <>
                  <Link
                    href="/auth/login"
                    prefetch
                    className="hidden sm:inline-flex touch-target items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:text-kpalime-green transition-colors"
                  >
                    <LogIn size={16} />
                    <span>Connexion</span>
                  </Link>
                  <Link
                    href="/auth/register"
                    prefetch
                    className="touch-target inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-kpalime-green text-white rounded-lg hover:bg-kpalime-green-light transition-colors"
                  >
                    <UserPlus size={16} />
                    <span className="hidden sm:inline">S'inscrire</span>
                    <span className="sm:hidden">Inscription</span>
                  </Link>
                </>
              )}
            </>
          )}

          {/* Bouton menu mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden touch-target p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white animate-slide-up">
          <nav className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors touch-target',
                    isActive
                      ? 'bg-kpalime-green/10 text-kpalime-green'
                      : 'text-gray-700 hover:bg-gray-50',
                  )}
                >
                  <Icon size={18} className="text-kpalime-green" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Liens auth mobile */}
            {!user && (
              <div className="pt-3 mt-3 border-t border-gray-100 space-y-1">
                <Link
                  href="/auth/login"
                  prefetch
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors touch-target"
                >
                  <LogIn size={18} className="text-kpalime-green" />
                  <span>Connexion</span>
                </Link>
                <Link
                  href="/auth/register"
                  prefetch
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-kpalime-green text-white touch-target"
                >
                  <UserPlus size={18} />
                  <span>S'inscrire</span>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}