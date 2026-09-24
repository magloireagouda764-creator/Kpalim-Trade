import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Wrapper optimisé autour de next/image avec :
 * - Lazy loading par défaut
 * - Format AVIF/WebP automatique
 * - Placeholder pendant le chargement
 */
export function LazyImage({ src, alt, width, height, fill, className, priority = false, sizes }: Props) {
  if (!src) {
    return <div className={cn('bg-gray-100 animate-pulse', fill ? 'absolute inset-0' : '', className)} style={!fill ? { width, height } : undefined} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      sizes={sizes || '(max-width: 640px) 100vw, 50vw'}
      className={cn('object-cover', className)}
      onError={(e) => {
        // Fallback si l'image Cloudinary échoue à charger
        (e.target as HTMLImageElement).src = '/placeholder.jpg';
      }}
    />
  );
}
