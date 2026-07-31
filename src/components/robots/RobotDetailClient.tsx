'use client';

import { motion } from 'motion/react';
import Container from '@/components/ui/Container';
import { SECTORS } from '@/data/taxonomy';
import type { Locale, Robot } from '@/lib/types';

export default function RobotDetailClient({
  robot,
  locale,
  t_features,
  t_specs,
  t_sectors,
}: {
  robot: Robot;
  locale: Locale;
  t_features: string;
  t_specs: string;
  t_sectors: string;
  t_madeBy: string;
}) {
  return (
    <>
      {/* المميزات */}
      {robot.features.length > 0 && (
        <div className="bg-[#120621]">
          <Container className="py-16 sm:py-20">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              {t_features}
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {robot.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="border-t border-purple-400/30 pt-5"
                >
                  <h3 className="font-medium text-white">
                    {feature.title[locale]}
                  </h3>
                  {feature.description && (
                    <p className="mt-2 text-sm leading-relaxed text-purple-200/70">
                      {feature.description[locale]}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* المواصفات */}
      {robot.specs.length > 0 && (
        <div className="bg-[#0a0414]">
          <Container className="py-16 sm:py-20">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              {t_specs}
            </h2>
            <dl className="mt-10 max-w-2xl divide-y divide-purple-400/20">
              {robot.specs.map((spec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-baseline justify-between gap-6 py-4"
                >
                  <dt className="text-sm text-purple-200/60">
                    {spec.label[locale]}
                  </dt>
                  <dd dir="ltr" className="font-mono text-sm text-white">
                    {spec.value}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </Container>
        </div>
      )}

      {/* القطاعات */}
      {robot.sectors.length > 0 && (
        <div className="bg-[#120621]">
          <Container className="py-16 sm:py-20">
            <h2 className="mb-6 text-2xl font-semibold text-white sm:text-3xl">
              {t_sectors}
            </h2>
            <div className="flex flex-wrap gap-3">
              {robot.sectors.map((sector, i) => (
                <motion.span
                  key={sector}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-full border border-purple-500/40 bg-purple-900/30 px-5 py-2 text-sm text-purple-200"
                >
                  {SECTORS[sector][locale]}
                </motion.span>
              ))}
            </div>
          </Container>
        </div>
      )}
    </>
  );
}