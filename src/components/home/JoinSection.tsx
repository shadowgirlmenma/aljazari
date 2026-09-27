'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import StarBorder from '@/components/reactbits/StarBorder';
import type { Locale } from '@/lib/types';
import { openMail } from '@/lib/mailto';

export default function JoinSection({ locale }: { locale: Locale }) {
  const t = useTranslations('home');

  /* ملاحظة مراجعة 27/09/2026 (تتمة 3): كان الزرين يبنون رابط mailto: خام
     (buildMailto) ويحطونه href على <a> — هذا النوع ينفتح فقط إذا المتصفح
     عنده تطبيق بريد افتراضي مربوط فعلياً بسطح المكتب، وبأغلب الأجهزة
     (خصوصاً الكمبيوتر بدون Outlook مضبوط) ما يسوي أي شي محسوس = يبين
     "الزر ما يشتغل". باقي كل نماذج الموقع (تواصل، حجز روبوت، تسجيل بدورة،
     طلب مدرّب) تستخدم openMail() اللي يفتح تبويب Gmail (compose) جاهز
     بالحقول على الكمبيوتر، ويرجع لـ mailto: تلقائياً بالموبايل أو إذا
     المتصفح منع النافذة الجديدة — هذا التوحيد يخلي هذولين الزرين يتصرفون
     بالضبط متل بقية الموقع. */
  const handleClick = (key: 'student' | 'trainer') => {
    const subject =
      key === 'trainer'
        ? locale === 'ar' ? 'طلب انضمام كمدرّب' : 'Trainer application'
        : locale === 'ar' ? 'طلب تسجيل كمتدرب' : 'Trainee registration';

    const message =
      key === 'trainer'
        ? locale === 'ar'
          ? 'مرحباً، أرغب بالانضمام كمدرّب في الجزري.\n\nالاسم: \nمجال الخبرة: \nرقم التواصل: '
          : 'Hello, I would like to apply as a trainer at Aljazari.\n\nName: \nArea of expertise: \nPhone: '
        : locale === 'ar'
          ? 'مرحباً، أرغب بالتسجيل كمتدرب في الجزري.\n\nالاسم: \nالبرنامج المطلوب: \nرقم التواصل: '
          : 'Hello, I would like to register as a trainee at Aljazari.\n\nName: \nProgram: \nPhone: ';

    openMail(subject, [[locale === 'ar' ? 'الرسالة' : 'Message', message]]);
  };

  return (
    <section className="bg-[var(--bg-page-alt)]">
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
                as="button"
                type="button"
                onClick={() => handleClick(key)}
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