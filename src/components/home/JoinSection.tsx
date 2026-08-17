'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import StarBorder from '@/components/reactbits/StarBorder';
import type { Locale } from '@/lib/types';

/* بريد الجزري الرسمي — الأزرار تفتح تطبيق البريد مباشرة (mailto)، بدون أي ربط بباكند */
const CONTACT_EMAIL = 'info@aljazari.iq';

export default function JoinSection({ locale }: { locale: Locale }) {
  const t = useTranslations('home');

  const mailtoHref = (subject: string, body: string) =>
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const trainerMailto = mailtoHref(
    locale === 'ar' ? 'طلب انضمام كمدرّب' : 'Trainer application',
    locale === 'ar'
      ? 'مرحباً، أرغب بالانضمام كمدرّب في الجزري.\n\nالاسم: \nمجال الخبرة: \nرقم التواصل: '
      : 'Hello, I would like to apply as a trainer at Aljazari.\n\nName: \nArea of expertise: \nPhone: '
  );

  const traineeMailto = mailtoHref(
    locale === 'ar' ? 'طلب تسجيل كمتدرب' : 'Trainee registration',
    locale === 'ar'
      ? 'مرحباً، أرغب بالتسجيل كمتدرب في الجزري.\n\nالاسم: \nالبرنامج المطلوب: \nرقم التواصل: '
      : 'Hello, I would like to register as a trainee at Aljazari.\n\nName: \nProgram: \nPhone: '
  );

  return (
    <section className="bg-[#0a0414]">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">{t('join.title')}</h2>
          <p className="mt-3 text-purple-300">{t('join.subtitle')}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {(['student', 'trainer'] as const).map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.12 }}
              className="flex flex-col items-center rounded-2xl border border-purple-500/20 bg-purple-900/10 p-10 text-center backdrop-blur-md"
            >
              <h3 className="text-xl font-medium text-white">{t(`join.${key}.title`)}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-purple-200/75">{t(`join.${key}.desc`)}</p>

              <StarBorder
                as="a"
                href={key === 'student' ? traineeMailto : trainerMailto}
                color="#a78bfa"
                speed="6s"
                thickness={2}
                className="mt-8"
              >
                <span className="text-sm font-medium">{t(`join.${key}.cta`)}</span>
              </StarBorder>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}