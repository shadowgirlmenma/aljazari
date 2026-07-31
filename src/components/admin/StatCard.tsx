'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { damping: 32, stiffness: 90 });

  useEffect(() => { motionVal.set(value); }, [value, motionVal]);
  useEffect(() => spring.on('change', (v) => setDisplay(Math.round(v))), [spring]);

  return <span>{display}</span>;
}

export default function StatCard({
  icon: Icon, label, total, newCount, delay = 0,
}: {
  icon: LucideIcon;
  label: string;
  total: number;
  newCount?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
      whileHover={{ y: -6, scale: 1.015 }}
className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-6 shadow-lg shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-purple-400/50 hover:bg-white/[0.14] hover:shadow-2xl hover:shadow-purple-900/40"    >
      <div className="flex items-start justify-between">
        <motion.span
          whileHover={{ rotate: 8, scale: 1.08 }}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-900/30 text-purple-400 transition-colors group-hover:text-purple-300"
        >
          <Icon size={18} />
        </motion.span>
        {!!newCount && newCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.3, type: 'spring', stiffness: 400, damping: 15 }}
            className="rounded-full bg-purple-600 px-2.5 py-0.5 text-[11px] font-medium text-white"
          >
            +{newCount} جديد
          </motion.span>
        )}
      </div>

      <p className="mt-5 text-3xl font-semibold text-white">
        <AnimatedNumber value={total} />
      </p>
      <p className="mt-1 text-sm text-purple-300/60">{label}</p>
    </motion.div>
  );
}