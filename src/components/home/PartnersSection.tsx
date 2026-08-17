'use client';
import { useTranslations } from 'next-intl';
import LogoLoop from '@/components/reactbits/LogoLoop';
import DotGridBackdrop from '@/components/reactbits/DotGridBackdrop';
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
    <section className="section-dark glass-backdrop relative overflow-hidden">
      <DotGridBackdrop />
      <div className="relative z-10 py-20">
        <div className="flex justify-center px-5">
          <div style={{ width: 'fit-content' }}>
            <StrokeText
              text={t('partners.title').toUpperCase()}
              strokeColor="#a78bfa"
              fillColor="#ffffff"
              strokeWidth={1.2}
              drawDuration={1.4}
              fillDelay={0.15}
              stagger={0.04}
              trigger="scroll"
              fillMode="wipe"
              fontSize={38}
              fontWeight={800}
              letterSpacing={1}
            />
          </div>
        </div>
        {/* شريط بعرض الشاشة كامل — يخرج عن حاوية max-w حتى يمتد من طرف للثاني */}
        <div className="relative left-1/2 mt-6 w-screen -translate-x-1/2">
          <div className="glass-card strip-glow flex h-24 items-center overflow-hidden px-4 py-2 sm:h-28 sm:px-8 lg:h-32">
            <LogoLoop
              logos={toLogos(partners)}
              speed={60}
              direction="left"
              logoHeight={84}
              gap={64}
              pauseOnHover={false}
              fadeOut
              fadeOutColor="#1c0f30"
            />
          </div>
        </div>

        <div className="mt-16 flex justify-center px-5">
          <div style={{ width: 'fit-content' }}>
            <StrokeText
              text={t('clients.title').toUpperCase()}
              strokeColor="#a78bfa"
              fillColor="#ffffff"
              strokeWidth={1.2}
              drawDuration={1.4}
              fillDelay={0.15}
              stagger={0.04}
              trigger="scroll"
              fillMode="wipe"
              fontSize={38}
              fontWeight={800}
              letterSpacing={1}
            />
          </div>
        </div>
        <div className="relative left-1/2 mt-6 w-screen -translate-x-1/2">
          <div className="glass-card strip-glow flex h-24 items-center overflow-hidden px-4 py-2 sm:h-28 sm:px-8 lg:h-32">
            <LogoLoop
              logos={toLogos(clients)}
              speed={75}
              direction="left"
              logoHeight={84}
              gap={64}
              pauseOnHover={false}
              fadeOut
              fadeOutColor="#1c0f30"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
