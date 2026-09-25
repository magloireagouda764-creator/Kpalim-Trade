/**
 * Service analytics abstrait.
 * Supporte Plausible, Umami, Google Analytics.
 * Pour le MVP, les événements sont loggés en console.
 */

export type AnalyticsEvent = {
  name: string;
  properties?: Record<string, string | number | boolean>;
};

export function trackEvent(event: AnalyticsEvent): void {
  // ⚠️ IMPLEMENTATION RÉELLE À AJOUTER
  // Exemple Plausible : window.plausible?.(event.name, { props: event.properties });
  // Exemple GA4 : window.gtag?.('event', event.name, event.properties);
  
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics event:', event.name, event.properties);
  }
}

export function trackPageView(path: string): void {
  trackEvent({ name: 'page_view', properties: { path } });
}

// Événements prédéfinis
export const trackAddToCart = (productId: string, price: number) =>
  trackEvent({ name: 'add_to_cart', properties: { productId, price } });

export const trackCheckoutStart = (total: number) =>
  trackEvent({ name: 'checkout_start', properties: { total } });

export const trackOrderComplete = (reference: string, total: number) =>
  trackEvent({ name: 'order_complete', properties: { reference, total } });

export const trackSearch = (query: string) =>
  trackEvent({ name: 'search', properties: { query } });

export const trackRegister = (role: string) =>
  trackEvent({ name: 'register', properties: { role } });
