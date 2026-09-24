'use client';
import { useTranslations } from 'next-intl';
import LogoLoop from '@/components/reactbits/LogoLoop';
import StrokeText from '@/components/reactbits/StrokeText';
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
    <section className="section-dark relative overflow-hidden">
      <div className="relative z-10 py-20">
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-8 lg:px-10">
          <div className="mx-auto" style={{ width: 'fit-content' }}>
            <StrokeText text={t('partners.title')} fontSize={30} fontWeight={800} />
          </div>
        </div>

        <div className="mt-10 w-full overflow-hidden py-6 sm:px-8 lg:px-10">
          <LogoLoop
            logos={toLogos(partners)}
            speed={60}
            direction="left"
            logoHeight={56}
            gap={56}
            pauseOnHover={false}
            fadeOut
            fadeOutColor="#120621"
            className="logoloop--plain"
          />
        </div>

        <div className="mx-auto mt-16 max-w-6xl px-5 text-center sm:px-8 lg:px-10">
          <div className="mx-auto" style={{ width: 'fit-content' }}>
            <StrokeText text={t('clients.title')} fontSize={30} fontWeight={800} />
          </div>
        </div>
        <div className="mt-10 w-full overflow-hidden py-6 sm:px-8 lg:px-10">
          <LogoLoop
            logos={toLogos(clients)}
            speed={75}
            direction="left"
            logoHeight={56}
            gap={56}
            pauseOnHover={false}
            fadeOut
            fadeOutColor="#120621"
            className="logoloop--plain"
          />
        </div>
      </div>
    </section>
  );
}
