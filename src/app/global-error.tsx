'use client';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, padding: '2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', paddingTop: '4rem' }}>
          <p style={{ fontSize: '4rem' }}>🚨</p>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Erreur critique</h1>
          <p style={{ color: '#666', margin: '1rem 0' }}>
            Une erreur inattendue s'est produite. Veuillez recharger la page.
          </p>
          <button
            onClick={reset}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#2D5A27',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 500,
            }}
          >
            Recharger
          </button>
        </div>
      </body>
    </html>
  );
}
