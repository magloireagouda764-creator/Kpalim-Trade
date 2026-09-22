/**
 * Utilitaires de sécurité avancés
 */

// Limiteur de requêtes simple en mémoire (pour API routes)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(ip: string, limit = 10, windowMs = 60000): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= limit) return false;
  record.count++;
  return true;
}

// Nettoyage périodique du store
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitStore.entries()) {
      if (now > record.resetAt) rateLimitStore.delete(ip);
    }
  }, 60000);
}

// Sanitization basique contre XSS
export function sanitizeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}

// Validation stricte des IDs MongoDB
export function isValidObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

// Génération de référence unique sécurisée
export function generateSecureReference(prefix: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}
