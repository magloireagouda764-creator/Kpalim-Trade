interface Props {
  data: Record<string, unknown>;
}

/**
 * Injecte des données structurées JSON-LD pour le SEO.
 * Utiliser avec les schémas schema.org (Product, Organization, Event, etc.)
 */
export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Helpers pour générer les schémas courants
export function productJsonLd(product: { name: string; description: string; price: number; image?: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'XOF',
      availability: 'https://schema.org/InStock',
    },
    url: `${process.env.NEXT_PUBLIC_APP_URL}/marketplace/${product.slug}`,
  };
}

export function localBusinessJsonLd(business: { name: string; description: string; address: string; phone: string; city: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address,
      addressLocality: business.city,
      addressCountry: 'TG',
    },
    telephone: business.phone,
  };
}

export function eventJsonLd(event: { title: string; description: string; startDate: string; location: string; price?: number }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.startDate,
    location: { '@type': 'Place', name: event.location },
    offers: event.price ? { '@type': 'Offer', price: event.price, priceCurrency: 'XOF' } : { '@type': 'Offer', price: 0, priceCurrency: 'XOF' },
  };
}
