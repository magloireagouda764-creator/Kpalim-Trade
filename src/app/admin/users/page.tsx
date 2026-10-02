import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Avatar } from '@/components/ui/Avatar';

export const metadata: Metadata = { title: 'Gestion Utilisateurs' };

const ROLE_LABELS: Record<string, string> = { client: 'Client', vendor: 'Vendeur', professional: 'Professionnel', admin: 'Admin' };

export default async function AdminUsersPage() {
  await connectDB();
  const users = await User.find().sort({ createdAt: -1 }).select('-password').lean();
  const data = JSON.parse(JSON.stringify(users));

  const columns = [
    { key: 'name', header: 'Utilisateur', render: (u: any) => (
      <div className="flex items-center gap-3">
        <Avatar name={u.name} src={u.avatar} size="sm" />
        <div><p className="font-medium text-sm">{u.name}</p><p className="text-xs text-gray-400">{u.email}</p></div>
      </div>
    )},
    { key: 'role', header: 'Rôle', render: (u: any) => <span className="capitalize text-sm">{ROLE_LABELS[u.role] || u.role}</span> },
    { key: 'phone', header: 'Téléphone' },
    { key: 'isActive', header: 'Statut', render: (u: any) => <StatusBadge status={u.isActive ? 'active' : 'suspended'} /> },
    { key: 'createdAt', header: 'Inscrit le', render: (u: any) => new Date(u.createdAt).toLocaleDateString('fr-FR') },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>
      <DataTable columns={columns} data={data} getKey={(u: any) => u._id} emptyMessage="Aucun utilisateur" />
    </div>
  );
}
