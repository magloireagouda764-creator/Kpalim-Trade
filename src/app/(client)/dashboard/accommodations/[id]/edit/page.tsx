'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

export default function EditAccommodationPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { id } = await params;
        const res = await fetch(`/api/dashboard/accommodations/${id}`);
        const result = await res.json();

        if (!result.success) {
          setError(result.error || 'Erreur de chargement');
        } else {
          if (result.data.status === 'pending' || result.data.status === 'approved') {
            setError(`Impossible de modifier cette fiche : statut "${result.data.status}".`);
          } else {
            const data = result.data;
            data.amenitiesString = Array.isArray(data.amenities) ? data.amenities.join(', ') : '';
            setFormData(data);
          }
        }
      } catch (err) {
        setError('Erreur de connexion au serveur');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const { id } = await params;
      const payload = {
        ...formData,
        amenities: formData.amenitiesString ? formData.amenitiesString.split(',').map((a: string) => a.trim()).filter(Boolean) : [],
      };

      const res = await fetch(`/api/dashboard/accommodations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!result.success) throw new Error(result.error || 'Échec de la mise à jour');

      router.push('/dashboard/accommodations');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6 text-white">Chargement des données...</div>;

  if (error && !formData) {
    return (
      <div className="p-6">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
          <ArrowLeft size={18} /> Retour
        </button>
        <div className="p-4 rounded-md bg-red-500/10 border border-red-500/30 text-red-300 flex items-center gap-3">
          <AlertCircle size={20} /> {error}
        </div>
        <button onClick={() => router.push('/dashboard/accommodations')} className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors">
          Retour à mes établissements
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft size={18} /> Retour à la liste
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Modifier l'établissement</h1>
        <p className="text-muted text-sm">Toute modification soumettra à nouveau votre fiche à la validation administrative.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-md bg-red-500/10 border border-red-500/30 text-red-300 flex items-center gap-3">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-night-light border border-white/10 rounded-md p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Nom de l'établissement *</label>
            <input type="text" name="name" value={formData.name || ''} onChange={handleChange} required className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-emerald-brand focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Type d'hébergement *</label>
            <select name="type" value={formData.type || 'hotel'} onChange={handleChange} required className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-emerald-brand focus:outline-none">
              <option value="hotel">Hôtel</option>
              <option value="guesthouse">Maison d'hôtes</option>
              <option value="auberge">Auberge</option>
              <option value="apartment">Appartement</option>
              <option value="campement">Campement</option>
              <option value="gite">Gîte</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Description *</label>
          <textarea name="description" value={formData.description || ''} onChange={handleChange} required rows={4} className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-emerald-brand focus:outline-none resize-none" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Région *</label>
            <select name="region" value={formData.region || ''} onChange={handleChange} required className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-emerald-brand focus:outline-none">
              <option value="Maritime">Maritime</option>
              <option value="Plateaux">Plateaux</option>
              <option value="Centrale">Centrale</option>
              <option value="Kara">Kara</option>
              <option value="Savanes">Savanes</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Ville *</label>
            <input type="text" name="city" value={formData.city || ''} onChange={handleChange} required className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-emerald-brand focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Adresse complète *</label>
            <input type="text" name="address" value={formData.address || ''} onChange={handleChange} required className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-emerald-brand focus:outline-none" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Téléphone *</label>
            <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} required className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-emerald-brand focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Capacité totale (personnes) *</label>
            <input type="number" name="capacity" value={formData.capacity || ''} onChange={handleChange} required min="1" className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-emerald-brand focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Nombre de chambres *</label>
            <input type="number" name="roomsCount" value={formData.roomsCount || ''} onChange={handleChange} required min="1" className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-emerald-brand focus:outline-none" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Fourchette de prix</label>
            <input type="text" name="priceRange" value={formData.priceRange || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-emerald-brand focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Équipements (séparés par des virgules)</label>
            <input type="text" name="amenitiesString" value={formData.amenitiesString || ''} onChange={handleChange} placeholder="Wifi, Piscine, Climatisation..." className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-emerald-brand focus:outline-none" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/10">
          <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-md bg-white/5 hover:bg-white/10 text-white font-medium transition-colors">Annuler</button>
          <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            <Save size={18} /> {submitting ? 'Soumission...' : 'Enregistrer et soumettre'}
          </button>
        </div>
      </form>
    </div>
  );
}