'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, Image as ImageIcon } from 'lucide-react';

export default function AdminReviewPage({ params }: { params: Promise<{ resource: string; id: string }> }) {
  const router = useRouter();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState<'approved' | 'rejected' | 'needs_correction' | ''>('');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { resource, id } = await params;
        const res = await fetch(`/api/admin/${resource}/${id}`);
        const result = await res.json();
        
        if (result.success) {
          setItem(result.data);
        } else {
          setError(result.error || 'Fiche introuvable');
        }
      } catch (err) {
        setError('Erreur de chargement de la fiche');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!action) return;
    if ((action === 'rejected' || action === 'needs_correction') && !reason.trim()) {
      setError('Veuillez fournir un motif pour cette décision.');
      return;
    }

    setSubmitting(true);
    setError('');
    const { resource, id } = await params;

    try {
      const res = await fetch(`/api/admin/${resource}/${id}/review`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: action, reason: reason.trim() }),
      });

      const result = await res.json();
      if (!result.success) {
        throw new Error(result.error || 'Échec de la mise à jour');
      }

      // Succès : retour à la liste avec le filtre mis à jour
      router.push(`/admin/${resource}?status=${action === 'approved' ? 'approved' : 'pending'}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto text-gray-100">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft size={18} /> Retour à la liste
      </button>

      {loading ? (
        <p className="text-center py-12">Chargement de la fiche...</p>
      ) : !item ? (
        <p className="text-center py-12 text-red-400">{error || 'Fiche introuvable.'}</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Colonne de gauche : Détails de la fiche */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold text-white">{item.name}</h1>
                <span className={`px-3 py-1 rounded text-xs font-bold uppercase ${
                  item.status === 'approved' ? 'bg-green-900 text-green-300' :
                  item.status === 'rejected' ? 'bg-red-900 text-red-300' :
                  item.status === 'needs_correction' ? 'bg-orange-900 text-orange-300' :
                  'bg-yellow-900 text-yellow-300'
                }`}>
                  {item.status === 'needs_correction' ? 'À corriger' : item.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-6">
                <div><span className="text-gray-500">Propriétaire :</span> {item.ownerName || 'Inconnu'}</div>
                <div><span className="text-gray-500">Région :</span> {item.region || 'Non spécifiée'}</div>
                <div><span className="text-gray-500">Ville :</span> {item.city || 'Non spécifiée'}</div>
                <div><span className="text-gray-500">Soumis le :</span> {new Date(item.createdAt).toLocaleDateString('fr-FR')}</div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-white mb-2">Description</h3>
                <p className="text-gray-300 whitespace-pre-line">{item.description}</p>
              </div>

              {/* Champs spécifiques adaptatifs */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {'price' in item && (
                  <div className="bg-gray-900 p-3 rounded border border-gray-700">
                    <span className="text-gray-500 text-xs block">Prix</span>
                    <span className="text-green-400 font-bold">{item.price} FCFA</span>
                  </div>
                )}
                {'stock' in item && (
                  <div className="bg-gray-900 p-3 rounded border border-gray-700">
                    <span className="text-gray-500 text-xs block">Stock</span>
                    <span className="text-white font-bold">{item.stock}</span>
                  </div>
                )}
                {'startDate' in item && (
                  <div className="bg-gray-900 p-3 rounded border border-gray-700 col-span-2">
                    <span className="text-gray-500 text-xs block">Date de l'événement</span>
                    <span className="text-white font-bold">
                      {new Date(item.startDate).toLocaleDateString('fr-FR')} 
                      {item.endDate && ` au ${new Date(item.endDate).toLocaleDateString('fr-FR')}`}
                    </span>
                  </div>
                )}
                {'category' in item && (
                  <div className="bg-gray-900 p-3 rounded border border-gray-700">
                    <span className="text-gray-500 text-xs block">Catégorie / Type</span>
                    <span className="text-white font-bold capitalize">{item.category || item.type}</span>
                  </div>
                )}
              </div>

              {/* Images */}
              {item.images && item.images.length > 0 && (
                <div>
                  <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <ImageIcon size={16} /> Médias ({item.images.length})
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {item.images.map((img: any, idx: number) => (
                      <div key={idx} className="aspect-square bg-gray-900 rounded overflow-hidden border border-gray-700">
                        <img src={img.secure_url} alt="Media" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Colonne de droite : Actions Admin */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 sticky top-6">
              <h2 className="text-lg font-bold text-white mb-4">Décision administrative</h2>
              
              {error && (
                <div className="mb-4 p-3 bg-red-900/30 border border-red-700 text-red-300 text-sm rounded">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-3 rounded border border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors">
                    <input type="radio" name="action" value="approved" checked={action === 'approved'} onChange={(e) => setAction(e.target.value as any)} className="text-green-500 focus:ring-green-500" />
                    <CheckCircle size={18} className="text-green-500" />
                    <span className="text-sm font-medium">Approuver et publier</span>
                  </label>

                  <label className="flex items-center gap-2 p-3 rounded border border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors">
                    <input type="radio" name="action" value="needs_correction" checked={action === 'needs_correction'} onChange={(e) => setAction(e.target.value as any)} className="text-orange-500 focus:ring-orange-500" />
                    <AlertTriangle size={18} className="text-orange-500" />
                    <span className="text-sm font-medium">Demander des corrections</span>
                  </label>

                  <label className="flex items-center gap-2 p-3 rounded border border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors">
                    <input type="radio" name="action" value="rejected" checked={action === 'rejected'} onChange={(e) => setAction(e.target.value as any)} className="text-red-500 focus:ring-red-500" />
                    <XCircle size={18} className="text-red-500" />
                    <span className="text-sm font-medium">Refuser définitivement</span>
                  </label>
                </div>

                {(action === 'needs_correction' || action === 'rejected') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Motif {action === 'rejected' ? 'du refus' : 'des corrections'} <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      rows={4}
                      className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white text-sm focus:border-orange-500 focus:outline-none resize-none"
                      placeholder="Expliquez clairement la raison au propriétaire..."
                      required
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!action || submitting}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:text-gray-500 text-white font-bold rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  {submitting ? 'Traitement...' : 'Confirmer la décision'}
                </button>
              </form>

              {/* Historique des décisions (si existant) */}
              {item.status === 'rejected' && item.rejectionReason && (
                <div className="mt-6 p-3 bg-red-900/20 border border-red-800 rounded text-xs text-red-300">
                  <strong>Dernier refus :</strong> {item.rejectionReason}
                </div>
              )}
              {item.status === 'needs_correction' && item.correctionRequest && (
                <div className="mt-6 p-3 bg-orange-900/20 border border-orange-800 rounded text-xs text-orange-300">
                  <strong>Correction demandée :</strong> {item.correctionRequest}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}