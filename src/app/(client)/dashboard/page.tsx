'use client';

import Link from 'next/link';
import { Hotel, Utensils, Palette, Store, User, Settings, LogOut, PlusCircle } from 'lucide-react';

export default function DashboardPage() {
  const userName = "Utilisateur"; // Sera remplacé dynamiquement plus tard

  const categories = [
    {
      title: 'Hébergements & Hôtels',
      description: 'Gérez vos propositions d\'hébergements et suivez leur statut de validation.',
      icon: Hotel,
      href: '/dashboard/accommodations',
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    },
    {
      title: 'Restaurants',
      description: 'Ajoutez ou modifiez vos établissements de restauration et menus.',
      icon: Utensils,
      href: '/dashboard/restaurants',
      color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    },
    {
      title: 'Culture & Artisanat',
      description: 'Mettez en valeur vos produits culturels, artisanaux et événements.',
      icon: Palette,
      href: '/dashboard/culture',
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    },
    {
      title: 'Boutiques',
      description: 'Gérez votre boutique en ligne, vos produits et vos commandes.',
      icon: Store,
      href: '/dashboard/boutiques',
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Bonjour, {userName} 👋
            </h1>
            <p className="text-gray-400">
              Bienvenue sur votre espace personnel Kpalim-Trade. Gérez toutes vos activités depuis ici.
            </p>
          </div>
          <div className="flex gap-3">
            <Link 
              href="/"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium border border-gray-700"
            >
              <User size={18} />
              Voir mon profil
            </Link>
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors text-sm font-medium border border-red-500/20"
              onClick={() => { window.location.href = '/'; }}
            >
              <LogOut size={18} />
              Déconnexion
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link 
                key={category.title} 
                href={category.href}
                className={`group p-6 rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-gray-900/50 ${category.color}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-gray-950 border border-gray-800 group-hover:border-gray-700 transition-colors">
                    <Icon size={28} className={category.color.split(' ')[1]} />
                  </div>
                  <PlusCircle size={24} className="text-gray-600 group-hover:text-gray-400 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {category.description}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Settings size={20} className="text-green-400" />
            Besoin d'aide ?
          </h3>
          <p className="text-gray-400 text-sm">
            Si vous rencontrez des difficultés pour ajouter un établissement ou si votre proposition reste en attente, 
            n'hésitez pas à consulter notre guide ou à contacter le support administratif.
          </p>
        </div>
      </div>
    </div>
  );
}