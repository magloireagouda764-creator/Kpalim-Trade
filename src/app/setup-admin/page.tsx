'use client';

import { useState, useEffect } from 'react';

export default function SetupAdminPage() {
  const [status, setStatus] = useState('⏳ Initialisation...');
  const [step, setStep] = useState(0);

  useEffect(() => {
    async function setup() {
      try {
        // Étape 1 : Réinitialiser le mot de passe
        setStep(1);
        setStatus('🔑 Étape 1/3 : Réinitialisation du mot de passe...');
        
        const resetRes = await fetch('/api/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'magloireagouda764@gmail.com',
            newPassword: 'Admin123456!'
          }),
        });

        const resetData = await resetRes.json();
        
        if (!resetRes.ok) {
          setStatus(`❌ Échec étape 1: ${resetData.error}`);
          return;
        }

        // Étape 2 : Se connecter
        setStep(2);
        setStatus('🔐 Étape 2/3 : Connexion en tant qu\'admin...');
        
        const loginRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'magloireagouda764@gmail.com',
            password: 'Admin123456!'
          }),
        });

        const loginData = await loginRes.json();
        
        if (!loginRes.ok) {
          setStatus(`❌ Échec étape 2: ${loginData.error}`);
          return;
        }

        // Étape 3 : Redirection
        setStep(3);
        setStatus('✅ Étape 3/3 : Redirection vers le dashboard admin...');
        
        setTimeout(() => {
          window.location.href = '/admin/dashboard';
        }, 1500);

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
        border: '1px solid #333',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h1 style={{ 
          color: '#00ff00', 
          marginBottom: '1.5rem',
          textAlign: 'center',
          fontSize: '1.5rem'
        }}>
          Configuration Admin Automatique
        </h1>

        <div style={{ 
          background: step === 3 ? '#004400' : '#1a1a1a',
          border: `1px solid ${step === 3 ? '#00ff00' : '#444'}`,
          padding: '1.5rem', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <p style={{ color: '#00ff00', fontSize: '1.1rem', margin: 0 }}>
            {status}
          </p>
        </div>

        <div style={{ color: '#888', fontSize: '0.9rem' }}>
          <p>📧 Email: magloireagouda764@gmail.com</p>
          <p>🔑 Nouveau mot de passe: Admin123456!</p>
          <p>⚠️ Ne ferme pas cette page pendant la configuration</p>
        </div>

        {step === 3 && (
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <a 
              href="/admin/dashboard" 
              style={{ color: '#00ff00', textDecoration: 'underline' }}
            >
              → Aller manuellement au dashboard admin
            </a>
          </div>
        )}
      </div>
    </div>
  );
}