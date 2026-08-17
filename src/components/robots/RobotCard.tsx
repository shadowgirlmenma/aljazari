'use client';

import { useLocale } from 'next-intl';
import { motion } from 'motion/react';
import { Link } from '@/i18n/navigation';
import RobotVisual from './RobotVisual';
import type { Locale, Robot } from '@/lib/types';

export default function RobotCard({ robot }: { robot: Robot }) {
  const locale = useLocale() as Locale;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.95 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <Link
        href={`/robots/${robot.slug}`}
        onMouseMove={handleMouseMove}
        style={{ '--mx': '50%', '--my': '50%' } as React.CSSProperties}
        className="glass-card group relative flex h-full flex-col rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-2xl hover:shadow-brand-700/25"
      >
        {/* توهّج ناعم يتبع الماوس */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(260px circle at var(--mx) var(--my), rgba(124,71,224,0.22), transparent 70%)',
          }}
        />

        {/* حدّ مضيء رفيع يتبع الماوس */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            padding: 1,
            background:
              'radial-gradient(220px circle at var(--mx) var(--my), #a472ec, transparent 72%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        <div className="relative z-10 flex flex-1 flex-col">
          <RobotVisual
            robot={robot}
            className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />

          <h3 className="mt-5 text-xl font-medium text-white transition-transform duration-300 group-hover:scale-[1.03] group-hover:origin-start">
            {robot.name}
          </h3>
          <p className="mt-1 text-sm text-purple-200/65">{robot.tagline[locale]}</p>
          {/* نص تعريفي قصير يختفي بتدرّج عند نهايته — يشجّع الزائر يضغط "اقرأ المزيد" */}
          <p
            className="relative mt-3 line-clamp-3 text-sm leading-relaxed text-purple-200/55"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, #000 55%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, #000 55%, transparent 100%)',
            }}
          >
            {robot.summary[locale]}
          </p>

          <span className="text-brand-300 group-hover:text-brand-200 mt-5 inline-flex items-center gap-1 text-sm font-medium transition-colors">
            {locale === 'ar' ? 'اقرأ المزيد' : 'Learn more'}
            <span aria-hidden className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              {locale === 'ar' ? '←' : '→'}
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}