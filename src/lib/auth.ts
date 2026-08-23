import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import type { JwtPayload, UserRole } from '@/types';

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET!);

if (!process.env.AUTH_SECRET) throw new Error('AUTH_SECRET manquant');

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createToken(payload: JwtPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as JwtPayload;
  } catch {
    return null;
  }
}

export function getTokenFromCookie(cookies: string): string | null {
  const match = cookies.match(/(?:^|;\s*)kpalime_token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}
