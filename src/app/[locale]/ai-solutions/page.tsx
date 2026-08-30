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
    description: t('interfaceHeading'),
    alternates: {
      canonical: `/${locale}/ai-solutions`,
      languages: { ar: '/ar/ai-solutions', en: '/en/ai-solutions' },
    },
  };
}

const SOLUTION_KEYS = ['product', 'enterprise', 'agents', 'consulting'] as const;
const BENEFIT_KEYS = ['efficiency', 'decisions', 'cost', 'personalization'] as const;
const PROCESS_KEYS = ['vision', 'design', 'build', 'test', 'deploy', 'upgrade'] as const;
const INDUSTRY_KEYS = [
  'enterprises', 'healthcare', 'finance', 'ecommerce', 'logistics', 'realEstate', 'manufacturing',
  'energy', 'education',
] as const;

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
      solutionsHeading={t('solutionsHeading')}
      solutions={SOLUTION_KEYS.map((key) => ({
        key,
        title: t(`solutions.${key}.title`),
        desc: t(`solutions.${key}.desc`),
      }))}
      interfaceHeading={t('interfaceHeading')}
      interfaceBenefits={BENEFIT_KEYS.map((key) => ({
        key,
        label: t(`interfaceBenefits.${key}`),
      }))}
      customerHeading={t('customerHeading')}
      process={PROCESS_KEYS.map((key) => ({
        key,
        label: t(`process.${key}`),
      }))}
      industriesHeading={t('industriesHeading')}
      industries={INDUSTRY_KEYS.map((key) => ({
        key,
        title: t(`industries.${key}.title`),
        desc: t(`industries.${key}.desc`),
      }))}
    />
  );
}
