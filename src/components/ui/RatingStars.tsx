'use client';

import { cn } from '@/lib/utils';

interface Props {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

const sizes = { sm: 'text-sm', md: 'text-base', lg: 'text-xl' };

export function RatingStars({ rating, max = 5, size = 'md', interactive = false, onChange, className }: Props) {
  return (
    <div className={cn('flex items-center gap-0.5', className)} role="img" aria-label={`${rating} sur ${max} étoiles`}>
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const filled = starValue <= Math.round(rating);
        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(starValue)}
            className={cn(
              sizes[size],
              filled ? 'text-yellow-400' : 'text-gray-300',
              interactive ? 'cursor-pointer hover:scale-110 transition-transform touch-target' : 'cursor-default',
            )}
            aria-label={`${starValue} étoile${starValue > 1 ? 's' : ''}`}
          >
            ★
          </button>
        );
      })}
      <span className={cn('ml-1 text-gray-500 font-medium', sizes[size])}>{rating.toFixed(1)}</span>
    </div>
  );
}
