import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import HardwareCallouts from '@/components/robots/HardwareCallouts';
import { getRobot, PUBLISHED_ROBOTS } from '@/data/robots';
import { CATEGORIES, SECTORS } from '@/data/taxonomy';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/lib/types';
import RobotDetailClient from '@/components/robots/RobotDetailClient';
import BookRobotButton from '@/components/robots/BookRobotButton';
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PUBLISHED_ROBOTS.map((robot) => ({ locale, slug: robot.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const robot = getRobot(slug);
  if (!robot) return {};
  const lang = locale as Locale;
  return {
    title: `${robot.name} — ${robot.tagline[lang]}`,
    description: robot.summary[lang],
    alternates: {
      canonical: `/${locale}/robots/${slug}`,
      languages: { ar: `/ar/robots/${slug}`, en: `/en/robots/${slug}` },
    },
  };
}

export default async function RobotPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const robot = getRobot(slug);
  if (!robot || robot.draft) notFound();

  const t = await getTranslations('robots');
  const lang = locale as Locale;

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: robot.name,
            description: robot.summary[lang],
            brand: robot.brand || undefined,
            category: CATEGORIES[robot.category].label.en,
          }),
        }}
      />

      {/* ── Header البنفسجي الداكن ── */}
      <div className="bg-brand-gradient text-white">
        <Container className="py-12 sm:py-16">
          <Link
            href="/robots"
            className="font-mono text-xs uppercase tracking-widest text-purple-300 transition hover:text-white"
          >
            ← {t('title')}
          </Link>

          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-purple-400">
            {CATEGORIES[robot.category].label[lang]}
          </p>

          <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-7xl">
            {robot.name}
          </h1>
          <p className="mt-2 text-xl text-purple-200">{robot.tagline[lang]}</p>
          <p className="mt-6 max-w-2xl leading-relaxed text-purple-100/85">
            {robot.summary[lang]}
          </p>

          {robot.brand && (
            <p className="mt-6 font-mono text-xs text-purple-400">
              {t('madeBy')}: {robot.brand}
            </p>
          )}

          <BookRobotButton robotSlug={robot.slug} robotName={robot.name} />
        </Container>
      </div>

      {/* ── التأشيرات المنقطة (توقيع الكتالوج) ── */}
      <div className="bg-[#0a0414]">
        <Container className="py-16 sm:py-20">
          <HardwareCallouts robot={robot} />
        </Container>
      </div>

      {/* ── المميزات + المواصفات + القطاعات (client للأنيمشن) ── */}
      <RobotDetailClient robot={robot} locale={lang} t_features={t('features')} t_specs={t('specs')} t_sectors={t('sectors')} t_madeBy={t('madeBy')} />
    </>
  );
}