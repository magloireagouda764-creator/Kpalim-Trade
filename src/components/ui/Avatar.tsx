import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Props { src?: string | null; name: string; size?: 'sm' | 'md' | 'lg'; className?: string; }
const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg' };

export function Avatar({ src, name, size = 'md', className }: Props) {
  const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  if (src) {
    return (
      <div className={cn('relative rounded-full overflow-hidden shrink-0', sizes[size], className)}>
        <Image src={src} alt={name} fill className="object-cover" sizes={`(${size === 'sm' ? 32 : size === 'md' ? 40 : 56}px)`} />
      </div>
    );
  }

  return (
    <div className={cn('rounded-full bg-kpalime-green text-white flex items-center justify-center font-bold shrink-0', sizes[size], className)}>
      {initials}
    </div>
  );
}
