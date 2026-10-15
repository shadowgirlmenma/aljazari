import type { MetadataRoute } from 'next';
import { PUBLISHED_ROBOTS } from '@/data/robots';
import { ARTICLES } from '@/data/newsArticles';
import { ROBOT_SOLUTIONS_ORDER } from '@/data/robotSolutions';
import { routing } from '@/i18n/routing';

// تحديث 15/10/2026 (خطة SEO):
//  • ضفنا صفحات حلول القطاعات الـ 12 (/robot-solutions/healthcare ...) —
//    كانت ناقصة من الـ sitemap رغم إنها من أهم الصفحات للكلمات المفتاحية
//    مثل "روبوت مطعم بغداد" و"تأجير روبوت للمناسبات".
//  • كل رابط صار يحمل نسخته باللغة الثانية (hreflang) داخل الـ sitemap نفسه،
//    حتى Google يربط /ar/... بـ /en/... ويعرض لكل مستخدم لغته.

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aljazari.iq').replace(/\/$/, '');

const STATIC_PATHS = [
  '',
  '/robots',
  '/robot-solutions',
  '/ai-solutions',
  '/training',
  '/news',
  '/about',
  '/contact',
];

type Entry = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
  priority: number;
};

function languageAlternates(path: string): Record<string, string> {
  return Object.fromEntries(routing.locales.map((l) => [l, `${BASE}/${l}${path}`]));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Entry[] = [
    ...STATIC_PATHS.map((path) => ({
      path,
      changeFrequency: (path === '' ? 'weekly' : 'monthly') as Entry['changeFrequency'],
      priority: path === '' ? 1 : 0.8,
    })),
    ...ROBOT_SOLUTIONS_ORDER.map((slug) => ({
      path: `/robot-solutions/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...PUBLISHED_ROBOTS.map((robot) => ({
      path: `/robots/${robot.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...ARTICLES.map((slug) => ({
      path: `/news/${slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];

  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const page of pages) {
      entries.push({
        url: `${BASE}/${locale}${page.path}`,
        lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages: languageAlternates(page.path) },
      });
    }
  }

  return entries;
}
