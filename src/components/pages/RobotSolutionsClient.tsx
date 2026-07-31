'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from '@/i18n/navigation';
import StarBorder from '@/components/reactbits/StarBorder';

const SECTOR_IMAGES: Record<string, string> = {
  educational: '/images/sectors/educational.jpg',
  hospitality: '/images/sectors/hospitality.jpg',
  cafe:        '/images/sectors/cafe.jpg',
  banking:     '/images/sectors/banking.jpg',
  showroom:    '/images/sectors/showroom.jpg',
  malls:       '/images/sectors/malls.jpg',
};

export default function RobotSolutionsClient({
  title, subtitle, bannerLabel, sectors, services, ctaLabel,
}: {
  title: string;
  subtitle: string;
  bannerLabel: string;
  sectors: { key: string; label: string }[];
  services: { label: string; icon: string }[];
  ctaLabel: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* ── البانر ── */}
      <div className="relative overflow-hidden bg-[#120621] py-20 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(124,71,224,0.35) 0%, transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
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
            transition={{ delay: 0.1 }}
            className="mt-4 text-4xl font-semibold text-white sm:text-5xl"
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
        </div>
      </div>

      {/* ── القطاعات ── */}
      <div className="bg-[#0a0414]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">

          {/* تابز القطاعات */}
          <div className="flex flex-wrap justify-center gap-3">
            {sectors.map((s, i) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setActive(i)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  active === i
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                    : 'border border-purple-500/30 text-purple-200/70 hover:border-purple-400 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* صورة القطاع */}
          <div className="relative mx-auto mt-12 h-72 max-w-3xl overflow-hidden rounded-2xl sm:h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/60 to-[#120621]"
              >
                {/* placeholder حتى تجي الصور */}
                <div className="text-center">
                  <p className="font-mono text-xs uppercase tracking-widest text-purple-400">
                    {sectors[active]?.key}
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    {sectors[active]?.label}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── خدمات الصيانة والبرمجة ── */}
      <div className="bg-[#120621]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-purple-500/20 bg-purple-900/10 p-8 text-center"
              >
                <span className="text-4xl">{service.icon}</span>
                <p className="mt-4 font-medium text-white">{service.label}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
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