import Link from 'next/link';

const CLIENT_LINKS = [
  { href: '/dashboard', label: 'Tableau de bord', icon: '📊' },
  { href: '/orders', label: 'Mes commandes', icon: '🛒' },
  { href: '/profile', label: 'Mon profil', icon: '👤' },
  { href: '/addresses', label: 'Adresses', icon: '📍' },
  { href: '/favorites', label: 'Favoris', icon: '❤️' },
  { href: '/notifications', label: 'Notifications', icon: '🔔' },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="md:w-56 shrink-0 space-y-1">
          <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Mon compte</p>
          {CLIENT_LINKS.map((link) => (
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
