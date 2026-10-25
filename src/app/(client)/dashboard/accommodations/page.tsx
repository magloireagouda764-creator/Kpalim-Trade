import Link from 'next/link';
import { Building2, Plus, Edit, Eye, AlertCircle, CheckCircle2 } from 'lucide-react';
import mongoose from 'mongoose';
import { Accommodation } from '@/models/Accommodation';
import { getTokenFromCookie, verifyToken } from '@/lib/auth';

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
  let accommodations: any[] = [];
  let error: string | null = null;

  try {
    await connectDB();

    // ✅ SÉCURITÉ : Récupération du vrai utilisateur connecté
    const token = await getTokenFromCookie();
    const payload = token ? await verifyToken(token) : null;

    if (!payload) {
      error = 'Vous devez être connecté pour voir vos établissements.';
    } else {
      // ✅ SÉCURITÉ : Filtrage strict par l'ID du propriétaire connecté
      accommodations = await Accommodation.find({ ownerId: new mongoose.Types.ObjectId(payload.userId) })
        .select('-documents') 
        .sort({ createdAt: -1 })
        .lean();
    }
  } catch (err: any) {
    console.error('Erreur chargement établissements:', err);
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
          <Plus size={18} /> Ajouter un établissement
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-md bg-red-500/10 border border-red-500/30 text-red-300">{error}</div>
      )}

      {accommodations.length === 0 && !error && (
        <div className="text-center py-16 rounded-md border border-white/10 bg-night-light">
          <Building2 size={48} className="text-muted mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Aucun établissement pour le moment</h3>
          <p className="text-muted mb-6 max-w-md mx-auto">Créez votre premier hôtel ou hébergement pour commencer à apparaître sur Kpalimé-Trade.</p>
          <Link href="/dashboard/accommodations/new" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-all">
            <Plus size={18} /> Créer mon premier établissement
          </Link>
        </div>
      )}

      {accommodations.length > 0 && (
        <div className="space-y-4">
          {accommodations.map((hotel: any) => {
            const canEdit = hotel.status === 'draft' || hotel.status === 'rejected' || hotel.status === 'needs_correction';
            
            return (
              <div key={hotel._id} className="rounded-md border border-white/10 bg-night-light p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-lg font-bold text-white">{hotel.name}</h3>
                      {getStatusBadge(hotel.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted mb-3">
                      <span>{hotel.type === 'hotel' ? 'Hôtel' : 'Hébergement'}</span>
                      <span>•</span>
                      <span>{hotel.city}, {hotel.region}</span>
                      <span>•</span>
                      <span>Créé le {new Date(hotel.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>

                    {/* Affichage des motifs de l'administrateur */}
                    {hotel.status === 'rejected' && hotel.rejectionReason && (
                      <div className="mt-3 p-3 rounded-md bg-red-500/10 border border-red-500/30 flex gap-3">
                        <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="text-sm font-semibold text-red-300 mb-1">Motif du refus :</p>
                          <p className="text-sm text-red-200/80">{hotel.rejectionReason}</p>
                        </div>
                      </div>
                    )}
                    {hotel.status === 'needs_correction' && hotel.correctionRequest && (
                      <div className="mt-3 p-3 rounded-md bg-orange-500/10 border border-orange-500/30 flex gap-3">
                        <AlertCircle className="text-orange-400 shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="text-sm font-semibold text-orange-300 mb-1">Corrections demandées :</p>
                          <p className="text-sm text-orange-200/80">{hotel.correctionRequest}</p>
                        </div>
                      </div>
                    )}
                    {hotel.status === 'approved' && (
                      <div className="mt-3 p-3 rounded-md bg-emerald-brand/10 border border-emerald-brand/30 flex gap-3">
                        <CheckCircle2 className="text-emerald-brand shrink-0 mt-0.5" size={18} />
                        <p className="text-sm text-emerald-300">Votre établissement est visible publiquement.</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {hotel.status === 'approved' && (
                      <Link href={`/discover/regions/maritime/hotels/${hotel.slug}`} className="p-2 rounded-md bg-white/5 hover:bg-white/10 text-white transition-colors" title="Voir la fiche publique">
                        <Eye size={18} />
                      </Link>
                    )}
                    {canEdit ? (
                      <Link href={`/dashboard/accommodations/${hotel._id}/edit`} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 transition-colors text-sm font-medium">
                        <Edit size={16} /> Modifier
                      </Link>
                    ) : (
                      <button disabled className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-700/50 text-gray-500 cursor-not-allowed text-sm font-medium" title="Impossible de modifier une fiche en cours de validation ou approuvée">
                        <Edit size={16} /> {hotel.status === 'pending' ? 'En cours de validation' : 'Fiche active'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}