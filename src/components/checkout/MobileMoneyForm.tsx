'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface Props {
  phoneNumber: string;
  operator: string;
  onPhoneChange: (v: string) => void;
  onOperatorChange: (v: string) => void;
}

const OPERATORS = [
  { value: 't-money', label: 'T-Money' },
  { value: 'flooz', label: 'Flooz' },
  { value: 'autre', label: 'Autre' },
];

export function MobileMoneyForm({ phoneNumber, operator, onPhoneChange, onOperatorChange }: Props) {
  return (
    <div className="p-4 rounded-xl border border-kpalime-green/30 bg-kpalime-green/5 space-y-3">
      <p className="text-sm font-medium text-kpalime-dark">📱 Paiement Mobile Money</p>
      <Select label="Opérateur" value={operator} onChange={(e) => onOperatorChange(e.target.value)} options={OPERATORS} />
      <Input
        label="Numéro Mobile Money"
        type="tel"
        value={phoneNumber}
        onChange={(e) => onPhoneChange(e.target.value)}
        placeholder="+228 XX XX XX XX"
        required
      />
      <p className="text-xs text-gray-500">
        Vous recevrez une demande de confirmation sur votre téléphone pour valider le paiement.
      </p>
    </div>
  );
}
