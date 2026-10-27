import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'kpalime_trade_secret_key_2024_super_secure'
);

// 1. Créer un token JWT (Compatible Edge et Node)
export async function createToken(payload: any): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

// 2. Vérifier un token JWT (Compatible Edge et Node, donc parfait pour le middleware !)
export async function verifyToken(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    console.error('Échec de la vérification du token:', error);
    return null;
  }
}

// 3. Récupérer le token depuis les cookies
export async function getTokenFromCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return (
    cookieStore.get('_vercel_jwt')?.value ||
    cookieStore.get('kpalime_token')?.value ||
    cookieStore.get('token')?.value
  );
}

// 4. Récupérer l'utilisateur actuel
export async function getCurrentUser() {
  try {
    const token = await getTokenFromCookie();
    if (!token) return null;
    
    return await verifyToken(token);
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
}