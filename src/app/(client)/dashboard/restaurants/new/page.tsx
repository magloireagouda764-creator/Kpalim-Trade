"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Utensils, MapPin, Clock, CreditCard, CheckCircle, AlertCircle, Loader2, Plus, X } from "lucide-react";

type RestaurantType = "restaurant" | "maquis" | "fast_food" | "street_food" | "cafeteria" | "snack";
type TogoRegion = "Maritime" | "Plateaux" | "Centrale" | "Kara" | "Savanes";
type PriceRange = "budget" | "moderate" | "expensive" | "luxury";

interface FormData {
  name: string;
  type: RestaurantType;
  description: string;
  ownerName: string;
  phone: string;
  email: string;
  region: TogoRegion;
  city: string;
  district: string;
  address: string;
  cuisines: string[];
  specialties: string[];
  priceRange: PriceRange;
  averagePrice: number;
  currency: string;
  services: string[];
  paymentMethods: string[];
  verificationConfirmed: boolean;
}

const CUISINES_LIST = [
  "Togolaise", "Africaine", "Française", "Italienne", "Chinoise", 
  "Libanaise", "Indienne", "Japonaise", "Américaine", "Végétarienne", "Autre"
];

const SERVICES_LIST = [
  { id: "terrasse", label: "Terrasse" },
  { id: "parking", label: "Parking" },
  { id: "wifi", label: "Wi-Fi gratuit" },
  { id: "livraison", label: "Livraison" },
  { id: "emporter", label: "À emporter" },
  { id: "reservation", label: "Réservation" },
  { id: "climatisation", label: "Climatisation" },
  { id: "musique", label: "Musique live" },
];

const PAYMENT_METHODS = [
  { id: "cash", label: "Espèces" },
  { id: "mobile_money", label: "Mobile Money" },
  { id: "carte", label: "Carte bancaire" },
  { id: "cheque", label: "Chèque" },
];

const PRICE_LABELS: Record<PriceRange, string> = {
  budget: "Budget (moins de 3000 XOF)",
  moderate: "Modéré (3000 - 8000 XOF)",
  expensive: "Cher (8000 - 20000 XOF)",
  luxury: "Luxe (plus de 20000 XOF)",
};

