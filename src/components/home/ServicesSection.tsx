'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import TiltedCard from '@/components/reactbits/TiltedCard';
import Logo from '@/components/Logo';
import type { Locale } from '@/lib/types';

const SERVICE_KEYS = ['robots', 'maintenance', 'ai', 'training'] as const;

export default function ServicesSection({ locale }: { locale: Locale }) {
  const t = useTranslations('home');
  return (
    <section className="bg-[#0a0414]">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-purple-400">
          {t('services.eyebrow')}
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
          {t('services.title')}
        </h2>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_KEYS.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
              >
                <TiltedCard
                  containerHeight="160px"
                  containerWidth="100%"
                  imageHeight="160px"
                  imageWidth="100%"
                  rotateAmplitude={10}
                  scaleOnHover={1.07}
                  showTooltip={false}
                  placeholder={
                    <div className="flex h-full w-full items-center justify-center rounded-[20px] bg-gradient-to-br from-purple-900/60 to-[#120621] ring-1 ring-purple-400/20">
                      <Logo className="w-14 text-purple-300/50" />
                    </div>
                  }
                />
              </motion.div>
              <h3 className="mt-4 text-lg font-semibold text-white">{t(`services.${key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-purple-200/70">{t(`services.${key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
