'use client';
import { useTranslations } from 'next-intl';
import CountUp from '@/components/reactbits/CountUp';
import type { Locale } from '@/lib/types';

const STATS: { to: number; suffix: string; prefix?: string; labelKey: string }[] = [
  { to: 15, suffix: '+', labelKey: 'employees' },
  { to: 3,  suffix: '',  labelKey: 'teams' },
  { to: 20, suffix: '+', labelKey: 'partners' },
  { to: 5,  prefix: '$', suffix: 'm', labelKey: 'capital' },
];

export default function NumbersSection({ locale }: { locale: Locale }) {
  const t = useTranslations('home');
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-6xl border-t border-white/10 px-5 py-20 sm:px-8 lg:px-10">
        <h2 className="text-3xl font-semibold sm:text-4xl">{t('numbers.title')}</h2>
        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
          {STATS.map(({ to, suffix, prefix, labelKey }) => (
            <div key={labelKey} className="border-t border-white/20 pt-5">
              <p className="text-5xl font-light tracking-tight sm:text-6xl">
                <CountUp to={to} prefix={prefix} suffix={suffix} duration={2.2} />
              </p>
              <p className="mt-3 text-sm text-white/55">{t(`numbers.${labelKey}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
