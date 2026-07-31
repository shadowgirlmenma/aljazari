'use client';

import { motion } from 'motion/react';
import { Link } from '@/i18n/navigation';
import ScrollReveal from '@/components/reactbits/ScrollReveal';
import StarBorder from '@/components/reactbits/StarBorder';
// MagicRingsBackground may not exist in some environments — provide a lightweight
// fallback to avoid module resolution errors. If you have the original
// component, replace this with the proper import path.
import React from 'react';

const MagicRingsBackground: React.FC = () => (
  <div className="absolute inset-0 -z-10" aria-hidden />
);

export default function AiSolutionsClient({
  title, subtitle, bannerLabel, intro, services, ctaLabel,
}: {
  title: string;
  subtitle: string;
  bannerLabel: string;
  intro: string;
  services: { title: string; desc: string; icon: string }[];
  ctaLabel: string;
}) {
  return (
    <>
      {/* ── البانر مع MagicRings ── */}
      <div className="relative overflow-hidden bg-[#120621]" style={{ minHeight: '380px' }}>
        <MagicRingsBackground />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(18,6,33,0.3) 0%, rgba(18,6,33,0.85) 100%)',
          }}
        />
        <div className="relative flex min-h-[380px] flex-col items-center justify-center px-5 py-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-purple-400"
          >
            {bannerLabel}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-4 max-w-2xl text-4xl font-semibold text-white sm:text-5xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            className="mx-auto mt-4 max-w-xl text-purple-200/80"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>

      {/* ── مقدمة ScrollReveal ── */}
      <div className="bg-black">
        <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:px-10">
          <ScrollReveal
            baseOpacity={0.06}
            baseRotation={2}
            blurStrength={5}
            textClassName="text-white text-2xl sm:text-3xl leading-relaxed"
          >
            {intro}
          </ScrollReveal>
        </div>
      </div>

      {/* ── الخدمات ── */}
      <div className="bg-[#0a0414]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-8 sm:grid-cols-2">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className="group rounded-2xl border border-purple-500/20 bg-purple-900/10 p-10 transition-all hover:border-purple-400/40 hover:bg-purple-900/20"
              >
                <span className="text-5xl">{service.icon}</span>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-purple-200/70">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <StarBorder
              as={Link}
              href="/contact"
              color="#a78bfa"
              speed="5s"
              thickness={2}
            >
              <span className="px-4 text-sm font-medium sm:text-base">
                {ctaLabel}
              </span>
            </StarBorder>
          </div>
        </div>
      </div>
    </>
  );
}