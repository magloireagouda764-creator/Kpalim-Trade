'use client';

import { useCurrency } from '@/context/CurrencyContext';
import { CURRENCY_CONFIG } from '@/lib/currency';
import { Globe } from 'lucide-react';

export function CurrencySelector() {
  const { currency, setCurrency, available } = useCurrency();

  return (
    <div className="relative flex items-center">
      <Globe size={14} className="absolute left-2.5 text-gray-400 pointer-events-none" />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as typeof currency)}
        className="touch-target pl-8 pr-7 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 focus:border-kpalime-green focus:outline-none focus:ring-2 focus:ring-kpalime-green/20 transition-all appearance-none cursor-pointer hover:border-gray-300"
        aria-label="Choisir la devise"
      >
        {available.map((code) => (
          <option key={code} value={code}>
            {CURRENCY_CONFIG[code].symbol} {code}
          </option>
        ))}
      </select>
    </div>
  );
}