'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirection automatique vers la page admin-login
    router.push('/admin-login');
  }, [router]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#0a0a0a'
    }}>
      <p style={{ color: '#00ff00', fontSize: '1.2rem' }}>
        🔁 Redirection vers la page de connexion sécurisée...
      </p>
    </div>
  );
}