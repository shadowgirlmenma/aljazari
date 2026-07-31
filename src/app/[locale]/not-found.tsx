'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Logo from '@/components/Logo';

export default function NotFound() {
  const t = useTranslations('common');

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#0a0414] px-5 text-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
        style={{ mixBlendMode: 'screen' }}
      >
        <source src="/robots-hero.mp4" type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0414] via-transparent to-[#0a0414]"
      />

      <div className="relative">
        <Logo className="mx-auto w-16 text-purple-400/60" />
        <p className="mt-8 font-mono text-6xl text-purple-500/80">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
          {t('notFoundTitle')}
        </h1>
        <p className="mt-3 max-w-md text-purple-200/65">{t('notFoundBody')}</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-purple-600 px-7 py-3 text-sm font-medium text-white transition hover:bg-purple-500"
        >
          {t('backHome')}
        </Link>
      </div>
    </div>
  );
}