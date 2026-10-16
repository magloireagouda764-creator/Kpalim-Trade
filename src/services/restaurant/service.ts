import mongoose from 'mongoose';
import { Restaurant } from '@/models/Restaurant';
import { 
  IRestaurant, 
  ICreateRestaurant, 
  IUpdateRestaurant, 
  IValidateRestaurant,
  IRestaurantFilters,
  IDashboardStats 
} from '@/types/restaurant';

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

/**
 * Génère un slug unique à partir du nom
 * Ex: "Chez Mama" -> "chez-mama"
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

  // Ajoute un suffixe aléatoire pour garantir l'unicité
  const randomSuffix = Math.random().toString(36).substring(2, 7);
  return `${baseSlug}-${randomSuffix}`;
}

// ============================================
// CRÉATION
// ============================================

export async function createRestaurant(
  data: ICreateRestaurant
): Promise<{ success: boolean; data?: IRestaurant; error?: string }> {
  try {
    if (!mongoose.Types.ObjectId.isValid(data.ownerId)) {
      return { success: false, error: 'ID du propriétaire invalide' };
    }

    const slug = generateSlug(data.name);

    // Créer le restaurant avec le statut 'pending' par défaut
    const restaurant = new Restaurant({
      ...data,
      slug,
      status: 'pending',
      isActive: false,
      isFeatured: false,
      ownerId: new mongoose.Types.ObjectId(data.ownerId),
    });

    await restaurant.save();

    return { success: true, data: restaurant };
  } catch (error: any) {
    console.error('❌ Erreur création restaurant:', error);
    return { success: false, error: error.message || 'Erreur serveur' };
  }
}

// ============================================
// MISE À JOUR
// ============================================

export async function updateRestaurant(
  id: string,
  data: IUpdateRestaurant
): Promise<{ success: boolean; data?: IRestaurant; error?: string }> {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'ID invalide' };
    }

    const existing = await Restaurant.findById(id);
    if (!existing) {
      return { success: false, error: 'Restaurant non trouvé' };
    }

    // Ne permettre la modification que si le statut est 'draft' ou 'needs_correction'
    if (existing.status === 'approved' || existing.status === 'pending') {
      return { 
        success: false, 
        error: 'Impossible de modifier un restaurant validé ou en attente' 
      };
    }

    // Utiliser .lean() pour retourner un objet JS simple et éviter les erreurs TS
    const updated = await Restaurant.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return { success: false, error: 'Restaurant non trouvé après mise à jour' };
    }

    return { success: true, data: updated };
  } catch (error: any) {
    console.error('❌ Erreur mise à jour:', error);
    return { success: false, error: error.message || 'Erreur serveur' };
  }
}

// ============================================
// SUPPRESSION
// ============================================

export async function deleteRestaurant(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'ID invalide' };
    }

    const deleted = await Restaurant.findByIdAndDelete(id);
    if (!deleted) {
      return { success: false, error: 'Restaurant non trouvé' };
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

export async function getRestaurantById(
  id: string
): Promise<{ success: boolean; data?: IRestaurant; error?: string }> {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'ID invalide' };
    }

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return { success: false, error: 'Restaurant non trouvé' };
    }

    return { success: true, data: restaurant };
  } catch (error: any) {
    console.error('❌ Erreur récupération:', error);
    return { success: false, error: error.message || 'Erreur serveur' };
  }
}

// ============================================
// RÉCUPÉRATION PAR PROPRIÉTAIRE (Dashboard)
// ============================================

export async function getOwnerRestaurants(
  ownerId: string,
  status?: string
): Promise<{ success: boolean; data?: IRestaurant[]; error?: string }> {
  try {
    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      return { success: false, error: 'ID du propriétaire invalide' };
    }

    const query: any = { ownerId: new mongoose.Types.ObjectId(ownerId) };
    
    if (status) {
      query.status = status;
    }

    const restaurants = await Restaurant.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return { success: true, data: restaurants };
  } catch (error: any) {
    console.error('❌ Erreur récupération propriétaire:', error);
    return { success: false, error: error.message || 'Erreur serveur' };
  }
}

// ============================================
// RÉCUPÉRATION POUR L'ADMIN (avec filtres)
// ============================================

export async function getAdminRestaurants(
  filters: IRestaurantFilters
): Promise<{ success: boolean; data?: IRestaurant[]; error?: string }> {
  try {
    const query: any = {};

    if (filters.status) query.status = filters.status;
    if (filters.region) query.region = filters.region;
    if (filters.type) query.type = filters.type;
    if (filters.city) query.city = filters.city;

    if (filters.search) {
      query.$text = { $search: filters.search };
    }

    const restaurants = await Restaurant.find(query)
      .sort({ createdAt: -1 })
      .limit(filters.limit || 50)
      .lean();

    return { success: true, data: restaurants };
  } catch (error: any) {
    console.error('❌ Erreur récupération admin:', error);
    return { success: false, error: error.message || 'Erreur serveur' };
  }
}

// ============================================
// STATISTIQUES DASHBOARD
// ============================================

export async function getRestaurantDashboardStats(
  ownerId: string
): Promise<{ success: boolean; data?: IDashboardStats; error?: string }> {
  try {
    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      return { success: false, error: 'ID du propriétaire invalide' };
    }

    const stats = await Restaurant.aggregate([
      { $match: { ownerId: new mongoose.Types.ObjectId(ownerId) } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

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

export async function submitRestaurantForValidation(
  id: string,
  ownerId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'ID invalide' };
    }

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return { success: false, error: 'Restaurant non trouvé' };
    }

    if (restaurant.ownerId.toString() !== ownerId) {
      return { success: false, error: 'Non autorisé' };
    }

    if (restaurant.status !== 'draft' && restaurant.status !== 'needs_correction') {
      return { 
        success: false, 
        error: 'Ce restaurant ne peut pas être soumis pour validation' 
      };
    }

    restaurant.status = 'pending';
    await restaurant.save();

    return { success: true };
  } catch (error: any) {
    console.error('❌ Erreur soumission:', error);
    return { success: false, error: error.message || 'Erreur serveur' };
  }
}

// ============================================
// VALIDATION PAR L'ADMIN
// ============================================

export async function validateRestaurant(
  id: string,
  validation: IValidateRestaurant
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'ID invalide' };
    }

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return { success: false, error: 'Restaurant non trouvé' };
    }

    if (restaurant.status !== 'pending') {
      return { 
        success: false, 
        error: 'Ce restaurant n\'est pas en attente de validation' 
      };
    }

    restaurant.status = validation.status;
    
    if (validation.adminNote) {
      restaurant.adminNote = validation.adminNote;
    }

    if (validation.status === 'approved') {
      restaurant.isActive = true;
      restaurant.publishedAt = new Date();
    } else if (validation.status === 'rejected') {
      restaurant.rejectionReason = validation.rejectionReason || 'Non spécifié';
    } else if (validation.status === 'needs_correction') {
      restaurant.correctionRequest = validation.correctionRequest || 'Corrections demandées';
    }

    await restaurant.save();

    return { success: true };
  } catch (error: any) {
    console.error(' Erreur validation:', error);
    return { success: false, error: error.message || 'Erreur serveur' };
  }
}

// ============================================
// RÉCUPÉRATION PUBLIQUE (pour les visiteurs)
// ============================================

export async function getPublicRestaurants(
  filters: IRestaurantFilters
): Promise<{ success: boolean; data?: IRestaurant[]; error?: string }> {
  try {
    const query: any = {
      status: 'approved',
      isActive: true,
    };

    if (filters.region) query.region = filters.region;
    if (filters.type) query.type = filters.type;
    if (filters.city) query.city = filters.city;
    if (filters.cuisine) query.cuisines = filters.cuisine;
    if (filters.priceRange) query.priceRange = filters.priceRange;

    const restaurants = await Restaurant.find(query)
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(filters.limit || 20)
      .lean();

    return { success: true, data: restaurants };
  } catch (error: any) {
    console.error('❌ Erreur récupération publique:', error);
    return { success: false, error: error.message || 'Erreur serveur' };
  }
}