'use client';

import { motion } from 'motion/react';
import dynamic from 'next/dynamic';

const FloatingLines = dynamic(
  () => import('@/components/reactbits/FloatingLines'),
  { ssr: false }
);

export default function RobotsPageBanner({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="relative overflow-hidden bg-[#120621]">

      {/* ── الفيديو ── */}
      <div className="relative mx-auto max-w-4xl">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-auto w-full"
          style={{ mixBlendMode: 'screen' }}
        >
          <source src="/robots-hero.mp4" type="video/mp4" />
        </video>

        {/* gradient تحت الفيديو يلاشيه للأسفل */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-40"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, #120621 100%)',
          }}
        />
      </div>

      {/* FloatingLines فوق الفيديو بشفافية */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <FloatingLines
          linesGradient={['#3a1260', '#7c47e0', '#b28ce6', '#4c1d80']}
          enabledWaves={['middle']}
          lineCount={8}
          lineDistance={6}
          animationSpeed={0.5}
          interactive={false}
          parallax={false}
          mixBlendMode="screen"
        />
      </div>

      {/* النص فوق الكل */}
      <div className="relative -mt-20 pb-12 text-center sm:-mt-28">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-purple-400"
        >
          Al-Jazari Robotics
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="mt-3 text-4xl font-semibold text-white sm:text-5xl"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mx-auto mt-3 max-w-xl text-purple-200/80"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}