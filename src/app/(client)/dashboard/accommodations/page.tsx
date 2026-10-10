import Link from 'next/link';
import { Building2, Plus, Edit, Trash2, Eye, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export const metadata = {
  title: 'Mes établissements | Kpalimé-Trade',
  description: 'Gérez vos hôtels et hébergements',
};

export default async function DashboardAccommodationsPage() {
  let accommodations: any[] = [];
  let error: string | null = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kpalim-trade.vercel.app';
    const res = await fetch(`${baseUrl}/api/accommodations/owner`, {
      cache: 'no-store',
    });
    
    const data = await res.json();
    if (data.success) {
      accommodations = data.data || [];
    } else {
      error = data.error;
    }
  } catch (err) {
    error = 'Impossible de charger vos établissements.';
  }

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { color: string; label: string }> = {
      draft: { color: 'bg-gray-500/20 text-gray-300', label: 'Brouillon' },
      pending: { color: 'bg-yellow-500/20 text-yellow-300', label: 'En attente' },
      approved: { color: 'bg-emerald-brand/20 text-emerald-brand', label: 'Approuvé' },
      rejected: { color: 'bg-red-500/20 text-red-300', label: 'Refusé' },
      needs_correction: { color: 'bg-orange-500/20 text-orange-300', label: 'À corriger' },
      suspended: { color: 'bg-purple-500/20 text-purple-300', label: 'Suspendu' },
    };
    
    const badge = badges[status] || badges.draft;
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Mes établissements</h1>
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

      {error && (
        <div className="mb-6 p-4 rounded-md bg-red-500/10 border border-red-500/30 text-red-300">
          {error}
        </div>
      )}

      {accommodations.length === 0 && !error && (
        <div className="text-center py-16 rounded-md border border-white/10 bg-night-light">
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
      )}

      {accommodations.length > 0 && (
        <div className="space-y-4">
          {accommodations.map((hotel: any) => (
            <div key={hotel._id} className="rounded-md border border-white/10 bg-night-light p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white">{hotel.name}</h3>
                    {getStatusBadge(hotel.status)}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted">
                    <span>{hotel.type === 'hotel' ? 'Hôtel' : 'Hébergement'}</span>
                    <span>•</span>
                    <span>{hotel.city}</span>
                    <span>•</span>
                    <span>Créé le {new Date(hotel.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/discover/regions/maritime/hotels/${hotel.slug}`}
                    className="p-2 rounded-md bg-white/5 hover:bg-white/10 text-white transition-colors"
                    title="Voir"
                  >
                    <Eye size={18} />
                  </Link>
                  <Link
                    href={`/dashboard/accommodations/${hotel._id}/edit`}
                    className="p-2 rounded-md bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 transition-colors"
                    title="Modifier"
                  >
                    <Edit size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}