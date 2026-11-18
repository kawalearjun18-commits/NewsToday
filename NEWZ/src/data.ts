import type { Article, CategorySlug, Language } from './types';

export const languages: { code: Language; nativeName: string }[] = [
  { code: 'en', nativeName: 'English' },
  { code: 'hi', nativeName: 'हिन्दी' }
];

export const categories: { slug: CategorySlug; en: string; hi: string; description: string; hiDescription: string }[] = [
  { slug: 'economy', en: 'Economy', hi: 'अर्थव्यवस्था', description: 'Business, work and household economy coverage.', hiDescription: 'व्यापार, रोजगार और घरेलू अर्थव्यवस्था की खबरें।' },
  { slug: 'technology', en: 'Technology', hi: 'तकनीक', description: 'Technology and digital life reporting.', hiDescription: 'तकनीक और डिजिटल जीवन से जुड़ी खबरें।' },
  { slug: 'science-health', en: 'Science & Health', hi: 'विज्ञान और स्वास्थ्य', description: 'Evidence-led science and health coverage.', hiDescription: 'विज्ञान और स्वास्थ्य की तथ्य-आधारित खबरें।' },
  { slug: 'lifestyle-culture', en: 'Lifestyle & Culture', hi: 'जीवनशैली और संस्कृति', description: 'Culture, people and everyday life.', hiDescription: 'संस्कृति, लोगों और रोजमर्रा के जीवन की खबरें।' },
  { slug: 'sports', en: 'Sports', hi: 'खेल', description: 'Sports coverage from Bhagalpur and Bihar.', hiDescription: 'भागलपुर और बिहार से खेल की खबरें।' },
  { slug: 'others', en: 'Others', hi: 'अन्य', description: 'Civic, local and state reporting.', hiDescription: 'नागरिक, स्थानीय और राज्य की खबरें।' }
];

const common = {
  slug: 'verify-local-story',
  dateline: 'BHAGALPUR',
  publishedAt: '2026-11-17T08:00:00+05:30',
  modifiedAt: '2026-11-17T08:00:00+05:30',
  sourceName: 'TODO_VERIFY',
  sourceUrl: 'https://example.invalid/TODO_VERIFY',
  image: '/images/news-placeholder.svg',
  alt: 'Editorial image placeholder awaiting verification',
  translation: { sourceLanguage: 'en' as Language, mt: false, reviewer: 'pending-human', status: 'pending-human' },
  verified: false
};

export const articles: Article[] = [
  {
    ...common, language: 'en', category: 'others',
    title: 'TODO_VERIFY: Bhagalpur report awaiting confirmation',
    dek: 'This editorial slot is reserved for a current, dated, independently verifiable Bhagalpur report.',
    body: [
      'TODO_VERIFY: No publishable claim has been added because a dated source and URL still require editorial confirmation.',
      'Once verified, this paragraph will explain the local development in clear language and identify the affected people, place and time.',
      'The final article will retain a visible source link, publication date, byline and update history.'
    ],
    byline: 'News Today Desk'
  },
  {
    ...common, slug: 'verify-bihar-report', language: 'en', category: 'economy',
    title: 'TODO_VERIFY: Bihar economy report pending verification',
    dek: 'A source-correct Bihar economy story will appear here after editorial verification.',
    body: [
      'TODO_VERIFY: This placeholder contains no invented number, quote or attribution.',
      'Editors must replace it only with a real report published within the target news window.',
      'The source name and URL will remain visible to readers after publication.'
    ],
    byline: 'News Today Desk'
  },
  {
    ...common, language: 'hi', alt: 'सत्यापन की प्रतीक्षा करती संपादकीय तस्वीर', category: 'others',
    title: 'TODO_VERIFY: भागलपुर की खबर, सत्यापन लंबित',
    dek: 'यह स्थान वर्तमान, दिनांकित और स्वतंत्र रूप से सत्यापित भागलपुर रिपोर्ट के लिए सुरक्षित है।',
    body: [
      'TODO_VERIFY: दिनांकित स्रोत और URL की संपादकीय पुष्टि होने तक कोई प्रकाशित दावा नहीं जोड़ा गया है।',
      'सत्यापन के बाद यह अनुच्छेद घटना, स्थान और प्रभावित लोगों की जानकारी स्पष्ट भाषा में देगा।',
      'अंतिम खबर में स्रोत लिंक, प्रकाशन तिथि, बाइलाइन और संशोधन इतिहास स्पष्ट रहेंगे।'
    ],
    byline: 'न्यूज़ टुडे डेस्क'
  },
  {
    ...common, slug: 'verify-bihar-report', language: 'hi', alt: 'सत्यापन की प्रतीक्षा करती संपादकीय तस्वीर', category: 'economy',
    title: 'TODO_VERIFY: बिहार अर्थव्यवस्था, सत्यापन लंबित',
    dek: 'संपादकीय सत्यापन के बाद बिहार की अर्थव्यवस्था पर स्रोत-सही खबर यहां प्रकाशित होगी।',
    body: [
      'TODO_VERIFY: इस स्थान पर कोई मनगढ़ंत संख्या, उद्धरण या श्रेय नहीं जोड़ा गया है।',
      'संपादक इसे केवल लक्षित समाचार अवधि में प्रकाशित वास्तविक रिपोर्ट से बदलेंगे।',
      'प्रकाशन के बाद भी स्रोत का नाम और URL पाठकों को दिखाई देगा।'
    ],
    byline: 'न्यूज़ टुडे डेस्क'
  }
];

export function getArticles(language: Language) {
  return articles.filter((article) => article.language === language);
}

export function getArticle(language: Language, slug: string) {
  return articles.find((article) => article.language === language && article.slug === slug);
}
