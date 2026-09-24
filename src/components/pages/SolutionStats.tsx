'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useLocale } from 'next-intl';
import { Sparkles, Monitor, Target, Route, type LucideIcon } from 'lucide-react';
import type { Locale } from '@/lib/types';
import type { RobotSolutionStat, RobotSolutionStats } from '@/data/robotSolutions';

const ICONS: Record<RobotSolutionStat['icon'], LucideIcon> = {
  sparkles: Sparkles,
  monitor: Monitor,
  target: Target,
  route: Route,
};

/**
 * عدّاد رقمي بسيط يدعم الكسور العشرية (مثل 99.99%) — CountUp الموجود بالموقع يقرّب
 * لأعداد صحيحة فقط فما يصلح لهذا الرقم. يبدأ العد لما يدخل العنصر الشاشة.
 */
function AnimatedNumber({
  to,
  decimals,
  prefix,
  suffix,
}: {
  to: number;
  decimals: number;
  prefix: string;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} dir="ltr" className="tabular-nums">
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/**
 * قسم أرقام/إحصائيات القطاع — بطاقات زجاجية بنفسجية بأربع أرقام كبيرة متحركة
 * (نفس أرقام مستند PUDU المرسل من الدكتور لقطاع الرعاية الصحية).
 */
export default function SolutionStats({ stats }: { stats: RobotSolutionStats }) {
  const locale = useLocale() as Locale;

  return (
    <div className="mx-auto max-w-6xl">
      <h2 className="text-center text-2xl font-semibold text-white sm:text-3xl">
        {stats.title[locale]}
      </h2>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {stats.items.map((item, i) => {
          const Icon = ICONS[item.icon] ?? Sparkles;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass-card flex flex-col items-center rounded-2xl px-4 py-7 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-300/30 bg-purple-900/40 text-purple-200 shadow-[0_0_24px_rgba(124,71,224,0.35)]">
                <Icon size={26} strokeWidth={1.6} />
              </span>
              <p className="mt-4 min-h-[3.25rem] text-sm leading-snug text-purple-100/80">
                {item.label[locale]}
              </p>
              <p className="mt-3 bg-gradient-to-b from-white to-purple-300 bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
                <AnimatedNumber
                  to={item.to}
                  decimals={item.decimals}
                  prefix={item.prefix}
                  suffix={item.suffix}
                />
              </p>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-5 text-end text-xs text-purple-300/60">{stats.source[locale]}</p>
    </div>
  );
}
