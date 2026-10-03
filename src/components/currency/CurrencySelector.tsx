'use client';

import { Globe } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { CURRENCY_CONFIG } from '@/lib/currency';

export function CurrencySelector() {
  const { currency, setCurrency, available } = useCurrency();

  return (
    <div className="relative flex items-center">
      <Globe size={14} className="absolute left-2.5 text-gold pointer-events-none" />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as typeof currency)}
        className="touch-target pl-7 pr-2 py-1.5 rounded-md border border-white/15 bg-night-light text-xs font-medium text-white focus:border-emerald-brand focus:outline-none transition-colors appearance-none cursor-pointer hover:border-white/30"
        aria-label="Choisir la devise"
      >
        {available.map((code) => (
          <option key={code} value={code} className="bg-night text-white">
            {CURRENCY_CONFIG[code].symbol} {code}
          </option>
        ))}
      </select>
    </div>
  );
}