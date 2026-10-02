import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Event } from '@/models/Event';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = { title: 'Gestion Événements' };

const STATUS_STYLES: Record<string, string> = {
  published: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  cancelled: 'bg-red-100 text-red-700',
  finished: 'bg-gray-100 text-gray-700',
};

export default async function AdminEventsPage() {
  await connectDB();
  const events = await Event.find().sort({ startDate: -1 }).lean();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion des événements</h1>
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Événement</th>
              <th className="px-4 py-3 font-medium">Catégorie</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Lieu</th>
              <th className="px-4 py-3 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {events.map((e) => (
              <tr key={e._id.toString()} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium truncate max-w-[200px]">{e.title}</td>
                <td className="px-4 py-3 text-gray-500 capitalize">{e.category}</td>
                <td className="px-4 py-3 text-gray-500">{new Date(e.startDate).toLocaleDateString('fr-FR')}</td>
                <td className="px-4 py-3 text-gray-500 truncate max-w-[150px]">{e.location}</td>
                <td className="px-4 py-3">
                  <Badge className={STATUS_STYLES[e.status] || ''}>{e.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {events.length === 0 && <p className="text-center py-12 text-gray-400">Aucun événement</p>}
      </div>
    </div>
  );
}
