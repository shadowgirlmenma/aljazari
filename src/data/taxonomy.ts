import type { LocalizedText, RobotCategory, SectorKey } from '@/lib/types';

// ─────────────────────────────────────────────────────────────
// التصنيفات والقطاعات — معرّفة مرة وحدة، وكل الروبوتات تشير إلها
// هيچ ما تنكرر الترجمة ولا تصير تناقضات بين صفحة وصفحة
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
  home: {
    label: { ar: 'روبوتات منزلية', en: 'Home robots' },
    description: {
      ar: 'مساعد منزلي ذكي للمراقبة والترفيه والتواصل مع العائلة.',
      en: 'A smart home companion for monitoring, entertainment, and staying in touch.',
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
  malls: { ar: 'المولات والمعارض', en: 'Malls & showrooms' },
  museums: { ar: 'المتاحف', en: 'Museums' },
  airports: { ar: 'المطارات', en: 'Airports' },
  offices: { ar: 'المكاتب والشركات', en: 'Offices & corporates' },
  events: { ar: 'المناسبات والفعاليات', en: 'Events' },
  home: { ar: 'المنازل', en: 'Homes' },
  research: { ar: 'البحث العلمي', en: 'Research' },
  security: { ar: 'الأمن والحراسة', en: 'Security' },
};

/** ترتيب عرض التصنيفات في صفحة "روبوتاتنا" */
export const CATEGORY_ORDER: RobotCategory[] = [
  'humanoid',
  'service',
  'educational',
  'home',
  'quadruped',
];
