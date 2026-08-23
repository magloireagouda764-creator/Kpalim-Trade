export type CurrencyCode = 'XOF' | 'USD' | 'EUR';

export interface CurrencyConfig {
  code: CurrencyCode;
  name: string;
  symbol: string;
  rateToXOF: number;
  decimals: number;
}

export const CURRENCY_CONFIG: Record<CurrencyCode, CurrencyConfig> = {
  XOF: { code: 'XOF', name: 'Franc CFA', symbol: 'FCFA', rateToXOF: 1, decimals: 0 },
  USD: { code: 'USD', name: 'Dollar américain', symbol: '$', rateToXOF: 600, decimals: 2 },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', rateToXOF: 655.957, decimals: 2 },
};

export function convertFromXOF(amountXOF: number, target: CurrencyCode): number {
  const cfg = CURRENCY_CONFIG[target];
  return Number((amountXOF / cfg.rateToXOF).toFixed(cfg.decimals));
}

export function formatPrice(amountXOF: number, currency: CurrencyCode = 'XOF'): string {
  const cfg = CURRENCY_CONFIG[currency];
  const value = convertFromXOF(amountXOF, currency);

  if (currency === 'XOF') {
    return `${value.toLocaleString('fr-FR')} ${cfg.symbol}`;
  }
  return `${cfg.symbol}${value.toLocaleString('en-US', {
    minimumFractionDigits: cfg.decimals,
    maximumFractionDigits: cfg.decimals,
  })}`;
}
