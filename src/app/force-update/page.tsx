'use client';

import { useState, useEffect } from 'react';

export default function ForceUpdatePage() {
  const [status, setStatus] = useState('⏳ Forçage de la mise à jour du mot de passe...');
  const [debug, setDebug] = useState<any>(null);

  useEffect(() => {
    async function forceUpdate() {
      try {
        setStatus(' Forçage de la mise à jour du mot de passe...');
        
        const res = await fetch('/api/force-update-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'magloireagouda764@gmail.com',
            newPassword: 'Admin123456!'
          }),
        });

        const data = await res.json();
        setDebug(data);

        if (data.success) {
          setStatus(`✅ Succès ! Mot de passe sauvegardé (longueur: ${data.user.passwordLength} chars). Redirection...`);
          
          // Attendre 2 secondes puis tenter la connexion
          setTimeout(async () => {
            setStatus('🔐 Tentative de connexion...');
            
            const loginRes = await fetch('/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: 'magloireagouda764@gmail.com',
                password: 'Admin123456!'
              }),
            });

            const loginData = await loginRes.json();

            if (loginRes.ok) {
              setStatus('✅ Connexion réussie ! Redirection vers /admin/dashboard...');
              setTimeout(() => {
                window.location.href = '/admin/dashboard';
              }, 1500);
            } else {
              setStatus(`❌ Échec connexion: ${loginData.error}`);
            }
          }, 2000);
        } else {
          setStatus(`❌ Échec: ${data.error}`);
        }
      } catch (err: any) {
        setStatus(`❌ Erreur: ${err.message}`);
      }
    }

    forceUpdate();
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#0a0a0a',
      padding: '1rem',
      fontFamily: 'monospace'
    }}>
      <div style={{ 
        background: '#1a1a1a', 
        padding: '2rem', 
        borderRadius: '8px',
        border: '1px solid #333',
        maxWidth: '600px',
        width: '100%'
      }}>
        <h1 style={{ 
          color: '#00ff00', 
          marginBottom: '1.5rem',
          textAlign: 'center',
          fontSize: '1.5rem'
        }}>
          Forçage Mise à Jour Mot de Passe
        </h1>

        <div style={{ 
          background: '#1a1a1a',
          border: '1px solid #444',
          padding: '1.5rem', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <p style={{ color: '#00ff00', fontSize: '1.1rem', margin: 0 }}>
            {status}
          </p>
        </div>

        {debug && (
          <div style={{ 
            background: '#0a0a0a',
            border: '1px solid #333',
            padding: '1rem', 
            borderRadius: '4px',
            fontSize: '0.9rem'
          }}>
            <p style={{ color: '#888', marginBottom: '0.5rem' }}>Debug info:</p>
            <pre style={{ color: '#00ffff', margin: 0, overflow: 'auto' }}>
              {JSON.stringify(debug, null, 2)}
            </pre>
          </div>
        )}

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <a 
            href="/auth/login" 
            style={{ color: '#888', fontSize: '0.9rem' }}
          >
            ← Aller à la page de connexion
          </a>
        </div>
      </div>
    </div>
  );
}