import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import LoginClient from '../../../components/pages/LoginClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'login' });
  return {
    title: t('title'),
    alternates: {
      canonical: `/${locale}/login`,
      languages: { ar: '/ar/login', en: '/en/login' },
    },
  };
}

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('login');

  return (
    <LoginClient
      title={t('title')}
      subtitle={t('subtitle')}
      emailLabel={t('email')}
      passwordLabel={t('password')}
      submitLabel={t('submit')}
      forgotLabel={t('forgot')}
      noAccountLabel={t('noAccount')}
      signupLabel={t('signup')}
    />
  );
}