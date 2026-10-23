import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';

// ✅ Ajout de 'async' ici
export default async function AdminDashboardPage() {
  // ✅ Ajout de 'await' ici pour Next.js 15
  const cookieStore = await cookies();
  const token = cookieStore.get('_vercel_jwt')?.value;
  
  if (!token) {
    redirect('/admin-login');
  }

  const payload = verifyToken(token);
  
  if (!payload || payload.role !== 'admin') {
    redirect('/admin-login');
  }

  // Si on arrive ici, l'utilisateur est admin → afficher le dashboard
  return (
    <div style={{ padding: '2rem', background: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
      <h1 style={{ color: '#00ff00', fontSize: '2rem', marginBottom: '2rem' }}>
        🎉 Tableau de Bord Administrateur
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', border: '1px solid #333' }}>
          <h2 style={{ color: '#00ff00', marginBottom: '1rem' }}>📊 Vue Générale</h2>
          <p>Statistiques et aperçu global</p>
        </div>

        <div style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', border: '1px solid #333' }}>
          <h2 style={{ color: '#00ff00', marginBottom: '1rem' }}>✈️ Tourisme</h2>
          <p>Gestion des établissements touristiques</p>
        </div>

        <div style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', border: '1px solid #333' }}>
          <h2 style={{ color: '#00ff00', marginBottom: '1rem' }}>🛒 Marketplace</h2>
          <p>Gestion des produits et ventes</p>
        </div>

        <div style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', border: '1px solid #333' }}>
          <h2 style={{ color: '#00ff00', marginBottom: '1rem' }}>🏢 Entreprises</h2>
          <p>Gestion des entreprises partenaires</p>
        </div>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#004400', borderRadius: '4px' }}>
        <p style={{ color: '#00ff00', margin: 0 }}>
          ✅ Connecté en tant que : <strong>{payload.name}</strong> ({payload.email})
        </p>
      </div>
    </div>
  );
}