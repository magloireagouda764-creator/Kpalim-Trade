'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Building2, Hotel, UtensilsCrossed, Lock, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export default function ProfessionalSpacePage() {
  const [inputCode, setInputCode] = useState('');
  const [establishments, setEstablishments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Charger les établissements approuvés depuis la base de données
  useEffect(() => {
    async function fetchEstablishments() {
      try {
        const res = await fetch('/api/professional-space/list');
        const data = await res.json();
        if (data.success) {
          setEstablishments(data.data);
        }
      } catch (err) {
        console.error('Erreur chargement:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEstablishments();
  }, []);

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.length !== 4) {
      setError('Le code doit contenir exactement 4 chiffres.');
      return;
    }
    // Rediriger vers le dashboard avec le code en paramètre
    window.location.href = `/professional-space/dashboard?code=${inputCode}`;
  };

  const getIcon = (type: string) => {
    if (type === 'hotel') return Hotel;
    if (type === 'restaurant') return UtensilsCrossed;
    return Building2;
  };

  const getColor = (index: number) => {
    const colors = [
      'from-blue-500/20 to-blue-500/5 border-blue-500/30 hover:border-blue-400',
      'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 hover:border-emerald-400',
      'from-purple-500/20 to-purple-500/5 border-purple-500/30 hover:border-purple-400',
      'from-orange-500/20 to-orange-500/5 border-orange-500/30 hover:border-orange-400',
      'from-pink-500/20 to-pink-500/5 border-pink-500/30 hover:border-pink-400',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-night text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* En-tête et Barre de code */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Sparkles className="text-purple-400" /> Espace Professionnel
          </h1>
          <p className="text-muted mb-8 max-w-2xl mx-auto">
            Accédez à votre tableau de bord pour gérer vos clients, vos réservations et vos communications.
          </p>

          {/* Barre de saisie du code */}
          <form onSubmit={handleCodeSubmit} className="max-w-md mx-auto bg-night-light p-6 rounded-xl border border-white/10 shadow-2xl">
            <label className="block text-sm font-semibold text-gray-300 mb-3 text-center">
              Saisissez votre code d'accès à 4 chiffres
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                maxLength={4}
                value={inputCode}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, ''); // Force uniquement des chiffres
                  setInputCode(val);
                  setError('');
                }}
                placeholder="0000"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-center text-2xl font-bold tracking-widest text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <Lock size={18} /> Entrer
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-sm mt-3 text-center flex items-center justify-center gap-2">
                <AlertCircle size={14} /> {error}
              </p>
            )}
          </form>
        </div>

        {/* Séparateur */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-muted text-sm uppercase tracking-wider font-semibold">Établissements validés sur la plateforme</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        {/* Grille des rectangles (Établissements dynamiques) */}
        {loading ? (
          <div className="text-center py-12 text-muted">Chargement des établissements...</div>
        ) : establishments.length === 0 ? (
          <div className="text-center py-12 text-muted bg-night-light rounded-xl border border-white/5 p-8">
            <Building2 size={48} className="mx-auto mb-4 opacity-50" />
            <p>Aucun établissement n'est encore validé pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {establishments.map((item, index) => {
              const Icon = getIcon(item.type);
              return (
                <div
                  key={item._id}
                  onClick={() => {
                    setInputCode('');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setTimeout(() => {
                      alert(`Pour accéder à l'espace de "${item.name}", veuillez saisir votre code personnel à 4 chiffres dans la barre en haut de cette page.`);
                    }, 300);
                  }}
                  className={`group relative overflow-hidden rounded-xl border bg-gradient-to-br p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${getColor(index)}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                      <Icon size={28} className="text-white" />
                    </div>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-white/10 text-white/80 capitalize">
                      {item.type === 'hotel' ? 'Hôtel' : item.type === 'restaurant' ? 'Restaurant' : item.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">{item.city}, {item.region}</p>
                  <div className="flex items-center gap-2 text-xs text-purple-300 font-medium">
                    <Lock size={14} /> Accès réservé au propriétaire
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Appel à l'action pour les nouveaux */}
        <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-purple-900/30 to-night-light border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-3">Vous n'avez pas encore d'établissement sur la plateforme ?</h3>
          <p className="text-muted mb-6 max-w-xl mx-auto">
            Proposez votre hôtel, auberge ou restaurant. Après validation par notre équipe, vous recevrez votre code d'accès personnel par notification.
          </p>
          <Link
            href="/professional-space/propose"
            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-purple-600/20"
          >
            Proposer mon établissement <ArrowRight size={20} />
          </Link>
        </div>

      </div>
    </div>
  );
}