import type { Metadata } from 'next';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { Shop } from '@/models/Shop';
import { Product } from '@/models/Product';

export const metadata: Metadata = { title: 'Admin Dashboard' };

export default async function AdminDashboard() {
  await connectDB();

  const [userCount, vendorCount, shopCount, productCount, pendingShops, pendingProducts] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: 'vendor' }),
    Shop.countDocuments(),
    Product.countDocuments(),
    Shop.countDocuments({ status: 'pending' }),
    Product.countDocuments({ status: 'pending' }),
  ]);

  const stats = [
    { label: 'Utilisateurs', value: userCount, color: 'bg-blue-50 border-blue-100' },
    { label: 'Vendeurs', value: vendorCount, color: 'bg-purple-50 border-purple-100' },
    { label: 'Boutiques', value: shopCount, color: 'bg-kpalime-sand/50 border-kpalime-sand' },
    { label: 'Produits', value: productCount, color: 'bg-green-50 border-green-100' },
    { label: 'Boutiques en attente', value: pendingShops, color: 'bg-yellow-50 border-yellow-100' },
    { label: 'Produits en attente', value: pendingProducts, color: 'bg-orange-50 border-orange-100' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tableau de bord administrateur</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`p-5 rounded-xl border ${stat.color}`}>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
