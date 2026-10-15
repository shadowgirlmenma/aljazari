import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/lib/types';
import {
  ROBOT_SOLUTIONS_ORDER,
  getRobotSolution,
  type RobotSolutionSlug,
} from '@/data/robotSolutions';
import RobotSolutionCategoryClient from '@/components/pages/RobotSolutionCategoryClient';
import JsonLd from '@/components/seo/JsonLd';
import { getRobot } from '@/data/robots';
import { SECTORS } from '@/data/taxonomy';
import { ORG_ID, SITE_URL, breadcrumbList, iraqArea } from '@/lib/seo';
import type { LocalizedText } from '@/lib/types';

// ─────────────────────────────────────────────────────────────
// تحديث 15/10/2026 (خطة SEO / GEO — القسم 5.2):
//  • عنوان كل قطاع صار يحتوي "في العراق" (مثلاً "حلول روبوتات الرعاية
//    الصحية في العراق"، "استئجار روبوت في العراق")
//  • الوصف = الجملة الافتتاحية + فقرة التعريف الظاهرة بالصفحة
//  • بيانات Service: اسم الحل، وصفه، القطاع المستهدف (audience)، الجزري
//    كمزوّد، العراق كمنطقة خدمة، والروبوتات المقترحة لهذا القطاع (كل وحدة
//    مربوطة بصفحتها) — نفس المحتوى الظاهر للزائر بالضبط
//  • BreadcrumbList: الرئيسية ← حلول الروبوتات ← اسم القطاع
// ─────────────────────────────────────────────────────────────

const IN_IRAQ: LocalizedText = { ar: 'في العراق', en: 'in Iraq' };

const SERVICE_TYPE: Record<'solutions' | 'rental', LocalizedText> = {
  solutions: { ar: 'حلول الروبوتات', en: 'Robotics solutions' },
  rental: { ar: 'تأجير الروبوتات', en: 'Robot rental' },
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    ROBOT_SOLUTIONS_ORDER.map((category) => ({ locale, category })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category: slug } = await params;
  const category = getRobotSolution(slug);
  if (!category) return {};
  const lang = locale as Locale;
  const title = `${category.title[lang]} ${IN_IRAQ[lang]}`;
  const description = `${category.hook[lang]} ${category.intro[lang]}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: lang === 'ar' ? 'ar_IQ' : 'en_US',
      url: `/${locale}/robot-solutions/${slug}`,
    },
    alternates: {
      canonical: `/${locale}/robot-solutions/${slug}`,
      languages: {
        ar: `/ar/robot-solutions/${slug}`,
        en: `/en/robot-solutions/${slug}`,
      },
    },
  };
}

export default async function RobotSolutionCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category: slug } = await params;
  setRequestLocale(locale);

  const category = getRobotSolution(slug);
  if (!category) notFound();

  const t = await getTranslations('robotSolutions');
  const tNav = await getTranslations('nav');
  const lang = locale as Locale;
  const pageUrl = `${SITE_URL}/${locale}/robot-solutions/${slug}`;

  // الروبوتات المقترحة لهذا القطاع — بالاسم التجاري الرسمي ورابط صفحتها
  // إذا إلها صفحة، وإلا بالاسم المكتوب بمستند الشركة
  const suggestedRobots = category.robots.map((r) => {
    const robot = r.slug ? getRobot(r.slug) : undefined;
    return {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: robot?.name ?? r.docName,
        ...(robot && !robot.draft ? { url: `${SITE_URL}/${locale}/robots/${robot.slug}` } : {}),
      },
    };
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: category.title[lang],
        description: category.intro[lang],
        serviceType: SERVICE_TYPE[slug === 'rental' ? 'rental' : 'solutions'][lang],
        provider: { '@id': ORG_ID },
        areaServed: iraqArea(lang),
        url: pageUrl,
        ...(category.sectorKey
          ? { audience: { '@type': 'Audience', audienceType: SECTORS[category.sectorKey][lang] } }
          : {}),
        ...(suggestedRobots.length > 0
          ? {
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: t('meetRobots'),
                itemListElement: suggestedRobots,
              },
            }
          : {}),
      },
      breadcrumbList([
        { name: tNav('home'), path: `/${locale}` },
        { name: tNav('robotSolutions'), path: `/${locale}/robot-solutions` },
        { name: category.title[lang], path: `/${locale}/robot-solutions/${slug}` },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <RobotSolutionCategoryClient
        category={category}
        slug={slug as RobotSolutionSlug}
        t={{
          backToSolutions: t('backToSolutions'),
          meetRobots: t('meetRobots'),
          whoIs: t('whoIs'),
          whatCanDo: t('whatCanDo'),
          providedTo: t('providedTo'),
          whyChoose: t('whyChoose'),
          learnMore: t('learnMore'),
          viewRobot: t('viewRobot'),
          availableForRent: t('availableForRent'),
          cta: t('cta'),
        }}
      />
    </>
  );
}
