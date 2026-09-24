import Link from 'next/link';

interface Crumb { label: string; href?: string; }

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm text-gray-500 mb-4">
      <ol className="flex items-center gap-1 flex-wrap">
        <li>
          <Link href="/" className="hover:text-kpalime-green transition-colors" prefetch>Accueil</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <span className="text-gray-300">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-kpalime-green transition-colors" prefetch>{item.label}</Link>
            ) : (
              <span className="text-kpalime-dark font-medium truncate max-w-[200px]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
