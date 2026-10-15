import type { Locale } from '@/lib/types';

// ─────────────────────────────────────────────────────────────
// أدوات مشتركة لبيانات schema.org (JSON-LD) — 15/10/2026
// كل الصفحات تستخدم نفس رابط الموقع ونفس معرّف الشركة (@id) حتى Google
// وأدوات الذكاء الاصطناعي تربط كل خدمة/صفحة بنفس "الجزري" المعرّفة بـ
// OrganizationJsonLd.tsx
// ─────────────────────────────────────────────────────────────

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aljazari.iq').replace(/\/$/, '');

/** نفس الـ @id المعرّف بـ OrganizationJsonLd.tsx — لا تغيّريه */
export const ORG_ID = `${SITE_URL}/#organization`;

/** رابط كامل لمسار داخلي — schema.org يحتاج روابط كاملة */
export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

/** العراق كمنطقة خدمة (areaServed) */
export function iraqArea(lang: Locale) {
  return { '@type': 'Country', name: lang === 'ar' ? 'العراق' : 'Iraq' };
}

/** مسار التنقل (Breadcrumb) — يظهر بنتائج Google بدل الرابط الطويل */
export function breadcrumbList(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
