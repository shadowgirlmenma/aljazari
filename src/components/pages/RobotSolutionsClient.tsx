'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from '@/i18n/navigation';
import {
  GraduationCap, Hotel, Coffee, Landmark, Store, ShoppingBag,
  Wrench, Code2, Users, LifeBuoy, type LucideIcon,
} from 'lucide-react';
import StarBorder from '@/components/reactbits/StarBorder';

const SECTOR_ICONS: Record<string, LucideIcon> = {
  educational: GraduationCap,
  hospitality: Hotel,
  cafe: Coffee,
  banking: Landmark,
  showroom: Store,
  malls: ShoppingBag,
};

const SERVICE_ICONS: Record<string, LucideIcon> = {
  maintenance: Wrench,
  software: Code2,
  training: Users,
  support: LifeBuoy,
};

export default function RobotSolutionsClient({
  title, subtitle, bannerLabel, sectors, services, ctaLabel,
}: {
  title: string;
  subtitle: string;
  bannerLabel: string;
  sectors: { key: string; label: string }[];
  services: { key: string; label: string; desc: string }[];
  ctaLabel: string;
}) {
  const [active, setActive] = useState(0);
  const ActiveSectorIcon = SECTOR_ICONS[sectors[active]?.key] ?? GraduationCap;

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
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-semibold text-white sm:text-5xl"
          >
            {title}
          </motion.h1>
        </div>
      </div>

      {/* ── القطاعات ── */}
      <div className="bg-[#0a0414] glass-backdrop">
        <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">

          {/* تابز القطاعات */}
          <div className="flex flex-wrap justify-center gap-3">
            {sectors.map((s, i) => {
              const Icon = SECTOR_ICONS[s.key] ?? GraduationCap;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`glass flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                    active === i
                      ? 'border-purple-400/50 bg-purple-600/80 text-white shadow-lg shadow-purple-900/40'
                      : 'text-purple-200/70 hover:border-purple-400 hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* بطاقة القطاع — أيقونة زجاجية بستايل modern glass */}
          <div className="glass-card relative mx-auto mt-12 h-72 max-w-3xl overflow-hidden rounded-3xl sm:h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-5"
              >
                <span className="glass flex h-24 w-24 items-center justify-center rounded-full text-purple-200 sm:h-28 sm:w-28">
                  <ActiveSectorIcon size={44} strokeWidth={1.5} />
                </span>
                <p className="text-2xl font-semibold text-white sm:text-3xl">
                  {sectors[active]?.label}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── خدمات الصيانة والبرمجة ── */}
      <div className="bg-[#120621]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((service, i) => {
              const Icon = SERVICE_ICONS[service.key] ?? Wrench;
              return (
                <motion.div
                  key={service.key}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-purple-500/20 bg-purple-900/10 p-8 backdrop-blur-md"
                >
                  <span className="glass flex h-14 w-14 items-center justify-center rounded-2xl text-purple-300">
                    <Icon size={26} strokeWidth={1.5} />
                  </span>
                  <p className="mt-5 text-lg font-medium text-white">{service.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-purple-200/70">{service.desc}</p>
                </motion.div>
              );
            })}
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
