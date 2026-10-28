export default function AdminDashboardPage() {
  // 🚨 TEMPORAIRE : AUCUNE VÉRIFICATION DE TOKEN NI DE REDIRECTION
  
  return (
    <div style={{ padding: '2rem', background: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
      <h1 style={{ color: '#00ff00', fontSize: '2rem', marginBottom: '2rem' }}>
        🎉 Tableau de Bord Administrateur (MODE DÉBOGAGE)
      </h1>
      
      <div style={{ background: '#004400', padding: '1rem', borderRadius: '4px', marginBottom: '2rem' }}>
        <p style={{ color: '#fff', margin: 0 }}>
          ✅ Si tu vois ce message, c'est que la boucle de redirection est ENFIN cassée !
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', border: '1px solid #333' }}>
          <h2 style={{ color: '#00ff00', marginBottom: '1rem' }}>📊 Vue Générale</h2>
          <p>Statistiques et aperçu global</p>
        </div>

        <div style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', border: '1px solid #333' }}>
          <h2 style={{ color: '#00ff00', marginBottom: '1rem' }}>✈️ Tourisme</h2>
          <p>Gestion des établissements touristiques</p>
        </div>
      </div>
    </div>
  );
}