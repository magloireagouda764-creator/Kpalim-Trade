import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Report } from '@/models/Report';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';

export const metadata: Metadata = { title: 'Signalements' };

export default async function AdminReportsPage() {
  await connectDB();
  const reports = await Report.find().sort({ createdAt: -1 }).populate('reporterId', 'name email').lean();
  const data = JSON.parse(JSON.stringify(reports));

  const columns = [
    { key: 'reporterId', header: 'Signalé par', render: (r: any) => r.reporterId?.name || '-' },
    { key: 'reason', header: 'Raison' },
    { key: 'reportableType', header: 'Type', render: (r: any) => <span className="capitalize">{r.reportableType}</span> },
    { key: 'status', header: 'Statut', render: (r: any) => <StatusBadge status={r.status} /> },
    { key: 'createdAt', header: 'Date', render: (r: any) => new Date(r.createdAt).toLocaleDateString('fr-FR') },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Signalements & Modération</h1>
      <DataTable columns={columns} data={data} getKey={(r: any) => r._id} emptyMessage="Aucun signalement" />
    </div>
  );
}
