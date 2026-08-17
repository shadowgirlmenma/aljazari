'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Robot } from '@/lib/types';

/**
 * معرض صور الروبوت — الصورة الرئيسية على اليسار كاملة، وبقية الصور
 * مصفوفة عمودياً على اليمين كصور مصغّرة، تتصفحينها بالضغط عليها.
 * الاتجاه ثابت (يسار = رئيسية، يمين = مصغّرات) بغض النظر عن لغة الموقع،
 * لأنه ترتيب بصري صرف مو نص.
 *
 * الاستخدام: بملف data/robots.ts، أضيفي مسارات الصور بحقل gallery:
 *   gallery: ['/robots/pepper.avif', '/robots/pepper-side.avif', '/robots/pepper-back.avif']
 * وحطي الملفات نفسها بمجلد public/robots/. هذا كل شي.
 *
 * إذا الروبوت ما عنده صور كافية بـ gallery، المكون ما يرندر أصلاً.
 */
export default function RobotGallery({ robot }: { robot: Robot }) {
  const images = (robot.gallery ?? []).filter((item): item is string => typeof item === 'string');
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length < 2) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') next();
      if (e.key === 'ArrowUp') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [images.length, next, prev]);

  if (images.length < 2) return null;

  return (
    <div dir="ltr" className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row">
      {/* ── الصورة الرئيسية — يسار، أكبر ── */}
      <div className="glass-card relative aspect-square w-full flex-1 overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={`${robot.name} — ${active + 1}/${images.length}`}
              fill
              sizes="(max-width: 640px) 90vw, 900px"
              className="object-contain p-6"
            />
          </motion.div>
        </AnimatePresence>

        <span className="glass-pill absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 font-mono text-[11px] text-white">
          {active + 1} / {images.length}
        </span>
      </div>

      {/* ── الصور المصغّرة — مستطيلات كبيرة مقتصّة، عمودي يمين، قابل للتمرير ── */}
      <div className="flex gap-3 overflow-x-auto pb-1 sm:w-40 sm:flex-col sm:overflow-x-visible sm:overflow-y-auto sm:pb-0 lg:w-48">
        <button
          type="button"
          onClick={prev}
          aria-label="السابقة"
          className="glass hidden h-8 w-full shrink-0 items-center justify-center rounded-lg text-white transition hover:border-purple-300 hover:text-purple-200 sm:flex"
        >
          <ChevronUp size={16} />
        </button>

        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`عرض الصورة ${i + 1}`}
            aria-current={active === i}
            className={`glass relative h-24 w-32 shrink-0 overflow-hidden rounded-xl transition sm:h-28 sm:w-full lg:h-32 ${
              active === i
                ? 'border-purple-300 ring-2 ring-purple-400'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            <Image src={src} alt="" fill sizes="192px" className="object-cover" />
          </button>
        ))}

        <button
          type="button"
          onClick={next}
          aria-label="التالية"
          className="glass hidden h-8 w-full shrink-0 items-center justify-center rounded-lg text-white transition hover:border-purple-300 hover:text-purple-200 sm:flex"
        >
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
}
