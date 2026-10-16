"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Building2, MapPin, BedDouble, Wifi, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type AccommodationType = "hotel" | "guesthouse" | "auberge" | "apartment" | "campement" | "gite";
type TogoRegion = "Maritime" | "Plateaux" | "Centrale" | "Kara" | "Savanes";

interface FormData {
  name: string;
  type: AccommodationType;
  description: string;
  phone: string;
  email: string;
  region: TogoRegion;
  city: string;
  district: string;
  address: string;
  capacity: number;
  roomsCount: number;
  priceRange: string;
  currency: string;
  amenities: string[];
}

const AMENITIES_LIST = [
  { id: "wifi", label: "Wi-Fi", icon: Wifi },
  { id: "climatisation", label: "Climatisation", icon: Building2 },
  { id: "parking", label: "Parking", icon: MapPin },
  { id: "restaurant", label: "Restaurant", icon: Building2 },
  { id: "piscine", label: "Piscine", icon: Building2 },
  { id: "petit_dejeuner", label: "Petit-déjeuner", icon: Building2 },
];

export default function EditAccommodationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "hotel",
    description: "",
    phone: "",
    email: "",
    region: "Maritime",
    city: "",
    district: "",
    address: "",
    capacity: 1,
    roomsCount: 1,
    priceRange: "",
    currency: "XOF",
    amenities: [],
  });

  // Charger les données de l'établissement
  useEffect(() => {
    async function fetchAccommodation() {
      try {
        const res = await fetch(`/api/accommodations/${id}`);
        const data = await res.json();

        if (data.success) {
          const acc = data.data;
          setFormData({
            name: acc.name,
            type: acc.type,
            description: acc.description,
            phone: acc.phone,
            email: acc.email || "",
            region: acc.region,
            city: acc.city,
            district: acc.district || "",
            address: acc.address,
            capacity: acc.capacity,
            roomsCount: acc.roomsCount,
            priceRange: acc.priceRange || "",
            currency: acc.currency,
            amenities: acc.amenities || [],
          });
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError("Erreur de connexion au serveur.");
      } finally {
        setFetching(false);
      }
    }

    fetchAccommodation();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value
    }));
    setError("");
  };

  const toggleAmenity = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId) 
        ? prev.amenities.filter(a => a !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.phone) {
      setError("Veuillez remplir tous les champs obligatoires (*).");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/accommodations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => router.push("/dashboard/accommodations"), 2000);
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

  if (fetching) {
    return (
      <div className="min-h-screen bg-night flex items-center justify-center">
        <Loader2 className="animate-spin w-12 h-12 text-emerald-brand" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-night flex items-center justify-center p-4">
        <div className="bg-night-light border border-emerald-brand/30 rounded-lg p-8 text-center max-w-md w-full">
          <CheckCircle className="w-16 h-16 text-emerald-brand mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Modifications enregistrées !</h2>
          <p className="text-muted mb-6">Votre établissement a été mis à jour avec succès.</p>
          <p className="text-sm text-white/60">Redirection en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-night py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/dashboard/accommodations" className="inline-flex items-center gap-2 text-muted hover:text-white mb-4 transition-colors">
            <ArrowLeft size={18} /> Retour au tableau de bord
          </Link>
          <h1 className="text-3xl font-bold text-white">Modifier l'établissement</h1>
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
              <Building2 size={20} className="text-emerald-brand" /> A. Informations générales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/80 mb-1">Nom de l'établissement *</label>
                <input name="name" value={formData.name} onChange={handleChange} required className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-emerald-brand focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Type d'établissement *</label>
                <select name="type" value={formData.type} onChange={handleChange} required className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-emerald-brand focus:outline-none">
                  <option value="hotel">Hôtel</option>
                  <option value="guesthouse">Maison d'hôtes</option>
                  <option value="auberge">Auberge</option>
                  <option value="apartment">Résidence meublée</option>
                  <option value="campement">Campement</option>
                  <option value="gite">Gîte</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/80 mb-1">Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-emerald-brand focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Téléphone professionnel *</label>
                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-emerald-brand focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Adresse e-mail</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-emerald-brand focus:outline-none" />
              </div>
            </div>
          </section>

          {/* SECTION B : Localisation */}
          <section className="bg-night-light border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-emerald-brand" /> B. Localisation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Région *</label>
                <select name="region" value={formData.region} onChange={handleChange} required className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-emerald-brand focus:outline-none">
                  <option value="Maritime">Maritime</option>
                  <option value="Plateaux">Plateaux</option>
                  <option value="Centrale">Centrale</option>
                  <option value="Kara">Kara</option>
                  <option value="Savanes">Savanes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Ville / Localité *</label>
                <input name="city" value={formData.city} onChange={handleChange} required className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-emerald-brand focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Quartier</label>
                <input name="district" value={formData.district} onChange={handleChange} className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-emerald-brand focus:outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/80 mb-1">Adresse précise *</label>
                <input name="address" value={formData.address} onChange={handleChange} required className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-emerald-brand focus:outline-none" />
              </div>
            </div>
          </section>

          {/* SECTION D : Capacité et Tarifs */}
          <section className="bg-night-light border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <BedDouble size={20} className="text-emerald-brand" /> D. Capacité et Tarifs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Nombre de chambres *</label>
                <input name="roomsCount" type="number" min="1" value={formData.roomsCount} onChange={handleChange} required className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-emerald-brand focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Capacité totale (personnes) *</label>
                <input name="capacity" type="number" min="1" value={formData.capacity} onChange={handleChange} required className="w-full bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-emerald-brand focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Fourchette de prix / nuit</label>
                <div className="flex gap-2">
                  <input name="priceRange" value={formData.priceRange} onChange={handleChange} className="flex-1 bg-night border border-white/10 rounded-md px-4 py-2.5 text-white focus:border-emerald-brand focus:outline-none" />
                  <select name="currency" value={formData.currency} onChange={handleChange} className="bg-night border border-white/10 rounded-md px-3 py-2.5 text-white focus:border-emerald-brand focus:outline-none">
                    <option value="XOF">XOF</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION E : Équipements */}
          <section className="bg-night-light border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Wifi size={20} className="text-emerald-brand" /> E. Équipements
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AMENITIES_LIST.map((amenity) => {
                const Icon = amenity.icon;
                const isChecked = formData.amenities.includes(amenity.id);
                return (
                  <label key={amenity.id} className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-all ${isChecked ? "bg-emerald-brand/10 border-emerald-brand/50 text-white" : "bg-night border-white/10 text-muted hover:border-white/30"}`}>
                    <input type="checkbox" className="sr-only" checked={isChecked} onChange={() => toggleAmenity(amenity.id)} />
                    <Icon size={18} className={isChecked ? "text-emerald-brand" : "text-muted"} />
                    <span className="text-sm font-medium">{amenity.label}</span>
                  </label>
                );
              })}
            </div>
          </section>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              {loading ? "Enregistrement..." : "Enregistrer les modifications"}
            </button>
            <Link href="/dashboard/accommodations" className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-white/5 text-white font-semibold hover:bg-white/10 border border-white/10 transition-all">
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}