'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Ajoute une animation de transition douce lors du changement de page.
 * Améliore la perception de fluidité sans impacter les performances.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className={cn('transition-all duration-300 ease-out', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2')}>
      {children}
    </div>
  );
}
