import { connectDB } from '@/lib/mongodb';
import { TourismSite } from '@/models/TourismSite';
import { AdminListPage } from '@/components/admin/AdminListPage';
import { Palmtree, Eye } from 'lucide-react'; // ✅ Eye ajouté ici
import Link from 'next/link';

export const metadata = { title: 'Administration Tourisme | Kpalimé-Trade' };

export default async function AdminTourismPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; region?: string; search?: string }>;
}) {
  await connectDB();
  const sp = await searchParams;

  const query: any = {};
  if (sp.status) query.status = sp.status;
  else query.status = 'pending';
  if (sp.region) query.region = sp.region;
  if (sp.search) query.$text = { $search: sp.search };

  const [items, allStats] = await Promise.all([
    TourismSite.find(query).sort({ createdAt: -1 }).lean(),
    TourismSite.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
  ]);

  const stats: Record<string, number> = {};
  allStats.forEach((s: any) => { stats[s._id] = s.count; });

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
    <AdminListPage
      title="Administration Tourisme & Sites"
      subtitle="Valider, refuser ou demander des corrections"
      stats={stats}
      statLabels={[
        { key: 'pending', label: 'En attente', color: 'bg-yellow-900/30 text-yellow-300 border-yellow-700' },
        { key: 'approved', label: 'Approuvés', color: 'bg-green-900/30 text-green-300 border-green-700' },
        { key: 'rejected', label: 'Refusés', color: 'bg-red-900/30 text-red-300 border-red-700' },
        { key: 'needs_correction', label: 'À corriger', color: 'bg-orange-900/30 text-orange-300 border-orange-700' },
      ]}
      searchPlaceholder="Rechercher par nom, type, ville..."
      items={items}
      searchParams={sp}
      basePath="/admin/tourism"
      filterByRegion={true}
      renderItem={(item: any) => (
        <div key={item._id} className="rounded-lg border border-gray-700 bg-gray-800 p-6 hover:border-gray-600 transition-colors">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h3 className="text-lg font-bold text-white">{item.name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(item.status)}`}>
                  {getStatusLabel(item.status)}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
                <span className="flex items-center gap-1"><Palmtree size={14} /> {item.type}</span>
                <span>•</span>
                <span>{item.city}, {item.region}</span>
                <span>•</span>
                <span>Propriétaire: {item.ownerName || 'Inconnu'}</span>
              </div>
              {item.status === 'rejected' && item.rejectionReason && (
                <div className="mt-2 p-2 bg-red-900/20 border border-red-700 rounded text-xs text-red-300">
                  <strong>Motif du refus :</strong> {item.rejectionReason}
                </div>
              )}
              {item.status === 'needs_correction' && item.correctionRequest && (
                <div className="mt-2 p-2 bg-orange-900/20 border border-orange-700 rounded text-xs text-orange-300">
                  <strong>Corrections demandées :</strong> {item.correctionRequest}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/admin/tourism/${item._id}/review`} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition-colors text-sm">
                <Eye size={16} /> Review
              </Link>
            </div>
          </div>
        </div>
      )}
    />
  );
}