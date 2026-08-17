import type { LocalizedText, RobotCategory, SectorKey } from '@/lib/types';

// ─────────────────────────────────────────────────────────────
// التصنيفات والقطاعات — معرّفة مرة وحدة، وكل الروبوتات تشير إلها
// حتى لا تتكرر الترجمة ولا تحدث تناقضات بين صفحة وأخرى
// ─────────────────────────────────────────────────────────────

export const CATEGORIES: Record<
  RobotCategory,
  { label: LocalizedText; description: LocalizedText }
> = {
  humanoid: {
    label: { ar: 'روبوتات بشرية', en: 'Humanoid robots' },
    description: {
      ar: 'روبوتات بملامح وحركة قريبة من الإنسان، تستقبل الزائر وتتكلم وياه وتوجهه.',
      en: 'Human-like robots that greet visitors, hold a conversation, and guide them.',
    },
  },
  service: {
    label: { ar: 'روبوتات خدمية', en: 'Service robots' },
    description: {
      ar: 'روبوتات توصيل وتجميع وإرشاد، تشتغل بالمطاعم والفنادق والمستشفيات.',
      en: 'Delivery, bussing, and guidance robots built for restaurants, hotels, and hospitals.',
    },
  },
  educational: {
    label: { ar: 'روبوتات تعليمية', en: 'Educational robots' },
    description: {
      ar: 'منصّات تعليم برمجة وذكاء اصطناعي، من المدرسة إلى مختبرات الجامعة.',
      en: 'Platforms for teaching programming and AI, from school labs to university research.',
    },
  },
  quadruped: {
    label: { ar: 'روبوتات رباعية', en: 'Quadruped robots' },
    description: {
      ar: 'روبوتات تمشي على أربع، للتفتيش والمسح والعروض الميدانية.',
      en: 'Four-legged robots for inspection, mapping, and field demonstrations.',
    },
  },
};

export const SECTORS: Record<SectorKey, LocalizedText> = {
  education: { ar: 'التعليم', en: 'Education' },
  healthcare: { ar: 'الرعاية الصحية', en: 'Healthcare' },
  hospitality: { ar: 'الفنادق والضيافة', en: 'Hotels & hospitality' },
  restaurants: { ar: 'المطاعم والمقاهي', en: 'Restaurants & cafés' },
  banking: { ar: 'البنوك', en: 'Banking' },
  retail: { ar: 'البيع بالتجزئة', en: 'Retail' },
  malls: { ar: 'المولات والأسواق', en: 'Malls & markets' },
  museums: { ar: 'المتاحف', en: 'Museums' },
  airports: { ar: 'المطارات', en: 'Airports' },
  offices: { ar: 'المكاتب والشركات', en: 'Offices & corporates' },
  events: { ar: 'المناسبات والفعاليات', en: 'Events' },
  home: { ar: 'المنازل', en: 'Homes' },
  research: { ar: 'البحث العلمي', en: 'Research' },
  security: { ar: 'الأمن والحراسة', en: 'Security' },
  warehousing: { ar: 'المستودعات', en: 'Warehousing' },
  universities: { ar: 'الجامعات', en: 'Universities' },
  schools: { ar: 'المدارس', en: 'Schools' },
  gaming: { ar: 'مراكز الألعاب', en: 'Gaming centers' },
  enterprises: { ar: 'الشركات والمؤسسات', en: 'Enterprises & companies' },
  showroom: { ar: 'صالات العرض', en: 'Showrooms' },
};

/** ترتيب عرض التصنيفات في صفحة "روبوتاتنا" */
export const CATEGORY_ORDER: RobotCategory[] = [
  'humanoid',
  'service',
  'educational',
  'quadruped',
];

/** أنواع توفّر المنتج — تُستخدم بفلتر "نوع المنتج" بصفحة "روبوتاتنا" */
export type ProductType = 'rent' | 'sale' | 'preorder';

export const PRODUCT_TYPES: Record<ProductType, { label: LocalizedText }> = {
  rent: { label: { ar: 'للإيجار', en: 'For Rent' } },
  sale: { label: { ar: 'للبيع', en: 'For Sale' } },
  preorder: { label: { ar: 'حجز مسبق', en: 'Pre-order' } },
};

export const PRODUCT_TYPE_ORDER: ProductType[] = ['rent', 'sale', 'preorder'];
