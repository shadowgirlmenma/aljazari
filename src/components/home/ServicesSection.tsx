'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import DotGridBackdrop from '@/components/reactbits/DotGridBackdrop';
import type { Locale } from '@/lib/types';

const SERVICES: { key: string; image: string }[] = [
  { key: 'maintenance', image: '/services/maintenance.jpg' },
  { key: 'ai',           image: '/services/ai.jpg' },
  { key: 'training',     image: '/services/training.jpg' },
];

/**
 * "ماذا نقدم" — شبكة بسيطة عمودين (بطاقات صور بعنوان بالزاوية، بدون أيقونات)،
 * بدون بوردر وبدون شريط متحرك أوتوماتيكي. نفس التخطيط بكل مقاسات الشاشة
 * (2 أعمدة دايماً) حسب طلب المراجعة. 3 خدمات فقط فعلياً (لا يوجد "تجارة
 * روبوتات" كخدمة منفصلة) — آخر بطاقة تمتد بعرض الصفين حتى ما تبقى وحيدة بزاوية.
 */
export default function ServicesSection({ locale: _locale }: { locale: Locale }) {
  const t = useTranslations('home');

  return (
    <section className="section-dark relative overflow-hidden">
      <DotGridBackdrop />
      <div className="relative z-10 mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">{t('services.title')}</h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4">
          {SERVICES.map(({ key, image }, i) => {
            const isLast = i === SERVICES.length - 1;
            return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl ${
                isLast ? 'col-span-2 aspect-[2.2/1]' : 'aspect-[4/3]'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={t(`services.${key}.title`)}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
                <span className="text-sm font-semibold leading-tight text-white sm:text-base">
                  {t(`services.${key}.title`)}
                </span>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
