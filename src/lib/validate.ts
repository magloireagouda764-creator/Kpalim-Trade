/**
 * Validateurs réutilisables pour renforcer la sécurité.
 */

export function isValidPhone(phone: string): boolean {
  // Format togolais : +228 XX XX XX XX ou XX XX XX XX
  return /^(\+228)?[0-9]{8}$/.test(phone.replace(/\s/g, ''));
}

export function isValidPassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (password.length < 8) errors.push('Minimum 8 caractères');
  if (!/[0-9]/.test(password)) errors.push('Au moins un chiffre');
  if (!/[a-zA-Z]/.test(password)) errors.push('Au moins une lettre');
  return { valid: errors.length === 0, errors };
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
}

export function isValidMongoId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

export function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
