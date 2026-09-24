import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword, createToken, verifyToken } from '@/lib/auth';

describe('Authentication', () => {
  it('devrait hasher et vérifier un mot de passe', async () => {
    const password = 'TestPassword123';
    const hashed = await hashPassword(password);
    
    expect(hashed).not.toBe(password);
    expect(hashed.length).toBeGreaterThan(20);
    
    const isValid = await verifyPassword(password, hashed);
    expect(isValid).toBe(true);
    
    const isInvalid = await verifyPassword('WrongPassword', hashed);
    expect(isInvalid).toBe(false);
  });

  it('devrait créer et vérifier un token JWT', async () => {
    const payload = { userId: 'test-user-id', role: 'client' as const, email: 'test@example.com' };
    const token = await createToken(payload);
    
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    
    const decoded = await verifyToken(token);
    expect(decoded).toBeDefined();
    expect(decoded?.userId).toBe(payload.userId);
    expect(decoded?.role).toBe(payload.role);
  });

  it('devrait rejeter un token invalide', async () => {
    const result = await verifyToken('invalid-token');
    expect(result).toBeNull();
  });
});
