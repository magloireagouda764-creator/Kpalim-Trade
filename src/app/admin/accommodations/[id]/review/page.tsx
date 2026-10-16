import Link from 'next/link';
import { ArrowLeft, Building2, MapPin, Phone, BedDouble, Wifi, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import mongoose from 'mongoose';
import { Accommodation } from '@/models/Accommodation';
import StatusBadge from '@/components/ui/StatusBadge';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Review Établissement | Kpalimé-Trade',
  description: 'Valider ou refuser un établissement',
};

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) throw new Error('MONGODB_URI non défini');
  await mongoose.connect(MONGODB_URI);
}

// Server Actions pour valider/refuser
async function approveAccommodation(formData: FormData): Promise<void> {
  'use server';
  const id = formData.get('id') as string;
  
  await connectDB();
  await Accommodation.findByIdAndUpdate(id, {
    status: 'approved',
    isActive: true,
    publishedAt: new Date(),
    adminNote: formData.get('adminNote') || '',
  });
  
  revalidatePath('/admin/accommodations');
  redirect('/admin/accommodations?status=pending');
}

async function rejectAccommodation(formData: FormData): Promise<void> {
  'use server';
  const id = formData.get('id') as string;
  const reason = formData.get('rejectionReason') as string;
  
  if (!reason || reason.trim().length < 10) {
    throw new Error('Le motif du refus doit faire au moins 10 caractères');
  }

  await connectDB();
  await Accommodation.findByIdAndUpdate(id, {
    status: 'rejected',
    isActive: false,
    rejectionReason: reason,
    adminNote: formData.get('adminNote') || '',
  });
  
  revalidatePath('/admin/accommodations');
  redirect('/admin/accommodations?status=pending');
}

async function requestCorrection(formData: FormData): Promise<void> {
  'use server';
  const id = formData.get('id') as string;
  const correction = formData.get('correctionRequest') as string;
  
  if (!correction || correction.trim().length < 10) {
    throw new Error('La demande de correction doit faire au moins 10 caractères');
  }

  await connectDB();
  await Accommodation.findByIdAndUpdate(id, {
    status: 'needs_correction',
    isActive: false,
    correctionRequest: correction,
    adminNote: formData.get('adminNote') || '',
  });
  
  revalidatePath('/admin/accommodations');
  redirect('/admin/accommodations?status=pending');
}

export default async function ReviewAccommodationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connectDB();
  const { id } = await params;

  const accommodation = await Accommodation.findById(id).lean();

  if (!accommodation) {
    return (
      <div className="min-h-screen bg-night flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Établissement non trouvé</h2>
          <Link href="/admin/accommodations" className="text-emerald-brand hover:underline">
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-night py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <Link href="/admin/accommodations" className="inline-flex items-center gap-2 text-muted hover:text-white mb-4 transition-colors">
            <ArrowLeft size={18} /> Retour à la liste
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold text-white">{accommodation.name}</h1>
            <StatusBadge status={accommodation.status} size="md" />
          </div>
          <p className="text-muted mt-2">Examinez les informations et prenez une décision</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne gauche : Détails */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations générales */}
            <section className="bg-night-light border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Building2 size={20} className="text-emerald-brand" /> Informations générales
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <InfoRow label="Type" value={accommodation.type} />
                <InfoRow label="Propriétaire" value={accommodation.ownerName} />
                <div className="md:col-span-2">
                  <InfoRow label="Description" value={accommodation.description} />
                </div>
              </div>
            </section>

            {/* Localisation */}
            <section className="bg-night-light border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-emerald-brand" /> Localisation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <InfoRow label="Région" value={accommodation.region} />
                <InfoRow label="Ville" value={accommodation.city} />
                <InfoRow label="Quartier" value={accommodation.district || 'N/A'} />
                <div className="md:col-span-2">
                  <InfoRow label="Adresse" value={accommodation.address} />
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-night-light border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Phone size={20} className="text-emerald-brand" /> Contact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <InfoRow label="Téléphone" value={accommodation.phone} />
                <InfoRow label="Email" value={accommodation.email || 'N/A'} />
                <InfoRow label="WhatsApp" value={accommodation.whatsapp || 'N/A'} />
                <InfoRow label="Site web" value={accommodation.website || 'N/A'} />
              </div>
            </section>

            {/* Capacité et tarifs */}
            <section className="bg-night-light border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <BedDouble size={20} className="text-emerald-brand" /> Capacité et Tarifs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <InfoRow label="Chambres" value={String(accommodation.roomsCount)} />
                <InfoRow label="Capacité" value={`${accommodation.capacity} personnes`} />
                <InfoRow label="Prix/nuit" value={`${accommodation.priceRange || 'N/A'} ${accommodation.currency}`} />
              </div>
            </section>

            {/* Équipements */}
            <section className="bg-night-light border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Wifi size={20} className="text-emerald-brand" /> Équipements
              </h2>
              {accommodation.amenities && accommodation.amenities.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {accommodation.amenities.map((amenity: string) => (
                    <span key={amenity} className="px-3 py-1 bg-emerald-brand/10 text-emerald-brand rounded-full text-sm">
                      {amenity}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-sm">Aucun équipement déclaré</p>
              )}
            </section>

            {/* Note admin précédente */}
            {accommodation.adminNote && (
              <section className="bg-night-light border border-blue-500/20 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-white mb-2">Note admin précédente</h2>
                <p className="text-sm text-white/80">{accommodation.adminNote}</p>
              </section>
            )}
          </div>

          {/* Colonne droite : Actions */}
          <div className="space-y-4">
            {/* Bouton Approuver */}
            <form action={approveAccommodation} className="bg-night-light border border-emerald-brand/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle size={20} className="text-emerald-brand" /> Approuver
              </h3>
              <p className="text-sm text-muted mb-4">
                L'établissement sera publié et visible publiquement.
              </p>
              <input type="hidden" name="id" value={accommodation._id.toString()} />
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
                Approuver l'établissement
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
              <input type="hidden" name="id" value={accommodation._id.toString()} />
              <textarea
                name="correctionRequest"
                placeholder="Détaillez les corrections nécessaires *"
                rows={3}
                required
                minLength={10}
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
            <form action={rejectAccommodation} className="bg-night-light border border-red-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <XCircle size={20} className="text-red-400" /> Refuser
              </h3>
              <p className="text-sm text-muted mb-4">
                L'établissement ne sera pas publié. Le propriétaire sera informé.
              </p>
              <input type="hidden" name="id" value={accommodation._id.toString()} />
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
                Refuser l'établissement
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant utilitaire pour afficher une ligne d'info
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted uppercase tracking-wide mb-1">{label}</div>
      <div className="text-white">{value}</div>
    </div>
  );
}