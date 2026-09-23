/**
 * Utilitaires PWA
 */

export function isPWAInstalled(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches;
}

export function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

export function shouldShowInstallPrompt(): boolean {
  if (typeof window === 'undefined') return false;
  const dismissed = localStorage.getItem('pwa-prompt-dismissed');
  if (dismissed) {
    const dismissedDate = new Date(dismissed);
    const daysSince = (Date.now() - dismissedDate.getTime()) / (1000 * 3600 * 24);
    if (daysSince < 7) return false; // Ne pas redemander avant 7 jours
  }
  return !isPWAInstalled();
}

export function dismissInstallPrompt(): void {
  localStorage.setItem('pwa-prompt-dismissed', new Date().toISOString());
}
