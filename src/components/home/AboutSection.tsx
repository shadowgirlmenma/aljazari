'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import ScrollReveal from '@/components/reactbits/ScrollReveal';
import DotGridBackdrop from '@/components/reactbits/DotGridBackdrop';
import Logo from '@/components/Logo';
import type { Locale } from '@/lib/types';

export default function AboutSection({ locale }: { locale: Locale }) {
  const t = useTranslations('home');
  return (
    <section className="section-dark relative overflow-hidden text-white">
      <DotGridBackdrop />
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
        <p className="border-t border-white/20 pt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-purple-300">
          {t('about.eyebrow')}
        </p>

        <div className="mt-8" dir="ltr">
          {/* الفقرة الرئيسية + اللوغو — صف واحد، اللوغو يتمركز عمودياً مقابل هذي الفقرة
              بالذات فقط (مو مع الفقرة الثانية الأخف تحتها)، حسب تحديد المراجعة 25/09. */}
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_240px]">
            <div className="text-left" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
              <ScrollReveal
                baseOpacity={0.06}
                baseRotation={2}
                blurStrength={5}
                textClassName="text-white text-2xl sm:text-4xl leading-snug text-left"
              >
                {t('about.body')}
              </ScrollReveal>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="hidden lg:flex lg:items-center lg:justify-center"
            >
              <Logo className="w-40 text-purple-400 opacity-70" />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.3 }}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
            className="mt-8 text-left text-base leading-relaxed text-white/70 sm:text-lg"
          >
            {t('about.body2')}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
