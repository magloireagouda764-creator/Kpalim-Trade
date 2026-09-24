'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Erreur applicative :', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center space-y-4">
      <p className="text-6xl">😵</p>
      <h1 className="text-2xl font-bold">Une erreur est survenue</h1>
      <p className="text-gray-500 max-w-md">
        Quelque chose s'est mal passé. Veuillez réessayer. Si le problème persiste, contactez le support.
      </p>
      {error.digest && <p className="text-xs text-gray-400">Référence : {error.digest}</p>}
      <Button onClick={reset} className="touch-target">Réessayer</Button>
    </div>
  );
}
