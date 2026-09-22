import { cn } from '@/lib/utils';

interface Column<T> { key: string; header: string; render?: (item: T) => React.ReactNode; className?: string; }

interface Props<T> { columns: Column<T>[]; data: T[]; emptyMessage?: string; getKey: (item: T) => string; }

export function DataTable<T extends Record<string, unknown>>({ columns, data, emptyMessage = 'Aucune donnée', getKey }: Props<T>) {
  if (data.length === 0) return <p className="text-center py-12 text-gray-400">{emptyMessage}</p>;

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            {columns.map((col) => (<th key={col.key} className={cn('px-4 py-3 font-medium', col.className)}>{col.header}</th>))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((item) => (
            <tr key={getKey(item)} className="hover:bg-gray-50 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className={cn('px-4 py-3', col.className)}>
                  {col.render ? col.render(item) : String(item[col.key] ?? '-')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
