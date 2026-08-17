'use client';
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'motion/react';
import DotGridBackdrop from '@/components/reactbits/DotGridBackdrop';
import type { Locale } from '@/lib/types';

const SERVICE_KEYS = ['maintenance', 'ai', 'training'] as const;
const AUTO_ADVANCE_MS = 3000;

export default function ServicesSection({ locale: _locale }: { locale: Locale }) {
  const t = useTranslations('home');
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const activeKey = SERVICE_KEYS[active];

  const goTo = useCallback((next: number) => {
    setActive(((next % SERVICE_KEYS.length) + SERVICE_KEYS.length) % SERVICE_KEYS.length);
  }, []);

  // يبدل الخدمة الظاهرة كل 3 ثواني تلقائياً، ويوقف مؤقتاً وقت الماوس فوق الشريط
  useEffect(() => {
    if (hovered) return;
    const id = setInterval(() => {
      setActive(prev => (prev + 1) % SERVICE_KEYS.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [hovered]);

  return (
    <section className="section-dark glass-backdrop relative overflow-hidden">
      <DotGridBackdrop />
      <div className="relative z-10 py-20">
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-8 lg:px-10">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">{t('services.title')}</h2>
        </div>

        {/* شريط بعرض الشاشة كامل — يخرج عن حاوية max-w حتى يمتد من طرف للثاني */}
        <div className="relative left-1/2 mt-14 w-screen -translate-x-1/2">
          <div
            className="glass-card strip-glow relative h-[62vh] w-full overflow-hidden sm:h-[75vh]"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeKey}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/services/${activeKey}.jpg`}
                  alt={t(`services.${activeKey}.title`)}
                  className="absolute inset-0 h-full w-full select-none object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(9,3,20,0.88),rgba(9,3,20,0.45)_45%,rgba(9,3,20,0.15)_75%)]" />

                <div className="absolute inset-y-0 left-0 flex w-full max-w-md items-center px-8 sm:px-12 lg:px-16">
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
                  >
                    <h3 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                      {t(`services.${activeKey}.title`)}
                    </h3>
                    <p className="mt-4 text-sm font-normal leading-relaxed text-purple-100/80 sm:text-base">
                      {t(`services.${activeKey}.desc`)}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* مؤشرات صغيرة بالأسفل يسار */}
            <div className="absolute bottom-6 left-8 z-10 flex gap-2 sm:left-12 lg:left-16">
              {SERVICE_KEYS.map((key, i) => (
                <button
                  key={key}
                  type="button"
                  aria-label={t(`services.${key}.title`)}
                  onClick={() => goTo(i)}
                  className={`h-[6px] rounded-full transition-[width,background] duration-300 ${
                    i === active ? 'w-6 bg-white' : 'w-[6px] bg-white/35 hover:bg-white/55'
                  }`}
                />
              ))}
            </div>

            {/* سهم يسار */}
            <button
              type="button"
              aria-label="previous"
              onClick={() => goTo(active - 1)}
              className="absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition hover:border-purple-300/50 hover:bg-black/50 sm:left-6"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* سهم يمين */}
            <button
              type="button"
              aria-label="next"
              onClick={() => goTo(active + 1)}
              className="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition hover:border-purple-300/50 hover:bg-black/50 sm:right-6"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
