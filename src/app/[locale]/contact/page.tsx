import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ContactClient from '@/components/pages/ContactClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { ar: '/ar/contact', en: '/en/contact' },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <ContactClient
      title={t('title')}
      subtitle={t('subtitle')}
      nameLabel={t('form.name')}
      emailLabel={t('form.email')}
      phoneLabel={t('form.phone')}
      subjectLabel={t('form.subject')}
      messageLabel={t('form.message')}
      submitLabel={t('form.submit')}
      successMsg={t('form.success')}
      subjects={[
        t('subjects.robot'),
        t('subjects.maintenance'),
        t('subjects.ai'),
        t('subjects.training'),
        t('subjects.partnership'),
        t('subjects.other'),
      ]}
      infoTitle={t('info.title')}
      address={t('info.address')}
      phone="+964 7802 555 444"
      email="info@aljazari.iq"
      hoursLabel={t('info.hours')}
      hours={t('info.hoursValue')}
    />
  );
}