import { Types } from 'mongoose';
import { Accommodation } from '@/models/Accommodation';
import { ACCOMMODATION_LIMITS } from '@/lib/config';
import {
  IAccommodation,
  AccommodationType,
  AccommodationStatus,
  TogoRegion,
  AccommodationFilters,
  AccommodationFormData,
} from '@/types/accommodation';

// ============================================
// GÉNÉRATION DE SLUG UNIQUE
// ============================================
function generateSlug(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);

  return base;
}

async function getUniqueSlug(name: string): Promise<string> {
  const baseSlug = generateSlug(name);
  let slug = baseSlug;
  let counter = 1;

  while (await Accommodation.exists({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

// ============================================
// VÉRIFICATION DES LIMITES DE CAPACITÉ
// ============================================
async function checkCapacityLimit(type: AccommodationType): Promise<{ allowed: boolean; error?: string }> {
  const currentHotels = await Accommodation.countDocuments({
    type: 'hotel',
    status: 'approved',
    isActive: true,
  });

  const currentGuesthouses = await Accommodation.countDocuments({
    type: { $ne: 'hotel' },
    status: 'approved',
    isActive: true,
  });

  if (type === 'hotel' && currentHotels >= ACCOMMODATION_LIMITS.hotels) {
    return {
      allowed: false,
      error: `La capacité maximale d'hôtels (${ACCOMMODATION_LIMITS.hotels}) est atteinte.`,
    };
  }

  if (type !== 'hotel' && currentGuesthouses >= ACCOMMODATION_LIMITS.guesthouses) {
    return {
      allowed: false,
      error: `La capacité maximale d'hébergements (${ACCOMMODATION_LIMITS.guesthouses}) est atteinte.`,
    };
  }

  return { allowed: true };
}

// ============================================
// CRÉER UNE NOUVELLE FICHE (BROUILLON)
// ============================================
export async function createAccommodation(
  data: AccommodationFormData,
  ownerId: string,
  ownerName: string
): Promise<{ success: boolean; data?: IAccommodation; error?: string }> {
  try {
    // Vérifier la limite de capacité
    const capacityCheck = await checkCapacityLimit(data.type);
    if (!capacityCheck.allowed) {
      return { success: false, error: capacityCheck.error };
    }

    // Générer un slug unique
    const slug = await getUniqueSlug(data.name);

    // Créer la fiche en brouillon
    const accommodation = await Accommodation.create({
      ...data,
      slug,
      ownerId: new Types.ObjectId(ownerId),
      ownerName,
      status: 'draft',
      isActive: true,
      isFeatured: false,
      currency: data.currency || 'XOF',
      images: data.images || [],
      documents: [],
      verificationConfirmed: data.verificationConfirmed || false,
    });

    return { success: true, data: accommodation as unknown as IAccommodation };
  } catch (error: any) {
    console.error('Erreur création accommodation:', error);
    return {
      success: false,
      error: error.message || 'Erreur lors de la création de la fiche',
    };
  }
}

// ============================================
// METTRE À JOUR UNE FICHE
// ============================================
export async function updateAccommodation(
  id: string,
  data: Partial<AccommodationFormData>,
  ownerId: string
): Promise<{ success: boolean; data?: IAccommodation; error?: string }> {
  try {
    // Vérifier que la fiche existe et appartient au propriétaire
    const existing = await Accommodation.findOne({
      _id: new Types.ObjectId(id),
      ownerId: new Types.ObjectId(ownerId),
    });

    if (!existing) {
      return {
        success: false,
        error: 'Fiche non trouvée ou vous n\'êtes pas autorisé à la modifier',
      };
    }

    // Si la fiche était approuvée et qu'on modifie des infos importantes,
    // la repasser en "needs_correction"
    const importantFields = ['name', 'type', 'address', 'phone', 'images'];
    const hasImportantChanges = importantFields.some(
      (field) => data[field as keyof AccommodationFormData] !== undefined
    );

    const updateData: any = { ...data };

    if (existing.status === 'approved' && hasImportantChanges) {
      updateData.status = 'pending';
      updateData.publishedAt = undefined;
    }

    const updated = await Accommodation.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return { success: true, data: updated as unknown as IAccommodation };
  } catch (error: any) {
    console.error('Erreur mise à jour accommodation:', error);
    return {
      success: false,
      error: error.message || 'Erreur lors de la mise à jour',
    };
  }
}

// ============================================
// SOUMETTRE POUR VALIDATION
// ============================================
export async function submitForValidation(
  id: string,
  ownerId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const accommodation = await Accommodation.findOne({
      _id: new Types.ObjectId(id),
      ownerId: new Types.ObjectId(ownerId),
    });

    if (!accommodation) {
      return { success: false, error: 'Fiche non trouvée' };
    }

    if (accommodation.status !== 'draft' && accommodation.status !== 'needs_correction') {
      return {
        success: false,
        error: 'Seules les fiches en brouillon ou à corriger peuvent être soumises',
      };
    }

    // Vérifications minimales avant soumission
    if (!accommodation.name || !accommodation.description || !accommodation.phone) {
      return {
        success: false,
        error: 'Veuillez remplir au moins le nom, la description et le téléphone',
      };
    }

    accommodation.status = 'pending';
    await accommodation.save();

    return { success: true };
  } catch (error: any) {
    console.error('Erreur soumission validation:', error);
    return {
      success: false,
      error: error.message || 'Erreur lors de la soumission',
    };
  }
}

// ============================================
// RÉCUPÉRER UNE FICHE PAR ID
// ============================================
export async function getAccommodationById(
  id: string,
  options?: { includeDocuments?: boolean; includeOwner?: boolean }
): Promise<{ success: boolean; data?: IAccommodation; error?: string }> {
  try {
    const query: any = { _id: new Types.ObjectId(id) };

    let accommodation;
    if (options?.includeDocuments) {
      accommodation = await Accommodation.findOne(query);
    } else {
      // Exclure les documents privés par défaut
      accommodation = await Accommodation.findOne(query).select('-documents');
    }

    if (!accommodation) {
      return { success: false, error: 'Fiche non trouvée' };
    }

    return { success: true, data: accommodation as unknown as IAccommodation };
  } catch (error: any) {
    console.error('Erreur récupération accommodation:', error);
    return {
      success: false,
      error: error.message || 'Erreur lors de la récupération',
    };
  }
}

// ============================================
// RÉCUPÉRER UNE FICHE PAR SLUG (PUBLIC)
// ============================================
export async function getAccommodationBySlug(
  slug: string
): Promise<{ success: boolean; data?: IAccommodation; error?: string }> {
  try {
    const accommodation = await Accommodation.findOne({
      slug,
      status: 'approved',
      isActive: true,
    }).select('-documents -adminNote -rejectionReason -correctionRequest');

    if (!accommodation) {
      return { success: false, error: 'Établissement non trouvé' };
    }

    return { success: true, data: accommodation as unknown as IAccommodation };
  } catch (error: any) {
    console.error('Erreur récupération par slug:', error);
    return {
      success: false,
      error: error.message || 'Erreur lors de la récupération',
    };
  }
}

// ============================================
// LISTE PUBLIQUE (fiches approuvées uniquement)
// ============================================
export async function getPublicAccommodations(
  filters: AccommodationFilters
): Promise<{
  success: boolean;
  data?: IAccommodation[];
  pagination?: any;
  error?: string;
}> {
  try {
    const query: any = {
      status: 'approved',
      isActive: true,
    };

    if (filters.region) query.region = filters.region;
    if (filters.type) query.type = filters.type;
    if (filters.city) query.city = filters.city;

    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } },
        { city: { $regex: filters.search, $options: 'i' } },
      ];
    }

    if (filters.amenities && filters.amenities.length > 0) {
      query.amenities = { $in: filters.amenities };
    }

    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Accommodation.find(query)
        .select('-documents -adminNote -rejectionReason -correctionRequest -ownerId')
        .sort({ isFeatured: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Accommodation.countDocuments(query),
    ]);

    return {
      success: true,
      data: data as unknown as IAccommodation[],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error: any) {
    console.error('Erreur liste publique:', error);
    return {
      success: false,
      error: error.message || 'Erreur lors de la récupération',
    };
  }
}

