'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Building2, MapPin, Phone, Mail, User } from 'lucide-react';
import Link from 'next/link';

export default function HotelReviewPage() {
  const params = useParams();
  const router = useRouter();
  const [hotel, setHotel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [action, setAction] = useState<'approve' | 'reject' | 'correct' | null>(null);
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchHotel() {
      try {
        const res = await fetch(`/api/admin/hotels/${params.id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Erreur de chargement');
        setHotel(data);
      } catch (err: any) {
        console.error('Erreur chargement hôtel:', err);
        setError(err.message || 'Erreur de chargement de la fiche');
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchHotel();
  }, [params.id]);

  const handleSubmit = async (status: string) => {
    setAction(status as any);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/hotels/${params.id}/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          rejectionReason: status === 'rejected' ? reason : undefined,
          correctionRequest: status === 'needs_correction' ? reason : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur lors de la validation');
      alert(status === 'approved' ? 'Hôtel approuvé avec succès !' : 'Action effectuée avec succès !');
      router.push('/admin/hotels');
    } catch (err: any) {
      alert('Erreur: ' + err.message);
    } finally {
      setSubmitting(false);
      setAction(null);
      setReason('');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <Link href="/admin/hotels" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
          <ArrowLeft size={20} /> Retour à la liste
        </Link>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-brand"></div>
        </div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="p-6">
        <Link href="/admin/hotels" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
          <ArrowLeft size={20} /> Retour à la liste
        </Link>
        <div className="text-center py-12 text-red-400">
          <AlertCircle size={48} className="mx-auto mb-4" />
          <p className="text-xl font-semibold">{error || 'Hôtel non trouvé'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Link href="/admin/hotels" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft size={20} /> Retour à la liste
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">{hotel.name}</h1>
        <div className="flex items-center gap-3 text-gray-400">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            hotel.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
            hotel.status === 'approved' ? 'bg-green-500/20 text-green-300' :
            hotel.status === 'rejected' ? 'bg-red-500/20 text-red-300' :
            'bg-orange-500/20 text-orange-300'
          }`}>
            {hotel.status === 'pending' ? 'En attente' :
             hotel.status === 'approved' ? 'Approuvé' :
             hotel.status === 'rejected' ? 'Refusé' : 'À corriger'}
          </span>
          <span>•</span>
          <span>Créé le {new Date(hotel.createdAt).toLocaleDateString('fr-FR')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Building2 size={20} className="text-emerald-brand" /> Informations générales
          </h2>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-400 mb-1">Type d'établissement</p>
              <p className="text-white font-medium">{hotel.type === 'hotel' ? 'Hôtel' : 'Hébergement'}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Localisation</p>
              <p className="text-white font-medium flex items-center gap-2">
                <MapPin size={14} /> {hotel.city}, {hotel.region}
              </p>
              {hotel.address && <p className="text-gray-300 text-xs mt-1">{hotel.address}</p>}
            </div>
            {hotel.capacity && (
              <div>
                <p className="text-gray-400 mb-1">Capacité</p>
                <p className="text-white font-medium">{hotel.capacity} personnes</p>
              </div>
            )}
            {hotel.priceRange && (
              <div>
                <p className="text-gray-400 mb-1">Gamme de prix</p>
                <p className="text-white font-medium">{hotel.priceRange} {hotel.currency || 'XOF'}</p>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <User size={20} className="text-emerald-brand" /> Propriétaire
          </h2>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-400 mb-1">Nom</p>
              <p className="text-white font-medium">{hotel.ownerName || 'Non spécifié'}</p>
            </div>
            {hotel.email && (
              <div>
                <p className="text-gray-400 mb-1">Email</p>
                <p className="text-white font-medium flex items-center gap-2">
                  <Mail size={14} /> {hotel.email}
                </p>
              </div>
            )}
            {hotel.phone && (
              <div>
                <p className="text-gray-400 mb-1">Téléphone</p>
                <p className="text-white font-medium flex items-center gap-2">
                  <Phone size={14} /> {hotel.phone}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {hotel.description && (
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Description</h2>
          <p className="text-gray-300 whitespace-pre-line">{hotel.description}</p>
        </div>
      )}

      {hotel.status === 'rejected' && hotel.rejectionReason && (
        <div className="rounded-lg border border-red-700 bg-red-900/20 p-6 mb-6">
          <h3 className="text-lg font-bold text-red-300 mb-2 flex items-center gap-2">
            <XCircle size={20} /> Motif du refus
          </h3>
          <p className="text-red-200">{hotel.rejectionReason}</p>
        </div>
      )}

      {hotel.status === 'needs_correction' && hotel.correctionRequest && (
        <div className="rounded-lg border border-orange-700 bg-orange-900/20 p-6 mb-6">
          <h3 className="text-lg font-bold text-orange-300 mb-2 flex items-center gap-2">
            <AlertCircle size={20} /> Corrections demandées
          </h3>
          <p className="text-orange-200">{hotel.correctionRequest}</p>
        </div>
      )}

      {hotel.status === 'pending' && (
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Actions de validation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => handleSubmit('approved')}
              disabled={submitting}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              <CheckCircle size={20} /> Approuver
            </button>
            <button
              onClick={() => setAction('reject')}
              disabled={submitting}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              <XCircle size={20} /> Refuser
            </button>
            <button
              onClick={() => setAction('correct')}
              disabled={submitting}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              <AlertCircle size={20} /> Demander corrections
            </button>
          </div>

          {(action === 'reject' || action === 'correct') && (
            <div className="border-t border-gray-700 pt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {action === 'reject' ? 'Motif du refus' : 'Corrections demandées'}
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-emerald-brand focus:ring-1 focus:ring-emerald-brand outline-none resize-none"
                rows={4}
                placeholder="Expliquez la raison..."
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleSubmit(action === 'reject' ? 'rejected' : 'needs_correction')}
                  disabled={submitting || !reason.trim()}
                  className="px-6 py-2 bg-emerald-brand hover:bg-emerald-light disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                  {submitting ? 'Envoi...' : 'Confirmer'}
                </button>
                <button
                  onClick={() => { setAction(null); setReason(''); }}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}