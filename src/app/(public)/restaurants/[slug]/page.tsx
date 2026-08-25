import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { connectDB } from '@/lib/mongodb';
import { Restaurant } from '@/models/Restaurant';
import { MenuItem } from '@/models/Menu';
import { MenuItemComponent } from '@/components/restaurants/MenuItem';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const r = await Restaurant.findOne({ slug, isActive: true }).lean();
  if (!r) return { title: 'Restaurant introuvable' };
  return { title: r.name, description: r.description.slice(0, 160) };
}

const CATEGORY_LABELS: Record<string, string> = {
  entree: '🥗 Entrées', plat: '🍽️ Plats', dessert: '🍰 Desserts', boisson: '🥤 Boissons', autre: '📋 Autres',
};

export default async function RestaurantDetailPage({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  const restaurant = await Restaurant.findOne({ slug, isActive: true }).lean();
  if (!restaurant) notFound();

  const menuItems = await MenuItem.find({ restaurantId: restaurant._id, isActive: true }).sort({ category: 1, name: 1 }).lean();
  const r = JSON.parse(JSON.stringify(restaurant));

  const groupedMenu = menuItems.reduce((acc, item) => {
    const cat = item.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      <nav className="text-sm text-gray-500 flex gap-1">
        <Link href="/restaurants" className="hover:text-kpalime-green" prefetch>Restaurants</Link>
        <span>/</span>
        <span className="text-kpalime-dark font-medium">{r.name}</span>
      </nav>

      {r.images.length > 0 && (
        <div className="aspect-[16/9] relative rounded-xl overflow-hidden bg-gray-100">
          <Image src={r.images[0].secure_url} alt={r.name} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 896px" />
        </div>
      )}

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{r.name}</h1>
        <p className="text-kpalime-earth font-medium">{r.cuisineType}</p>
        <p className="text-gray-600">{r.description}</p>
      </div>

      {Object.keys(groupedMenu).length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Menu</h2>
          {Object.entries(groupedMenu).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-bold text-lg mb-2 text-kpalime-green">{CATEGORY_LABELS[category] || category}</h3>
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                {items.map((item) => <MenuItemComponent key={item._id.toString()} item={JSON.parse(JSON.stringify(item))} />)}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="p-5 rounded-xl border border-gray-100 text-sm space-y-2">
        <h3 className="font-bold text-base">Informations</h3>
        <p>📍 {r.address}, {r.city}</p>
        <p>🕐 {r.openingHours}</p>
        <p>📞 <a href={`tel:${r.phone}`} className="text-kpalime-green hover:underline">{r.phone}</a></p>
        {r.whatsapp && <p>💬 <a href={`https://wa.me/${r.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-kpalime-green hover:underline">WhatsApp</a></p>}
        {r.services.length > 0 && <p>🍽️ {r.services.join(' • ')}</p>}
      </div>
    </div>
  );
}
