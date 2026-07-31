import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import LegalPageClient from '@/components/pages/LegalPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });
  return {
    title: t('title'),
    alternates: {
      canonical: `/${locale}/terms`,
      languages: { ar: '/ar/terms', en: '/en/terms' },
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('terms');

  return (
    <LegalPageClient
      title={t('title')}
      lastUpdated={t('lastUpdated')}
      sections={[
        { heading: t('sections.acceptance.heading'), body: t('sections.acceptance.body') },
        { heading: t('sections.services.heading'),   body: t('sections.services.body') },
        { heading: t('sections.orders.heading'),     body: t('sections.orders.body') },
        { heading: t('sections.warranty.heading'),   body: t('sections.warranty.body') },
        { heading: t('sections.liability.heading'),  body: t('sections.liability.body') },
        { heading: t('sections.changes.heading'),    body: t('sections.changes.body') },
        { heading: t('sections.contact.heading'),    body: t('sections.contact.body') },
      ]}
    />
  );
}