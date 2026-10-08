'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Home, ShoppingBag, UtensilsCrossed, ShoppingCart,
  Palmtree, Hotel, CalendarDays, Wrench, Palette,
  LogIn, UserPlus, LogOut, LayoutDashboard, Store, Settings, ChevronDown, Search,
} from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import { CurrencySelector } from '@/components/currency/CurrencySelector';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

/* Liens principaux : toujours visibles en haut sur PC */
const PRIMARY_LINKS = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/marketplace', label: 'Boutique', icon: ShoppingBag },
  { href: '/discover', label: 'Découvrir', icon: Palmtree },
  { href: '/restaurants', label: 'Restaurants', icon: UtensilsCrossed },
];

/* Liens secondaires : dans le menu ☰ */
const MENU_LINKS = [
  { href: '/tourism', label: 'Tourisme', icon: Palmtree },
  { href: '/hotels', label: 'Hôtels', icon: Hotel },
  { href: '/events', label: 'Événements', icon: CalendarDays },
  { href: '/services', label: 'Services', icon: Wrench },
  { href: '/culture', label: 'Culture', icon: Palette },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const accountRef = useRef<HTMLDivElement>(null);

  // Fermer le menu compte quand on clique ailleurs
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // Fermer les menus au changement de page
  useEffect(() => {
    setMenuOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  // Gérer la recherche
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  // Lien du tableau de bord selon le rôle
  const dashboardHref = !user
    ? '/auth/login'
    : user.role === 'admin'
      ? '/admin/dashboard'
      : user.role === 'vendor'
        ? '/vendor/dashboard'
        : '/dashboard';

  return (
    <header className="sticky top-0 z-50 bg-night/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        
        {/* GAUCHE : Menu ☰ + Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="touch-target p-2 rounded-md text-white hover:bg-white/10 transition-colors"
            aria-label="Menu principal"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link href="/" prefetch className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-md bg-emerald-brand flex items-center justify-center text-white font-bold group-hover:bg-emerald-light transition-colors">
              KT
            </div>
            <span className="text-lg font-bold text-white hidden sm:block">
              {APP_NAME}
            </span>
          </Link>
        </div>

        {/* CENTRE : Liens principaux + Recherche (sur PC) */}
        <div className="hidden lg:flex items-center gap-4 flex-1 max-w-3xl">
          <nav className="flex items-center gap-1">
            {PRIMARY_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors touch-target',
                    isActive ? 'bg-emerald-brand text-white' : 'text-muted hover:bg-white/10 hover:text-white',
                  )}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Barre de recherche */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un produit, un lieu..."
              className="w-full pl-10 pr-4 py-2 rounded-md bg-night-light border border-white/10 text-white placeholder-muted text-sm focus:border-emerald-brand focus:outline-none focus:ring-1 focus:ring-emerald-brand transition-all"
            />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          </form>
        </div>

        {/* DROITE : Devise, Panier, Compte */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Bouton recherche mobile */}
          <button
            onClick={() => router.push('/search')}
            className="lg:hidden touch-target p-2 rounded-md text-muted hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Rechercher"
          >
            <Search size={24} />
          </button>

          <CurrencySelector />

          {/* Panier */}
          <Link
            href="/checkout"
            prefetch
            className="relative touch-target p-2 rounded-md text-muted hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Panier"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold text-night bg-gold rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Zone authentification */}
          {!isLoading && (
            <>
              {user ? (
                /* Utilisateur connecté : menu déroulant */
                <div className="relative" ref={accountRef}>
                  <button
                    onClick={() => setAccountOpen(!accountOpen)}
                    className="touch-target flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 transition-colors"
                    aria-label="Mon compte"
                  >
                    <div className="w-8 h-8 rounded-md bg-emerald-brand flex items-center justify-center text-white text-sm font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDown size={16} className={cn('text-muted transition-transform', accountOpen && 'rotate-180')} />
                  </button>

                  {accountOpen && (
                    <div className="absolute right-0 mt-2 w-60 bg-night-light border border-white/10 rounded-md shadow-2xl py-2 animate-fade-in">
                      <div className="px-4 py-2 border-b border-white/10">
                        <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                        <p className="text-xs text-muted truncate">{user.email}</p>
                        <p className="text-xs text-gold font-medium capitalize mt-1">{user.role}</p>
                      </div>
                      <Link href={dashboardHref} prefetch className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted hover:bg-white/10 hover:text-white transition-colors">
                        <LayoutDashboard size={18} className="text-emerald-brand" /> Tableau de bord
                      </Link>
                      {user.role === 'vendor' && (
                        <Link href="/vendor/shop-settings" prefetch className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted hover:bg-white/10 hover:text-white transition-colors">
                          <Store size={18} className="text-emerald-brand" /> Ma boutique
                        </Link>
                      )}
                      <Link href="/profile" prefetch className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted hover:bg-white/10 hover:text-white transition-colors">
                        <Settings size={18} className="text-emerald-brand" /> Paramètres
                      </Link>
                      <div className="border-t border-white/10 mt-1 pt-1">
                        <button onClick={() => { logout(); setAccountOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                          <LogOut size={18} /> Se déconnecter
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Utilisateur non connecté : boutons Connexion / Inscription */
                <>
                  <Link href="/auth/login" prefetch className="hidden sm:inline-flex touch-target items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted hover:bg-white/10 hover:text-white transition-colors">
                    <LogIn size={20} /> <span>Connexion</span>
                  </Link>
                  <Link href="/auth/register" prefetch className="touch-target inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold bg-emerald-brand text-white hover:bg-emerald-light transition-colors">
                    <UserPlus size={20} /> <span className="hidden sm:inline">S'inscrire</span><span className="sm:hidden">Inscription</span>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* MENU ☰ DÉROULANT (liens secondaires) */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-night-light border-b border-white/10 shadow-2xl animate-slide-up">
          <nav className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {MENU_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link key={link.href} href={link.href} prefetch className={cn('flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors touch-target', isActive ? 'bg-emerald-brand text-white' : 'text-muted hover:bg-white/10 hover:text-white')}>
                  <Icon size={24} className={isActive ? 'text-white' : 'text-gold'} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Liens principaux sur mobile (dans le menu) */}
          <nav className="lg:hidden max-w-7xl mx-auto px-4 pb-4 grid grid-cols-1 gap-2 border-t border-white/10 pt-3">
             {PRIMARY_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href} prefetch className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-muted hover:bg-white/10 hover:text-white transition-colors touch-target">
                  <Icon size={24} className="text-emerald-brand" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}