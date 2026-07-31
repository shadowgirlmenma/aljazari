import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import TrainingClient from '@/components/pages/TrainingClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'training' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/training`,
      languages: { ar: '/ar/training', en: '/en/training' },
    },
  };
}

export default async function TrainingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('training');

  return (
    <TrainingClient
      title={t('title')}
      subtitle={t('subtitle')}
      bannerLabel={t('bannerLabel')}
      liveLabel={t('liveLabel')}
      filterType={t('filterType')}
      filterDeliver={t('filterDeliver')}
      types={[
        { key: 'all',      label: t('types.all') },
        { key: 'paths',    label: t('types.paths') },
        { key: 'courses',  label: t('types.courses') },
        { key: 'workshops',label: t('types.workshops') },
      ]}
      delivers={[
        { key: 'all',    label: t('delivers.all') },
        { key: 'online', label: t('delivers.online') },
        { key: 'onsite', label: t('delivers.onsite') },
      ]}
      courses={[
        { slug: 'robotics-basics', title: t('courses.robotics.title'), type: 'courses',   deliver: 'onsite', tag: 'Robotics' },
        { slug: 'ai-beginners',    title: t('courses.ai.title'),       type: 'courses',   deliver: 'online', tag: 'AI / IoT' },
        { slug: 'robotics-path',   title: t('courses.path.title'),     type: 'paths',     deliver: 'online', tag: 'Robotics' },
        { slug: 'ros2-workshop',   title: t('courses.ws.title'),       type: 'workshops', deliver: 'onsite', tag: 'AI / IoT' },
        { slug: 'iot-robotics',    title: t('courses.iot.title'),      type: 'courses',   deliver: 'online', tag: 'AI / IoT' },
        { slug: 'ai-applied-path', title: t('courses.path2.title'),    type: 'paths',     deliver: 'onsite', tag: 'Robotics' },
      ]}
      applyLabel={t('apply')}
    />
  );
}