import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.AUTH_SECRET || 'kpalime_trade_secret_key_2024';

// 1. Créer un token JWT
export function createToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// 2. Vérifier un token JWT
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// 3. Récupérer le token depuis les cookies (côté serveur)
export async function getTokenFromCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('kpalime_token')?.value;
}

// 4. Récupérer l'utilisateur actuel (côté serveur)
export async function getCurrentUser() {
  try {
    const token = await getTokenFromCookie();
    if (!token) return null;
    
    const decoded = verifyToken(token);
    return decoded;
  } catch (error) {
    return null;
  }
}

// 5. Hacher un mot de passe
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// 6. Vérifier un mot de passe
export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}// 7. Décoder un token SANS vérification (compatible Edge Runtime pour le middleware)
export function decodeToken(token: string): any {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
}