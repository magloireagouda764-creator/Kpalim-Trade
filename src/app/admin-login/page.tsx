'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Code incorrect');
        setLoading(false);
        return;
      }

      // Succès ! Redirection vers le dashboard admin
      router.push('/admin/dashboard');
    } catch (err) {
      setError('Erreur réseau. Réessaie.');
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#0a0a0a',
      padding: '1rem'
    }}>
      <div style={{ 
        background: '#1a1a1a', 
        padding: '2rem', 
        borderRadius: '8px',
        border: '1px solid #00ff00',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          color: '#00ff00', 
          marginBottom: '0.5rem',
          fontSize: '1.5rem'
        }}>
          🔑 Accès Admin Rapide
        </h1>
        <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Entre le code à 8 chiffres pour accéder directement au tableau de bord.
        </p>

        {error && (
          <div style={{ 
            background: '#440000', 
            color: '#ff6666', 
            padding: '0.75rem', 
            borderRadius: '4px',
            marginBottom: '1rem',
            fontSize: '0.9rem'
          }}>
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 8))}
            required
            maxLength={8}
            style={{ 
              width: '100%', 
              padding: '1rem', 
              background: '#2a2a2a',
              border: '2px solid #444',
              borderRadius: '4px',
              color: '#00ff00',
              fontSize: '1.5rem',
              textAlign: 'center',
              letterSpacing: '0.5rem',
              marginBottom: '1.5rem',
              outline: 'none'
            }}
            placeholder="00000000"
          />

          <button
            type="submit"
            disabled={loading || code.length !== 8}
            style={{ 
              width: '100%', 
              padding: '1rem', 
              background: code.length === 8 ? '#00ff00' : '#333',
              color: code.length === 8 ? '#000' : '#666',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: code.length === 8 ? 'pointer' : 'not-allowed'
            }}
          >
            {loading ? 'Connexion...' : 'Accéder au Dashboard'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem' }}>
          <a href="/" style={{ color: '#888', fontSize: '0.9rem' }}>
            ← Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}