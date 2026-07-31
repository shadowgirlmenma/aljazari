'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import TrueFocus from '@/components/reactbits/TrueFocus';

/**
 * الرؤية والمهمة جنب بعض (مثل الأصلي) والعنوان بأنميشن TrueFocus.
 * "اقرأ المزيد" يفتح بنفس الصفحة (بدون تنقّل): أصل اسم الجزري + رسالة المؤسسين،
 * وبنهايته صورة فاصلة (الورشة) — حالياً تدرّج بنفسجي لحد ما تجي الصورة.
 */
export default function VisionMission({
  visionTitle, visionBody, missionTitle, missionBody,
  readMore, originTitle, originBody, originBody2,
  foundersTitle, foundersP1, foundersP2, foundersP3, signature, signature2,
  focusSentence,
}: {
  visionTitle: string; visionBody: string; missionTitle: string; missionBody: string;
  readMore: string; originTitle: string; originBody: string; originBody2: string;
  foundersTitle: string; foundersP1: string; foundersP2: string; foundersP3: string;
  signature: string; signature2: string;
  focusSentence: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-brand-950 border-t border-white/5">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        {/* عنوان متحرك: الرؤية ↔ المهمة */}
        <div className="text-3xl text-white sm:text-5xl">
          <TrueFocus
            sentence={focusSentence}
            separator="|"
            manualMode={false}
            blurAmount={4}
            borderColor="#9a6dd7"
            glowColor="rgba(154, 109, 215, 0.6)"
            animationDuration={0.6}
            pauseBetweenAnimations={1.6}
          />
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="border-brand-400/40 inline-block border-t pt-3 text-2xl font-semibold text-white sm:text-3xl">
              {visionTitle}
            </h3>
            <p className="text-brand-200/85 mt-5 leading-relaxed">{visionBody}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3 className="border-brand-400/40 inline-block border-t pt-3 text-2xl font-semibold text-white sm:text-3xl">
              {missionTitle}
            </h3>
            <p className="text-brand-200/85 mt-5 leading-relaxed">{missionBody}</p>
          </motion.div>
        </div>

        {/* اقرأ المزيد */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="group text-brand-300 mt-12 inline-flex items-center gap-3 text-sm font-medium tracking-wide uppercase transition hover:text-white"
        >
          <span className="border-brand-300 border-b pb-1 group-hover:border-white">
            {readMore}
          </span>
          <motion.span animate={{ rotate: open ? 90 : 0 }} className="inline-block">
            ←
          </motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              {/* أصل الاسم */}
              <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
                <div>
                  <h3 className="text-2xl font-semibold text-white sm:text-3xl">{originTitle}</h3>
                  <p className="text-brand-200/85 mt-5 leading-relaxed">{originBody}</p>
                  <p className="text-brand-200/85 mt-4 leading-relaxed">{originBody2}</p>
                </div>
                {/* مكان صورة إسماعيل الجزري — تنبدل بصورة حقيقية لاحقاً */}
                <div
                  className="from-brand-800/60 to-brand-950 ring-brand-400/20 flex aspect-[4/5] max-w-xs items-center justify-center rounded-2xl bg-gradient-to-b ring-1 lg:mx-auto"
                  role="img"
                  aria-label="Ismail Aljazari"
                >
                  <span className="text-brand-300/60 px-6 text-center font-mono text-xs tracking-widest">
                    ISMAIL ALJAZARI
                    <br />
                    1136 – 1206
                  </span>
                </div>
              </div>

              {/* رسالة المؤسسين */}
              <div className="border-brand-400/20 mt-16 border-t pt-12">
                <h3 className="text-2xl font-semibold text-white sm:text-3xl">{foundersTitle}</h3>
                <div className="text-brand-200/85 mt-6 max-w-3xl space-y-4 leading-relaxed">
                  <p>{foundersP1}</p>
                  <p>{foundersP2}</p>
                  <p>{foundersP3}</p>
                  <p className="text-brand-300 pt-2">
                    {signature}
                    <br />
                    <span className="font-medium text-white">{signature2}</span>
                  </p>
                </div>
              </div>

              {/* الصورة الفاصلة (الورشة) — تدرّج مؤقت لحد ما تجي الصورة الحقيقية */}
              <div
                className="from-brand-950 via-brand-800/50 to-brand-950 mt-16 h-48 w-full rounded-2xl bg-gradient-to-r sm:h-64"
                role="img"
                aria-label="Aljazari workshop"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
