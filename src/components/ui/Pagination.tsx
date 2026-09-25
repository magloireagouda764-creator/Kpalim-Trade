'use client';

import { cn } from '@/lib/utils';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
    let page: number;
    if (totalPages <= 5) page = i + 1;
    else if (currentPage <= 3) page = i + 1;
    else if (currentPage >= totalPages - 2) page = totalPages - 4 + i;
    else page = currentPage - 2 + i;
    return page;
  });

  return (
    <nav className={cn('flex items-center justify-center gap-1', className)} aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="touch-target px-3 py-2 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-40 disabled:pointer-events-none transition-colors"
        aria-label="Page précédente"
      >
        ←
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            'touch-target w-10 h-10 rounded-lg text-sm font-medium transition-colors',
            page === currentPage ? 'bg-kpalime-green text-white' : 'hover:bg-gray-100',
          )}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="touch-target px-3 py-2 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-40 disabled:pointer-events-none transition-colors"
        aria-label="Page suivante"
      >
        →
      </button>
    </nav>
  );
}
