'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Link } from '@/i18n/navigation';
import StarBorder from '@/components/reactbits/StarBorder';
import TrainerApplicationModal from './TrainerApplicationModal';
import type { Locale } from '@/lib/types';

export default function JoinSection({ locale }: { locale: Locale }) {
  const t = useTranslations('home');
  const [trainerModalOpen, setTrainerModalOpen] = useState(false);

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
              className="flex flex-col items-center rounded-2xl border border-purple-500/20 bg-purple-900/10 p-10 text-center"
            >
              <h3 className="text-xl font-semibold text-white">{t(`join.${key}.title`)}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-purple-200/75">{t(`join.${key}.desc`)}</p>

              {key === 'student' ? (
                <StarBorder as={Link} href="/training" color="#a78bfa" speed="6s" thickness={2} className="mt-8">
                  <span className="text-sm font-medium">{t(`join.${key}.cta`)}</span>
                </StarBorder>
              ) : (
                <StarBorder
                  as="button"
                  onClick={() => setTrainerModalOpen(true)}
                  color="#a78bfa"
                  speed="6s"
                  thickness={2}
                  className="mt-8"
                >
                  <span className="text-sm font-medium">{t(`join.${key}.cta`)}</span>
                </StarBorder>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <TrainerApplicationModal
        open={trainerModalOpen}
        onClose={() => setTrainerModalOpen(false)}
      />
    </section>
  );
}