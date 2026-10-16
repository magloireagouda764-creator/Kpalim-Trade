import Link from 'next/link';
import { Utensils, Eye, CheckCircle, Search } from 'lucide-react';
import mongoose from 'mongoose';
import { Restaurant } from '@/models/Restaurant';
import StatusBadge from '@/components/ui/StatusBadge';

export const metadata = {
  title: 'Administration Restaurants | Kpalimé-Trade',
  description: 'Gérer et valider les restaurants',
};

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) throw new Error('MONGODB_URI non défini');
  await mongoose.connect(MONGODB_URI);
}

export default async function AdminRestaurantsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; region?: string; search?: string }>;
}) {
  await connectDB();
  
  // Next.js 15 : on doit attendre searchParams
  const resolvedSearchParams = await searchParams;

  // Construire la requête avec filtres
  const query: any = {};
  
  if (resolvedSearchParams.status) {
    query.status = resolvedSearchParams.status;
  } else {
    query.status = 'pending';
  }

  if (resolvedSearchParams.region) {
    query.region = resolvedSearchParams.region;
  }

  if (resolvedSearchParams.search) {
    query.$text = { $search: resolvedSearchParams.search };
  }

  const restaurants = await Restaurant.find(query)
    .sort({ createdAt: -1 })
    .lean();

  // Statistiques globales
  const allStats = await Restaurant.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  const stats: Record<string, number> = {};
  allStats.forEach((s: any) => {
    stats[s._id] = s.count;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Administration des Restaurants</h1>
        <p className="text-muted text-sm">Valider, refuser ou demander des corrections</p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="En attente" value={stats.pending || 0} color="bg-yellow-500/20 text-yellow-300 border-yellow-500/30" active={resolvedSearchParams.status === 'pending' || !resolvedSearchParams.status} href="/admin/restaurants?status=pending" />
        <StatCard label="Approuvés" value={stats.approved || 0} color="bg-emerald-500/20 text-emerald-300 border-emerald-500/30" active={resolvedSearchParams.status === 'approved'} href="/admin/restaurants?status=approved" />
        <StatCard label="Refusés" value={stats.rejected || 0} color="bg-red-500/20 text-red-300 border-red-500/30" active={resolvedSearchParams.status === 'rejected'} href="/admin/restaurants?status=rejected" />
        <StatCard label="À corriger" value={stats.needs_correction || 0} color="bg-orange-500/20 text-orange-300 border-orange-500/30" active={resolvedSearchParams.status === 'needs_correction'} href="/admin/restaurants?status=needs_correction" />
      </div>

      {/* Barre de filtres */}
      <div className="bg-night-light border border-white/10 rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <form action="/admin/restaurants" method="GET" className="flex gap-2">
              <input type="hidden" name="status" value={resolvedSearchParams.status || 'pending'} />
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  name="search"
                  defaultValue={resolvedSearchParams.search}
                  placeholder="Rechercher par nom, ville, cuisine..."
                  className="w-full bg-night border border-white/10 rounded-md pl-10 pr-4 py-2 text-white focus:border-orange-brand focus:outline-none"
                />
              </div>
              <button type="submit" className="px-4 py-2 bg-orange-brand text-white rounded-md hover:bg-orange-600 transition-colors">
                Rechercher
              </button>
            </form>
          </div>

          <select
            defaultValue={resolvedSearchParams.region}
            onChange={(e) => {
              const url = new URL(window.location.href);
              if (e.target.value) {
                url.searchParams.set('region', e.target.value);
              } else {
                url.searchParams.delete('region');
              }
              window.location.href = url.toString();
            }}
            className="bg-night border border-white/10 rounded-md px-4 py-2 text-white focus:border-orange-brand focus:outline-none"
          >
            <option value="">Toutes les régions</option>
            <option value="Maritime">Maritime</option>
            <option value="Plateaux">Plateaux</option>
            <option value="Centrale">Centrale</option>
            <option value="Kara">Kara</option>
            <option value="Savanes">Savanes</option>
          </select>
        </div>
      </div>

      {/* Liste des restaurants */}
      {restaurants.length === 0 ? (
        <div className="text-center py-16 rounded-lg border border-white/10 bg-night-light">
          <CheckCircle size={48} className="text-emerald-brand mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Aucun restaurant</h3>
          <p className="text-muted">
            {resolvedSearchParams.status === 'pending' 
              ? 'Aucun restaurant en attente de validation.' 
              : 'Aucun résultat pour ces filtres.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {restaurants.map((restaurant: any) => (
            <div key={restaurant._id} className="rounded-lg border border-white/10 bg-night-light p-6 hover:border-white/20 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-lg font-bold text-white">{restaurant.name}</h3>
                    <StatusBadge status={restaurant.status} />
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted flex-wrap">
                    <span className="flex items-center gap-1">
                      <Utensils size={14} /> {restaurant.type === 'restaurant' ? 'Restaurant' : restaurant.type}
                    </span>
                    <span>•</span>
                    <span>{restaurant.city}, {restaurant.region}</span>
                    <span>•</span>
                    <span>Cuisines: {restaurant.cuisines?.slice(0, 3).join(', ')}</span>
                    <span>•</span>
                    <span>Propriétaire: {restaurant.ownerName}</span>
                  </div>

                  {restaurant.status === 'rejected' && restaurant.rejectionReason && (
                    <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-300">
                      <strong>Motif du refus :</strong> {restaurant.rejectionReason}
                    </div>
                  )}

                  {restaurant.status === 'needs_correction' && restaurant.correctionRequest && (
                    <div className="mt-2 p-2 bg-orange-500/10 border border-orange-500/20 rounded text-xs text-orange-300">
                      <strong>Corrections demandées :</strong> {restaurant.correctionRequest}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/restaurants/${restaurant._id}/review`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-orange-brand text-white font-medium hover:bg-orange-600 transition-colors text-sm"
                  >
                    <Eye size={16} />
                    Review
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

function StatCard({ label, value, color, active, href }: { 
  label: string; 
  value: number; 
  color: string; 
  active?: boolean;
  href: string;
}) {
  return (
    <Link 
      href={href}
      className={`rounded-lg border p-4 transition-all ${color} ${active ? 'ring-2 ring-orange-brand ring-offset-2 ring-offset-night' : 'hover:opacity-80'}`}
    >
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs opacity-80">{label}</div>
    </Link>
  );
}