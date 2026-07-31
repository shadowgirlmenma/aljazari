'use client';
import { useTranslations } from 'next-intl';
import LogoLoop from '@/components/reactbits/LogoLoop';
import type { Locale } from '@/lib/types';

type PartnerItem = { name: string | Record<string, string>; logo?: string };

export default function PartnersSection({
  partners,
  clients,
  locale,
}: {
  partners: PartnerItem[];
  clients: PartnerItem[];
  locale: Locale;
}) {
  const t = useTranslations('home');

  const getName = (n: string | Record<string, string>): string =>
    typeof n === 'string' ? n : (n[locale] ?? n['en'] ?? Object.values(n)[0] ?? '');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toLogos = (items: PartnerItem[]): any[] =>
    items.map(item =>
      item.logo
        ? { src: item.logo, alt: getName(item.name) }
        : {
            node: (
              <span className="whitespace-nowrap font-mono text-xs font-medium tracking-wide text-white/70">
                {getName(item.name)}
              </span>
            ),
          }
    );

  return (
    <section className="bg-[#0a0414]">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
        <h2 className="text-xl font-semibold text-white/80">{t('partners.title')}</h2>
        <div className="mt-6 h-16 overflow-hidden">
          <LogoLoop
            logos={toLogos(partners)}
            speed={70}
            direction="left"
            logoHeight={36}
            gap={56}
            hoverSpeed={0}
            fadeOut
            fadeOutColor="#0a0414"
          />
        </div>

        <h2 className="mt-16 text-xl font-semibold text-white/80">{t('clients.title')}</h2>
        <div className="mt-6 h-20 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700">
          <LogoLoop
            logos={toLogos(clients)}
            speed={90}
            direction="left"
            logoHeight={40}
            gap={48}
            hoverSpeed={0}
            fadeOut
            fadeOutColor="#7c47e0"
          />
        </div>
      </div>
    </section>
  );
}
