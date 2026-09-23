'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

interface Props { userId: string; isActive: boolean; }

export function UserActions({ userId, isActive }: Props) {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const toggleStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      });
      const data = await res.json();
      if (data.success) addToast(isActive ? 'Utilisateur suspendu' : 'Utilisateur réactivé', 'success');
      else addToast(data.error, 'error');
    } catch { addToast('Erreur réseau', 'error'); } finally { setLoading(false); }
  };

  return (
    <Button variant={isActive ? 'outline' : 'primary'} size="sm" loading={loading} onClick={toggleStatus}>
      {isActive ? 'Suspendre' : 'Réactiver'}
    </Button>
  );
}
