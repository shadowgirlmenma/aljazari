import type { MetadataRoute } from 'next';

// ⚠️ هذا ملف Next خاص يولّد /robots.txt لمحركات البحث
// ما له علاقة بـ src/data/robots.ts (بيانات روبوتات الشركة)

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aljazari.iq';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // لوحة تحكم الأدمن معطّلة حالياً بالـ middleware (تحويل تلقائي
      // للرئيسية) — هذا فقط طبقة حماية إضافية حتى ما تتفهرس بغوغل.
      disallow: ['/admin', '/admin/', '/ar/admin', '/en/admin'],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
