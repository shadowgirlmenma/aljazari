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
      exploreHeading={t('exploreHeading')}
      services={[
        { key: 'maintenance', label: t('services.maintenance'), desc: t('services.maintenanceDesc') },
        { key: 'software',    label: t('services.software'),    desc: t('services.softwareDesc') },
        { key: 'training',    label: t('services.training'),    desc: t('services.trainingDesc') },
        { key: 'support',     label: t('services.support'),     desc: t('services.supportDesc') },
      ]}
      ctaLabel={t('cta')}
    />
  );
}