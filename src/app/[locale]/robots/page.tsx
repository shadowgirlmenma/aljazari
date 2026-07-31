import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Container from '@/components/ui/Container';
import RobotsGrid from '@/components/robots/RobotsGrid';
import RobotsPageBanner from '@/components/robots/RobotsPageBanner';
import { PUBLISHED_ROBOTS } from '@/data/robots';
// أضيفي هذا الاستيراد فوق مع الباقي
import RobotsShowcaseGallery from '@/components/robots/RobotsShowcaseGallery';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'robots' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/robots`,
      languages: { ar: '/ar/robots', en: '/en/robots' },
    },
  };
}

export default async function RobotsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('robots');

  return (
    <>
      <RobotsPageBanner title={t('title')} subtitle={t('subtitle')} />
      <div className="bg-[#0a0414] pt-4">
        <RobotsShowcaseGallery robots={PUBLISHED_ROBOTS} />
      </div>
      <div className="min-h-screen bg-[#0a0414]">
        <Container className="py-12 sm:py-16">
          <RobotsGrid robots={PUBLISHED_ROBOTS} />
        </Container>
      </div>
    </>
  );
}