// ============================================
// LISTE POUR LE PROPRIÉTAIRE (ses fiches)
// ============================================
export async function getOwnerAccommodations(
  ownerId: string,
  status?: AccommodationStatus
): Promise<{ success: boolean; data?: IAccommodation[]; error?: string }> {
  try {
    const query: any = { ownerId: new Types.ObjectId(ownerId) };
    if (status) query.status = status;

    const data = await Accommodation.find(query)
      .select('-documents')
      .sort({ updatedAt: -1 });

    return { success: true, data: data as unknown as IAccommodation[] };
  } catch (error: any) {
    console.error('Erreur liste propriétaire:', error);
    return {
      success: false,
      error: error.message || 'Erreur lors de la récupération',
    };
  }
}

// ============================================
// LISTE ADMIN (toutes les fiches)
// ============================================
export async function getAdminAccommodations(
  filters: { status?: AccommodationStatus; region?: TogoRegion; type?: AccommodationType }
): Promise<{ success: boolean; data?: IAccommodation[]; error?: string }> {
  try {
    const query: any = {};
    if (filters.status) query.status = filters.status;
    if (filters.region) query.region = filters.region;
    if (filters.type) query.type = filters.type;

    const data = await Accommodation.find(query)
      .sort({ createdAt: -1 });

    return { success: true, data: data as unknown as IAccommodation[] };
  } catch (error: any) {
    console.error('Erreur liste admin:', error);
    return {
      success: false,
      error: error.message || 'Erreur lors de la récupération',
    };
  }
}

// ============================================
// ACTIONS ADMIN : APPROUVER / REFUSER / SUSPENDRE
// ============================================
export async function adminUpdateStatus(
  id: string,
  status: AccommodationStatus,
  adminNote?: string,
  rejectionReason?: string,
  correctionRequest?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const updateData: any = {
      status,
      adminNote: adminNote || undefined,
      rejectionReason: rejectionReason || undefined,
      correctionRequest: correctionRequest || undefined,
    };

    if (status === 'approved') {
      updateData.publishedAt = new Date();
      updateData.isActive = true;
    }

    const result = await Accommodation.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return { success: false, error: 'Fiche non trouvée' };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Erreur action admin:', error);
    return {
      success: false,
      error: error.message || 'Erreur lors de l\'action admin',
    };
  }
}

// ============================================
// SUPPRIMER UNE FICHE
// ============================================
export async function deleteAccommodation(
  id: string,
  ownerId: string,
  isAdmin: boolean = false
): Promise<{ success: boolean; error?: string }> {
  try {
    const query: any = { _id: new Types.ObjectId(id) };

    // Si pas admin, vérifier la propriété
    if (!isAdmin) {
      query.ownerId = new Types.ObjectId(ownerId);
    }

    const result = await Accommodation.findOneAndDelete(query);

    if (!result) {
      return {
        success: false,
        error: 'Fiche non trouvée ou vous n\'êtes pas autorisé à la supprimer',
      };
    }

    // TODO: Supprimer aussi les images Cloudinary associées

    return { success: true };
  } catch (error: any) {
    console.error('Erreur suppression accommodation:', error);
    return {
      success: false,
      error: error.message || 'Erreur lors de la suppression',
    };
  }
}