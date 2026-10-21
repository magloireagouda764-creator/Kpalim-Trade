'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DebugRolePage() {
  const [tokenInfo, setTokenInfo] = useState({
    tokenPresent: 'NON',
    tokenSource: 'Aucun',
    tokenPreview: 'N/A',
    role: 'non connecté',
    email: 'N/A'
  });
  const router = useRouter();

  useEffect(() => {
    // Vérifier localStorage
    const localStorageToken = localStorage.getItem('token') || 
                              localStorage.getItem('kpalime_token') ||
                              localStorage.getItem('auth_token');
    
    // Vérifier sessionStorage
    const sessionStorageToken = sessionStorage.getItem('token') ||
                                sessionStorage.getItem('kpalime_token');

    let token = localStorageToken || sessionStorageToken;
    let tokenSource = 'Aucun';

    if (localStorageToken) {
      tokenSource = 'localStorage';
      token = localStorageToken;
    } else if (sessionStorageToken) {
      tokenSource = 'sessionStorage';
      token = sessionStorageToken;
    }

    if (token) {
      // Décoder le JWT (partie payload)
      try {
        const payloadBase64 = token.split('.')[1];
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);
        
        setTokenInfo({
          tokenPresent: 'OUI',
          tokenSource: tokenSource,
          tokenPreview: token.substring(0, 30) + '...',
          role: payload.role || 'inconnu',
          email: payload.email || 'N/A'
        });
      } catch (error) {
        setTokenInfo(prev => ({
          ...prev,
          tokenPresent: 'OUI (invalide)',
          tokenSource: tokenSource,
          tokenPreview: token.substring(0, 30) + '...'
        }));
      }
    }
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', background: '#1a1a1a', color: '#00ff00', minHeight: '100vh' }}>
      <h1>🔍 Debug Rôle Utilisateur</h1>
      <hr style={{ borderColor: '#333' }} />
      <p><strong>Token présent :</strong> {tokenInfo.tokenPresent}</p>
      <p><strong>Source du token :</strong> {tokenInfo.tokenSource}</p>
      <p><strong>Token (début) :</strong> {tokenInfo.tokenPreview}</p>
      <p><strong>Email :</strong> {tokenInfo.email}</p>
      <p><strong>Rôle actuel :</strong> <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{tokenInfo.role}</span></p>
      <hr style={{ borderColor: '#333' }} />
      {tokenInfo.role === 'admin' ? (
        <div style={{ background: '#004400', padding: '1rem', borderRadius: '8px' }}>
          <p>✅ Tu es ADMIN !</p>
          <button 
            onClick={() => router.push('/admin/dashboard')}
            style={{ background: '#00ff00', color: '#000', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}
          >
            → Aller au dashboard admin
          </button>
        </div>
      ) : (
        <div style={{ background: '#440000', padding: '1rem', borderRadius: '8px' }}>
          <p>❌ Ton rôle n'est PAS admin.</p>
          <p>Rôle actuel : <strong>{tokenInfo.role}</strong></p>
        </div>
      )}
      <hr style={{ borderColor: '#333', marginTop: '2rem' }} />
      <h3>🔧 Actions rapides</h3>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button 
          onClick={() => {
            const allLocalStorage = Object.keys(localStorage).map(key => `${key}: ${localStorage.getItem(key)?.substring(0, 50)}`).join('\n');
            alert('localStorage:\n' + allLocalStorage);
          }}
          style={{ background: '#333', color: '#fff', padding: '0.5rem 1rem', border: '1px solid #555', borderRadius: '4px', cursor: 'pointer' }}
        >
          Voir tout le localStorage
        </button>
        <button 
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
            alert('Stockage vidé ! Recharge la page.');
            window.location.reload();
          }}
          style={{ background: '#660000', color: '#fff', padding: '0.5rem 1rem', border: '1px solid #990000', borderRadius: '4px', cursor: 'pointer' }}
        >
          Vider tout le stockage
        </button>
      </div>
    </div>
  );
}