import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import NewsArticleClient from '../../../../components/pages/NewsArticleClient';

const ARTICLES = [
  'tedx-erbil-2025',
  'itex-iraq-2025',
  'iraq-vision-2050',
  'mtu-ai-college-launch',
  'new-school-year-2025',
  'iraqi-youth-summit-2025',
  'smart-cities-forum-2025',
  'engineers-day-2025',
  'albadoor-complex-launch',
  'ai-summit-anbar-2025',
  'baghdad-beauty-connection',
  'digitization-forum-2025',
  'energy-expo-2025',
  'leap-2025-riyadh',
  'vex-competition-2025',
  'medico-2025',
  'robotics-ai-clubs-launch',
  'cutting-edge-robotics-launch',
  'first-registered-company',
] as const;

export function generateStaticParams() {
  return ARTICLES.map((slug) => [
    { locale: 'ar', slug },
    { locale: 'en', slug },
  ]).flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });

  const key = slugToKey(slug);
  if (!key) return {};

  return {
    title: t(`articles.${key}.title`),
    description: t(`articles.${key}.excerpt`),
    alternates: {
      canonical: `/${locale}/news/${slug}`,
      languages: { ar: `/ar/news/${slug}`, en: `/en/news/${slug}` },
    },
  };
}

function slugToKey(slug: string): string | null {
  const map: Record<string, string> = {
    'tedx-erbil-2025': 'tedxErbil',
    'itex-iraq-2025': 'itex2025',
    'iraq-vision-2050': 'visionIraq2050',
    'mtu-ai-college-launch': 'mtuCollege',
    'new-school-year-2025': 'newSchoolYear',
    'iraqi-youth-summit-2025': 'youthSummit',
    'smart-cities-forum-2025': 'smartCitiesForum',
    'engineers-day-2025': 'engineersDay',
    'albadoor-complex-launch': 'albadoor',
    'ai-summit-anbar-2025': 'aiSummitAnbar',
    'baghdad-beauty-connection': 'beautyConnection',
    'digitization-forum-2025': 'digitizationForum',
    'energy-expo-2025': 'energyExpo',
    'leap-2025-riyadh': 'leapRiyadh',
    'vex-competition-2025': 'vexCompetition',
    'medico-2025': 'medico2025',
    'robotics-ai-clubs-launch': 'roboticsClubs',
    'cutting-edge-robotics-launch': 'cuttingEdgeLaunch',
    'first-registered-company': 'firstCompany',
  };
  return map[slug] ?? null;
}

const ARTICLE_META: Record<
  string,
  { date: string; readTime: string; categoryKey: string; image: string }
> = {
  'tedx-erbil-2025': { date: '2025-10-05', readTime: '2', categoryKey: 'events', image: '/news/tedx-erbil-2025.avif' },
  'itex-iraq-2025': { date: '2025-09-25', readTime: '2', categoryKey: 'events', image: '/news/itex-iraq-2025.avif' },
  'iraq-vision-2050': { date: '2025-09-20', readTime: '2', categoryKey: 'events', image: '/news/iraq-vision-2050.avif' },
  'mtu-ai-college-launch': { date: '2025-09-10', readTime: '2', categoryKey: 'partnerships', image: '/news/mtu-ai-college-launch.avif' },
  'new-school-year-2025': { date: '2025-09-01', readTime: '2', categoryKey: 'success', image: '/news/new-school-year-2025.avif' },
  'iraqi-youth-summit-2025': { date: '2025-08-22', readTime: '2', categoryKey: 'events', image: '/news/iraqi-youth-summit-2025.avif' },
  'smart-cities-forum-2025': { date: '2025-05-28', readTime: '2', categoryKey: 'partnerships', image: '/news/smart-cities-forum-2025.avif' },
  'engineers-day-2025': { date: '2025-05-25', readTime: '3', categoryKey: 'events', image: '/news/engineers-day-2025.avif' },
  'albadoor-complex-launch': { date: '2025-05-24', readTime: '2', categoryKey: 'partnerships', image: '/news/albadoor-complex-launch.avif' },
  'ai-summit-anbar-2025': { date: '2025-04-17', readTime: '2', categoryKey: 'events', image: '/news/ai-summit-anbar-2025.avif' },
  'baghdad-beauty-connection': { date: '2025-04-16', readTime: '2', categoryKey: 'partnerships', image: '/news/baghdad-beauty-connection.avif' },
  'digitization-forum-2025': { date: '2025-02-27', readTime: '2', categoryKey: 'events', image: '/news/digitization-forum-2025.avif' },
  'energy-expo-2025': { date: '2025-02-24', readTime: '2', categoryKey: 'partnerships', image: '/news/energy-expo-2025.avif' },
  'leap-2025-riyadh': { date: '2025-02-13', readTime: '2', categoryKey: 'events', image: '/news/leap-2025-riyadh.avif' },
  'vex-competition-2025': { date: '2025-02-08', readTime: '2', categoryKey: 'events', image: '/news/vex-competition-2025.avif' },
  'medico-2025': { date: '2025-02-04', readTime: '2', categoryKey: 'events', image: '/news/medico-2025.avif' },
  'robotics-ai-clubs-launch': { date: '2025-02-03', readTime: '2', categoryKey: 'announcements', image: '/news/robotics-ai-clubs-launch.avif' },
  'cutting-edge-robotics-launch': { date: '2024-12-20', readTime: '2', categoryKey: 'announcements', image: '/news/cutting-edge-robotics-launch.avif' },
  'first-registered-company': { date: '2024-12-01', readTime: '2', categoryKey: 'announcements', image: '/news/first-registered-company.avif' },
};

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const key = slugToKey(slug);
  if (!key) notFound();

  const t = await getTranslations('news');
  const meta = ARTICLE_META[slug];

  return (
    <NewsArticleClient
      title={t(`articles.${key}.title`)}
      excerpt={t(`articles.${key}.excerpt`)}
      category={t(`categories.${meta.categoryKey}`)}
      date={meta.date}
      readTime={meta.readTime}
      backLabel={t('title')}
      image={meta.image}
    />
  );
}