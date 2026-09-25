import { COMPANY, CONTACT } from '@/data/company';
import type { Locale } from '@/lib/types';

/**
 * بيانات Organization منظّمة (JSON-LD schema.org) — تُدرج بكل صفحة عبر التخطيط
 * الجذري. هذا اللي يفهم منه قوقل "شنو الجزري كشركة" (الاسم، الشعار، العنوان،
 * حسابات التواصل) ويُستخدم كأساس لبناء "بطاقة المعرفة" (Knowledge Panel) اللي
 * تظهر يمين نتائج البحث عند كتابة اسم الشركة — خطوة أساسية قبل النشر.
 * كل القيم مأخوذة من src/data/company.ts (المصدر الوحيد للحقيقة) — ما فيها
 * أي رقم أو معلومة مخترعة.
 */
export default function OrganizationJsonLd({ locale }: { locale: Locale }) {
  const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aljazari.iq';
  const isAr = locale === 'ar';

  const sameAs = [CONTACT.social.instagram, CONTACT.social.facebook, CONTACT.social.linkedin, CONTACT.social.youtube]
    .filter((url) => url && url.trim() !== '');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: isAr ? COMPANY.name.ar : COMPANY.name.en,
    alternateName: ['Al-Jazari', 'AlJazari', 'الجزري', 'شركة الجزري'],
    url: `${BASE}/${locale}`,
    logo: `${BASE}/brand/${isAr ? 'logo-ar.png' : 'logo-en.png'}`,
    image: `${BASE}/og-image.jpg`,
    description: isAr ? COMPANY.positioning.ar : COMPANY.positioning.en,
    slogan: isAr ? COMPANY.slogan.ar : COMPANY.slogan.en,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address[locale],
      addressLocality: 'Baghdad',
      addressCountry: 'IQ',
    },
    ...(CONTACT.email ? { email: CONTACT.email } : {}),
    ...(CONTACT.phone ? { telephone: CONTACT.phone } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
