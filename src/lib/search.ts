/**
 * Utilitaires de recherche
 */

export function buildSearchRegex(query: string): RegExp {
  // Échapper les caractères spéciaux regex
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(escaped, 'i');
}

export function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export interface SearchResult {
  type: 'product' | 'shop' | 'site' | 'restaurant' | 'event';
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  href: string;
}

export function flattenSearchResults(data: {
  products?: any[];
  shops?: any[];
  sites?: any[];
  restaurants?: any[];
  events?: any[];
}): SearchResult[] {
  const results: SearchResult[] = [];

  data.products?.forEach((p) => results.push({
    type: 'product', id: p._id, title: p.name, subtitle: `${p.price?.toLocaleString('fr-FR')} FCFA`,
    image: p.images?.[0]?.secure_url, href: `/marketplace/${p.slug}`,
  }));

  data.shops?.forEach((s) => results.push({
    type: 'shop', id: s._id, title: s.name, subtitle: s.city,
    image: s.logo, href: `/shops/${s.slug}`,
  }));

  data.sites?.forEach((s) => results.push({
    type: 'site', id: s._id, title: s.name, subtitle: s.category,
    image: s.images?.[0]?.secure_url, href: `/tourism/${s.slug}`,
  }));

  data.restaurants?.forEach((r) => results.push({
    type: 'restaurant', id: r._id, title: r.name, subtitle: r.cuisineType,
    image: r.images?.[0]?.secure_url, href: `/restaurants/${r.slug}`,
  }));

  data.events?.forEach((e) => results.push({
    type: 'event', id: e._id, title: e.title, subtitle: e.location,
    image: e.poster, href: `/events/${e.slug}`,
  }));

  return results;
}
