import type { Metadata } from 'next';

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Readex_Pro, IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConditionalChrome from '@/components/ConditionalChrome';
import CursorGlow from '@/components/reactbits/CursorGlow';
import OrganizationJsonLd from '@/components/OrganizationJsonLd';
import { ThemeProvider, THEME_INIT_SCRIPT } from '@/components/ThemeProvider';
import ThemedToaster from '@/components/ThemedToaster';
import '../globals.css';
const readex = Readex_Pro({
  subsets: ['arabic', 'latin'],
  variable: '--font-readex',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

/** خط النسخة الإنجليزية من الموقع — Space Grotesk (تقني وواضح، يناسب هوية الجزري) */
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

/** يبني النسختين ar و en بشكل ستاتيكي وقت الـ build — أسرع وأفضل للـ SEO */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aljazari.iq'),
    title: {
      default: t('title'),
      template: `%s — ${t('siteName')}`,
    },
    description: t('description'),
    // hreflang: يخلي كوكل يربط النسخة العربية بالإنجليزية ويعرض الصح لكل مستخدم
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: '/ar',
        en: '/en',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: locale === 'ar' ? 'ar_IQ' : 'en_US',
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: t('siteName') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og-image.jpg'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className={`${readex.variable} ${plexMono.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        {/* سكربت صغير يطبّق الوضع الفاتح (لو محفوظ) قبل أول رسم للصفحة —
            حتى ما تصير "ومضة" لون داكن غلط لجزء من الثانية لحظة التحميل */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <OrganizationJsonLd locale={locale as 'ar' | 'en'} />
        <ThemeProvider>
          <NextIntlClientProvider>
            <CursorGlow />
            <ThemedToaster />
            <ConditionalChrome>{children}</ConditionalChrome>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
