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

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1fr_280px]">
          <div className="text-left">
            <ScrollReveal
              baseOpacity={0.06}
              baseRotation={2}
              blurStrength={5}
              textClassName="text-white text-2xl sm:text-4xl leading-snug text-left"
            >
              {t('about.body')}
            </ScrollReveal>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-left text-base leading-relaxed text-white/70 sm:text-lg"
            >
              {t('about.body2')}
            </motion.p>
          </div>

          {/* لوغو كبير — محاذي مع بداية الفقرة الرئيسية (مو نص العمود كامل شامل الفقرة الثانية) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="hidden lg:flex lg:items-start lg:justify-center"
          >
            <Logo className="w-48 text-purple-400 opacity-70" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
