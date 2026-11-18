export type Language = 'en' | 'hi';
export type CategorySlug = 'economy' | 'technology' | 'science-health' | 'lifestyle-culture' | 'sports' | 'others';

export interface Article {
  slug: string;
  language: Language;
  title: string;
  dek: string;
  body: string[];
  byline: string;
  dateline: string;
  publishedAt: string;
  modifiedAt: string;
  sourceName: string;
  sourceUrl: string;
  category: CategorySlug;
  image: string;
  alt: string;
  translation: { sourceLanguage: Language; mt: boolean; reviewer: string; status: string };
  verified: boolean;
}
