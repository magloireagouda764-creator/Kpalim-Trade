'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export interface SidebarLink { href: string; label: string; icon?: string; }

interface Props { links: SidebarLink[]; title?: string; }

export function Sidebar({ links, title }: Props) {
  const pathname = usePathname();

  return (
    <aside className="md:w-56 shrink-0 space-y-0.5">
      {title && <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</p>}
      {links.map((link) => {
        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            prefetch
            className={cn(
              'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors touch-target',
              isActive ? 'bg-kpalime-green text-white' : 'hover:bg-kpalime-sand/50 text-kpalime-dark',
            )}
          >
            {link.icon && <span>{link.icon}</span>}
            {link.label}
          </Link>
        );
      })}
    </aside>
  );
}
