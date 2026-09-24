'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, FileText, Settings, CheckCircle2, Rocket, type LucideIcon } from 'lucide-react';

const STEP_ICONS: Record<string, LucideIcon> = {
  discover: Lightbulb,
  design: FileText,
  develop: Settings,
  test: CheckCircle2,
  deploy: Rocket,
};

export interface CustomAiProductData {
  tag: string;
  title: string;
  desc: string;
  chips: string[];
  footerTag: string;
  steps: { key: string; title: string; desc: string }[];
}

/**
 * «تطوير منتجات ذكاء اصطناعي مخصّصة» — نسخة حيّة ثنائية اللغة من الصورتين المرسلتين
 * من الدكتور (الكرة المتوهجة + مراحل العمل الخمس)، مبنية بالكود حتى تتغير لغتها
 * وتتجاوب مع الموبايل وتكون تفاعلية:
 *   - كرة AI متوهجة بحلقات مدارية دوّارة وتنبض عند المرور على أي مرحلة.
 *   - خمس مراحل زجاجية بنفسجية؛ المرحلة النشطة تتوهج وتُضيء الكرة.
 * الألوان بنفسجية موحّدة مع باقي الموقع، والنصوص كلها تأتي من messages (aiSolutions).
 */
export default function CustomAiProduct({ data }: { data: CustomAiProductData }) {
  const [active, setActive] = useState(0);

  return (
    <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-purple-300/20 bg-gradient-to-br from-[#1a0b33] via-[#120621] to-[#0a0414] px-5 py-12 shadow-[0_20px_80px_rgba(9,3,20,0.6)] sm:px-10 sm:py-16">
      {/* توهّج خلفي */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 start-1/4 h-96 w-96 rounded-full bg-purple-600/25 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 end-10 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-[120px]"
      />

      <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* ── النص ── */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-purple-300/80">
            {data.tag}
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-5xl">
            {data.title}
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-purple-100/80 sm:text-lg">{data.desc}</p>

          <ul className="mt-8 flex flex-wrap gap-3">
            {data.chips.map((chip) => (
              <li
                key={chip}
                className="glass-pill rounded-full px-4 py-2 text-sm font-medium text-purple-100"
              >
                {chip}
              </li>
            ))}
          </ul>

          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.3em] text-purple-400/80">
            {data.footerTag}
          </p>
        </div>

        {/* ── الكرة + المراحل ── */}
        <div className="grid items-center gap-8 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)]">
          {/* الكرة */}
          <div className="relative mx-auto aspect-square w-full max-w-[16rem] sm:max-w-none">
            {/* حلقات مدارية */}
            {[0, 1, 2].map((r) => (
              <motion.span
                key={r}
                aria-hidden
                className="absolute rounded-full border border-purple-300/30"
                style={{ inset: `${r * 9}%` }}
                animate={{ rotate: r % 2 ? -360 : 360 }}
                transition={{ duration: 22 + r * 8, repeat: Infinity, ease: 'linear' }}
              >
                <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-purple-200 shadow-[0_0_12px_#c4a5ff]" />
              </motion.span>
            ))}

            {/* الكرة المتوهجة */}
            <motion.div
              key={active}
              initial={{ scale: 0.94 }}
              animate={{ scale: [0.94, 1.04, 1] }}
              transition={{ duration: 0.6 }}
              className="absolute inset-[16%] flex items-center justify-center rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 35% 30%, rgba(233,213,255,0.95) 0%, rgba(167,139,250,0.85) 25%, rgba(124,71,224,0.75) 55%, rgba(58,18,96,0.95) 100%)',
                boxShadow:
                  '0 0 60px 10px rgba(124,71,224,0.55), inset 0 0 40px rgba(255,255,255,0.25)',
              }}
            >
              <span className="text-5xl font-bold tracking-widest text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.9)] sm:text-6xl">
                AI
              </span>
            </motion.div>

            {/* قاعدة متوهجة تحت الكرة */}
            <div
              aria-hidden
              className="absolute -bottom-3 left-1/2 h-4 w-3/5 -translate-x-1/2 rounded-full bg-purple-500/50 blur-xl"
            />
          </div>

          {/* المراحل */}
          <ol className="relative space-y-3">
            <span
              aria-hidden
              className="absolute inset-y-6 start-[1.65rem] w-px bg-gradient-to-b from-purple-300/0 via-purple-300/40 to-purple-300/0"
            />
            {data.steps.map((step, i) => {
              const Icon = STEP_ICONS[step.key] ?? Lightbulb;
              const isActive = i === active;
              return (
                <li key={step.key}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={`relative flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-start backdrop-blur-xl transition-all duration-300 ${
                      isActive
                        ? 'border-purple-300/60 bg-purple-600/25 shadow-[0_0_30px_rgba(124,71,224,0.45)]'
                        : 'border-white/10 bg-white/[0.04] hover:border-purple-300/30'
                    }`}
                  >
                    <span
                      className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        isActive
                          ? 'border-purple-200 bg-purple-500 text-white'
                          : 'border-purple-300/40 bg-[#1a0b33] text-purple-200'
                      }`}
                    >
                      <Icon size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-baseline gap-2">
                        <span className="font-mono text-xs text-purple-300/70">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm font-semibold text-white sm:text-base">
                          {step.title}
                        </span>
                      </span>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.span
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="block overflow-hidden text-xs leading-relaxed text-purple-100/75 sm:text-sm"
                          >
                            <span className="block pt-1">{step.desc}</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
