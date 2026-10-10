import { v2 as cloudinary } from 'cloudinary';

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface UploadResult {
  public_id: string;
  secure_url: string;
  width?: number;
  height?: number;
  format?: string;
}

export interface UploadResponse {
  success: boolean;
  data?: UploadResult;
  error?: string;
}

export async function uploadImage(
  file: string,
  options?: {
    folder?: string;
    category?: string;
  }
): Promise<UploadResponse> {
  try {
    const folder = options?.folder || 'kpalim-trade/accommodations';

    const uploadOptions: any = {
      folder,
      resource_type: 'image',
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    };

    if (options?.category) {
      uploadOptions.tags = [options.category];
    }

    const result = await cloudinary.uploader.upload(file, uploadOptions);

    return {
      success: true,
      data: {
        public_id: result.public_id,
        secure_url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
      },
    };
  } catch (error: any) {
    console.error('Erreur upload Cloudinary:', error);
    return {
      success: false,
      error: error.message || 'Erreur lors de l\'upload',
    };
  }
}

export async function deleteImage(publicId: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!publicId) {
      return { success: false, error: 'ID de l\'image manquant' };
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      return { success: true };
    }

    return { success: false, error: 'Échec de la suppression' };
  } catch (error: any) {
    console.error('Erreur suppression Cloudinary:', error);
    return {
      success: false,
      error: error.message || 'Erreur lors de la suppression',
    };
  }
}