export default function NewRestaurantPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newCuisine, setNewCuisine] = useState("");
  const [newSpecialty, setNewSpecialty] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "restaurant",
    description: "",
    ownerName: "",
    phone: "",
    email: "",
    region: "Maritime",
    city: "",
    district: "",
    address: "",
    cuisines: [],
    specialties: [],
    priceRange: "moderate",
    averagePrice: 0,
    currency: "XOF",
    services: [],
    paymentMethods: [],
    verificationConfirmed: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value
    }));
    setError("");
  };

  const toggleService = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId) 
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const togglePayment = (paymentId: string) => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(paymentId) 
        ? prev.paymentMethods.filter(p => p !== paymentId)
        : [...prev.paymentMethods, paymentId]
    }));
  };

  const toggleCuisine = (cuisine: string) => {
    setFormData(prev => ({
      ...prev,
      cuisines: prev.cuisines.includes(cuisine) 
        ? prev.cuisines.filter(c => c !== cuisine)
        : [...prev.cuisines, cuisine]
    }));
  };

  const addCuisine = () => {
    if (newCuisine.trim() && !formData.cuisines.includes(newCuisine.trim())) {
      setFormData(prev => ({ ...prev, cuisines: [...prev.cuisines, newCuisine.trim()] }));
      setNewCuisine("");
    }
  };

  const removeCuisine = (cuisine: string) => {
    setFormData(prev => ({ ...prev, cuisines: prev.cuisines.filter(c => c !== cuisine) }));
  };

  const addSpecialty = () => {
    if (newSpecialty.trim() && !formData.specialties.includes(newSpecialty.trim())) {
      setFormData(prev => ({ ...prev, specialties: [...prev.specialties, newSpecialty.trim()] }));
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (specialty: string) => {
    setFormData(prev => ({ ...prev, specialties: prev.specialties.filter(s => s !== specialty) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.phone || !formData.ownerName) {
      setError("Veuillez remplir tous les champs obligatoires (*).");
      return;
    }
    if (formData.cuisines.length === 0) {
      setError("Veuillez sélectionner au moins une cuisine.");
      return;
    }
    if (!formData.verificationConfirmed) {
      setError("Vous devez confirmer l'exactitude des informations.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = { 
        ...formData, 
        ownerId: "674f3b8e9c8d4e001f8b4567", // TODO: Remplacer par l'ID réel
      };
      
      const res = await fetch("/api/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();

      if (data.success) {
        router.push(`/dashboard/restaurants/pending?region=${formData.region}`);
      } else {
        setError(data.error || "Une erreur est survenue.");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-night py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/dashboard/restaurants" className="inline-flex items-center gap-2 text-muted hover:text-white mb-4 transition-colors">
            <ArrowLeft size={18} /> Retour au tableau de bord
          </Link>
          <h1 className="text-3xl font-bold text-white">Ajouter un nouveau restaurant</h1>
          <p className="text-muted mt-2">Les champs marqués d'un <span className="text-red-400">*</span> sont obligatoires.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-md bg-red-500/10 border border-red-500/30 text-red-300 flex items-start gap-3">
            <AlertCircle className="shrink-0 mt-0.5" size={20} />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION A : Informations générales */}
          <section className="bg-night-light border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Utensils size={20} className="text-orange-brand" /> A. Informations générales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/80 mb-1">Nom du restaurant *</label>
                <input name="name" value={formData.name} onChange={handleChange} required className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-orange-brand focus:outline-none" placeholder="Ex: Le Maquis du Port" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Type d'établissement *</label>
                <select name="type" value={formData.type} onChange={handleChange} required className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-orange-brand focus:outline-none">
                  <option value="restaurant">Restaurant</option>
                  <option value="maquis">Maquis</option>
                  <option value="fast_food">Fast-food</option>
                  <option value="street_food">Street food</option>
                  <option value="cafeteria">Cafétéria</option>
                  <option value="snack">Snack</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Nom du responsable *</label>
                <input name="ownerName" value={formData.ownerName} onChange={handleChange} required className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-orange-brand focus:outline-none" placeholder="Votre nom complet" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/80 mb-1">Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-orange-brand focus:outline-none" placeholder="Décrivez votre restaurant, son ambiance, ses spécialités..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Téléphone professionnel *</label>
                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-orange-brand focus:outline-none" placeholder="+228 XX XX XX XX" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Adresse e-mail</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-orange-brand focus:outline-none" placeholder="contact@exemple.com" />
              </div>
            </div>
          </section>

          {/* SECTION B : Localisation */}
          <section className="bg-night-light border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-orange-brand" /> B. Localisation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Région *</label>
                <select name="region" value={formData.region} onChange={handleChange} required className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-orange-brand focus:outline-none">
                  <option value="Maritime">Maritime</option>
                  <option value="Plateaux">Plateaux</option>
                  <option value="Centrale">Centrale</option>
                  <option value="Kara">Kara</option>
                  <option value="Savanes">Savanes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Ville / Localité *</label>
                <input name="city" value={formData.city} onChange={handleChange} required className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-orange-brand focus:outline-none" placeholder="Ex: Lomé, Kpalimé..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Quartier</label>
                <input name="district" value={formData.district} onChange={handleChange} className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-orange-brand focus:outline-none" placeholder="Ex: Bè, Tokoin..." />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/80 mb-1">Adresse précise *</label>
                <input name="address" value={formData.address} onChange={handleChange} required className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-orange-brand focus:outline-none" placeholder="Ex: Rue de la Paix, face à la pharmacie..." />
              </div>
            </div>
          </section>

          {/* SECTION C : Cuisines et Spécialités */}
          <section className="bg-night-light border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Utensils size={20} className="text-orange-brand" /> C. Cuisines et Spécialités
            </h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/80 mb-2">Types de cuisine proposés *</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {CUISINES_LIST.map((cuisine) => {
                  const isSelected = formData.cuisines.includes(cuisine);
                  return (
                    <button
                      key={cuisine}
                      type="button"
                      onClick={() => toggleCuisine(cuisine)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        isSelected 
                          ? "bg-orange-brand text-white" 
                          : "bg-night border border-white/10 text-muted hover:border-white/30"
                      }`}
                    >
                      {cuisine}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCuisine}
                  onChange={(e) => setNewCuisine(e.target.value)}
                  placeholder="Autre cuisine..."
                  className="flex-1 bg-night border border-white/10 rounded-md px-4 py-2 text-white focus:border-orange-brand focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCuisine())}
                />
                <button type="button" onClick={addCuisine} className="px-4 py-2 bg-orange-brand text-white rounded-md hover:bg-orange-600 transition-colors">
                  <Plus size={16} />
                </button>
              </div>
              {formData.cuisines.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.cuisines.map((cuisine) => (
                    <span key={cuisine} className="inline-flex items-center gap-1 px-3 py-1 bg-orange-brand/20 text-orange-brand rounded-full text-sm">
                      {cuisine}
                      <button type="button" onClick={() => removeCuisine(cuisine)} className="hover:text-red-400">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Spécialités / Plats phares</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  placeholder="Ex: Poisson braisé, Aloko..."
                  className="flex-1 bg-night border border-white/10 rounded-md px-4 py-2 text-white focus:border-orange-brand focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
                />
                <button type="button" onClick={addSpecialty} className="px-4 py-2 bg-orange-brand text-white rounded-md hover:bg-orange-600 transition-colors">
                  <Plus size={16} />
                </button>
              </div>
              {formData.specialties.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.specialties.map((specialty) => (
                    <span key={specialty} className="inline-flex items-center gap-1 px-3 py-1 bg-orange-brand/20 text-orange-brand rounded-full text-sm">
                      {specialty}
                      <button type="button" onClick={() => removeSpecialty(specialty)} className="hover:text-red-400">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* SECTION D : Tarifs */}
          <section className="bg-night-light border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <CreditCard size={20} className="text-orange-brand" /> D. Tarifs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Gamme de prix *</label>
                <select name="priceRange" value={formData.priceRange} onChange={handleChange} required className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-orange-brand focus:outline-none">
                  {Object.entries(PRICE_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Prix moyen par personne (XOF)</label>
                <input name="averagePrice" type="number" min="0" value={formData.averagePrice} onChange={handleChange} className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-orange-brand focus:outline-none" placeholder="Ex: 5000" />
              </div>
            </div>
          </section>

          {/* SECTION E : Services */}
          <section className="bg-night-light border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle size={20} className="text-orange-brand" /> E. Services proposés
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {SERVICES_LIST.map((service) => {
                const isChecked = formData.services.includes(service.id);
                return (
                  <label key={service.id} className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-all ${isChecked ? "bg-orange-brand/10 border-orange-brand/50 text-white" : "bg-night border-white/10 text-muted hover:border-white/30"}`}>
                    <input type="checkbox" className="sr-only" checked={isChecked} onChange={() => toggleService(service.id)} />
                    <span className="text-sm font-medium">{service.label}</span>
                  </label>
                );
              })}
            </div>
          </section>

          {/* SECTION F : Modes de paiement */}
          <section className="bg-night-light border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <CreditCard size={20} className="text-orange-brand" /> F. Modes de paiement acceptés
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {PAYMENT_METHODS.map((payment) => {
                const isChecked = formData.paymentMethods.includes(payment.id);
                return (
                  <label key={payment.id} className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-all ${isChecked ? "bg-orange-brand/10 border-orange-brand/50 text-white" : "bg-night border-white/10 text-muted hover:border-white/30"}`}>
                    <input type="checkbox" className="sr-only" checked={isChecked} onChange={() => togglePayment(payment.id)} />
                    <span className="text-sm font-medium">{payment.label}</span>
                  </label>
                );
              })}
            </div>
          </section>

          {/* SECTION G : Vérification */}
          <section className="bg-night-light border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle size={20} className="text-orange-brand" /> G. Vérification
            </h2>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={formData.verificationConfirmed} onChange={(e) => setFormData(prev => ({ ...prev, verificationConfirmed: e.target.checked }))} className="mt-1 w-5 h-5 rounded border-white/30 bg-night text-orange-brand focus:ring-orange-brand" />
              <span className="text-sm text-muted leading-relaxed">
                Je certifie que les informations fournies sont exactes et que j'accepte qu'elles soient utilisées sur la plateforme après validation. <span className="text-red-400">*</span>
              </span>
            </label>
          </section>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-orange-brand text-white font-semibold hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              {loading ? "Enregistrement..." : "Enregistrer et soumettre"}
            </button>
            <Link href="/dashboard/restaurants" className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-white/5 text-white font-semibold hover:bg-white/10 border border-white/10 transition-all">
              Annuler
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}