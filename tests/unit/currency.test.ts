import { describe, it, expect } from 'vitest';
import { convertFromXOF, formatPrice, CURRENCY_CONFIG } from '@/lib/currency';

describe('Currency Conversion', () => {
  it('devrait convertir XOF vers USD correctement', () => {
    const result = convertFromXOF(6000, 'USD');
    expect(result).toBe(10); // 6000 / 600 = 10
  });

  it('devrait convertir XOF vers EUR correctement', () => {
    const result = convertFromXOF(655957, 'EUR');
    expect(result).toBeCloseTo(1000, 0); // 655957 / 655.957 ≈ 1000
  });

  it('devrait retourner le même montant pour XOF', () => {
    const result = convertFromXOF(5000, 'XOF');
    expect(result).toBe(5000);
  });

  it('devrait formater correctement en FCFA', () => {
    const result = formatPrice(10000, 'XOF');
    expect(result).toContain('10');
    expect(result).toContain('FCFA');
  });

  it('devrait formater correctement en USD', () => {
    const result = formatPrice(6000, 'USD');
    expect(result).toContain('$');
    expect(result).toContain('10');
  });

  it('devrait avoir une configuration complète pour chaque devise', () => {
    expect(CURRENCY_CONFIG.XOF).toBeDefined();
    expect(CURRENCY_CONFIG.USD).toBeDefined();
    expect(CURRENCY_CONFIG.EUR).toBeDefined();
    expect(CURRENCY_CONFIG.XOF.rateToXOF).toBe(1);
  });
});
