import Link from 'next/link';
import { Utensils, Plus, Eye, Edit2 } from 'lucide-react';
import mongoose from 'mongoose';
import { Restaurant } from '@/models/Restaurant';
import StatusBadge from '@/components/ui/StatusBadge';

export const metadata = {
  title: 'Mes restaurants | Kpalimé-Trade',
  description: 'Gérez vos restaurants et établissements culinaires',
};

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) throw new Error('MONGODB_URI non défini');
  await mongoose.connect(MONGODB_URI);
}

export default async function DashboardRestaurantsPage() {
  await connectDB();

  // TODO: Récupérer l'ID du propriétaire depuis le token
  const ownerId = '674f3b8e9c8d4e001f8b4567';

  const restaurants = await Restaurant.find({ ownerId: new mongoose.Types.ObjectId(ownerId) })
    .sort({ createdAt: -1 })
    .lean();

  const stats = {
    total: restaurants.length,
    draft: restaurants.filter(r => r.status === 'draft').length,
    pending: restaurants.filter(r => r.status === 'pending').length,
    approved: restaurants.filter(r => r.status === 'approved').length,
    rejected: restaurants.filter(r => r.status === 'rejected').length,
    needs_correction: restaurants.filter(r => r.status === 'needs_correction').length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Mes restaurants</h1>
          <p className="text-muted text-sm">Gérez vos restaurants et établissements culinaires</p>
        </div>
        
        <Link 
          href="/dashboard/restaurants/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-orange-brand text-white font-semibold hover:bg-orange-600 transition-all"
        >
          <Plus size={18} />
          Ajouter un restaurant
        </Link>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <StatCard label="Total" value={stats.total} color="bg-blue-500/20 text-blue-300 border-blue-500/30" />
        <StatCard label="Brouillons" value={stats.draft} color="bg-gray-500/20 text-gray-300 border-gray-500/30" />
        <StatCard label="En attente" value={stats.pending} color="bg-yellow-500/20 text-yellow-300 border-yellow-500/30" />
        <StatCard label="Approuvés" value={stats.approved} color="bg-emerald-500/20 text-emerald-300 border-emerald-500/30" />
        <StatCard label="Refusés" value={stats.rejected} color="bg-red-500/20 text-red-300 border-red-500/30" />
        <StatCard label="À corriger" value={stats.needs_correction} color="bg-orange-500/20 text-orange-300 border-orange-500/30" />
      </div>

      {/* Liste des restaurants */}
      {restaurants.length === 0 ? (
        <div className="text-center py-16 rounded-lg border border-white/10 bg-night-light">
          <Utensils size={48} className="text-muted mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Aucun restaurant pour le moment</h3>
          <p className="text-muted mb-6 max-w-md mx-auto">
            Créez votre premier restaurant pour commencer à apparaître sur Kpalimé-Trade.
          </p>
          <Link 
            href="/dashboard/restaurants/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-orange-brand text-white font-semibold hover:bg-orange-600 transition-all"
          >
            <Plus size={18} />
            Créer mon premier restaurant
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {restaurants.map((restaurant: any) => (
            <div key={restaurant._id} className="rounded-lg border border-white/10 bg-night-light p-6 hover:border-white/20 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white">{restaurant.name}</h3>
                    <StatusBadge status={restaurant.status} />
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted flex-wrap">
                    <span>{restaurant.type === 'restaurant' ? 'Restaurant' : restaurant.type}</span>
                    <span>•</span>
                    <span>{restaurant.city}, {restaurant.region}</span>
                    <span>•</span>
                    <span>{restaurant.cuisines?.slice(0, 2).join(', ')}</span>
                    <span>•</span>
                    <span>Créé le {new Date(restaurant.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/discover/regions/${restaurant.region.toLowerCase()}/restaurants/${restaurant.slug}`}
                    className="p-2 rounded-md bg-white/5 hover:bg-white/10 text-white transition-colors"
                    title="Voir la fiche publique"
                  >
                    <Eye size={18} />
                  </Link>
                  {(restaurant.status === 'draft' || restaurant.status === 'needs_correction') && (
                    <Link
                      href={`/dashboard/restaurants/${restaurant._id}/edit`}
                      className="p-2 rounded-md bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 transition-colors"
                      title="Modifier"
                    >
                      <Edit2 size={18} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className={`rounded-lg border p-4 ${color}`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs opacity-80">{label}</div>
    </div>
  );
}