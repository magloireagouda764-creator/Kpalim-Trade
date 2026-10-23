import Link from 'next/link';
import { Eye, CheckCircle, Search } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number;
  color: string;
  active?: boolean;
  href: string;
}

export function StatCard({ label, value, color, active, href }: StatCardProps) {
  return (
    <Link
      href={href}
      className={`rounded-lg border p-4 transition-all ${color} ${active ? 'ring-2 ring-green-500 ring-offset-2 ring-offset-gray-900' : 'hover:opacity-80'}`}
    >
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs opacity-80">{label}</div>
    </Link>
  );
}

interface AdminListPageProps {
  title: string;
  subtitle: string;
  stats: Record<string, number>;
  statLabels: { key: string; label: string; color: string }[];
  searchPlaceholder: string;
  items: any[];
  searchParams: { status?: string; region?: string; search?: string };
  basePath: string;
  renderItem: (item: any) => React.ReactNode;
  emptyMessage?: string;
  filterByRegion?: boolean;
}

export function AdminListPage({
  title,
  subtitle,
  stats,
  statLabels,
  searchPlaceholder,
  items,
  searchParams,
  basePath,
  renderItem,
  emptyMessage = 'Aucun résultat pour ces filtres.',
  filterByRegion = true,
}: AdminListPageProps) {
  return (
    <div className="p-6 max-w-7xl mx-auto text-gray-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-400 mb-1">{title}</h1>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statLabels.map((stat) => {
          const isActive =
            stat.key === 'pending'
              ? searchParams.status === 'pending' || !searchParams.status
              : searchParams.status === stat.key;
          return (
            <StatCard
              key={stat.key}
              label={stat.label}
              value={stats[stat.key] || 0}
              color={stat.color}
              active={isActive}
              href={`${basePath}?status=${stat.key}`}
            />
          );
        })}
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
        <form action={basePath} method="GET" className="flex flex-col md:flex-row gap-2">
          <input type="hidden" name="status" value={searchParams.status || 'pending'} />

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="search"
              defaultValue={searchParams.search}
              placeholder={searchPlaceholder}
              className="w-full bg-gray-900 border border-gray-700 rounded-md pl-10 pr-4 py-2 text-white focus:border-green-500 focus:outline-none"
            />
          </div>

          {filterByRegion && (
            <select
              name="region"
              defaultValue={searchParams.region}
              className="bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-green-500 focus:outline-none md:w-48"
            >
              <option value="">Toutes les régions</option>
              <option value="Maritime">Maritime</option>
              <option value="Plateaux">Plateaux</option>
              <option value="Centrale">Centrale</option>
              <option value="Kara">Kara</option>
              <option value="Savanes">Savanes</option>
            </select>
          )}

          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Rechercher
          </button>
        </form>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 rounded-lg border border-gray-700 bg-gray-800">
          <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Aucun élément</h3>
          <p className="text-gray-400">
            {searchParams.status === 'pending' ? 'Aucun élément en attente de validation.' : emptyMessage}
          </p>
        </div>
      ) : (
        <div className="space-y-4">{items.map(renderItem)}</div>
      )}
    </div>
  );
}