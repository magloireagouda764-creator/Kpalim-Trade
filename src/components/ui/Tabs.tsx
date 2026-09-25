'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Tab { id: string; label: string; content: ReactNode; }

interface Props {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export function Tabs({ tabs, defaultTab, className }: Props) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id);
  const activeTab = tabs.find((t) => t.id === active);

  return (
    <div className={className}>
      <div className="flex gap-1 border-b border-gray-200 overflow-x-auto scrollbar-hide" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors touch-target border-b-2 -mb-px',
              active === tab.id
                ? 'border-kpalime-green text-kpalime-green'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-4" role="tabpanel">
        {activeTab?.content}
      </div>
    </div>
  );
}
