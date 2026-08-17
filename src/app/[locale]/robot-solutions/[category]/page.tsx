import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/lib/types';
import {
  ROBOT_SOLUTIONS_ORDER,
  ROBOT_SOLUTIONS,
  ROBOT_SOLUTION_ICONS,
  getRobotSolution,
} from '@/data/robotSolutions';
import RobotSolutionCategoryClient from '@/components/pages/RobotSolutionCategoryClient';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    ROBOT_SOLUTIONS_ORDER.map((category) => ({ locale, category })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category: slug } = await params;
  const category = getRobotSolution(slug);
  if (!category) return {};
  const lang = locale as Locale;
  return {
    title: category.title[lang],
    description: category.hook[lang],
    alternates: {
      canonical: `/${locale}/robot-solutions/${slug}`,
      languages: {
        ar: `/ar/robot-solutions/${slug}`,
        en: `/en/robot-solutions/${slug}`,
      },
    },
  };
}

export default async function RobotSolutionCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category: slug } = await params;
  setRequestLocale(locale);

  const category = getRobotSolution(slug);
  if (!category) notFound();

  const Icon = ROBOT_SOLUTION_ICONS[slug as keyof typeof ROBOT_SOLUTIONS];
  const t = await getTranslations('robotSolutions');

  return (
    <RobotSolutionCategoryClient
      category={category}
      Icon={Icon}
      t={{
        backToSolutions: t('backToSolutions'),
        meetRobots: t('meetRobots'),
        whoIs: t('whoIs'),
        whatCanDo: t('whatCanDo'),
        providedTo: t('providedTo'),
        whyChoose: t('whyChoose'),
        learnMore: t('learnMore'),
        viewRobot: t('viewRobot'),
        availableForRent: t('availableForRent'),
        cta: t('cta'),
      }}
    />
  );
}
