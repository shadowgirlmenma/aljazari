import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  // 'always' = كل رابط يحمل لغته: /ar/robots و /en/robots
  // هذا أهم قرار للـ SEO: كوكل يفهرس النسختين منفصلات مع hreflang
  localePrefix: 'always',
});

export type AppLocale = (typeof routing.locales)[number];
