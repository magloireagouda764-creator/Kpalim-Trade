'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { type CurrencyCode, CURRENCY_CONFIG, convertFromXOF, formatPrice } from '@/lib/currency';

interface CurrencyCtx {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  convert: (amountXOF: number) => number;
  format: (amountXOF: number) => string;
  available: CurrencyCode[];
}

const Ctx = createContext<CurrencyCtx | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCur] = useState<CurrencyCode>('XOF');

  useEffect(() => {
    const saved = localStorage.getItem('kpalime-currency') as CurrencyCode | null;
    if (saved && CURRENCY_CONFIG[saved]) setCur(saved);
  }, []);

  const setCurrency = useCallback((c: CurrencyCode) => {
    setCur(c);
    localStorage.setItem('kpalime-currency', c);
  }, []);

  const convert = useCallback((a: number) => convertFromXOF(a, currency), [currency]);
  const format = useCallback((a: number) => formatPrice(a, currency), [currency]);

  return (
    <Ctx.Provider value={{ currency, setCurrency, convert, format, available: Object.keys(CURRENCY_CONFIG) as CurrencyCode[] }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCurrency doit être dans CurrencyProvider');
  return ctx;
}
