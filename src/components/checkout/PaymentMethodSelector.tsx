'use client';

import { cn } from '@/lib/utils';

export type PaymentMethod = 'cod' | 'mobile_money';

interface Props {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

const METHODS: { id: PaymentMethod; label: string; icon: string; description: string }[] = [
  { id: 'cod', label: 'Paiement à la livraison', icon: '💵', description: 'Payez en espèces à la réception' },
  { id: 'mobile_money', label: 'Mobile Money', icon: '📱', description: 'T-Money, Flooz ou autre' },
];

export function PaymentMethodSelector({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-kpalime-dark">Mode de paiement</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {METHODS.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => onChange(method.id)}
            className={cn(
              'p-4 rounded-xl border-2 text-left transition-all touch-target',
              value === method.id
                ? 'border-kpalime-green bg-kpalime-green/5'
                : 'border-gray-200 hover:border-gray-300',
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{method.icon}</span>
              <span className="font-medium text-sm">{method.label}</span>
              {value === method.id && <span className="ml-auto text-kpalime-green">✓</span>}
            </div>
            <p className="text-xs text-gray-500">{method.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
