'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Link } from '@/i18n/navigation';
import TrueFocus from '@/components/reactbits/TrueFocus';
import DotGridBackdrop from '@/components/reactbits/DotGridBackdrop';
import type { Locale } from '@/lib/types';

export default function VisionSection({ locale }: { locale: Locale }) {
  const t = useTranslations('home');
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
              {/* "اقرأ المزيد" يودّي لصفحة "من نحن" مباشرة بدل ما يفتح قسم إضافي بنفس الصفحة —
                  محتوى قصة الجزري ورسالة المؤسسين انتقل بالكامل لصفحة About. */}
              <Link
                href="/about"
                className="group mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-purple-300 transition hover:text-white"
              >
                <span className="border-b border-purple-300 pb-0.5 group-hover:border-white">
                  {t('readMore')}
                </span>
                <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  {isAr ? '←' : '→'}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
