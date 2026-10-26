'use client';

import { useActionState } from 'react';
import { adminLoginAction } from '@/actions/adminLogin';

export default function AdminLoginPage() {
  // useActionState gère l'état, l'action et le statut de chargement
  const [state, formAction, isPending] = useActionState(adminLoginAction, null);

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

        {/* Affichage de l'erreur si elle existe */}
        {state?.error && (
          <div style={{ background: '#440000', color: '#ff6666', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>
            ❌ {state.error}
          </div>
        )}

        {/* Formulaire HTML natif lié à la Server Action */}
        <form action={formAction}>
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