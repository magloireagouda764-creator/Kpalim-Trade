import mongoose from 'mongoose';
import { Accommodation } from '@/models/Accommodation';
import { 
  IAccommodation, 
  ICreateAccommodation, 
  IUpdateAccommodation, 
  IValidateAccommodation,
  IAccommodationFilters,
  IDashboardStats 
} from '@/types/accommodation';

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

/**
 * Génère un slug unique à partir du nom
 * Ex: "Hôtel du Littoral" -> "hotel-du-littoral"
 */
function generateSlug(name: string): string {
  const baseSlug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Enlève les accents
    .replace(/[^a-z0-9\s-]/g, '') // Enlève les caractères spéciaux
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/-+/g, '-') // Enlève les tirets multiples
    .trim();

  // Ajoute un suffixe aléatoire si le slug existe déjà
  const randomSuffix = Math.random().toString(36).substring(2, 7);
  return `${baseSlug}-${randomSuffix}`;
}

// ============================================
// CRÉATION
// ============================================

export async function createAccommodation(
  data: ICreateAccommodation
): Promise<{ success: boolean; data?: IAccommodation; error?: string }> {
  try {
    // Vérifier si l'ownerId est valide
    if (!mongoose.Types.ObjectId.isValid(data.ownerId)) {
      return { success: false, error: 'ID du propriétaire invalide' };
    }

    // Générer un slug unique
    const slug = generateSlug(data.name);

    // Créer l'établissement avec le statut 'pending' par défaut
    const accommodation = new Accommodation({
      ...data,
      slug,
      status: 'pending',
      isActive: false,
      isFeatured: false,
      ownerId: new mongoose.Types.ObjectId(data.ownerId),
    });

    await accommodation.save();

    return { success: true, data: accommodation };
  } catch (error: any) {
    console.error('❌ Erreur création établissement:', error);
    return { success: false, error: error.message || 'Erreur serveur' };
  }
}

// ============================================
// MISE À JOUR
// ============================================

export async function updateAccommodation(
  id: string,
  data: IUpdateAccommodation
): Promise<{ success: boolean; data?: IAccommodation; error?: string }> {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'ID invalide' };
    }

    // Vérifier que l'établissement existe
    const existing = await Accommodation.findById(id);
    if (!existing) {
      return { success: false, error: 'Établissement non trouvé' };
    }

    // Ne permettre la modification que si le statut est 'draft' ou 'needs_correction'
    if (existing.status === 'approved' || existing.status === 'pending') {
      return { 
        success: false, 
        error: 'Impossible de modifier un établissement validé ou en attente' 
      };
    }

    // Mettre à jour les champs
    const updated = await Accommodation.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    return { success: true, data: updated };
  } catch (error: any) {
    console.error('❌ Erreur mise à jour:', error);
    return { success: false, error: error.message || 'Erreur serveur' };
  }
}

// ============================================
// SUPPRESSION
// ============================================

export async function deleteAccommodation(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'ID invalide' };
    }

    const deleted = await Accommodation.findByIdAndDelete(id);
    if (!deleted) {
      return { success: false, error: 'Établissement non trouvé' };
    }

    return { success: true };
  } catch (error: any) {
    console.error('❌ Erreur suppression:', error);
    return { success: false, error: error.message || 'Erreur serveur' };
  }
}

// ============================================
// RÉCUPÉRATION PAR ID
// ============================================

export async function getAccommodationById(
  id: string
): Promise<{ success: boolean; data?: IAccommodation; error?: string }> {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'ID invalide' };
    }

    const accommodation = await Accommodation.findById(id);
    if (!accommodation) {
      return { success: false, error: 'Établissement non trouvé' };
    }

    return { success: true, data: accommodation };
  } catch (error: any) {
    console.error('❌ Erreur récupération:', error);
    return { success: false, error: error.message || 'Erreur serveur' };
  }
}

// ============================================
// RÉCUPÉRATION PAR PROPRIÉTAIRE (Dashboard)
// ============================================

export async function getOwnerAccommodations(
  ownerId: string,
  status?: string
): Promise<{ success: boolean; data?: IAccommodation[]; error?: string }> {
  try {
    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      return { success: false, error: 'ID du propriétaire invalide' };
    }

    const query: any = { ownerId: new mongoose.Types.ObjectId(ownerId) };
    
    // Filtrer par statut si fourni
    if (status) {
      query.status = status;
    }

    const accommodations = await Accommodation.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return { success: true, data: accommodations };
  } catch (error: any) {
    console.error('❌ Erreur récupération propriétaire:', error);
    return { success: false, error: error.message || 'Erreur serveur' };
  }
}

// ============================================
// RÉCUPÉRATION POUR L'ADMIN (avec filtres)
// ============================================

