'use client';

import { motion } from 'motion/react';
import JoinSection from '@/components/home/JoinSection';
import DotGridBackdrop from '@/components/reactbits/DotGridBackdrop';
import Logo from '@/components/Logo';
import type { Locale } from '@/lib/types';

export default function TrainingClient({
  title, subtitle, liveLabel,
  comingSoonTitle, comingSoonBody,
  locale,
}: {
  title: string;
  subtitle: string;
  liveLabel: string;
  comingSoonTitle: string;
  comingSoonBody: string;
  locale: Locale;
}) {
  return (
    <>
      {/* ── بانر فيديو بدون صوت، مضغوط للأنترنت الضعيف — يغطي كامل عرض وطول الشاشة بدون فراغات ── */}
      <div className="relative w-full overflow-hidden bg-[#120621]" style={{ height: '100svh' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/training-banner-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/training-banner.mp4" type="video/mp4" />
        </video>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(18,6,33,0.2) 0%, rgba(18,6,33,0.35) 55%, rgba(10,4,20,0.85) 100%)',
          }}
        />

        <div className="relative z-10 flex h-full w-full flex-col justify-end px-5 pb-12 pt-20 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-purple-400/40 bg-purple-900/30 px-3 py-1.5"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" />
            <span className="font-mono text-[10px] text-purple-300">{liveLabel}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="max-w-xl text-xl font-semibold text-white sm:text-2xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="mt-2 max-w-md text-xs text-purple-200/75 sm:text-sm"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>

      {/* ── الكورسات قريباً ── */}
      <div className="relative overflow-hidden bg-[#0a0414]">
        <DotGridBackdrop opacity={0.35} />
        <div className="relative z-10 mx-auto max-w-2xl px-5 py-24 text-center sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-purple-400/30 bg-purple-900/30"
          >
            <Logo className="h-7 w-7 text-purple-300" title="الجزري" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-2xl font-semibold text-white sm:text-3xl"
          >
            {comingSoonTitle}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="mt-4 leading-relaxed text-purple-200/70"
          >
            {comingSoonBody}
          </motion.p>
        </div>
      </div>

      {/* ── انضم إلينا: متدرب أو مدرب ── */}
      <JoinSection locale={locale} />
    </>
  );
}
