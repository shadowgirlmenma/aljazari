'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useLocale } from 'next-intl';
import type { Locale } from '@/lib/types';
import type { RobotSolutionBenefit, RobotSolutionLayout } from '@/data/robotSolutions';

/**
 * مخطط ثلاثي الأبعاد (isometric) لمنشأة صحية تعمل بروبوتات الجزري — طلب المراجعة:
 * «Can we go with a 3-D layout that shows how robots can integrate with the Health Center».
 *
 * - الصورة: /public/robot-solutions/healthcare-layout.jpg (المخطط المرسل من الدكتور).
 * - النقاط التفاعلية (hotspots) مربوطة بفوائد القطاع الرسمية (benefits) — نفس النصوص
 *   حرفياً بدون أي إضافة — وأول نقطة هي منصة Aljazari OS المرسومة بالصورة.
 * - مواضع النقاط بالنسبة المئوية (x/y) بملف robotSolutionsContent.json → healthcare.layout
 *   لتعديلها بدون لمس الكود.
 * - النقاط تستخدم left/top فيزيائي (مو start/end) حتى ما تنقلب بالعربي (RTL) وتبقى على الروبوت.
 */
export default function HealthcareLayout({
  layout,
  benefits,
}: {
  layout: RobotSolutionLayout;
  benefits: RobotSolutionBenefit[];
}) {
  const locale = useLocale() as Locale;

  const points = [
    {
      id: 'os',
      x: layout.osPoint.x,
      y: layout.osPoint.y,
      title: layout.os.title[locale],
      description: layout.os.description[locale],
    },
    ...layout.hotspots
      .filter((h) => benefits[h.benefit])
      .map((h) => ({
        id: `b${h.benefit}`,
        x: h.x,
        y: h.y,
        title: benefits[h.benefit].title[locale],
        description: benefits[h.benefit].description[locale],
      })),
  ];

  const [activeId, setActiveId] = useState<string>(points[0].id);
  const active = points.find((p) => p.id === activeId) ?? points[0];

  return (
    <div className="mx-auto max-w-6xl">
      <h2 className="text-center text-2xl font-semibold text-white sm:text-3xl">
        {layout.title[locale]}
      </h2>
      <p className="mt-3 text-center text-sm text-purple-200/70">{layout.hint[locale]}</p>

      {/* إطار زجاجي حول المخطط */}
      <div className="glass-card mt-8 rounded-3xl p-2 sm:p-3">
        <div className="relative aspect-[1431/802] w-full overflow-hidden rounded-2xl">
          <Image
            src={layout.image}
            alt={layout.title[locale]}
            fill
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="object-cover"
          />

          {points.map((p, i) => {
            const isActive = p.id === activeId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveId(p.id)}
                onMouseEnter={() => setActiveId(p.id)}
                aria-label={p.title}
                aria-pressed={isActive}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              >
                {/* حلقة نبض مستمرة */}
                <span
                  aria-hidden
                  className={`absolute inset-0 -m-2 rounded-full bg-purple-400/40 ${
                    isActive ? 'animate-ping' : 'animate-ping [animation-duration:2.6s]'
                  }`}
                />
                <span
                  className={`relative flex h-6 w-6 items-center justify-center rounded-full border-2 text-[10px] font-bold text-white shadow-[0_0_14px_rgba(167,139,250,0.9)] transition-all duration-300 sm:h-7 sm:w-7 sm:text-xs ${
                    isActive
                      ? 'scale-125 border-white bg-purple-500'
                      : 'border-purple-200/80 bg-purple-700/80 group-hover:scale-110'
                  }`}
                >
                  {i === 0 ? 'OS' : i}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* لوحة الشرح + قائمة النقاط */}
      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="glass-card flex min-h-[9.5rem] flex-col justify-center rounded-2xl p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-lg font-semibold text-white">{active.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-purple-100/80">
                {active.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {points.map((p, i) => {
            const isActive = p.id === activeId;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(p.id)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-start text-sm transition ${
                    isActive
                      ? 'border-purple-400/70 bg-purple-600/25 text-white'
                      : 'glass-pill border-transparent text-purple-200/75 hover:text-white'
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-purple-500 text-white' : 'bg-purple-900/60 text-purple-200'
                    }`}
                  >
                    {i === 0 ? 'OS' : i}
                  </span>
                  <span className="leading-snug">{p.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
