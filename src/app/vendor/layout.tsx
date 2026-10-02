import Link from 'next/link';
import { redirect } from 'next/navigation';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';

export default async function VendorLayout({ children }: { children: React.ReactNode }) {
  // Note: Le middleware protège déjà ces routes.
  // Ce layout ajoute la sidebar vendeur.
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="md:w-56 shrink-0 space-y-1">
          {[
            { href: '/vendor/dashboard', label: 'Tableau de bord', icon: '📊' },
            { href: '/vendor/products', label: 'Mes produits', icon: '📦' },
            { href: '/vendor/products/new', label: 'Ajouter un produit', icon: '➕' },
            { href: '/vendor/orders', label: 'Commandes', icon: '🛒' },
            { href: '/vendor/shop-settings', label: 'Paramètres boutique', icon: '⚙️' },
          ].map((link) => (
            <Link key={link.href} href={link.href} prefetch className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-kpalime-sand/50 transition-colors touch-target">
              <span>{link.icon}</span> {link.label}
            </Link>
          ))}
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
