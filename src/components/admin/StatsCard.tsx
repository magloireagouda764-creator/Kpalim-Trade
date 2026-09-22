import { cn } from '@/lib/utils';

interface Props { label: string; value: number | string; icon?: string; color?: string; trend?: string; }

export function StatsCard({ label, value, icon, color = 'bg-white border-gray-100', trend }: Props) {
  return (
    <div className={cn('p-5 rounded-xl border', color)}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">{label}</p>
        {icon && <span className="text-xl">{icon}</span>}
      </div>
      <p className="text-3xl font-bold tabular-nums">{value}</p>
      {trend && <p className="text-xs mt-1 text-gray-400">{trend}</p>}
    </div>
  );
}
