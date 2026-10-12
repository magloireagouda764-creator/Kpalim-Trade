import { Metadata } from 'next';
// Assure-toi que ces imports sont présents
import { verifyToken, getTokenFromCookie } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Tableau de bord Vendeur | Kpalimé-Trade',
};

export default async function VendorDashboard() {
  // ✅ CORRECTION : Appel sans argument et avec await
  const token = await getTokenFromCookie();
  
  // ✅ Vérification du jeton préservée
  const payload = token ? await verifyToken(token) : null;

  // ✅ Protection de la route préservée : on bloque si pas de payload ou si le rôle n'est pas vendor/admin
  if (!payload || (payload.role !== 'vendor' && payload.role !== 'admin')) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 font-semibold">Accès non autorisé.</p>
        <p className="text-sm text-gray-500 mt-2">Vous devez être connecté en tant que vendeur ou administrateur.</p>
      </div>
    );
  }

  // ==========================================================
  // CONSERVE TOUT LE CODE JSX ET LA LOGIQUE EXISTANTE CI-DESSOUS
  // ==========================================================
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord Vendeur</h1>
      <p>Bienvenue, {payload.name || payload.email} (Rôle: {payload.role})</p>
      
      {/* ... Le reste de ton code actuel du tableau de bord vendeur ... */}
    </div>
  );
}