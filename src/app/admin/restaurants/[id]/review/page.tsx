import Link from 'next/link';
import { ArrowLeft, Utensils, MapPin, Phone, CheckCircle, XCircle, AlertCircle, Clock, CreditCard } from 'lucide-react';
import mongoose from 'mongoose';
import { Restaurant } from '@/models/Restaurant';
import StatusBadge from '@/components/ui/StatusBadge';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Review Restaurant | Kpalimé-Trade',
  description: 'Valider ou refuser un restaurant',
};

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) throw new Error('MONGODB_URI non défini');
  await mongoose.connect(MONGODB_URI);
}

// Server Actions
async function approveRestaurant(formData: FormData): Promise<void> {
  'use server';
  const id = formData.get('id') as string;
  
  await connectDB();
  await Restaurant.findByIdAndUpdate(id, {
    status: 'approved',
    isActive: true,
    publishedAt: new Date(),
    adminNote: formData.get('adminNote') || '',
  });
  
  revalidatePath('/admin/restaurants');
  redirect('/admin/restaurants?status=pending');
}

async function rejectRestaurant(formData: FormData): Promise<void> {
  'use server';
  const id = formData.get('id') as string;
  const reason = formData.get('rejectionReason') as string;
  
  if (!reason || reason.trim().length < 10) {
    throw new Error('Le motif du refus doit faire au moins 10 caractères');
  }

  await connectDB();
  await Restaurant.findByIdAndUpdate(id, {
    status: 'rejected',
    isActive: false,
    rejectionReason: reason,
    adminNote: formData.get('adminNote') || '',
  });
  
  revalidatePath('/admin/restaurants');
  redirect('/admin/restaurants?status=pending');
}

async function requestCorrection(formData: FormData): Promise<void> {
  'use server';
  const id = formData.get('id') as string;
  const correction = formData.get('correctionRequest') as string;
  
  if (!correction || correction.trim().length < 10) {
    throw new Error('La demande de correction doit faire au moins 10 caractères');
  }

  await connectDB();
  await Restaurant.findByIdAndUpdate(id, {
    status: 'needs_correction',
    isActive: false,
    correctionRequest: correction,
    adminNote: formData.get('adminNote') || '',
  });
  
  revalidatePath('/admin/restaurants');
  redirect('/admin/restaurants?status=pending');
}

