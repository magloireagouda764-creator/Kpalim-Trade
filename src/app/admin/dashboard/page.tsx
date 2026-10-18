import { Suspense } from 'react';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import Shop from '@/models/Shop';
import Product from '@/models/Product';
import Accommodation from '@/models/Accommodation';
import Restaurant from '@/models/Restaurant';
import { Users, Store, Package, Hotel, UtensilsCrossed, Clock, Bell, CheckCircle, AlertTriangle } from 'lucide-react';

async function DashboardStats() {
  await connectDB();

  // Récupération des compteurs en parallèle pour la performance
  const [
    userCount,
    shopCount,
    productCount,
    accommodationCount,
    restaurantCount,
    pendingShops,
    pendingProducts,
    pendingAccommodations,
    pendingRestaurants,
  ] = await Promise.all([
    User.countDocuments(),
    Shop.countDocuments(),
    Product.countDocuments(),
    Accommodation.countDocuments(),
    Restaurant.countDocuments(),
    Shop.countDocuments({ status: 'pending' }),
    Product.countDocuments({ status: 'pending' }),
    Accommodation.countDocuments({ status: 'pending' }), // Assure-toi que ce statut existe dans ton modèle
    Restaurant.countDocuments({ status: 'pending' }),   // Assure-toi que ce statut existe dans ton modèle
  ]);

  const stats = [
    {
      label: 'Utilisateurs inscrits',
      value: userCount,
      icon: Users,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Hôtels & Hébergements',
      value: accommodationCount,
      icon: Hotel,
      color: 'bg-indigo-50 border-indigo-200',
      iconColor: 'text-indigo-600',
    },
    {
      label: 'Restaurants',
      value: restaurantCount,
      icon: UtensilsCrossed,
      color: 'bg-rose-50 border-rose-200',
      iconColor: 'text-rose-600',
    },
    {
      label: 'Boutiques actives',
      value: shopCount,
      icon: Store,
      color: 'bg-emerald-50 border-emerald-200',
      iconColor: 'text-emerald-600',
    },
    {
      label: 'Produits en vente',
      value: productCount,
      icon: Package,
      color: 'bg-amber-50 border-amber-200',
      iconColor: 'text-amber-600',
    },
    {
      label: 'En attente (Boutiques)',
      value: pendingShops,
      icon: Clock,
      color: 'bg-yellow-50 border-yellow-200',
      iconColor: 'text-yellow-600',
    },
    {
      label: 'En attente (Produits)',
      value: pendingProducts,
      icon: Bell,
      color: 'bg-orange-50 border-orange-200',
      iconColor: 'text-orange-600',
    },
    {
      label: 'En attente (Hébergements)',
      value: pendingAccommodations,
      icon: AlertTriangle,
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600',
    },
    {
      label: 'En attente (Restaurants)',
      value: pendingRestaurants,
      icon: AlertTriangle,
      color: 'bg-pink-50 border-pink-200',
      iconColor: 'text-pink-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Vue d'ensemble de la plateforme</h1>
        <span className="text-sm text-gray-500">Données en temps réel</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`p-5 rounded-lg border shadow-sm ${stat.color}`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-700">{stat.label}</p>
                <Icon size={22} className={stat.iconColor} />
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Section pour les actions rapides (à développer ensuite) */}
      <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/admin/hotels?status=pending" className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition">
            Voir hébergements en attente
          </a>
          <a href="/admin/restaurants?status=pending" className="px-4 py-2 bg-rose-600 text-white rounded-md text-sm font-medium hover:bg-rose-700 transition">
            Voir restaurants en attente
          </a>
          <a href="/admin/products?status=pending" className="px-4 py-2 bg-amber-600 text-white rounded-md text-sm font-medium hover:bg-amber-700 transition">
            Voir produits en attente
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-500">Chargement des statistiques...</div>}>
      <DashboardStats />
    </Suspense>
  );
}