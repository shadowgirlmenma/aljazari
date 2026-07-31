import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import NewsClient from '@/components/pages/NewsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/news`,
      languages: { ar: '/ar/news', en: '/en/news' },
    },
  };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('news');

  return (
    <NewsClient
      title={t('title')}
      subtitle={t('subtitle')}
      bannerLabel={t('bannerLabel')}
      readMore={t('readMore')}
      articles={[
        {
          slug: 'tedx-erbil-2025',
          title: t('articles.tedxErbil.title'),
          excerpt: t('articles.tedxErbil.excerpt'),
          category: t('categories.events'),
          date: '2025-10-05',
          readTime: '2',
          image: '/news/tedx-erbil-2025.avif',
        },
        {
          slug: 'itex-iraq-2025',
          title: t('articles.itex2025.title'),
          excerpt: t('articles.itex2025.excerpt'),
          category: t('categories.events'),
          date: '2025-09-25',
          readTime: '2',
          image: '/news/itex-iraq-2025.avif',
        },
        {
          slug: 'iraq-vision-2050',
          title: t('articles.visionIraq2050.title'),
          excerpt: t('articles.visionIraq2050.excerpt'),
          category: t('categories.events'),
          date: '2025-09-20',
          readTime: '2',
          image: '/news/iraq-vision-2050.avif',
        },
        {
          slug: 'mtu-ai-college-launch',
          title: t('articles.mtuCollege.title'),
          excerpt: t('articles.mtuCollege.excerpt'),
          category: t('categories.partnerships'),
          date: '2025-09-10',
          readTime: '2',
          image: '/news/mtu-ai-college-launch.avif',
        },
        {
          slug: 'new-school-year-2025',
          title: t('articles.newSchoolYear.title'),
          excerpt: t('articles.newSchoolYear.excerpt'),
          category: t('categories.success'),
          date: '2025-09-01',
          readTime: '2',
          image: '/news/new-school-year-2025.avif',
        },
        {
          slug: 'iraqi-youth-summit-2025',
          title: t('articles.youthSummit.title'),
          excerpt: t('articles.youthSummit.excerpt'),
          category: t('categories.events'),
          date: '2025-08-22',
          readTime: '2',
          image: '/news/iraqi-youth-summit-2025.avif',
        },
        {
          slug: 'smart-cities-forum-2025',
          title: t('articles.smartCitiesForum.title'),
          excerpt: t('articles.smartCitiesForum.excerpt'),
          category: t('categories.partnerships'),
          date: '2025-05-28',
          readTime: '2',
          image: '/news/smart-cities-forum-2025.avif',
        },
        {
          slug: 'engineers-day-2025',
          title: t('articles.engineersDay.title'),
          excerpt: t('articles.engineersDay.excerpt'),
          category: t('categories.events'),
          date: '2025-05-25',
          readTime: '3',
          image: '/news/engineers-day-2025.avif',
        },
        {
          slug: 'albadoor-complex-launch',
          title: t('articles.albadoor.title'),
          excerpt: t('articles.albadoor.excerpt'),
          category: t('categories.partnerships'),
          date: '2025-05-24',
          readTime: '2',
          image: '/news/albadoor-complex-launch.avif',
        },
        {
          slug: 'ai-summit-anbar-2025',
          title: t('articles.aiSummitAnbar.title'),
          excerpt: t('articles.aiSummitAnbar.excerpt'),
          category: t('categories.events'),
          date: '2025-04-17',
          readTime: '2',
          image: '/news/ai-summit-anbar-2025.avif',
        },
        {
          slug: 'baghdad-beauty-connection',
          title: t('articles.beautyConnection.title'),
          excerpt: t('articles.beautyConnection.excerpt'),
          category: t('categories.partnerships'),
          date: '2025-04-16',
          readTime: '2',
          image: '/news/baghdad-beauty-connection.avif',
        },
        {
          slug: 'digitization-forum-2025',
          title: t('articles.digitizationForum.title'),
          excerpt: t('articles.digitizationForum.excerpt'),
          category: t('categories.events'),
          date: '2025-02-27',
          readTime: '2',
          image: '/news/digitization-forum-2025.avif',
        },
        {
          slug: 'energy-expo-2025',
          title: t('articles.energyExpo.title'),
          excerpt: t('articles.energyExpo.excerpt'),
          category: t('categories.partnerships'),
          date: '2025-02-24',
          readTime: '2',
          image: '/news/energy-expo-2025.avif',
        },
        {
          slug: 'leap-2025-riyadh',
          title: t('articles.leapRiyadh.title'),
          excerpt: t('articles.leapRiyadh.excerpt'),
          category: t('categories.events'),
          date: '2025-02-13',
          readTime: '2',
          image: '/news/leap-2025-riyadh.avif',
        },
        {
          slug: 'vex-competition-2025',
          title: t('articles.vexCompetition.title'),
          excerpt: t('articles.vexCompetition.excerpt'),
          category: t('categories.events'),
          date: '2025-02-08',
          readTime: '2',
          image: '/news/vex-competition-2025.avif',
        },
        {
          slug: 'medico-2025',
          title: t('articles.medico2025.title'),
          excerpt: t('articles.medico2025.excerpt'),
          category: t('categories.events'),
          date: '2025-02-04',
          readTime: '2',
          image: '/news/medico-2025.avif',
        },
        {
          slug: 'robotics-ai-clubs-launch',
          title: t('articles.roboticsClubs.title'),
          excerpt: t('articles.roboticsClubs.excerpt'),
          category: t('categories.announcements'),
          date: '2025-02-03',
          readTime: '2',
          image: '/news/robotics-ai-clubs-launch.avif',
        },
        {
          slug: 'cutting-edge-robotics-launch',
          title: t('articles.cuttingEdgeLaunch.title'),
          excerpt: t('articles.cuttingEdgeLaunch.excerpt'),
          category: t('categories.announcements'),
          date: '2024-12-20',
          readTime: '2',
          image: '/news/cutting-edge-robotics-launch.avif',
        },
        {
          slug: 'first-registered-company',
          title: t('articles.firstCompany.title'),
          excerpt: t('articles.firstCompany.excerpt'),
          category: t('categories.announcements'),
          date: '2024-12-01',
          readTime: '2',
          image: '/news/first-registered-company.avif',
        },
      ]}
    />
  );
}