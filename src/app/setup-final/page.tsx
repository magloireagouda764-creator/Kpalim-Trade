'use client';

import { useState, useEffect } from 'react';

export default function SetupFinalPage() {
  const [status, setStatus] = useState('⏳ Configuration en cours...');
  const [debug, setDebug] = useState<any>(null);

  useEffect(() => {
    async function setup() {
      try {
        // Étape 1 : Mettre à jour le mot de passe dans MongoDB
        setStatus('🔑 Étape 1/3 : Mise à jour du mot de passe...');
        
        const resetRes = await fetch('/api/force-update-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'magloireagouda764@gmail.com',
            newPassword: 'Admin2026!'
          }),
        });

        const resetData = await resetRes.json();
        
        // ✅ CORRECTION : On met à jour debug directement sans fonction fléchée
        setDebug({ reset: resetData });

        if (!resetRes.ok) {
          setStatus(`❌ Échec étape 1: ${resetData.error}`);
          return;
        }

        // Étape 2 : Tester la connexion avec le nouveau mot de passe
        setStatus('🔐 Étape 2/3 : Test de connexion...');
        
        const loginRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'magloireagouda764@gmail.com',
            password: 'Admin2026!'
          }),
        });

        const loginData = await loginRes.json();
        
        // ✅ CORRECTION : On met à jour l'objet complet directement
        setDebug({ reset: resetData, login: loginData });

        if (!loginRes.ok) {
          setStatus(`❌ Échec étape 2: ${loginData.error}`);
          return;
        }

        // Étape 3 : Succès !
        setStatus('✅ Configuration terminée ! Redirection...');
        
        setTimeout(() => {
          window.location.href = '/admin/dashboard';
        }, 2000);

      } catch (err: any) {
        setStatus(`❌ Erreur: ${err.message}`);
      }
    }

    setup();
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
        border: '1px solid #00ff00',
        maxWidth: '600px',
        width: '100%'
      }}>
        <h1 style={{ 
          color: '#00ff00', 
          marginBottom: '1.5rem',
          textAlign: 'center',
          fontSize: '1.5rem'
        }}>
          ⚙️ Configuration Finale
        </h1>

        <div style={{ 
          background: '#1a1a1a',
          border: '1px solid #444',
          padding: '1.5rem', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <p style={{ color: '#00ff00', fontSize: '1.1rem', margin: 0, textAlign: 'center' }}>
            {status}
          </p>
        </div>

        {debug && (
          <div style={{ 
            background: '#0a0a0a',
            border: '1px solid #333',
            padding: '1rem', 
            borderRadius: '4px',
            fontSize: '0.85rem'
          }}>
            <p style={{ color: '#888', marginBottom: '0.5rem' }}>📊 Détails :</p>
            <pre style={{ color: '#00ffff', margin: 0, overflow: 'auto', whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(debug, null, 2)}
            </pre>
          </div>
        )}

        <div style={{ marginTop: '1rem', padding: '1rem', background: '#004400', borderRadius: '4px' }}>
          <p style={{ color: '#00ff00', margin: 0, fontSize: '0.9rem' }}>
            <strong>📝 Nouveaux identifiants :</strong><br/>
            Email : magloireagouda764@gmail.com<br/>
            Mot de passe : Admin2026!<br/>
            Code admin : 20262026
          </p>
        </div>
      </div>
    </div>
  );
}