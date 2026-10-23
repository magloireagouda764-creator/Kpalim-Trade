'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, Store, Package, Tags, ShoppingCart, 
  Palmtree, Hotel, UtensilsCrossed, Palette, CalendarDays, 
  Wrench, Briefcase, Flag, Star, ScrollText, Settings, Menu, X 
} from 'lucide-react';

// Définition des sections avec leurs liens
const ADMIN_SECTIONS = [
  {
    title: 'Vue Générale',
    links: [
      { href: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    ]
  },
  {
    title: 'Tourisme & Hébergement',
    links: [
      { href: '/admin/tourism', label: 'Tourisme & Sites', icon: Palmtree },
      { href: '/admin/hotels', label: 'Hôtels & Hébergements', icon: Hotel },
      { href: '/admin/restaurants', label: 'Restaurants & Gastronomie', icon: UtensilsCrossed },
      { href: '/admin/culture', label: 'Culture & Artisanat', icon: Palette },
      { href: '/admin/events', label: 'Événements', icon: CalendarDays },
    ]
  },
  {
    title: 'Marketplace & Commerce',
    links: [
      { href: '/admin/shops', label: 'Boutiques & Vendeurs', icon: Store },
      { href: '/admin/products', label: 'Produits', icon: Package },
      { href: '/admin/categories', label: 'Catégories', icon: Tags },
      { href: '/admin/orders', label: 'Commandes', icon: ShoppingCart },
    ]
  },
  {
    title: 'Entreprises & Services',
    links: [
      { href: '/admin/services', label: 'Services & Pros', icon: Wrench },
      { href: '/admin/businesses', label: 'Entreprises', icon: Briefcase },
    ]
  },
  {
    title: 'Administration & Sécurité',
    links: [
      { href: '/admin/users', label: 'Utilisateurs & Rôles', icon: Users },
      { href: '/admin/reports', label: 'Signalements', icon: Flag },
      { href: '/admin/reviews', label: 'Avis & Modération', icon: Star },
      { href: '/admin/audit-logs', label: "Journal d'audit", icon: ScrollText },
      { href: '/admin/settings', label: 'Paramètres', icon: Settings },
    ]
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    // ✅ CORRECTION 1 : Fond sombre (bg-gray-900) et texte clair par défaut
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      
      {/* Sidebar Mobile Toggle */}
      <button 
        // ✅ CORRECTION 2 : Bouton mobile adapté au thème sombre
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md shadow-md border border-gray-700"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out border-r border-slate-800
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold text-green-400">Kpalimé-Trade</h1>
          <p className="text-xs text-slate-400 mt-1">Panneau d'administration</p>
        </div>

        <nav className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-80px)]">
          {ADMIN_SECTIONS.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-xs font-semibold text-green-500 uppercase tracking-wider mb-2 px-3">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.links.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                          ${isActive 
                            ? 'bg-green-600 text-white' 
                            : 'text-slate-300 hover:bg-slate-800 hover:text-green-400'
                          }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Icon size={18} />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      {/* ✅ CORRECTION 3 : Ajout de la classe admin-page pour cohérence */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto admin-page">
        {children}
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}