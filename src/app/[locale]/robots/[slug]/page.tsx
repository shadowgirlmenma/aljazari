import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import { getRobot, PUBLISHED_ROBOTS } from '@/data/robots';
import { CATEGORIES, SECTORS } from '@/data/taxonomy';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/lib/types';
import RobotDetailClient from '@/components/robots/RobotDetailClient';
import BookRobotButton from '@/components/robots/BookRobotButton';
import RobotGallery from '@/components/robots/RobotGallery';
import RobotInstagramReels from '@/components/robots/RobotInstagramReels';
import RobotYoutubeVideos from '@/components/robots/RobotYoutubeVideos';
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
            category: CATEGORIES[robot.categories[0]].label.en,
          }),
        }}
      />

      {/* ── Header البنفسجي الداكن ── */}
      <div className="relative overflow-hidden bg-brand-gradient text-white">
        {/* صورة الروبوت — تطفو بالجهة المقابلة للنص، بدون خلفية */}
        {robot.image && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 end-0 hidden w-[48%] md:block"
          >
            <Image
              src={robot.image}
              alt=""
              fill
              priority
              sizes="48vw"
              className="object-contain object-center p-4 drop-shadow-2xl"
            />
          </div>
        )}
        <Container className="relative z-10 py-12 sm:py-16">
          <div className={robot.image ? 'md:max-w-[54%]' : ''}>
            <Link
              href="/robots"
              className="font-mono text-xs uppercase tracking-widest text-purple-300 transition hover:text-white"
            >
              ← {t('title')}
            </Link>

            <h1 className="mt-8 text-5xl font-semibold tracking-tight sm:text-7xl">
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

            <BookRobotButton robotSlug={robot.slug} robotName={robot.name} productType={robot.productType} />

            {/* صورة الروبوت على الموبايل — تحت النص */}
            {robot.image && (
              <div className="relative mx-auto mt-10 aspect-square w-full max-w-sm md:hidden">
                <Image
                  src={robot.image}
                  alt={robot.name}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* ── معرض الصور — يظهر بس إذا الروبوت عنده أكثر من صورة بـ gallery ── */}
      {robot.gallery && robot.gallery.length > 1 && (
        <div className="section-dark">
          <Container className="py-16 sm:py-20">
            <RobotGallery robot={robot} />
            <RobotInstagramReels robot={robot} />
            <RobotYoutubeVideos robot={robot} />
          </Container>
        </div>
      )}

      {/* ── المميزات + المواصفات + القطاعات (client للأنيمشن) ── */}
      <RobotDetailClient robot={robot} locale={lang} t_features={t('features')} t_specs={t('specs')} t_sectors={t('sectors')} t_madeBy={t('madeBy')} />
    </>
  );
}