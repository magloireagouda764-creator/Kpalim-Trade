/**
 * Protection CSRF simple.
 * Génère et vérifie des tokens CSRF pour les mutations sensibles.
 */

import { createHmac, randomBytes } from 'crypto';

const CSRF_SECRET = process.env.AUTH_SECRET || 'csrf-secret-change-me';

export function generateCsrfToken(): string {
  const token = randomBytes(32).toString('hex');
  const signature = createHmac('sha256', CSRF_SECRET).update(token).digest('hex');
  return `${token}.${signature}`;
}

export function verifyCsrfToken(token: string): boolean {
  if (!token || !token.includes('.')) return false;
  
  const [rawToken, signature] = token.split('.');
  const expectedSignature = createHmac('sha256', CSRF_SECRET).update(rawToken).digest('hex');
  
  return signature === expectedSignature;
}

/**
 * Middleware helper pour vérifier le CSRF sur les routes POST/PUT/DELETE.
 * Usage : if (!verifyCsrfFromRequest(req)) return 403;
 */
export function getCsrfFromHeaders(headers: Headers): string | null {
  return headers.get('x-csrf-token');
}
