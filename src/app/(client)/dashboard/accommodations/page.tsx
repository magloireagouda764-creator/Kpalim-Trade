import Link from 'next/link';
import { Building2, Plus, Edit, Eye } from 'lucide-react';
import mongoose from 'mongoose';

export const metadata = {
  title: 'Mes établissements | Kpalimé-Trade',
  description: 'Gérez vos hôtels et hébergements',
};

// Import dynamique du modèle pour éviter les erreurs
async function getAccommodationModel() {
  const { Accommodation } = await import('@/models/Accommodation');
  return Accommodation;
}

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) throw new Error('MONGODB_URI non défini dans les variables d\'environnement');
  await mongoose.connect(MONGODB_URI);
}

export default async function DashboardAccommodationsPage() {
  let accommodations: any[] = [];
  let debugInfo = '';
  let error: string | null = null;

  try {
    await connectDB();
    debugInfo += '✅ Connexion MongoDB OK. ';

    const Accommodation = await getAccommodationModel();
    debugInfo += '✅ Modèle Accommodation chargé. ';

    // Compter tous les établissements en base
    const totalCount = await Accommodation.countDocuments({});
    debugInfo += ` Total en base : ${totalCount} établissement(s). `;

    // Récupérer TOUS les établissements (sans filtre) pour le DEBUG
    accommodations = await Accommodation.find({})
      .select('-documents')
      .sort({ createdAt: -1 })
      .lean();
    
    debugInfo += `✅ ${accommodations.length} établissement(s) récupéré(s). `;

  } catch (err: any) {
    console.error('Erreur détaillée:', err);
    error = `Erreur : ${err.message || 'Inconnue'}`;
    debugInfo += `❌ Erreur : ${err.message}`;
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
      {/* Bloc DEBUG - à supprimer après test */}
      <div className="mb-6 p-4 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-200 text-sm font-mono">
        <strong className="text-blue-300">🔍 DEBUG :</strong> {debugInfo}
      </div>

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
                    <span>Owner: {hotel.ownerName || 'N/A'}</span>
                    <span>•</span>
                    <span>Créé le {new Date(hotel.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                  
                  <div className="mt-2 text-xs text-muted font-mono">
                    ID: {hotel._id.toString()}
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