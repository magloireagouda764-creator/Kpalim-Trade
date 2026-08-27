import { cn } from '@/lib/utils';

interface Props {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon = '📭', title, description, action, className }: Props) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center space-y-3', className)}>
      <span className="text-5xl">{icon}</span>
      <h3 className="text-lg font-bold text-kpalime-dark">{title}</h3>
      {description && <p className="text-gray-500 max-w-md">{description}</p>}
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
