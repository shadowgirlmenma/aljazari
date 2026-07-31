'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import RobotCard from './RobotCard';
import { CATEGORIES, CATEGORY_ORDER } from '@/data/taxonomy';
import type { Locale, Robot, RobotCategory } from '@/lib/types';

type Filter = RobotCategory | 'all';

export default function RobotsGrid({ robots }: { robots: Robot[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations('robots');
  const [filter, setFilter] = useState<Filter>('all');

  const available = useMemo(
    () => CATEGORY_ORDER.filter((c) => robots.some((r) => r.category === c)),
    [robots],
  );

  const visible = useMemo(
    () =>
      (filter === 'all' ? robots : robots.filter((r) => r.category === filter)).sort(
        (a, b) => a.order - b.order,
      ),
    [robots, filter],
  );

  return (
    <div>
      <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
        <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>
            {t('allCategories')}
          </FilterChip>
          {available.map((category) => (
            <FilterChip
              key={category}
              active={filter === category}
              onClick={() => setFilter(category)}
            >
              {CATEGORIES[category].label[locale]}
            </FilterChip>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="text-ink/60 mt-12 text-sm">{t('empty')}</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((robot) => (
              <RobotCard key={robot.slug} robot={robot} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      aria-pressed={active}
      className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
        active
          ? 'bg-brand-700 text-white'
          : 'border-brand-900/15 text-ink/70 hover:border-brand-400 border bg-white'
      }`}
    >
      {children}
    </motion.button>
  );
}