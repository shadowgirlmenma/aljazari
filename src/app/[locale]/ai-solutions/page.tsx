import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import AiSolutionsClient from '../../../components/pages/AiSolutionsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aiSolutions' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/ai-solutions`,
      languages: { ar: '/ar/ai-solutions', en: '/en/ai-solutions' },
    },
  };
}

export default async function AiSolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('aiSolutions');

  return (
    <AiSolutionsClient
      title={t('title')}
      subtitle={t('subtitle')}
      bannerLabel={t('bannerLabel')}
      intro={t('intro')}
      services={[
        {
          title: t('services.vision.title'),
          desc:  t('services.vision.desc'),
          icon:  '👁',
        },
        {
          title: t('services.nlp.title'),
          desc:  t('services.nlp.desc'),
          icon:  '💬',
        },
        {
          title: t('services.automation.title'),
          desc:  t('services.automation.desc'),
          icon:  '⚙️',
        },
        {
          title: t('services.analytics.title'),
          desc:  t('services.analytics.desc'),
          icon:  '📊',
        },
      ]}
      ctaLabel={t('cta')}
    />
  );
}