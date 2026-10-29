'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AccommodationsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger vers le dashboard principal
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="text-center">
        <p className="text-gray-400 mb-4">Redirection vers le tableau de bord...</p>
      </div>
    </div>
  );
}