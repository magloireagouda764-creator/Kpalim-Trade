import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

interface SEOInput {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
}

export function generateSEO({ title, description, image, url, type = 'website' }: SEOInput): Metadata {
  const fullTitle = `${title} | ${APP_NAME}`;
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kpalime-trad.vercel.app';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const ogImage = image || `${siteUrl}/og-default.jpg`;

  // OpenGraph n'accepte pas 'product', on le map vers 'website'
  const ogType = type === 'product' ? 'website' : type;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: fullUrl },
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: APP_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: 'fr_FR',
      type: ogType,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

export function generateProductSEO(name: string, description: string, image?: string, slug?: string) {
  return generateSEO({
    title: name,
    description: description.slice(0, 160),
    image,
    url: slug ? `/marketplace/${slug}` : undefined,
    type: 'product',
  });
}

export function generateLocalBusinessSEO(business: { name: string; description: string; address: string; phone: string; city: string }) {
  return generateSEO({
    title: business.name,
    description: business.description.slice(0, 160),
    type: 'website',
  });
}

export function generateEventSEO(event: { title: string; description: string; location: string }) {
  return generateSEO({
    title: event.title,
    description: event.description.slice(0, 160),
    type: 'website',
  });
}