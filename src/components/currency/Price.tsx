'use client';

import { useCurrency } from '@/context/CurrencyContext';
import { cn } from '@/lib/utils';

interface Props {
  amount: number;
  className?: string;
  showOriginal?: boolean;
}

export function Price({ amount, className, showOriginal = false }: Props) {
  const { format, currency } = useCurrency();

  return (
    <span className={cn('font-semibold tabular-nums', className)}>
      {format(amount)}
      {showOriginal && currency !== 'XOF' && (
        <span className="ml-1.5 text-xs text-gray-400 font-normal">
          ({amount.toLocaleString('fr-FR')} FCFA)
        </span>
      )}
    </span>
  );
}
