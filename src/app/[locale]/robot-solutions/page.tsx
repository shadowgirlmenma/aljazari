import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import RobotSolutionsClient from '../../../components/pages/RobotSolutionsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'robotSolutions' });
  return {
    title: t('title'),
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

  return (
    <RobotSolutionsClient
      title={t('title')}
      subtitle={t('subtitle')}
      bannerLabel={t('bannerLabel')}
      sectors={[
        { key: 'educational', label: t('sectors.educational') },
        { key: 'hospitality', label: t('sectors.hospitality') },
        { key: 'cafe',        label: t('sectors.cafe') },
        { key: 'banking',     label: t('sectors.banking') },
        { key: 'showroom',    label: t('sectors.showroom') },
        { key: 'malls',       label: t('sectors.malls') },
      ]}
      services={[
        { label: t('services.maintenance'), icon: '🔧' },
        { label: t('services.software'),    icon: '💻' },
        { label: t('services.training'),    icon: '🎓' },
        { label: t('services.support'),     icon: '🛠' },
      ]}
      ctaLabel={t('cta')}
    />
  );
}