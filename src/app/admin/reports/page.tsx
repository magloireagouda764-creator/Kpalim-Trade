import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Report } from '@/models/Report';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';

export const metadata: Metadata = { title: 'Signalements' };

export default async function AdminReportsPage() {
  await connectDB();

  const reportsData = await Report.find()
    .sort({ createdAt: -1 })
    .populate('reporterId', 'name email')
    .lean();

  const reports = reportsData as any[];

  const columns = [
    {
      key: 'reporterId',
      header: 'Signalé par',
      render: (r: any) => r.reporterId?.name || '-',
    },
    { key: 'reason', header: 'Raison' },
    {
      key: 'reportableType',
      header: 'Type',
      render: (r: any) => (
        <span className="capitalize">{r.reportableType}</span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Date',
      render: (r: any) =>
        r.createdAt
          ? new Date(r.createdAt).toLocaleDateString('fr-FR')
          : 'Date inconnue',
    },
    {
      key: 'status',
      header: 'Statut',
      render: (r: any) => <StatusBadge status={r.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Signalements & Modération</h1>
      <DataTable
        columns={columns}
        data={reports}
        getKey={(r: any) => r._id?.toString()}
        emptyMessage="Aucun signalement"
      />
    </div>
  );
}