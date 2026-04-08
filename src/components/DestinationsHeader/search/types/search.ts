// types/search.ts
export interface SearchResult {
  id: string;
  slug: string;
  title: string;
  description: string;
  destination: string;
  duration_label: string;
  price_from: number;
  currency: string;
  price_note?: string;
  subcategory_id: number;
  category_id: number;
  country_name: string;
  country_slug: string;
  url: string;
}

export interface CacheItem {
  results: SearchResult[];
  timestamp: number;
  query: string;
}