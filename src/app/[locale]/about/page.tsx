
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import AboutClient from '@/components/pages/AboutClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/about`,
      languages: { ar: '/ar/about', en: '/en/about' },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <AboutClient
      title={t('title')}
      subtitle={t('subtitle')}
      storyTitle={t('story.title')}
      storyBody1={t('story.body1')}
      storyBody2={t('story.body2')}
      videoTitle={t('video.title')}
      videoWatch={t('video.watch')}
      symbolTitle={t('symbol.title')}
      symbolSubtitle={t('symbol.subtitle')}
      symbolArabicTitle={t('symbol.arabicLetter.title')}
      symbolArabicDesc={t('symbol.arabicLetter.desc')}
      symbolEnglishTitle={t('symbol.englishLetter.title')}
      symbolEnglishDesc={t('symbol.englishLetter.desc')}
      symbolRobotTitle={t('symbol.robotShape.title')}
      symbolRobotDesc={t('symbol.robotShape.desc')}
      talentsTitle={t('talents.title')}
      talentsSubtitle={t('talents.subtitle')}
      talentsCeo={{
        name: t('talents.ceo.name'),
        role: t('talents.ceo.role'),
        desc: t('talents.ceo.desc'),
      }}
      talentsMembers={t.raw('talents.members')}
      talentsAmbassadorsTitle={t('talents.ambassadors.title')}
      talentsAmbassadorsCount={t('talents.ambassadors.count')}
      talentsAmbassadorsDesc={t('talents.ambassadors.desc')}
      talentsAmbassadorsComingSoon={t('talents.ambassadors.comingSoon')}
      foundersTitle={t('founders.title')}
      foundersBody1={t('founders.body1')}
      foundersBody2={t('founders.body2')}
      foundersBody3={t('founders.body3')}
      signature={t('founders.signature')}
      signature2={t('founders.signature2')}
      contactTitle={t('contact.title')}
      contactAddress={t('contact.address')}
      contactPhone="+964 7802 555 444"
      contactEmail="info@aljazari.iq"
      jobsTitle={t('jobs.title')}
      jobsBody={t('jobs.body')}
      jobsCta={t('jobs.cta')}
    />
  );
}