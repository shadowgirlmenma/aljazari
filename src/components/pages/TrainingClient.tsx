'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from '@/components/Logo';
import EnrollModal from '@/components/training/EnrollModal';

type Course = {
  slug: string;
  title: string;
  type: string;
  deliver: string;
  tag: string;
};

export default function TrainingClient({
  title, subtitle, bannerLabel, liveLabel,
  filterType, filterDeliver,
  types, delivers, courses, applyLabel,
}: {
  title: string;
  subtitle: string;
  bannerLabel: string;
  liveLabel: string;
  filterType: string;
  filterDeliver: string;
  types: { key: string; label: string }[];
  delivers: { key: string; label: string }[];
  courses: Course[];
  applyLabel: string;
}) {
  const [activeType,    setActiveType]    = useState('all');
  const [activeDeliver, setActiveDeliver] = useState('all');
  const [enrollTarget, setEnrollTarget] = useState<Course | null>(null);

  const filtered = useMemo(() =>
    courses.filter(c =>
      (activeType    === 'all' || c.type    === activeType) &&
      (activeDeliver === 'all' || c.deliver === activeDeliver)
    ),
    [courses, activeType, activeDeliver]
  );

  return (
    <>
      {/* ── البانر ── */}
      <div className="relative overflow-hidden bg-[#120621]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(124,71,224,0.38) 0%, transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-20 text-center sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-900/30 px-4 py-2"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400" />
            <span className="font-mono text-xs text-purple-300">{liveLabel}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-semibold text-white sm:text-5xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mx-auto mt-4 max-w-xl text-purple-200/80"
          >
            {subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mx-auto mt-2 font-mono text-xs uppercase tracking-widest text-purple-400"
          >
            {bannerLabel}
          </motion.p>
        </div>
      </div>

      {/* ── الفلاتر + الكورسات ── */}
      <div className="bg-[#0a0414]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10">

          {/* الفلاتر */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <span className="self-center font-mono text-xs uppercase tracking-wider text-purple-400">
                {filterType}
              </span>
              {types.map(tp => (
                <button
                  key={tp.key}
                  type="button"
                  onClick={() => setActiveType(tp.key)}
                  className={`rounded-full px-4 py-1.5 text-sm transition-all ${
                    activeType === tp.key
                      ? 'bg-purple-600 text-white'
                      : 'border border-purple-500/30 text-purple-200/60 hover:border-purple-400 hover:text-white'
                  }`}
                >
                  {tp.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="self-center font-mono text-xs uppercase tracking-wider text-purple-400">
                {filterDeliver}
              </span>
              {delivers.map(d => (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => setActiveDeliver(d.key)}
                  className={`rounded-full px-4 py-1.5 text-sm transition-all ${
                    activeDeliver === d.key
                      ? 'bg-purple-600 text-white'
                      : 'border border-purple-500/30 text-purple-200/60 hover:border-purple-400 hover:text-white'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* الكورسات */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((course, i) => (
                <motion.div
                  key={course.title}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="group flex flex-col rounded-2xl border border-purple-500/20 bg-purple-900/10 p-6 transition-all hover:border-purple-400/40 hover:bg-purple-900/20"
                >
                  <div className="flex h-36 items-center justify-center rounded-xl bg-gradient-to-br from-purple-900/60 to-[#120621]">
                    <Logo className="w-12 text-purple-400/40" />
                  </div>

                  <div className="mt-5 flex flex-1 flex-col">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-purple-500/30 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-purple-300">
                        {course.tag}
                      </span>
                      <span className="rounded-full border border-purple-500/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-purple-400/60">
                        {course.deliver}
                      </span>
                    </div>

                    <h3 className="mt-3 text-base font-semibold text-white">
                      {course.title}
                    </h3>

                    <button
                      type="button"
                      onClick={() => setEnrollTarget(course)}
                      className="mt-auto pt-5 text-start font-mono text-xs uppercase tracking-wider text-purple-400 transition hover:text-purple-200"
                    >
                      {applyLabel} →
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <p className="mt-16 text-center text-purple-200/50">
              —
            </p>
          )}
        </div>
      </div>

      <EnrollModal
        open={enrollTarget !== null}
        onClose={() => setEnrollTarget(null)}
        courseSlug={enrollTarget?.slug ?? ''}
        courseName={enrollTarget?.title ?? ''}
      />
    </>
  );
}