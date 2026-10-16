import Link from 'next/link';
import { Building2, Plus, Eye, Edit2, Trash2, Filter } from 'lucide-react';
import mongoose from 'mongoose';
import { Accommodation } from '@/models/Accommodation';
import StatusBadge from '@/components/ui/StatusBadge';

export const metadata = {
  title: 'Mes établissements | Kpalimé-Trade',
  description: 'Gérez vos hôtels et hébergements',
};

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) throw new Error('MONGODB_URI non défini');
  await mongoose.connect(MONGODB_URI);
}

export default async function DashboardAccommodationsPage() {
  await connectDB();

  // TODO: Récupérer l'ID du propriétaire depuis le token
  const ownerId = '674f3b8e9c8d4e001f8b4567';

  // Récupérer tous les établissements du propriétaire
  const accommodations = await Accommodation.find({ ownerId: new mongoose.Types.ObjectId(ownerId) })
    .sort({ createdAt: -1 })
    .lean();

  // Calculer les statistiques
  const stats = {
    total: accommodations.length,
    draft: accommodations.filter(a => a.status === 'draft').length,
    pending: accommodations.filter(a => a.status === 'pending').length,
    approved: accommodations.filter(a => a.status === 'approved').length,
    rejected: accommodations.filter(a => a.status === 'rejected').length,
    needs_correction: accommodations.filter(a => a.status === 'needs_correction').length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Mes établissements</h1>
          <p className="text-muted text-sm">Gérez vos hôtels et hébergements</p>
        </div>
        
        <Link 
          href="/dashboard/accommodations/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-all"
        >
          <Plus size={18} />
          Ajouter un établissement
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

      {/* Liste des établissements */}
      {accommodations.length === 0 ? (
        <div className="text-center py-16 rounded-lg border border-white/10 bg-night-light">
          <Building2 size={48} className="text-muted mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Aucun établissement pour le moment</h3>
          <p className="text-muted mb-6 max-w-md mx-auto">
            Créez votre premier hôtel ou hébergement pour commencer à apparaître sur Kpalimé-Trade.
          </p>
          <Link 
            href="/dashboard/accommodations/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-all"
          >
            <Plus size={18} />
            Créer mon premier établissement
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {accommodations.map((hotel: any) => (
            <div key={hotel._id} className="rounded-lg border border-white/10 bg-night-light p-6 hover:border-white/20 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white">{hotel.name}</h3>
                    <StatusBadge status={hotel.status} />
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted">
                    <span>{hotel.type === 'hotel' ? 'Hôtel' : 'Hébergement'}</span>
                    <span>•</span>
                    <span>{hotel.city}, {hotel.region}</span>
                    <span>•</span>
                    <span>{hotel.roomsCount} chambres</span>
                    <span>•</span>
                    <span>Créé le {new Date(hotel.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/discover/regions/${hotel.region.toLowerCase()}/hotels/${hotel.slug}`}
                    className="p-2 rounded-md bg-white/5 hover:bg-white/10 text-white transition-colors"
                    title="Voir la fiche publique"
                  >
                    <Eye size={18} />
                  </Link>
                  {(hotel.status === 'draft' || hotel.status === 'needs_correction') && (
                    <Link
                      href={`/dashboard/accommodations/${hotel._id}/edit`}
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

// Composant pour les cartes de statistiques
function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className={`rounded-lg border p-4 ${color}`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs opacity-80">{label}</div>
    </div>
  );
}