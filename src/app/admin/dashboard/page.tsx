import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import {
  Users,
  Store,
  Package,
  Clock,
  Bell,
  TrendingUp,
} from 'lucide-react';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { Shop } from '@/models/Shop';
import { Product } from '@/models/Product';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';

export const metadata: Metadata = { title: 'Admin Dashboard' };

export default async function AdminDashboard() {
  const token = await getTokenFromCookie();
  const payload = token ? await verifyToken(token) : null;

  if (!payload || payload.role !== 'admin') {
    return <p className="text-red-500">Accès refusé</p>;
  }

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
    {
      label: 'Utilisateurs',
      value: userCount,
      icon: Users,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Vendeurs',
      value: vendorCount,
      icon: TrendingUp,
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600',
    },
    {
      label: 'Boutiques',
      value: shopCount,
      icon: Store,
      color: 'bg-emerald-50 border-emerald-200',
      iconColor: 'text-emerald-600',
    },
    {
      label: 'Produits',
      value: productCount,
      icon: Package,
      color: 'bg-amber-50 border-amber-200',
      iconColor: 'text-amber-600',
    },
    {
      label: 'Boutiques en attente',
      value: pendingShops,
      icon: Clock,
      color: 'bg-yellow-50 border-yellow-200',
      iconColor: 'text-yellow-600',
    },
    {
      label: 'Produits en attente',
      value: pendingProducts,
      icon: Bell,
      color: 'bg-orange-50 border-orange-200',
      iconColor: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Tableau de bord administrateur</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`p-5 rounded-lg border ${stat.color}`}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-900">{stat.label}</p>
                <Icon size={24} className={stat.iconColor} />
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}