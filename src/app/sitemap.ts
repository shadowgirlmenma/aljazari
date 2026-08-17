import type { MetadataRoute } from 'next';
import { PUBLISHED_ROBOTS } from '@/data/robots';
import { ARTICLES } from '@/data/newsArticles';
import { routing } from '@/i18n/routing';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aljazari.iq';

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

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
      });
    }

    for (const robot of PUBLISHED_ROBOTS) {
      entries.push({
        url: `${BASE}/${locale}/robots/${robot.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    for (const slug of ARTICLES) {
      entries.push({
        url: `${BASE}/${locale}/news/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
      });
    }
  }

  return entries;
}
