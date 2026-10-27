'use client';

import { adminLoginAction } from '@/actions/adminLogin';
import { useState } from 'react';

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    const formData = new FormData(e.currentTarget);

    try {
      await adminLoginAction(null, formData);
      // Si on arrive ici sans erreur NEXT_REDIRECT, c'est un problème
      setError('Erreur inattendue');
      setIsPending(false);
    } catch (err: any) {
      // Next.js lance NEXT_REDIRECT pour la redirection - c'est NORMAL
      if (err.message === 'NEXT_REDIRECT') {
        return; // La redirection se fait automatiquement
      }
      
      // Autres erreurs (code incorrect, etc.)
      setError(err.message || 'Code incorrect');
      setIsPending(false);
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
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#00ff00', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
          🔑 Accès Admin Rapide
        </h1>
        <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Code actuel : <strong style={{ color: '#00ff00' }}>48574857</strong>
        </p>

        {error && (
          <div style={{ background: '#440000', color: '#ff6666', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>
             {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="code"
            required
            maxLength={8}
            style={{ 
              width: '100%', padding: '1rem', background: '#2a2a2a', border: '2px solid #444',
              borderRadius: '4px', color: '#00ff00', fontSize: '1.5rem', textAlign: 'center',
              letterSpacing: '0.5rem', marginBottom: '1.5rem', outline: 'none', boxSizing: 'border-box'
            }}
            placeholder="00000000"
          />

          <button
            type="submit"
            disabled={isPending}
            style={{ 
              width: '100%', padding: '1rem', 
              background: isPending ? '#333' : '#00ff00',
              color: isPending ? '#666' : '#000', 
              border: 'none', borderRadius: '4px',
              fontSize: '1.1rem', fontWeight: 'bold', 
              cursor: isPending ? 'not-allowed' : 'pointer'
            }}
          >
            {isPending ? 'Connexion...' : 'Accéder au Dashboard'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem' }}>
          <a href="/" style={{ color: '#888', fontSize: '0.9rem' }}>← Retour à l'accueil</a>
        </div>
      </div>
    </div>
  );
}