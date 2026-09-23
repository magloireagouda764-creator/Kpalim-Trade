'use client';

import { useState, useEffect } from 'react';

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Enregistrer le service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setShowPrompt(false);
    setDeferredPrompt(null);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-[75] p-4 bg-white rounded-xl shadow-xl border border-gray-100 animate-slide-up">
      <p className="font-medium text-sm mb-1">📱 Installer l'application</p>
      <p className="text-xs text-gray-500 mb-3">Accédez à Kpalimé-Trad plus rapidement depuis votre écran d'accueil.</p>
      <div className="flex gap-2">
        <button onClick={handleInstall} className="flex-1 px-3 py-2 bg-kpalime-green text-white text-sm font-medium rounded-lg hover:bg-kpalime-green-light transition-colors">Installer</button>
        <button onClick={() => setShowPrompt(false)} className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">Plus tard</button>
      </div>
    </div>
  );
}
