'use client';

import { motion } from 'motion/react';

type Section = { heading: string; body: string };

export default function LegalPageClient({
  title, lastUpdated, sections,
}: {
  title: string; lastUpdated: string; sections: Section[];
}) {
  return (
    <div className="bg-[#0a0414]">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:px-10">

        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-purple-400"
        >
          Al-Jazari Robotics
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-3xl font-semibold text-white sm:text-4xl"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 font-mono text-xs text-purple-400/60"
        >
          {lastUpdated}
        </motion.p>

        <div className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <motion.section
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.05 }}
              className="border-t border-purple-900/40 pt-8"
            >
              <h2 className="text-lg font-semibold text-white">{s.heading}</h2>
              <p className="mt-3 leading-relaxed text-purple-200/70">{s.body}</p>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}