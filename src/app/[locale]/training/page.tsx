import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import TrainingClient from '@/components/pages/TrainingClient';
import type { Locale } from '@/lib/types';

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
      liveLabel={t('liveLabel')}
      comingSoonTitle={t('comingSoonTitle')}
      comingSoonBody={t('comingSoonBody')}
      locale={locale as Locale}
    />
  );
}