'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import DotGridBackdrop from '@/components/reactbits/DotGridBackdrop';
import type { Locale } from '@/lib/types';

/**
 * "ماذا نقدم" — ثلاث خدمات رئيسية فقط (ملاحظة المراجعة 10/09/2026):
 * حلول الروبوتات، حلول الذكاء الاصطناعي، البرنامج التدريبي.
 * (الصيانة والدعم و"تجارة الروبوتات" ما تنعرض هنا كخدمات رئيسية.)
 * كل بطاقة رابط للصفحة الخاصة بالخدمة، بصورة موجودة بالموقع وعنوان بشريط زجاجي.
 * الصور: robots-banner-poster.jpg / ai-solutions/vision.jpg / services/training.jpg
 */
const SERVICES: { key: string; image: string; href: '/robot-solutions' | '/ai-solutions' | '/training' }[] = [
  { key: 'robotSolutions', image: '/robots-banner-poster.jpg',   href: '/robot-solutions' },
  { key: 'ai',             image: '/ai-solutions/vision.jpg',    href: '/ai-solutions' },
  { key: 'training',       image: '/services/training.jpg',      href: '/training' },
];

export default function ServicesSection({ locale: _locale }: { locale: Locale }) {
  const t = useTranslations('home');

  return (
    <section className="section-dark relative overflow-hidden">
      <DotGridBackdrop />
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">{t('services.title')}</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {SERVICES.map(({ key, image, href }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                href={href}
                className="group relative block aspect-[16/11] overflow-hidden sm:aspect-square rounded-3xl border border-purple-300/20 shadow-[0_10px_40px_rgba(9,3,20,0.5)] transition-all duration-500 hover:-translate-y-2 hover:border-purple-300/50 hover:shadow-[0_18px_60px_rgba(124,71,224,0.4)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt={t(`services.${key}.title`)}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120621]/90 via-[#120621]/15 to-transparent" />

                <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
                  <div className="glass flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5">
                    <span className="text-base font-semibold leading-tight text-white sm:text-lg">
                      {t(`services.${key}.title`)}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-600/80 text-white transition group-hover:bg-purple-500 rtl:-scale-x-100">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
