'use client';

import { motion } from 'motion/react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import DotGridBackdrop from '@/components/reactbits/DotGridBackdrop';
import StarBorder from '@/components/reactbits/StarBorder';
import { Wrench, Code2, Users, LifeBuoy, type LucideIcon } from 'lucide-react';
import {
  ROBOT_SOLUTIONS_ORDER,
  ROBOT_SOLUTIONS,
  ROBOT_SOLUTION_ICONS,
} from '@/data/robotSolutions';
import type { Locale } from '@/lib/types';

const SERVICE_ICONS: Record<string, LucideIcon> = {
  maintenance: Wrench,
  software: Code2,
  training: Users,
  support: LifeBuoy,
};

export default function RobotSolutionsClient({
  title,
  subtitle,
  exploreHeading,
  services,
  ctaLabel,
}: {
  title: string;
  subtitle: string;
  bannerLabel: string;
  exploreHeading: string;
  services: { key: string; label: string; desc: string }[];
  ctaLabel: string;
}) {
  const locale = useLocale() as Locale;

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
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-10">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-semibold text-white sm:text-5xl"
          >
            {title}
          </motion.h1>
          <p className="mt-4 text-purple-200/80 sm:text-lg">{subtitle}</p>
        </div>
      </div>

      {/* ── شبكة القطاعات: 12 بطاقة، 3 أعمدة ── */}
      <div className="relative overflow-hidden bg-[#0a0414]">
        <DotGridBackdrop opacity={0.35} />
        <Container className="relative z-10 py-16 sm:py-20">
          <h2 className="text-center text-2xl font-semibold text-white sm:text-3xl">
            {exploreHeading}
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
            {ROBOT_SOLUTIONS_ORDER.map((slug, i) => {
              const cat = ROBOT_SOLUTIONS[slug];
              const Icon = ROBOT_SOLUTION_ICONS[slug];
              return (
                <motion.div
                  key={slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: (i % 6) * 0.06 }}
                >
                  <Link
                    href={`/robot-solutions/${slug}`}
                    className="glass-card group flex h-full flex-col items-center justify-center gap-3 rounded-2xl px-4 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-700/25 sm:py-10"
                  >
                    <span className="glass flex h-14 w-14 items-center justify-center rounded-2xl text-purple-200 transition-colors group-hover:text-white">
                      <Icon size={26} strokeWidth={1.5} />
                    </span>
                    <p className="text-sm font-medium text-white sm:text-base">
                      {cat.title[locale]}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </div>

      {/* ── خدمات الصيانة والبرمجة ── */}
      <div className="bg-[#120621]">
        <Container className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
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
            <StarBorder as={Link} href="/contact" color="#a78bfa" speed="5s" thickness={2}>
              <span className="px-4 text-sm font-medium sm:text-base">{ctaLabel}</span>
            </StarBorder>
          </div>
        </Container>
      </div>
    </>
  );
}
