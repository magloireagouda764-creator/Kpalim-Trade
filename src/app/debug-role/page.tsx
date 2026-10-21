import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export default async function DebugRolePage() {
  const cookieStore = await cookies();
  
  // Essayer plusieurs noms de cookies possibles
  const token = 
    cookieStore.get('_vercel_jwt')?.value ||
    cookieStore.get('kpalime_token')?.value ||
    cookieStore.get('token')?.value ||
    cookieStore.get('auth-token')?.value;
  
  let role = 'non connecté';
  let email = 'N/A';
  let tokenName = 'Aucun';
  let tokenPresent = 'NON';
  let tokenPreview = 'N/A';
  
  if (token) {
    tokenPresent = 'OUI';
    tokenPreview = token.substring(0, 30) + '...';
    
    // Déterminer quel cookie a été trouvé
    if (cookieStore.get('_vercel_jwt')?.value) tokenName = '_vercel_jwt';
    else if (cookieStore.get('kpalime_token')?.value) tokenName = 'kpalime_token';
    else if (cookieStore.get('token')?.value) tokenName = 'token';
    else tokenName = 'autre';
    
    const payload = verifyToken(token);
    if (payload) {
      role = payload.role || 'inconnu';
      email = payload.email || 'N/A';
    } else {
      role = 'token invalide';
    }
  }
  
  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', background: '#1a1a1a', color: '#00ff00', minHeight: '100vh' }}>
      <h1>🔍 Debug Rôle Utilisateur</h1>
      <hr style={{ borderColor: '#333' }} />
      <p><strong>Token présent :</strong> {tokenPresent}</p>
      <p><strong>Nom du cookie :</strong> {tokenName}</p>
      <p><strong>Token (début) :</strong> {tokenPreview}</p>
      <p><strong>Email :</strong> {email}</p>
      <p><strong>Rôle actuel :</strong> <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{role}</span></p>
      <hr style={{ borderColor: '#333' }} />
      {role === 'admin' ? (
        <div style={{ background: '#004400', padding: '1rem', borderRadius: '8px' }}>
          <p>✅ Tu es ADMIN ! Tu devrais pouvoir accéder à /admin/dashboard</p>
          <a href="/admin/dashboard" style={{ color: '#00ff00', fontSize: '1.2rem' }}>→ Cliquer ici pour aller au dashboard admin</a>
        </div>
      ) : (
        <div style={{ background: '#440000', padding: '1rem', borderRadius: '8px' }}>
          <p>❌ Ton rôle n'est PAS admin. C'est pour ça que tu es redirigé.</p>
          <p>Rôle actuel : <strong>{role}</strong></p>
        </div>
      )}
    </div>
  );
}