'use client';

import { useCurrency } from '@/context/CurrencyContext';
import { CURRENCY_CONFIG } from '@/lib/currency';

export function CurrencySelector() {
  const { currency, setCurrency, available } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as typeof currency)}
      className="touch-target rounded-md border border-gray-200 bg-white px-2 py-1 text-sm font-medium text-kpalime-dark focus:border-kpalime-green focus:outline-none transition-colors"
      aria-label="Choisir la devise"
    >
      {available.map((code) => (
        <option key={code} value={code}>
          {CURRENCY_CONFIG[code].symbol} {code}
        </option>
      ))}
    </select>
  );
}
