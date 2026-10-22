import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import { getRobot, PUBLISHED_ROBOTS } from '@/data/robots';
import { CATEGORIES, SECTORS } from '@/data/taxonomy';
import { routing } from '@/i18n/routing';
import type { Locale, LocalizedText, Robot } from '@/lib/types';
import RobotDetailClient from '@/components/robots/RobotDetailClient';
import BookRobotButton from '@/components/robots/BookRobotButton';
import RobotGallery from '@/components/robots/RobotGallery';
import RobotInstagramReels from '@/components/robots/RobotInstagramReels';
import RobotYoutubeVideos from '@/components/robots/RobotYoutubeVideos';
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PUBLISHED_ROBOTS.map((robot) => ({ locale, slug: robot.slug })),
  );
}

// ─────────────────────────────────────────────────────────────
// تحديث 15/10/2026 (خطة SEO / GEO — القسم 5.3 بخطة الكلمات المفتاحية):
// الناس تبحث عن "اسم الموديل + العراق" لما تكون جاهزة تشتري (مثلاً
// "Unitree G1 Iraq" / "روبوت Pepper العراق"). فصار عنوان ووصف كل صفحة روبوت
// يحتوي "في العراق / in Iraq" + نوع التوفّر (بيع / إيجار / حجز مسبق)،
// وبيانات Product المنظّمة صارت أكمل (صور، رابط، الشركة المصنّعة، البائع)،
// وضفنا BreadcrumbList (الرئيسية ← روبوتاتنا ← اسم الروبوت).
// ─────────────────────────────────────────────────────────────

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aljazari.iq').replace(/\/$/, '');

const IN_IRAQ: LocalizedText = { ar: 'في العراق', en: 'in Iraq' };
const AVAILABLE_VIA: LocalizedText = {
  ar: 'متوفر في العراق عبر الجزري',
  en: 'Available in Iraq through ALJAZARI',
};
const HOME_LABEL: LocalizedText = { ar: 'الرئيسية', en: 'Home' };

/** نص التوفّر حسب productType — إذا الحقل فاضي = بيع + إيجار (نفس الافتراض بصفحة روبوتاتنا) */
function availabilityText(robot: Robot, lang: Locale): string {
  type Availability = NonNullable<Robot['productType']>[number];
  const types: Availability[] =
    robot.productType && robot.productType.length > 0 ? robot.productType : ['sale', 'rent'];
  const labels: Record<Availability, LocalizedText> = {
    sale: { ar: 'بيع', en: 'sale' },
    rent: { ar: 'تأجير', en: 'rental' },
    preorder: { ar: 'حجز مسبق', en: 'pre-order' },
  };
  const parts = types.map((type) => labels[type][lang]);
  return lang === 'ar' ? parts.join(' و') : parts.join(' and ');
}

