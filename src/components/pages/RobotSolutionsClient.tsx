'use client';

import { motion } from 'motion/react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import DotGridBackdrop from '@/components/reactbits/DotGridBackdrop';
import StarBorder from '@/components/reactbits/StarBorder';
import {
  ROBOT_SOLUTIONS_ORDER,
  ROBOT_SOLUTIONS,
  ROBOT_SOLUTION_ICONS,
  ROBOT_SOLUTION_CARD_IMAGES,
  shortSolutionTitle,
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
      {/* ── بانر بصورة حقيقية — فل سكرين، بنفس أسلوب بانرات باقي صفحات الموقع ── */}
      <div className="relative w-full overflow-hidden bg-[#120621]" style={{ height: '100svh' }}>
        <Image
          src="/robot-solutions/main-banner.webp"
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(18,6,33,0.25) 0%, rgba(18,6,33,0.55) 65%, rgba(10,4,20,0.9) 100%)',
          }}
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-end px-5 pb-24 text-center sm:pb-28">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-4xl font-semibold text-white sm:text-5xl"
          >
            {title}
          </motion.h1>
          <p className="mt-4 max-w-2xl text-purple-200/80 sm:text-lg">{subtitle}</p>
        </div>
      </div>

      {/* ── شبكة القطاعات: 12 بطاقة، 3 أعمدة ── */}
      <div className="relative overflow-hidden bg-[#0a0414]">
        <DotGridBackdrop opacity={0.35} />
        <Container className="relative z-10 py-16 sm:py-20">
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {ROBOT_SOLUTIONS_ORDER.map((slug, i) => {
              const cat = ROBOT_SOLUTIONS[slug];
              const shortTitle = shortSolutionTitle(cat.title);
              const Icon = ROBOT_SOLUTION_ICONS[slug];
              const image = ROBOT_SOLUTION_CARD_IMAGES[slug];
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
                    className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015] hover:shadow-2xl hover:shadow-brand-700/25 sm:aspect-square"
                  >
                    <Image
                      src={image}
                      alt={shortTitle[locale]}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* تعتيم متدرج حتى يبين النص فوق الصورة */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(10,4,20,0.92) 0%, rgba(10,4,20,0.35) 55%, rgba(10,4,20,0.05) 100%)',
                      }}
                    />
                    {/* توهّج ناعم يتبع الماوس */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          'radial-gradient(260px circle at var(--mx) var(--my), rgba(124,71,224,0.28), transparent 70%)',
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

                    <div className="relative z-10 flex items-center gap-2.5 p-4 sm:gap-3 sm:p-6">
                      <span className="glass flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-purple-200 sm:h-12 sm:w-12">
                        <Icon size={20} strokeWidth={1.5} />
                      </span>
                      <p className="text-sm font-semibold text-white sm:text-lg">
                        {shortTitle[locale]}
                      </p>
                    </div>
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
