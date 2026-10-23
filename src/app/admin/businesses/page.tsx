import Link from 'next/link';
import { Briefcase, Eye, CheckCircle, Search } from 'lucide-react';
import { connectDB } from '@/lib/mongodb';
import { Business } from '@/models/Business';

export const metadata = {
  title: 'Administration Entreprises | Kpalimé-Trade',
  description: 'Gérer et valider les entreprises',
};

export default async function AdminBusinessesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; region?: string; search?: string }>;
}) {
  await connectDB();
  
  const resolvedSearchParams = await searchParams;

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

  const businesses = await Business.find(query).sort({ createdAt: -1 }).lean();

  const allStats = await Business.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  const stats: Record<string, number> = {};
  allStats.forEach((s: any) => {
    stats[s._id] = s.count;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-900 text-green-300 border-green-700';
      case 'rejected': return 'bg-red-900 text-red-300 border-red-700';
      case 'needs_correction': return 'bg-orange-900 text-orange-300 border-orange-700';
      default: return 'bg-yellow-900 text-yellow-300 border-yellow-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Approuvé';
      case 'rejected': return 'Refusé';
      case 'needs_correction': return 'À corriger';
      default: return 'En attente';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto text-gray-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-400 mb-1">Administration des Entreprises</h1>
        <p className="text-gray-400 text-sm">Valider, refuser ou demander des corrections</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="En attente" value={stats.pending || 0} color="bg-yellow-900/30 text-yellow-300 border-yellow-700" active={resolvedSearchParams.status === 'pending' || !resolvedSearchParams.status} href="/admin/businesses?status=pending" />
        <StatCard label="Approuvées" value={stats.approved || 0} color="bg-green-900/30 text-green-300 border-green-700" active={resolvedSearchParams.status === 'approved'} href="/admin/businesses?status=approved" />
        <StatCard label="Refusées" value={stats.rejected || 0} color="bg-red-900/30 text-red-300 border-red-700" active={resolvedSearchParams.status === 'rejected'} href="/admin/businesses?status=rejected" />
        <StatCard label="À corriger" value={stats.needs_correction || 0} color="bg-orange-900/30 text-orange-300 border-orange-700" active={resolvedSearchParams.status === 'needs_correction'} href="/admin/businesses?status=needs_correction" />
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
        <form action="/admin/businesses" method="GET" className="flex flex-col md:flex-row gap-2">
          <input type="hidden" name="status" value={resolvedSearchParams.status || 'pending'} />
          
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="search"
              defaultValue={resolvedSearchParams.search}
              placeholder="Rechercher par nom, secteur, ville..."
              className="w-full bg-gray-900 border border-gray-700 rounded-md pl-10 pr-4 py-2 text-white focus:border-green-500 focus:outline-none"
            />
          </div>

          <select
            name="region"
            defaultValue={resolvedSearchParams.region}
            className="bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-green-500 focus:outline-none md:w-48"
          >
            <option value="">Toutes les régions</option>
            <option value="Maritime">Maritime</option>
            <option value="Plateaux">Plateaux</option>
            <option value="Centrale">Centrale</option>
            <option value="Kara">Kara</option>
            <option value="Savanes">Savanes</option>
          </select>

          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Rechercher
          </button>
        </form>
      </div>

      {businesses.length === 0 ? (
        <div className="text-center py-16 rounded-lg border border-gray-700 bg-gray-800">
          <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Aucune entreprise</h3>
          <p className="text-gray-400">
            {resolvedSearchParams.status === 'pending' ? 'Aucune entreprise en attente de validation.' : 'Aucun résultat pour ces filtres.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {businesses.map((business: any) => (
            <div key={business._id} className="rounded-lg border border-gray-700 bg-gray-800 p-6 hover:border-gray-600 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-lg font-bold text-white">{business.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(business.status)}`}>
                      {getStatusLabel(business.status)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} /> {business.sector}
                    </span>
                    <span>•</span>
                    <span>{business.city}, {business.region}</span>
                    <span>•</span>
                    <span>Propriétaire: {business.ownerName || 'Inconnu'}</span>
                  </div>

                  {business.status === 'rejected' && business.rejectionReason && (
                    <div className="mt-2 p-2 bg-red-900/20 border border-red-700 rounded text-xs text-red-300">
                      <strong>Motif du refus :</strong> {business.rejectionReason}
                    </div>
                  )}

                  {business.status === 'needs_correction' && business.correctionRequest && (
                    <div className="mt-2 p-2 bg-orange-900/20 border border-orange-700 rounded text-xs text-orange-300">
                      <strong>Corrections demandées :</strong> {business.correctionRequest}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/businesses/${business._id}/review`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition-colors text-sm"
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
  label: string; value: number; color: string; active?: boolean; href: string;
}) {
  return (
    <Link 
      href={href}
      className={`rounded-lg border p-4 transition-all ${color} ${active ? 'ring-2 ring-green-500 ring-offset-2 ring-offset-gray-900' : 'hover:opacity-80'}`}
    >
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs opacity-80">{label}</div>
    </Link>
  );
}