/** يحوّل أي مسار داخلي (/robots/x.webp) لرابط كامل — بيانات schema.org تحتاج روابط كاملة */
function absolute(path: string): string {
  return path.startsWith('http') ? path : `${BASE}${path.startsWith('/') ? '' : '/'}${path}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const robot = getRobot(slug);
  if (!robot) return {};
  const lang = locale as Locale;

  // مثال: "Unitree G1 EDU في العراق — روبوت بشري" (والـ layout يضيف "— الجزري" بالأخير)
  const title = `${robot.name} ${IN_IRAQ[lang]} — ${robot.tagline[lang]}`;
  const lead =
    lang === 'ar'
      ? `${robot.name} متوفر في العراق لدى الجزري (${availabilityText(robot, lang)}) مع ضمان 12 شهراً ودعم فني.`
      : `${robot.name} is available in Iraq from ALJAZARI for ${availabilityText(robot, lang)}, with a 12-month warranty and technical support.`;
  const description = `${lead} ${robot.summary[lang]}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/robots/${slug}`,
      languages: { ar: `/ar/robots/${slug}`, en: `/en/robots/${slug}` },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: lang === 'ar' ? 'ar_IQ' : 'en_US',
      url: `/${locale}/robots/${slug}`,
      ...(robot.image ? { images: [{ url: robot.image, alt: robot.name }] } : {}),
    },
  };
}

export default async function RobotPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const robot = getRobot(slug);
  if (!robot || robot.draft) notFound();

  const t = await getTranslations('robots');
  const lang = locale as Locale;

  const pageUrl = `${BASE}/${locale}/robots/${robot.slug}`;
  const images = [
    robot.image,
    ...(robot.gallery ?? []).filter((item): item is string => typeof item === 'string'),
  ]
    .filter(Boolean)
    .map(absolute);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${pageUrl}#product`,
        name: robot.name,
        description: robot.summary[lang],
        url: pageUrl,
        ...(images.length > 0 ? { image: Array.from(new Set(images)) } : {}),
        ...(robot.brand
          ? {
              brand: { '@type': 'Brand', name: robot.brand },
              manufacturer: { '@type': 'Organization', name: robot.brand },
            }
          : {}),
        category: CATEGORIES[robot.categories[0]].label[lang],
        // الجزري هي الجهة الي توفّر الروبوت بالعراق — مربوطة بعقدة المنظمة
        // المعرّفة بـ OrganizationJsonLd (نفس الـ @id)
        seller: { '@id': `${BASE}/#organization` },
        audience: {
          '@type': 'BusinessAudience',
          geographicArea: { '@type': 'Country', name: lang === 'ar' ? 'العراق' : 'Iraq' },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: HOME_LABEL[lang], item: `${BASE}/${locale}` },
          { '@type': 'ListItem', position: 2, name: t('title'), item: `${BASE}/${locale}/robots` },
          { '@type': 'ListItem', position: 3, name: robot.name, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      {/* JSON-LD — Product + BreadcrumbList. نهرب "<" احتياطاً حتى لو صار
          البيانات مستقبلاً من حقل قابل للتعديل من لوحة الأدمن، ما ينكسر الـ
          <script> ولا ينحقن HTML جواه */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      {/* ── Header البنفسجي الداكن ──
          ملاحظة المراجعة 26/09/2026: زدنا المسافة الفوقية (pt-32/pt-40) حتى ما
          يتصادم رابط "← رجوع" مع الهيدر الثابت (fixed) — كان شفاف وقاعد يتراكب
          فوق النص مباشرة لأن هذا القسم مو بانر كامل الشاشة مثل باقي صفحات
          الموقع (اللي نصها بالأسفل بعيد عن الهيدر). ما أثرنا على الهيدر نفسه
          ولا أي صفحة ثانية — التعديل هنا بس. */}
      <div className="relative overflow-hidden bg-brand-gradient text-white">
        {/* صورة الروبوت — تطفو بالجهة المقابلة للنص، بدون خلفية */}
        {robot.image && !robot.heroBleed && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 end-0 hidden w-[48%] md:block"
          >
            <Image
              src={robot.image}
              alt=""
              fill
              priority
              sizes="48vw"
              className="object-contain object-center p-4 drop-shadow-2xl"
            />
          </div>
        )}
        {/* بانر مشهد كامل (heroBleed) — ملتصق بالحافة اليمنى والسفلى للهيدر بكامل
            ارتفاعه، حتى تبين المكعّبات وكأنها طالعة من جانب الشاشة اليمين. أعلى
            الصورة شفاف أصلاً، فيمر تحت الهيدر الزجاجي بدون ما يغطي شي. */}
        {robot.image && robot.heroBleed && (
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0 top-20 hidden w-[56%] md:block lg:w-[54%]"
          >
            <Image
              src={robot.image}
              alt=""
              fill
              priority
              quality={95}
              sizes="75vw"
              className="object-cover object-right-bottom"
            />
          </div>
        )}
        <Container className="relative z-10 pb-12 pt-32 sm:pb-16 sm:pt-40">
          <div
            className={
              robot.heroBleed
                ? 'md:mr-auto md:max-w-[44%] md:pb-10 lg:max-w-[46%]'
                : robot.image
                  ? 'md:max-w-[54%]'
                  : ''
            }
          >
            {/* ملاحظة المراجعة 26/09/2026: رابط الرجوع كان نحيف وصغير (text-xs بدون
                خلفية) — صار زر زجاجي (glass-pill) أوضح وأكبر وأثخن، بنفس أسلوب
                باقي أزرار الموقع الزجاجية. */}
            <Link
              href="/robots"
              className="glass-pill inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-sm font-bold uppercase tracking-widest text-purple-100 transition hover:border-purple-300 hover:text-white"
            >
              ← {t('title')}
            </Link>

            <h1 className="mt-8 text-5xl font-semibold tracking-tight sm:text-7xl">
              {robot.name}
            </h1>
            <p className="mt-2 text-xl text-purple-200">{robot.tagline[lang]}</p>
            <p className="mt-6 max-w-2xl leading-relaxed text-purple-100/85">
              {robot.summary[lang]}
            </p>

            {/* سطر "متوفر في العراق" — نص ظاهر للزائر يطابق العنوان والوصف وبيانات
                Product المنظّمة (محركات البحث والذكاء الاصطناعي تثق بالمعلومة لما
                تكون ظاهرة بالصفحة نفسها، مو بس مخفية بالـ metadata) */}
            <p className="mt-6 font-mono text-xs text-purple-400">
              {robot.brand && (
                <>
                  {t('madeBy')}: {robot.brand}
                  <span aria-hidden className="mx-2 text-purple-500/60">·</span>
                </>
              )}
              {AVAILABLE_VIA[lang]}
            </p>

            <BookRobotButton robotSlug={robot.slug} robotName={robot.name} productType={robot.productType} />

            {/* صورة الروبوت على الموبايل — تحت النص */}
            {robot.image && !robot.heroBleed && (
              <div className="relative mx-auto mt-10 aspect-square w-full max-w-sm md:hidden">
                <Image
                  src={robot.image}
                  alt={robot.name}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </Container>

        {/* بانر heroBleed على الموبايل — تحت النص، بعرض الشاشة كامل وملتصق باليمين والأسفل */}
        {robot.image && robot.heroBleed && (
          <div className="relative -mt-4 aspect-[2880/2239] w-full md:hidden">
            <Image
              quality={95}
              src={robot.image}
              alt={robot.name}
              fill
              sizes="100vw"
              className="object-cover object-right-bottom"
            />
          </div>
        )}
      </div>

      {/* ── معرض الصور — يظهر بس إذا الروبوت عنده أكثر من صورة بـ gallery ── */}
      {robot.gallery && robot.gallery.length > 1 && (
        <div className="section-dark">
          <Container className="py-16 sm:py-20">
            <RobotGallery robot={robot} />
            <RobotInstagramReels robot={robot} />
            <RobotYoutubeVideos robot={robot} />
          </Container>
        </div>
      )}

      {/* ── المميزات + المواصفات + القطاعات (client للأنيمشن) ── */}
      <RobotDetailClient robot={robot} locale={lang} t_features={t('features')} t_specs={t('specs')} t_sectors={t('sectors')} t_madeBy={t('madeBy')} />
    </>
  );
}