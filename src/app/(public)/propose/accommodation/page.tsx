'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, MapPin, Phone, Users, FileText, AlertCircle } from 'lucide-react';

export default function ProposeAccommodationPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    type: 'hotel',
    name: '',
    shortDescription: '',
    description: '',
    region: '',
    city: '',
    address: '',
    phone: '',
    email: '',
    ownerName: '',
    capacity: '',
    roomsCount: '',
    priceRange: '',
    amenities: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/accommodations/propose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de la soumission');
      }

      // Rediriger vers la page de confirmation avec le code généré
      router.push(`/propose/accommodation/confirmation?code=${result.data.code}&id=${result.data.accommodationId}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const amenitiesList = [
    'WiFi', 'Parking', 'Climatisation', 'Piscine', 'TV',
    'Restaurant intégré', 'Room service', 'Coffre-fort',
    'Accès handicapés', 'Animaux acceptés', 'Petit-déjeuner', 'Bar',
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Message informatif au lieu du code */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-white shrink-0 mt-1" size={24} />
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Important : Code d'identification unique</h2>
              <p className="text-white/90 text-sm leading-relaxed">
                Après la soumission de votre formulaire, un <strong>code d'identification unique à 6 caractères</strong> vous sera attribué. 
                Ce code vous permettra d'accéder à votre espace professionnel après validation par notre équipe. 
                <br /><br />
                <strong>️ Conservez-le précieusement !</strong> Il vous sera demandé à chaque connexion.
              </p>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
          <h1 className="text-3xl font-bold text-white mb-2">Proposer mon établissement</h1>
          <p className="text-gray-400 mb-8">Remplissez ce formulaire pour soumettre votre établissement à validation.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 flex items-center gap-3">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Type d'établissement */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Building2 size={20} /> Type d'établissement
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="hotel"> Hôtel</option>
                    <option value="guesthouse">🏡 Auberge / Maison d'hôtes</option>
                    <option value="restaurant">🍽️ Restaurant</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nom de l'établissement *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    minLength={3}
                    placeholder="Ex: Hôtel Le Palmier"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </section>

            {/* Section 2: Description */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <FileText size={20} /> Description
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description courte <span className="text-gray-500">(optionnelle, max 150 caractères)</span>
                  </label>
                  <input
                    type="text"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    maxLength={150}
                    placeholder="Ex: Hôtel de luxe au cœur de Lomé"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description détaillée <span className="text-gray-500">(optionnelle)</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Décrivez votre établissement en détail..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none resize-none"
                  />
                </div>
              </div>
            </section>

            {/* Section 3: Localisation */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin size={20} /> Localisation
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Région *</label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Maritime">Maritime</option>
                    <option value="Plateaux">Plateaux</option>
                    <option value="Centrale">Centrale</option>
                    <option value="Kara">Kara</option>
                    <option value="Savanes">Savanes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Ville *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Lomé"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Adresse complète *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Ex: 123 Rue de la Paix"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </section>

            {/* Section 4: Contact */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Phone size={20} /> Contact
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Téléphone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+228 90 00 00 00"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="contact@exemple.com"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nom du propriétaire *</label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom complet"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </section>

            {/* Section 5: Capacité (uniquement pour hôtels/auberges) */}
            {formData.type !== 'restaurant' && (
              <section>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Users size={20} /> Capacité
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Capacité totale (personnes)</label>
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      min="1"
                      placeholder="Ex: 50"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Nombre de chambres</label>
                    <input
                      type="number"
                      name="roomsCount"
                      value={formData.roomsCount}
                      onChange={handleChange}
                      min="1"
                      placeholder="Ex: 20"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Fourchette de prix</label>
                    <input
                      type="text"
                      name="priceRange"
                      value={formData.priceRange}
                      onChange={handleChange}
                      placeholder="Ex: 15000 - 35000 FCFA"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Section 6: Équipements */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <FileText size={20} /> Équipements & Services
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {amenitiesList.map((amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center gap-2 p-3 bg-gray-900 border border-gray-700 rounded-lg cursor-pointer hover:border-emerald-500 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="w-4 h-4 text-emerald-500 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500"
                    />
                    <span className="text-sm text-white">{amenity}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Bouton de soumission */}
            <div className="flex justify-end pt-6 border-t border-gray-700">
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Soumission en cours...
                  </>
                ) : (
                  'Soumettre ma fiche'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}