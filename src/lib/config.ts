/**
 * Configuration globale de Kpalimé-Trade
 */

export const ACCOMMODATION_LIMITS = {
  hotels: 150,           // Nombre maximum d'hôtels
  guesthouses: 150,      // Nombre maximum d'autres hébergements (auberges, gîtes, etc.)
  total: 300,            // Total maximum
};

export const UPLOAD_LIMITS = {
  maxFileSize: 5 * 1024 * 1024, // 5 Mo par image
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxImagesPerAccommodation: 20,
};

export const CLOUDINARY_FOLDER = 'kpalim-trade/accommodations';