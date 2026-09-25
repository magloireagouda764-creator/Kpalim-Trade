'use client';

import { type ReactNode } from 'react';
import { PageTransition } from '@/components/performance/PageTransition';
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

/**
 * Wrapper client pour les fonctionnalités nécessitant le navigateur.
 * À utiliser dans le layout racine pour envelopper le contenu.
 */
export function ClientProviders({ children }: { children: ReactNode }) {
  const isOnline = useOnlineStatus();

  return (
    <>
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-yellow-500 text-black text-center text-sm font-medium py-2">
          📡 Vous êtes hors ligne — certaines fonctionnalités peuvent être limitées
        </div>
      )}
      <PageTransition>{children}</PageTransition>
      <PWAInstallPrompt />
    </>
  );
}
