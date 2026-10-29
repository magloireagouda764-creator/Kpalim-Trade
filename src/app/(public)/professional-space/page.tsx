'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock, ArrowRight, Sparkles, AlertCircle, Building2 } from 'lucide-react';

export default function ProfessionalSpacePage() {
  const [inputCode, setInputCode] = useState('');
  const [inputName, setInputName] = useState('');
  const [step, setStep] = useState<'code' | 'name'>('code');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Nettoyer le code (enlever le tiret) et mettre en majuscule
    const cleanCode = inputCode.replace(/-/g, '').toUpperCase();
    
    if (cleanCode.length !== 6) {
      setError('Le code doit contenir exactement 6 caractères.');
      return;
    }
    
    // Passer à l'étape suivante
    setStep('name');
    setError('');
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputName.trim()) {
      setError('Veuillez entrer le nom de votre établissement.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Nettoyer le code
      const cleanCode = inputCode.replace(/-/g, '').toUpperCase();
      
      // Vérifier le code ET le nom
      const res = await fetch('/api/professional-space/verify-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: cleanCode,
          name: inputName.trim()
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Rediriger vers le dashboard
        window.location.href = `/professional-space/dashboard?code=${cleanCode}`;
      } else {
        setError(data.error || 'Code ou nom incorrect.');
      }
    } catch (err) {
      console.error('Erreur vérification:', err);
      setError('Erreur de connexion. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-night text-white p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Sparkles className="text-purple-400" /> Espace Professionnel
          </h1>
          <p className="text-muted mb-8 max-w-2xl mx-auto">
            Accédez à votre tableau de bord pour gérer vos clients, vos réservations et vos communications.
          </p>
        </div>

        {/* Formulaire en 2 étapes */}
        <div className="bg-night-light p-8 rounded-2xl border border-white/10 shadow-2xl">
          
          {step === 'code' ? (
            // ÉTAPE 1 : Saisie du code
            <form onSubmit={handleCodeSubmit}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Lock className="text-purple-400" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Étape 1/2</h2>
                  <p className="text-sm text-muted">Entrez votre code d'accès</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Votre code d'identification à 6 caractères
                </label>
                <input
                  type="text"
                  maxLength={7}
                  value={inputCode}
                  onChange={(e) => {
                    let val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                    if (val.length > 2 && val.length <= 6 && !val.includes('-')) {
                      val = val.slice(0, 2) + '-' + val.slice(2);
                    }
                    if (val.length > 7) val = val.slice(0, 7);
                    setInputCode(val);
                    setError('');
                  }}
                  placeholder="XX-XXXX"
                  className="w-full px-4 py-4 rounded-lg bg-gray-900 border border-gray-700 text-center text-2xl font-bold tracking-widest text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 uppercase"
                  autoFocus
                />
                <p className="text-xs text-muted mt-2">
                  Exemple : JH-PPQ8 (le code que vous avez reçu)
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
                  <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                Continuer <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            // ÉTAPE 2 : Saisie du nom de l'établissement
            <form onSubmit={handleNameSubmit}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <Building2 className="text-emerald-400" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Étape 2/2</h2>
                  <p className="text-sm text-muted">Confirmez le nom de votre établissement</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Nom exact de votre établissement
                </label>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => {
                    setInputName(e.target.value);
                    setError('');
                  }}
                  placeholder="Ex: Hôtel Le Palmier"
                  className="w-full px-4 py-4 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  autoFocus
                />
                <p className="text-xs text-muted mt-2">
                  Entrez le nom exact tel qu'il apparaît sur votre fiche
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
                  <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep('code');
                    setInputName('');
                    setError('');
                  }}
                  className="flex-1 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Vérification...
                    </>
                  ) : (
                    <>
                      Accéder à mon espace <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Appel à l'action pour les nouveaux */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-r from-purple-900/30 to-night-light border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-3">
            Vous n'avez pas encore d'établissement sur la plateforme ?
          </h3>
          <p className="text-muted mb-6 max-w-xl mx-auto">
            Proposez votre hôtel, auberge ou restaurant. Après validation par notre équipe, 
            vous recevrez votre code d'accès personnel unique.
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