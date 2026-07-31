import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import LegalPageClient from '@/components/pages/LegalPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return {
    title: t('title'),
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: { ar: '/ar/privacy', en: '/en/privacy' },
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('privacy');

  return (
    <LegalPageClient
      title={t('title')}
      lastUpdated={t('lastUpdated')}
      sections={[
        { heading: t('sections.collect.heading'),  body: t('sections.collect.body') },
        { heading: t('sections.use.heading'),       body: t('sections.use.body') },
        { heading: t('sections.share.heading'),     body: t('sections.share.body') },
        { heading: t('sections.cookies.heading'),   body: t('sections.cookies.body') },
        { heading: t('sections.security.heading'),  body: t('sections.security.body') },
        { heading: t('sections.rights.heading'),    body: t('sections.rights.body') },
        { heading: t('sections.contact.heading'),   body: t('sections.contact.body') },
      ]}
    />
  );
}