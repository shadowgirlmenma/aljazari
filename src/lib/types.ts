// ─────────────────────────────────────────────────────────────
// الأنواع المشتركة لكل بيانات الموقع
// قاعدة ثابتة: أي نص يشوفه الزائر = LocalizedText (عربي + إنجليزي مكتوبين بإيد)
// أي قيمة تقنية (13.3 inch, 19KG, LiDAR) = string عادي، ما تُترجم
// ─────────────────────────────────────────────────────────────

export const LOCALES = ['ar', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

/** نص ثنائي اللغة. ممنوع الترجمة الآلية — كل نص مكتوب يدوياً. */
export type LocalizedText = Record<Locale, string>;

/** تصنيفات الروبوتات كما وردت في كتالوغ الشركة */
export type RobotCategory = 'humanoid' | 'service' | 'educational' | 'home' | 'quadruped';

/** القطاعات المستهدفة — المفاتيح معرّفة مرة وحدة في data/sectors.ts */
export type SectorKey =
  | 'education'
  | 'healthcare'
  | 'hospitality'
  | 'restaurants'
  | 'banking'
  | 'retail'
  | 'malls'
  | 'museums'
  | 'airports'
  | 'offices'
  | 'events'
  | 'home'
  | 'research'
  | 'security';

/** ميزة وظيفية للروبوت (عنوان + شرح قصير) */
export interface RobotFeature {
  title: LocalizedText;
  description?: LocalizedText;
}

/** مواصفة تقنية: التسمية تُترجم، والقيمة تبقى كما هي */
export interface RobotSpec {
  label: LocalizedText;
  value: string;
}

/**
 * جزء مادي مؤشَّر على صورة الروبوت.
 * `side` تحدد جهة الخط المنقّط في تصميم الكتالوغ:
 * start = جهة بداية السطر (يمين بالعربي / يسار بالإنجليزي)
 */
export interface RobotHardware {
  label: LocalizedText;
  side: 'start' | 'end';
}

export interface Robot {
  /** يُستخدم في الرابط: /ar/robots/pepper — لا يتغير أبداً بعد النشر */
  slug: string;
  /** الاسم التجاري — ما يُترجم ولا يُكتب بالعربي */
  name: string;
  /** الشركة المصنّعة */
  brand: string;
  category: RobotCategory;
  /** سطر واحد تحت الاسم، مثل "روبوت بشري" */
  tagline: LocalizedText;
  /** فقرة تعريفية قصيرة تظهر في البطاقة وفي أعلى صفحة التفاصيل */
  summary: LocalizedText;
  features: RobotFeature[];
  specs: RobotSpec[];
  hardware: RobotHardware[];
  sectors: SectorKey[];
  /** مسار الصورة داخل /public */
  image: string;
  /** موديل ثلاثي الأبعاد اختياري (.glb) */
  model3d?: string;
  /** يظهر في الصفحة الرئيسية */
  featured?: boolean;
  /** ترتيب العرض داخل تصنيفه */
  order: number;
  /** true = ناقصة معلومات من الشركة، تنعرض بشكل مبسّط */
  draft?: boolean;
}
