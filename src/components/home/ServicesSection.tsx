'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Wrench, BrainCircuit, GraduationCap } from 'lucide-react';
import DotGridBackdrop from '@/components/reactbits/DotGridBackdrop';
import type { Locale } from '@/lib/types';
import type { ComponentType } from 'react';

const SERVICES: { key: string; image: string; Icon: ComponentType<{ size?: number; className?: string }> }[] = [
  { key: 'maintenance', image: '/services/maintenance.jpg', Icon: Wrench },
  { key: 'ai',           image: '/services/ai.jpg',          Icon: BrainCircuit },
  { key: 'training',     image: '/services/training.jpg',    Icon: GraduationCap },
];

/**
 * "ماذا نقدم" — شبكة بسيطة عمودين (بطاقات صور بأيقونة + عنوان بالزاوية)، بدون
 * بوردر وبدون شريط متحرك أوتوماتيكي. نفس التخطيط بكل مقاسات الشاشة (2 أعمدة
 * دايماً) حسب طلب المراجعة. 3 خدمات فقط فعلياً (لا يوجد "تجارة روبوتات" كخدمة
 * منفصلة) — آخر بطاقة تمتد بعرض الصفين حتى ما تبقى وحيدة بزاوية.
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
          {SERVICES.map(({ key, image, Icon }, i) => {
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

              <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 sm:inset-x-4 sm:bottom-4 sm:gap-2.5">
                <span className="glass-pill flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white sm:h-9 sm:w-9">
                  <Icon size={16} className="sm:hidden" />
                  <Icon size={18} className="hidden sm:block" />
                </span>
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
