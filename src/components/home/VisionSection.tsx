'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import TrueFocus from '@/components/reactbits/TrueFocus';
import DotGridBackdrop from '@/components/reactbits/DotGridBackdrop';
import type { Locale } from '@/lib/types';

export default function VisionSection({ locale }: { locale: Locale }) {
  const t = useTranslations('home');
  const [open, setOpen] = useState(false);
  const isAr = locale === 'ar';
  const focusSentence = isAr ? 'رؤيتنا|مهمتنا' : 'Vision|Mission';

  return (
    <section className="section-dark relative overflow-hidden text-white">
      <DotGridBackdrop />
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">

        <div className="text-4xl font-bold sm:text-6xl">
          <TrueFocus
            sentence={focusSentence}
            separator="|"
            blurAmount={4}
            borderColor="#7c47e0"
            glowColor="rgba(124,71,224,0.55)"
            animationDuration={0.6}
            pauseBetweenAnimations={1.8}
          />
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          {(['vision','mission'] as const).map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.15 }}
            >
              <h3 className="border-t border-white/20 pt-3 text-2xl font-semibold sm:text-3xl">
                {t(`${key}.title`)}
              </h3>
              <p className="mt-5 leading-relaxed text-white/75">{t(`${key}.body`)}</p>
              <button
                onClick={() => setOpen(v => !v)}
                className="group mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-purple-300 transition hover:text-white"
              >
                <span className="border-b border-purple-300 pb-0.5 group-hover:border-white">
                  {t('readMore')}
                </span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-16 grid items-start gap-10 border-t border-white/10 pt-12 lg:grid-cols-[1.3fr_1fr]">
                <div>
                  <h3 className="text-2xl font-semibold sm:text-3xl">{t('nameOrigin.title')}</h3>
                  <p className="mt-5 leading-relaxed text-white/75">{t('nameOrigin.body')}</p>
                  <p className="mt-4 leading-relaxed text-white/75">{t('nameOrigin.body2')}</p>
                </div>
                <div className="flex aspect-[4/5] max-w-xs items-center justify-center rounded-2xl bg-gradient-to-b from-purple-900/60 to-[#120621] ring-1 ring-purple-400/20 lg:mx-auto">
                  <span className="px-6 text-center font-mono text-xs tracking-widest text-purple-300/60">
                    ISMAIL ALJAZARI<br />1136 – 1206
                  </span>
                </div>
              </div>

              <div className="mt-14 border-t border-white/10 pt-12">
                <h3 className="text-2xl font-semibold sm:text-3xl">{t('founders.title')}</h3>
                <div className="mt-6 max-w-3xl space-y-4 leading-relaxed text-white/75">
                  {(['p1','p2','p3'] as const).map(p => (
                    <p key={p}>{t(`founders.${p}`)}</p>
                  ))}
                  <p className="pt-2 text-purple-300">
                    {t('founders.signature')}<br />
                    <span className="font-medium text-white">{t('founders.signature2')}</span>
                  </p>
                </div>
              </div>

              {/* الصورة الفاصلة */}
              <div className="mt-14 h-52 w-full rounded-2xl bg-gradient-to-r from-[#120621] via-purple-900/40 to-[#120621] sm:h-72" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
