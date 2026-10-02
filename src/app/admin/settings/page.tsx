import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Setting } from '@/models/Setting';

export const metadata: Metadata = { title: 'Paramètres Plateforme' };

export default async function AdminSettingsPage() {
  await connectDB();
  const settings = await Setting.find().lean();
  const settingsMap = settings.reduce((acc, s) => { acc[s.key] = s; return acc; }, {} as Record<string, any>);

  const groups = [
    { key: 'general', label: 'Général', fields: [{ key: 'site_name', label: 'Nom du site' }, { key: 'site_description', label: 'Description' }] },
    { key: 'contact', label: 'Contact', fields: [{ key: 'contact_email', label: 'Email' }, { key: 'contact_phone', label: 'Téléphone' }, { key: 'contact_address', label: 'Adresse' }] },
    { key: 'marketplace', label: 'Marketplace', fields: [{ key: 'commission_rate', label: 'Commission (%)' }, { key: 'delivery_fee', label: 'Frais livraison (FCFA)' }] },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Paramètres de la plateforme</h1>
      {groups.map((group) => (
        <div key={group.key} className="p-5 rounded-xl border border-gray-100 space-y-4">
          <h2 className="font-bold text-lg capitalize">{group.label}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {group.fields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-600 mb-1">{field.label}</label>
                <input defaultValue={settingsMap[field.key]?.value || ''} readOnly className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-gray-50" />
                <p className="text-xs text-gray-400 mt-1">Clé : {field.key}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <p className="text-sm text-gray-400 italic">L'édition dynamique sera disponible dans une prochaine mise à jour.</p>
    </div>
  );
}
