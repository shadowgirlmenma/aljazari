import type { MetadataRoute } from 'next';

// ⚠️ هذا ملف Next خاص يولّد /robots.txt لمحركات البحث
// ما له علاقة بـ src/data/robots.ts (بيانات روبوتات الشركة)

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aljazari.iq';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
