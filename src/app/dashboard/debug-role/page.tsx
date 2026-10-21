import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export default async function DebugRolePage() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  
  // Chercher le token dans tous les cookies
  let token = null;
  let tokenName = 'Aucun';
  
  for (const cookie of allCookies) {
    if (cookie.name.includes('token') || cookie.name.includes('auth') || cookie.name.includes('jwt') || cookie.name.includes('session')) {
      token = cookie.value;
      tokenName = cookie.name;
      break;
    }
  }
  
  let role = 'non connecté';
  let email = 'N/A';
  let tokenPresent = 'NON';
  let tokenPreview = 'N/A';
  
  if (token) {
    tokenPresent = 'OUI';
    tokenPreview = token.substring(0, 30) + '...';
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
      <h1> Debug Rôle Utilisateur</h1>
      <hr style={{ borderColor: '#333' }} />
      <p><strong>Nombre de cookies trouvés :</strong> {allCookies.length}</p>
      <p><strong>Token présent :</strong> {tokenPresent}</p>
      <p><strong>Nom du cookie :</strong> {tokenName}</p>
      <p><strong>Token (début) :</strong> {tokenPreview}</p>
      <p><strong>Email :</strong> {email}</p>
      <p><strong>Rôle actuel :</strong> <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{role}</span></p>
      <hr style={{ borderColor: '#333' }} />
      {role === 'admin' ? (
        <div style={{ background: '#004400', padding: '1rem', borderRadius: '8px' }}>
          <p>✅ Tu es ADMIN !</p>
          <a href="/admin/dashboard" style={{ color: '#00ff00', fontSize: '1.2rem' }}>→ Aller au dashboard admin</a>
        </div>
      ) : (
        <div style={{ background: '#440000', padding: '1rem', borderRadius: '8px' }}>
          <p>❌ Ton rôle n'est PAS admin.</p>
          <p>Rôle actuel : <strong>{role}</strong></p>
        </div>
      )}
      <hr style={{ borderColor: '#333', marginTop: '2rem' }} />
      <h3> Liste de tous les cookies :</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {allCookies.map((cookie: any) => (
          <li key={cookie.name} style={{ marginBottom: '0.5rem', padding: '0.5rem', background: '#2a2a2a', borderRadius: '4px' }}>
            <strong style={{ color: '#00ffff' }}>{cookie.name}</strong>
            <br />
            <span style={{ color: '#888' }}>Valeur : {cookie.value ? cookie.value.substring(0, 50) + '...' : 'N/A'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}