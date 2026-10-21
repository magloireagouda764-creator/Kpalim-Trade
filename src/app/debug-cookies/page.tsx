import { cookies } from 'next/headers';

export default async function DebugCookiesPage() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  
  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', background: '#1a1a1a', color: '#00ff00', minHeight: '100vh' }}>
      <h1> Tous les cookies</h1>
      <hr style={{ borderColor: '#333', margin: '1rem 0' }} />
      <p style={{ color: '#ffff00' }}>Nombre de cookies : {allCookies.length}</p>
      <hr style={{ borderColor: '#333', margin: '1rem 0' }} />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {allCookies.map((cookie: any) => (
          <li key={cookie.name} style={{ marginBottom: '0.5rem', padding: '0.5rem', background: '#2a2a2a', borderRadius: '4px' }}>
            <strong style={{ color: '#00ffff' }}>{cookie.name}</strong>
            <br />
            <span style={{ color: '#888' }}>Valeur : {cookie.value ? cookie.value.substring(0, 50) + '...' : 'N/A'}</span>
          </li>
        ))}
      </ul>
      <hr style={{ borderColor: '#333', margin: '1rem 0' }} />
      <p style={{ color: '#ffff00' }}>🔍 Cherche un cookie nommé :</p>
      <ul>
        <li>kpalime_token</li>
        <li>token</li>
        <li>auth-token</li>
        <li>next-auth.session-token</li>
      </ul>
    </div>
  );
}