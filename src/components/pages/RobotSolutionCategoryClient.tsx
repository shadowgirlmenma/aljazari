'use client';

import { motion } from 'motion/react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import Logo from '@/components/Logo';
import RobotVisual from '@/components/robots/RobotVisual';
import StarBorder from '@/components/reactbits/StarBorder';
import DotGridBackdrop from '@/components/reactbits/DotGridBackdrop';
import { getRobot } from '@/data/robots';
import { ROBOT_SOLUTION_ICONS, type RobotSolutionCategory, type RobotSolutionSlug } from '@/data/robotSolutions';
import type { Locale } from '@/lib/types';

export default function RobotSolutionCategoryClient({
  category,
  slug,
  t,
}: {
  category: RobotSolutionCategory;
  slug: RobotSolutionSlug;
  t: {
    backToSolutions: string;
    meetRobots: string;
    whoIs: string;
    whatCanDo: string;
    providedTo: string;
    whyChoose: string;
    learnMore: string;
    viewRobot: string;
    availableForRent: string;
    cta: string;
  };
}) {
  const locale = useLocale() as Locale;
  const Icon = ROBOT_SOLUTION_ICONS[slug];

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
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
          <Link
            href="/robot-solutions"
            className="font-mono text-xs uppercase tracking-widest text-purple-300 transition hover:text-white"
          >
            ← {t.backToSolutions}
          </Link>
          <span className="glass mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-2xl text-purple-200">
            <Icon size={30} strokeWidth={1.5} />
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-3xl font-semibold text-white sm:text-5xl"
          >
            {category.title[locale]}
          </motion.h1>
          <p className="mt-3 text-lg text-purple-200/85">{category.hook[locale]}</p>
        </div>
      </div>

      {/* ── المقدمة ── */}
      <div className="relative overflow-hidden bg-[#0a0414]">
        <DotGridBackdrop opacity={0.35} />
        <Container className="relative z-10 py-14 sm:py-16">
          <p className="mx-auto max-w-3xl text-center leading-relaxed text-purple-100/85 sm:text-lg">
            {category.intro[locale]}
          </p>
        </Container>
      </div>

      {/* ── الفوائد ── */}
      {category.benefits && category.benefits.length > 0 && (
        <div className="bg-[#120621]">
          <Container className="py-16 sm:py-20">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: (i % 3) * 0.08 }}
                  className="rounded-2xl border border-purple-500/20 bg-purple-900/10 p-6 backdrop-blur-md"
                >
                  <p className="text-base font-medium text-white">{b.title[locale]}</p>
                  <p className="mt-2 text-sm leading-relaxed text-purple-200/70">
                    {b.description[locale]}
                  </p>
                </motion.div>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* ── تعرّف على روبوتاتنا ── */}
      <div className="relative overflow-hidden bg-[#0a0414]">
        <DotGridBackdrop opacity={0.35} />
        <Container className="relative z-10 py-16 sm:py-20">
          <h2 className="text-center text-2xl font-semibold text-white sm:text-3xl">
            {t.meetRobots}
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {category.robots.map((r, i) => {
              const robot = r.slug ? getRobot(r.slug) : undefined;
              return (
                <motion.div
                  key={`${r.docName}-${i}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: (i % 3) * 0.08 }}
                  className="glass-card flex flex-col overflow-hidden rounded-3xl"
                >
                  <div className="relative mx-auto mt-6 aspect-square w-3/4">
                    {robot ? (
                      <RobotVisual robot={robot} className="h-full" priority={i < 3} />
                    ) : (
                      <div
                        role="img"
                        aria-label={r.docName}
                        className="from-brand-800/50 to-brand-950/50 ring-brand-300/20 flex aspect-square h-full items-center justify-center rounded-2xl bg-gradient-to-br ring-1"
                      >
                        <Logo className="text-brand-300/45 w-1/3 max-w-24" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-lg font-semibold text-white">{r.docName}</p>

                    {r.tag && (
                      <span className="glass-pill mt-2 inline-block w-fit rounded-full px-3 py-1 text-xs text-purple-200">
                        {r.tag[locale]}
                      </span>
                    )}

                    {r.blurb && (
                      <p className="mt-3 text-sm leading-relaxed text-purple-200/75">
                        {r.blurb[locale]}
                      </p>
                    )}

                    {r.whoIs && r.whoIs.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-medium tracking-wide text-purple-300/80 uppercase">
                          {t.whoIs}
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {r.whoIs.map((item, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-2 text-sm text-purple-100/80"
                            >
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-purple-400" />
                              {item[locale]}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {r.whatCanDo && r.whatCanDo.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-medium tracking-wide text-purple-300/80 uppercase">
                          {t.whatCanDo}
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {r.whatCanDo.map((item, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-2 text-sm text-purple-100/80"
                            >
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-purple-400" />
                              {item[locale]}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {robot && (
                      <Link
                        href={`/robots/${robot.slug}`}
                        className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-purple-300 transition hover:text-white"
                      >
                        {r.tag ? t.viewRobot : t.learnMore} ←
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </div>

      {/* ── القطاعات المستفيدة ── */}
      {category.industries.length > 0 && (
        <div className="bg-[#120621]">
          <Container className="py-14 sm:py-16">
            <p className="text-center text-sm font-medium tracking-wide text-purple-300/80 uppercase">
              {t.providedTo}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {category.industries.map((ind, i) => (
                <span
                  key={i}
                  className="glass rounded-full px-5 py-2 text-sm text-purple-100"
                >
                  {ind[locale]}
                </span>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* ── ليش الجزري ── */}
      {category.whyChoose.length > 0 && (
        <div className="relative overflow-hidden bg-[#0a0414]">
          <DotGridBackdrop opacity={0.35} />
          <Container className="relative z-10 py-16 sm:py-20">
            <h2 className="text-center text-2xl font-semibold text-white sm:text-3xl">
              {t.whyChoose}
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {category.whyChoose.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: (i % 3) * 0.08 }}
                  className="glass flex items-center gap-3 rounded-2xl p-5 text-sm text-purple-100/85"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                  {item[locale]}
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-14 text-center">
              <StarBorder as={Link} href="/contact" color="#a78bfa" speed="5s" thickness={2}>
                <span className="px-4 text-sm font-medium sm:text-base">{t.cta}</span>
              </StarBorder>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}
