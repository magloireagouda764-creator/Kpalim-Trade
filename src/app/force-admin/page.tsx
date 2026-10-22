'use client';

import { useEffect, useState } from 'react';

export default function ForceAdminPage() {
  const [status, setStatus] = useState('⏳ Régénération du token en cours...');
  const [error, setError] = useState('');

  useEffect(() => {
    async function forceAdmin() {
      try {
        // Appeler l'API refresh-token pour régénérer le token avec le rôle à jour
        const res = await fetch('/api/refresh-token');
        const data = await res.json();

        if (data.success) {
          setStatus(`✅ Token régénéré ! Rôle : ${data.user.role}. Redirection...`);
          // Attendre 1 seconde puis rediriger
          setTimeout(() => {
            window.location.href = '/admin/dashboard';
          }, 1000);
        } else {
          setError(data.error || 'Erreur inconnue');
          setStatus('❌ Échec');
        }
      } catch (err) {
        setError('Erreur réseau. Es-tu connecté ?');
        setStatus('❌ Erreur');
      }
    }

    forceAdmin();
  }, []);

  return (
    <div style={{ 
      padding: '3rem', 
      fontFamily: 'monospace', 
      background: '#0a0a0a', 
      color: '#00ff00', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔧 Réparation du token admin</h1>
      <div style={{ 
        background: '#1a1a1a', 
        padding: '2rem', 
        borderRadius: '8px',
        border: '1px solid #333',
        maxWidth: '600px'
      }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{status}</p>
        {error && (
          <div style={{ background: '#440000', padding: '1rem', borderRadius: '4px', marginTop: '1rem' }}>
            <p>❌ {error}</p>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Assure-toi d'être connecté sur le site avant d'utiliser cette page.
            </p>
            <a 
              href="/auth/login" 
              style={{ color: '#00ff00', textDecoration: 'underline' }}
            >
              → Aller à la page de connexion
            </a>
          </div>
        )}
      </div>
    </div>
  );
}