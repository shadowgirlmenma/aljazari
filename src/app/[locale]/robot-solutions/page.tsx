import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import RobotSolutionsClient from '../../../components/pages/RobotSolutionsClient';
import JsonLd from '@/components/seo/JsonLd';
import { ROBOT_SOLUTIONS, ROBOT_SOLUTIONS_ORDER } from '@/data/robotSolutions';
import { SITE_URL, breadcrumbList } from '@/lib/seo';
import type { Locale, LocalizedText } from '@/lib/types';

// تحديث 15/10/2026 (خطة SEO / GEO): عنوان يحتوي "في العراق" + بيانات ItemList
// تعرّف Google بصفحات القطاعات الـ 12 (كل وحدة برابطها) + BreadcrumbList.

const SEO_TITLE: LocalizedText = {
  ar: 'حلول الروبوتات في العراق لكل قطاع',
  en: 'Robotics Solutions in Iraq for Every Sector',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'robotSolutions' });
  const lang = locale as Locale;
  return {
    title: SEO_TITLE[lang],
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/robot-solutions`,
      languages: { ar: '/ar/robot-solutions', en: '/en/robot-solutions' },
    },
  };
}

export default async function RobotSolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('robotSolutions');
  const tNav = await getTranslations('nav');
  const lang = locale as Locale;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name: SEO_TITLE[lang],
        numberOfItems: ROBOT_SOLUTIONS_ORDER.length,
        itemListElement: ROBOT_SOLUTIONS_ORDER.map((slug, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: ROBOT_SOLUTIONS[slug].title[lang],
          url: `${SITE_URL}/${locale}/robot-solutions/${slug}`,
        })),
      },
      breadcrumbList([
        { name: tNav('home'), path: `/${locale}` },
        { name: tNav('robotSolutions'), path: `/${locale}/robot-solutions` },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <RobotSolutionsClient
        title={t('title')}
        subtitle={t('subtitle')}
        bannerLabel={t('bannerLabel')}
        ctaLabel={t('cta')}
      />
    </>
  );
}