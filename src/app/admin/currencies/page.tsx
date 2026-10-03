import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { Currency } from '@/models/Currency';

export const metadata: Metadata = { title: 'Gestion Devises' };

export default async function AdminCurrenciesPage() {
  await connectDB();

  const currenciesData = await Currency.find().sort({ code: 1 }).lean();
  const currencies = currenciesData as any[];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion des devises</h1>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Code</th>
              <th className="px-4 py-3 font-medium">Nom</th>
              <th className="px-4 py-3 font-medium">Symbole</th>
              <th className="px-4 py-3 font-medium">Taux → XOF</th>
              <th className="px-4 py-3 font-medium">Défaut</th>
              <th className="px-4 py-3 font-medium">Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currencies.map((c: any) => (
              <tr key={c.code} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-bold">{c.code}</td>
                <td className="px-4 py-3">{c.name}</td>
                <td className="px-4 py-3 text-lg">{c.symbol}</td>
                <td className="px-4 py-3 tabular-nums">{c.rateToXOF}</td>
                <td className="px-4 py-3">{c.isDefault ? '✅' : ''}</td>
                <td className="px-4 py-3">{c.isActive ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}