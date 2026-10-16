import { Clock, CheckCircle, XCircle, AlertCircle, FileText, PauseCircle } from 'lucide-react';
import { AccommodationStatus } from '@/types/accommodation';

interface StatusBadgeProps {
  status: AccommodationStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<AccommodationStatus, { label: string; color: string; icon: any }> = {
  draft: { 
    label: 'Brouillon', 
    color: 'bg-gray-500/20 text-gray-300 border-gray-500/30', 
    icon: FileText 
  },
  pending: { 
    label: 'En attente', 
    color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', 
    icon: Clock 
  },
  approved: { 
    label: 'Approuvé', 
    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', 
    icon: CheckCircle 
  },
  rejected: { 
    label: 'Refusé', 
    color: 'bg-red-500/20 text-red-300 border-red-500/30', 
    icon: XCircle 
  },
  needs_correction: { 
    label: 'À corriger', 
    color: 'bg-orange-500/20 text-orange-300 border-orange-500/30', 
    icon: AlertCircle 
  },
  suspended: { 
    label: 'Suspendu', 
    color: 'bg-purple-500/20 text-purple-300 border-purple-500/30', 
    icon: PauseCircle 
  },
};

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.draft;
  const Icon = config.icon;
  const sizeClasses = size === 'sm' ? 'text-xs px-2.5 py-1' : 'text-sm px-3 py-1.5';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${config.color} ${sizeClasses}`}>
      <Icon size={size === 'sm' ? 12 : 14} />
      {config.label}
    </span>
  );
}