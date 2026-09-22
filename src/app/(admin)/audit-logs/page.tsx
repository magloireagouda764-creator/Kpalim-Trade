import type { Metadata } from 'next';
import { getRecentLogs } from '@/services/audit.service';
import { DataTable } from '@/components/admin/DataTable';

export const metadata: Metadata = { title: "Journal d'audit" };

export default async function AuditLogsPage() {
  const logs = await getRecentLogs(100);
  const data = JSON.parse(JSON.stringify(logs));

  const columns = [
    { key: 'adminId', header: 'Admin', render: (l: any) => l.adminId?.name || 'Système' },
    { key: 'action', header: 'Action', render: (l: any) => <span className="font-mono text-xs">{l.action}</span> },
    { key: 'modelType', header: 'Modèle', render: (l: any) => <span className="capitalize text-xs">{l.modelType}</span> },
    { key: 'createdAt', header: 'Date', render: (l: any) => new Date(l.createdAt).toLocaleString('fr-FR') },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Journal d'audit</h1>
      <p className="text-sm text-gray-500">Historique des actions administratives importantes.</p>
      <DataTable columns={columns} data={data} getKey={(l: any) => l._id} emptyMessage="Aucune entrée d'audit" />
    </div>
  );
}
