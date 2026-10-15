import { COMPANY, CONTACT, ROBOT_SERVICES, AI_SERVICES } from '@/data/company';
import { CATEGORIES } from '@/data/taxonomy';
import type { Locale } from '@/lib/types';

/**
 * بيانات منظّمة (JSON-LD schema.org) تُدرج بكل صفحة عبر [locale]/layout.tsx.
 *
 * تحديث 15/10/2026 (خطة SEO / AEO / GEO):
 * بدل عقدة Organization وحدة، صارت "@graph" بثلاث عقد مربوطة ببعض بمعرّفات
 * ثابتة (@id) — هذا اللي يخلي Google وأدوات الذكاء الاصطناعي (AI Overview،
 * ChatGPT، Gemini، Perplexity) تفهم بدون لبس إن كل صفحات الموقع، بالعربي
 * والإنكليزي، تخص نفس الشركة:
 *
 *   1) Organization  ← هوية الشركة: الاسم بكل صيغه، الشعار، الوصف، الخدمات،
 *                       المجالات اللي تختص بيها (knowsAbout)، حسابات التواصل
 *   2) LocalBusiness ← الفرع الفعلي ببغداد (العنوان) — يقوّي الظهور بالبحث
 *                       المحلي مثل "روبوتات بغداد" وبخرائط Google
 *   3) WebSite       ← الموقع نفسه ولغاته (ar / en)
 *
 * كل القيم مأخوذة من src/data/company.ts و src/data/taxonomy.ts (المصدر
 * الوحيد للحقيقة) — ما فيها أي رقم أو معلومة مخترعة. الحقول الفارغة هناك
 * (الهاتف، لينكدإن، يوتيوب) تنحذف تلقائياً من هنا لحد ما تنملى.
 *
 * ملاحظة: ما ضفنا إحداثيات (geo) لأن رابط Google Maps الصحيح للشركة لسا
 * ما تأكد — نضيفها لما يتأكد.
 */

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aljazari.iq').replace(/\/$/, '');

const ORG_ID = `${BASE}/#organization`;
const LOCAL_ID = `${BASE}/#localbusiness`;
const WEBSITE_ID = `${BASE}/#website`;

/** كل الصيغ اللي ممكن يكتب بيها الناس اسم الشركة — عربي وإنكليزي */
const ALTERNATE_NAMES = [
  'Al-Jazari',
  'AlJazari',
  'ALJAZARI',
  'Al-Jazari Robotics',
  'Aljazari Iraq',
  'الجزري',
  'شركة الجزري',
  'الجزري للروبوتات',
];

/** المجالات اللي تختص بيها الشركة — تساعد محركات الذكاء الاصطناعي تربطنا بالمواضيع الصح */
const KNOWS_ABOUT: Record<Locale, string[]> = {
  ar: [
    'الروبوتات',
    'الذكاء الاصطناعي',
    CATEGORIES.humanoid.label.ar,
    CATEGORIES.service.label.ar,
    CATEGORIES.educational.label.ar,
    'تأجير الروبوتات',
    'صيانة وبرمجة الروبوتات',
    'وكلاء الذكاء الاصطناعي',
    'الأتمتة',
    'تعليم الروبوتات',
  ],
  en: [
    'Robotics',
    'Artificial intelligence',
    CATEGORIES.humanoid.label.en,
    CATEGORIES.service.label.en,
    CATEGORIES.educational.label.en,
    'Robot rental',
    'Robot maintenance and programming',
    'AI agents',
    'Automation',
    'Robotics education',
  ],
};

export default function OrganizationJsonLd({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const name = isAr ? COMPANY.name.ar : COMPANY.name.en;

  const sameAs = [
    CONTACT.social.instagram,
    CONTACT.social.facebook,
    CONTACT.social.linkedin,
    CONTACT.social.youtube,
  ].filter((url) => url && url.trim() !== '');

  const address = {
    '@type': 'PostalAddress',
    streetAddress: CONTACT.address[locale],
    addressLocality: isAr ? 'بغداد' : 'Baghdad',
    addressCountry: 'IQ',
  };

  const areaServed = {
    '@type': 'Country',
    name: isAr ? 'العراق' : 'Iraq',
  };

  // كتالوج الخدمات — كل خدمة روبوتات وذكاء اصطناعي كـ Offer مستقل
  const offerCatalog = {
    '@type': 'OfferCatalog',
    name: isAr ? 'خدمات الجزري' : 'ALJAZARI services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: isAr ? 'خدمات الروبوتات' : 'Robotics services',
        itemListElement: ROBOT_SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.title[locale],
            description: s.description[locale],
            areaServed,
            provider: { '@id': ORG_ID },
          },
        })),
      },
      {
        '@type': 'OfferCatalog',
        name: isAr ? 'حلول الذكاء الاصطناعي' : 'AI solutions',
        itemListElement: AI_SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.title[locale],
            description: s.description[locale],
            areaServed,
            provider: { '@id': ORG_ID },
          },
        })),
      },
    ],
  };

  const logo = {
    '@type': 'ImageObject',
    url: `${BASE}/brand/${isAr ? 'logo-ar.png' : 'logo-en.png'}`,
  };

  const contact = {
    ...(CONTACT.email ? { email: CONTACT.email } : {}),
    ...(CONTACT.phone ? { telephone: CONTACT.phone } : {}),
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name,
        alternateName: ALTERNATE_NAMES,
        url: `${BASE}/${locale}`,
        logo,
        image: `${BASE}/og-image.jpg`,
        // جملة تعريفية مباشرة أولاً (هذي اللي تنقتبس حرفياً بإجابات الذكاء الاصطناعي)
        // وبعدها الوصف الكامل
        description: `${COMPANY.positioning[locale]}. ${COMPANY.about[locale]}`,
        slogan: COMPANY.slogan[locale],
        address,
        areaServed,
        foundingLocation: {
          '@type': 'Place',
          name: isAr ? 'بغداد، العراق' : 'Baghdad, Iraq',
        },
        knowsAbout: KNOWS_ABOUT[locale],
        hasOfferCatalog: offerCatalog,
        ...contact,
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        '@type': 'LocalBusiness',
        '@id': LOCAL_ID,
        name,
        alternateName: ALTERNATE_NAMES,
        url: `${BASE}/${locale}`,
        image: `${BASE}/og-image.jpg`,
        logo,
        description: COMPANY.positioning[locale],
        address,
        areaServed,
        parentOrganization: { '@id': ORG_ID },
        ...contact,
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: BASE,
        name,
        alternateName: ALTERNATE_NAMES,
        description: COMPANY.positioning[locale],
        inLanguage: ['ar', 'en'],
        publisher: { '@id': ORG_ID },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // نهرب "<" احتياطاً حتى ما ينكسر الـ <script> لو صار نص فيه علامة HTML
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  );
}
