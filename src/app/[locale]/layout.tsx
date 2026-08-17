import type { Metadata } from 'next';

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Readex_Pro, IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';
import ConditionalChrome from '@/components/ConditionalChrome';
import CursorGlow from '@/components/reactbits/CursorGlow';
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
        <NextIntlClientProvider>
          <CursorGlow />
          <Toaster
            position="top-center"
            richColors
            theme="dark"
            toastOptions={{
              style: {
                background: '#1a0a2e',
                border: '1px solid rgba(168,139,250,0.3)',
                color: '#fff',
              },
            }}
          />
          <ConditionalChrome>{children}</ConditionalChrome>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
