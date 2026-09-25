'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const positions = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

export function Tooltip({ content, children, position = 'top', className }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            'absolute z-50 px-3 py-1.5 text-xs font-medium text-white bg-kpalime-dark rounded-lg whitespace-nowrap animate-fade-in pointer-events-none',
            positions[position],
            className,
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