export async function getAdminAccommodations(
  filters: IAccommodationFilters
): Promise<{ success: boolean; data?: IAccommodation[]; error?: string }> {
  try {
    const query: any = {};

    // Appliquer les filtres
    if (filters.status) query.status = filters.status;
    if (filters.region) query.region = filters.region;
    if (filters.type) query.type = filters.type;
    if (filters.city) query.city = filters.city;

    // Recherche textuelle
    if (filters.search) {
      query.$text = { $search: filters.search };
    }

    const accommodations = await Accommodation.find(query)
      .sort({ createdAt: -1 })
      .limit(filters.limit || 50)
      .lean();

    return { success: true, data: accommodations };
  } catch (error: any) {
    console.error('❌ Erreur récupération admin:', error);
    return { success: false, error: error.message || 'Erreur serveur' };
  }
}

// ============================================
// STATISTIQUES DASHBOARD
// ============================================

export async function getDashboardStats(
  ownerId: string
): Promise<{ success: boolean; data?: IDashboardStats; error?: string }> {
  try {
    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      return { success: false, error: 'ID du propriétaire invalide' };
    }

    const stats = await Accommodation.aggregate([
      { $match: { ownerId: new mongoose.Types.ObjectId(ownerId) } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Construire l'objet de statistiques
    const result: IDashboardStats = {
      total: 0,
      draft: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      needs_correction: 0,
      suspended: 0,
    };

    stats.forEach((stat: any) => {
      result[stat._id as keyof IDashboardStats] = stat.count;
      result.total += stat.count;
    });

    return { success: true, data: result };
  } catch (error: any) {
    console.error('❌ Erreur statistiques:', error);
    return { success: false, error: error.message || 'Erreur serveur' };
  }
}

// ============================================
// SOUMISSION POUR VALIDATION
// ============================================

export async function submitForValidation(
  id: string,
  ownerId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'ID invalide' };
    }

    const accommodation = await Accommodation.findById(id);
    if (!accommodation) {
      return { success: false, error: 'Établissement non trouvé' };
    }

    // Vérifier que le propriétaire est bien le créateur
    if (accommodation.ownerId.toString() !== ownerId) {
      return { success: false, error: 'Non autorisé' };
    }

    // Vérifier que le statut permet la soumission
    if (accommodation.status !== 'draft' && accommodation.status !== 'needs_correction') {
      return { 
        success: false, 
        error: 'Cet établissement ne peut pas être soumis pour validation' 
      };
    }

    // Passer en statut 'pending'
    accommodation.status = 'pending';
    await accommodation.save();

    return { success: true };
  } catch (error: any) {
    console.error('❌ Erreur soumission:', error);
    return { success: false, error: error.message || 'Erreur serveur' };
  }
}

// ============================================
// VALIDATION PAR L'ADMIN
// ============================================

export async function validateAccommodation(
  id: string,
  validation: IValidateAccommodation
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'ID invalide' };
    }

    const accommodation = await Accommodation.findById(id);
    if (!accommodation) {
      return { success: false, error: 'Établissement non trouvé' };
    }

    // Vérifier que le statut est 'pending'
    if (accommodation.status !== 'pending') {
      return { 
        success: false, 
        error: 'Cet établissement n\'est pas en attente de validation' 
      };
    }

    // Appliquer la décision
    accommodation.status = validation.status;
    
    if (validation.adminNote) {
      accommodation.adminNote = validation.adminNote;
    }

    if (validation.status === 'approved') {
      accommodation.isActive = true;
      accommodation.publishedAt = new Date();
    } else if (validation.status === 'rejected') {
      accommodation.rejectionReason = validation.rejectionReason || 'Non spécifié';
    } else if (validation.status === 'needs_correction') {
      accommodation.correctionRequest = validation.correctionRequest || 'Corrections demandées';
    }

    await accommodation.save();

    return { success: true };
  } catch (error: any) {
    console.error('❌ Erreur validation:', error);
    return { success: false, error: error.message || 'Erreur serveur' };
  }
}

// ============================================
// RÉCUPÉRATION PUBLIQUE (pour les visiteurs)
// ============================================

export async function getPublicAccommodations(
  filters: IAccommodationFilters
): Promise<{ success: boolean; data?: IAccommodation[]; error?: string }> {
  try {
    const query: any = {
      status: 'approved',
      isActive: true,
    };

    if (filters.region) query.region = filters.region;
    if (filters.type) query.type = filters.type;
    if (filters.city) query.city = filters.city;

    const accommodations = await Accommodation.find(query)
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(filters.limit || 20)
      .lean();

    return { success: true, data: accommodations };
  } catch (error: any) {
    console.error('❌ Erreur récupération publique:', error);
    return { success: false, error: error.message || 'Erreur serveur' };
  }
}