'use client';

import { motion } from 'motion/react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import DotGridBackdrop from '@/components/reactbits/DotGridBackdrop';
import StarBorder from '@/components/reactbits/StarBorder';
import RobotSolutionsBannerBackground from './RobotSolutionsBannerBackground';
import {
  ROBOT_SOLUTIONS_ORDER,
  ROBOT_SOLUTIONS,
  ROBOT_SOLUTION_ICONS,
} from '@/data/robotSolutions';
import type { Locale } from '@/lib/types';

function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

export default function RobotSolutionsClient({
  title,
  subtitle,
  ctaLabel,
}: {
  title: string;
  subtitle: string;
  bannerLabel: string;
  ctaLabel: string;
}) {
  const locale = useLocale() as Locale;

  return (
    <>
      {/* ── البانر: توهّج Lightfall بنفسجي متحرك بالخلفية ── */}
      <div className="relative overflow-hidden bg-[#120621] py-24 text-center">
        <RobotSolutionsBannerBackground />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(18,6,33,0.15) 0%, rgba(18,6,33,0.55) 70%, rgba(10,4,20,0.85) 100%)',
          }}
        />
        <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8 lg:px-10">
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
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
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
                    onMouseMove={handleMouseMove}
                    style={{ '--mx': '50%', '--my': '50%' } as React.CSSProperties}
                    className="glass-card group relative flex h-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl px-4 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl hover:shadow-brand-700/25 sm:py-10"
                  >
                    {/* توهّج ناعم يتبع الماوس */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          'radial-gradient(260px circle at var(--mx) var(--my), rgba(124,71,224,0.22), transparent 70%)',
                      }}
                    />
                    {/* حدّ مضيء رفيع يتبع الماوس */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        padding: 1,
                        background:
                          'radial-gradient(220px circle at var(--mx) var(--my), #a472ec, transparent 72%)',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                      }}
                    />

                    <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-900/30 text-purple-200 ring-1 ring-purple-400/20 transition-colors group-hover:text-white">
                      <Icon size={26} strokeWidth={1.5} />
                    </span>
                    <p className="relative z-10 text-sm font-medium text-white sm:text-base">
                      {cat.title[locale]}
                    </p>
                  </Link>
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