export default async function ReviewRestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connectDB();
  const { id } = await params;

  const restaurant = await Restaurant.findById(id).lean();

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-night flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Restaurant non trouvé</h2>
          <Link href="/admin/restaurants" className="text-orange-brand hover:underline">
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  const PRICE_LABELS: Record<string, string> = {
    budget: 'Budget (moins de 3000 XOF)',
    moderate: 'Modéré (3000 - 8000 XOF)',
    expensive: 'Cher (8000 - 20000 XOF)',
    luxury: 'Luxe (plus de 20000 XOF)',
  };

  const TYPE_LABELS: Record<string, string> = {
    restaurant: 'Restaurant',
    maquis: 'Maquis',
    fast_food: 'Fast-food',
    street_food: 'Street food',
    cafeteria: 'Cafétéria',
    snack: 'Snack',
  };

  return (
    <div className="min-h-screen bg-night py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <Link href="/admin/restaurants" className="inline-flex items-center gap-2 text-muted hover:text-white mb-4 transition-colors">
            <ArrowLeft size={18} /> Retour à la liste
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold text-white">{restaurant.name}</h1>
            <StatusBadge status={restaurant.status} size="md" />
          </div>
          <p className="text-muted mt-2">Examinez les informations et prenez une décision</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne gauche : Détails */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations générales */}
            <section className="bg-night-light border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Utensils size={20} className="text-orange-brand" /> Informations générales
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <InfoRow label="Type" value={TYPE_LABELS[restaurant.type] || restaurant.type} />
                <InfoRow label="Propriétaire" value={restaurant.ownerName} />
                <div className="md:col-span-2">
                  <InfoRow label="Description" value={restaurant.description} />
                </div>
              </div>
            </section>

            {/* Localisation */}
            <section className="bg-night-light border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-orange-brand" /> Localisation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <InfoRow label="Région" value={restaurant.region} />
                <InfoRow label="Ville" value={restaurant.city} />
                <InfoRow label="Quartier" value={restaurant.district || 'N/A'} />
                <div className="md:col-span-2">
                  <InfoRow label="Adresse" value={restaurant.address} />
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-night-light border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Phone size={20} className="text-orange-brand" /> Contact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <InfoRow label="Téléphone" value={restaurant.phone} />
                <InfoRow label="Email" value={restaurant.email || 'N/A'} />
                <InfoRow label="WhatsApp" value={restaurant.whatsapp || 'N/A'} />
                <InfoRow label="Site web" value={restaurant.website || 'N/A'} />
              </div>
            </section>

            {/* Cuisines et Spécialités */}
            <section className="bg-night-light border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Utensils size={20} className="text-orange-brand" /> Cuisines et Spécialités
              </h2>
              <div className="mb-4">
                <div className="text-xs text-muted uppercase tracking-wide mb-2">Cuisines</div>
                {restaurant.cuisines && restaurant.cuisines.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {restaurant.cuisines.map((cuisine: string) => (
                      <span key={cuisine} className="px-3 py-1 bg-orange-brand/10 text-orange-brand rounded-full text-sm">
                        {cuisine}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted text-sm">Aucune cuisine déclarée</p>
                )}
              </div>
              <div>
                <div className="text-xs text-muted uppercase tracking-wide mb-2">Spécialités</div>
                {restaurant.specialties && restaurant.specialties.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {restaurant.specialties.map((specialty: string) => (
                      <span key={specialty} className="px-3 py-1 bg-yellow-500/10 text-yellow-300 rounded-full text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted text-sm">Aucune spécialité déclarée</p>
                )}
              </div>
            </section>

            {/* Tarifs */}
            <section className="bg-night-light border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <CreditCard size={20} className="text-orange-brand" /> Tarifs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <InfoRow label="Gamme de prix" value={PRICE_LABELS[restaurant.priceRange] || restaurant.priceRange} />
                <InfoRow label="Prix moyen" value={restaurant.averagePrice ? `${restaurant.averagePrice} ${restaurant.currency}` : 'N/A'} />
                <InfoRow label="Devise" value={restaurant.currency} />
              </div>
            </section>

            {/* Services */}
            <section className="bg-night-light border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle size={20} className="text-orange-brand" /> Services
              </h2>
              {restaurant.services && restaurant.services.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {restaurant.services.map((service: string) => (
                    <span key={service} className="px-3 py-1 bg-emerald-brand/10 text-emerald-brand rounded-full text-sm">
                      {service}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-sm">Aucun service déclaré</p>
              )}
            </section>

            {/* Modes de paiement */}
            <section className="bg-night-light border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <CreditCard size={20} className="text-orange-brand" /> Modes de paiement
              </h2>
              {restaurant.paymentMethods && restaurant.paymentMethods.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {restaurant.paymentMethods.map((method: string) => (
                    <span key={method} className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm">
                      {method}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-sm">Aucun mode de paiement déclaré</p>
              )}
            </section>

            {/* Note admin précédente */}
            {restaurant.adminNote && (
              <section className="bg-night-light border border-blue-500/20 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-white mb-2">Note admin précédente</h2>
                <p className="text-sm text-white/80">{restaurant.adminNote}</p>
              </section>
            )}
          </div>

          {/* Colonne droite : Actions */}
          <div className="space-y-4">
            {/* Bouton Approuver */}
            <form action={approveRestaurant} className="bg-night-light border border-emerald-brand/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle size={20} className="text-emerald-brand" /> Approuver
              </h3>
              <p className="text-sm text-muted mb-4">
                Le restaurant sera publié et visible publiquement.
              </p>
              <input type="hidden" name="id" value={restaurant._id.toString()} />
              <textarea
                name="adminNote"
                placeholder="Note admin (optionnel)"
                rows={2}
                className="w-full bg-night border border-white/10 rounded-md px-3 py-2 text-white text-sm focus:border-emerald-brand focus:outline-none mb-3"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-colors"
              >
                <CheckCircle size={18} />
                Approuver le restaurant
              </button>
            </form>

            {/* Bouton Demander corrections */}
            <form action={requestCorrection} className="bg-night-light border border-orange-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <AlertCircle size={20} className="text-orange-400" /> Demander des corrections
              </h3>
              <p className="text-sm text-muted mb-4">
                Le propriétaire devra modifier sa fiche avant resoumission.
              </p>
              <input type="hidden" name="id" value={restaurant._id.toString()} />
              <textarea
                name="correctionRequest"
                placeholder="Détaillez les corrections nécessaires *"
                rows={3}
                required
                className="w-full bg-night border border-white/10 rounded-md px-3 py-2 text-white text-sm focus:border-orange-400 focus:outline-none mb-3"
              />
              <textarea
                name="adminNote"
                placeholder="Note admin interne (optionnel)"
                rows={2}
                className="w-full bg-night border border-white/10 rounded-md px-3 py-2 text-white text-sm focus:border-emerald-brand focus:outline-none mb-3"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
              >
                <AlertCircle size={18} />
                Demander des corrections
              </button>
            </form>

            {/* Bouton Refuser */}
            <form action={rejectRestaurant} className="bg-night-light border border-red-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <XCircle size={20} className="text-red-400" /> Refuser
              </h3>
              <p className="text-sm text-muted mb-4">
                Le restaurant ne sera pas publié. Le propriétaire sera informé.
              </p>
              <input type="hidden" name="id" value={restaurant._id.toString()} />
              <textarea
                name="rejectionReason"
                placeholder="Motif du refus (obligatoire, min. 10 caractères) *"
                rows={3}
                required
                minLength={10}
                className="w-full bg-night border border-white/10 rounded-md px-3 py-2 text-white text-sm focus:border-red-400 focus:outline-none mb-3"
              />
              <textarea
                name="adminNote"
                placeholder="Note admin interne (optionnel)"
                rows={2}
                className="w-full bg-night border border-white/10 rounded-md px-3 py-2 text-white text-sm focus:border-emerald-brand focus:outline-none mb-3"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
              >
                <XCircle size={18} />
                Refuser le restaurant
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted uppercase tracking-wide mb-1">{label}</div>
      <div className="text-white">{value}</div>
    </div>
  );
}