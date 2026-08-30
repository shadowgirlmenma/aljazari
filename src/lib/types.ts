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
export type RobotCategory = 'humanoid' | 'service' | 'educational';

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
  | 'security'
  | 'warehousing'
  | 'universities'
  | 'schools'
  | 'gaming'
  | 'enterprises'
  | 'showroom';

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
  /**
   * تصنيف أو أكثر — أول عنصر هو التصنيف الأساسي (يظهر بصفحة التفاصيل والبطاقة)،
   * وبقية العناصر تخلي الروبوت يظهر بفلاتر إضافية بصفحة "روبوتاتنا".
   */
  categories: RobotCategory[];
  /** سطر واحد تحت الاسم، مثل "روبوت بشري" */
  tagline: LocalizedText;
  /** فقرة تعريفية قصيرة تظهر في البطاقة وفي أعلى صفحة التفاصيل */
  summary: LocalizedText;
  features: RobotFeature[];
  specs: RobotSpec[];
  hardware: RobotHardware[];
  sectors: SectorKey[];
  /**
   * نوع/أنواع التوفّر — يُستخدم بفلتر "نوع المنتج" بصفحة "روبوتاتنا".
   * rent = متوفر للإيجار، sale = متوفر للبيع، preorder = حجز مسبق (لسا ما وصل).
   * روبوت واحد ممكن يكون بأكثر من نوع (مثلاً rent + sale). إذا الحقل فاضي
   * يُعتبر الروبوت متوفر للإيجار والبيع (الوضع الافتراضي الحالي).
   */
  productType?: ('rent' | 'sale' | 'preorder')[];
  /** مسار الصورة الرئيسية داخل /public */
  image: string;
  /**
   * معرض صور/فيديو إضافي (اختياري) — بأي ترتيب تحبين، يظهر بنفس الشريط
   * بصفحة تفاصيل الروبوت (قبل جدول المعلومات مباشرة).
   * - صورة: مسار نصي داخل /public، مثلاً '/robots/kebbi-1.avif'
   * - فيديو محلي: { type: 'video', url: 'مسار الفيديو بـ /public', poster: 'مسار صورة الغلاف' }
   *   يظهر بنفس شريط تقليب الصور (يشتغل بدون صوت تلقائياً بالحلقة الرئيسية).
   * - فيديو ريلز إنستغرام: { type: 'instagram', url: 'رابط الريلز الكامل' }
   *   يتشغل مباشرة بالموقع (embed)، وفيه رابط "فتح بإنستغرام" أسفله.
   * - فيديو يوتيوب: { type: 'youtube', url: 'رابط فيديو يوتيوب الكامل' }
   *   يتشغل مباشرة بالموقع (embed بنفس أسلوب فيديو "من نحن")، وفيه رابط "شاهد على يوتيوب" أسفله.
   * إذا الحقل فاضي أو فيه عنصر وحد بس، تظهر الصورة الرئيسية بس وكل شي يشتغل عادي.
   */
  gallery?: (
    | string
    | { type: 'video'; url: string; poster?: string }
    | { type: 'instagram'; url: string }
    | { type: 'youtube'; url: string }
  )[];
  /** موديل ثلاثي الأبعاد اختياري (.glb) */
  model3d?: string;
  /** يظهر في الصفحة الرئيسية */
  featured?: boolean;
  /** ترتيب العرض داخل تصنيفه */
  order: number;
  /** true = ناقصة معلومات من الشركة، تنعرض بشكل مبسّط */
  draft?: boolean;
}
