import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

interface JWTPayload {
  userId: string;
  role: string;
  email: string;
}

export async function getCurrentUser(): Promise<JWTPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('kpalime_token')?.value;

    if (!token) {
      return null;
    }

    const JWT_SECRET = process.env.AUTH_SECRET || 'votre_secret_jwt';
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    return decoded;
  } catch (error) {
    console.error('Erreur décodage JWT:', error);
    return null;
  }
}