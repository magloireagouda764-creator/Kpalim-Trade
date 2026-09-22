import { cn } from '@/lib/utils';

export function Divider({ className }: { className?: string }) {
  return <hr className={cn('border-gray-100 my-4', className)} />;
}
