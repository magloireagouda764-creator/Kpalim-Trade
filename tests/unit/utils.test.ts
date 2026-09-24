import { describe, it, expect } from 'vitest';
import { cn, formatDate, truncate, generateSlug } from '@/lib/utils';
import { buildSearchRegex, normalizeQuery } from '@/lib/search';

describe('Utils', () => {
  it('cn devrait fusionner les classes correctement', () => {
    expect(cn('base', 'additional')).toBe('base additional');
    expect(cn('base', undefined, 'additional')).toBe('base additional');
    expect(cn('p-2', 'p-4')).toBe('p-4'); // tailwind-merge
  });

  it('truncate devrait couper les longues chaînes', () => {
    expect(truncate('Hello World', 5)).toBe('Hello…');
    expect(truncate('Hi', 10)).toBe('Hi');
  });

  it('generateSlug devrait créer des slugs valides', () => {
    expect(generateSlug('Hello World')).toBe('hello-world');
    expect(generateSlug('Café Kpalimé')).toBe('cafe-kpalime');
    expect(generateSlug('  Multiple   Spaces  ')).toBe('multiple-spaces');
  });

  it('formatDate devrait formater en français', () => {
    const result = formatDate('2026-01-15');
    expect(result).toContain('janvier');
    expect(result).toContain('2026');
  });
});

describe('Search Utils', () => {
  it('normalizeQuery devrait normaliser la recherche', () => {
    expect(normalizeQuery('Café')).toBe('cafe');
    expect(normalizeQuery('  Kpalimé  ')).toBe('kpalime');
  });

  it('buildSearchRegex devrait échapper les caractères spéciaux', () => {
    const regex = buildSearchRegex('test.price');
    expect(regex.test('test.price')).toBe(true);
    expect(regex.test('testXprice')).toBe(false);
  });
});
