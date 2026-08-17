'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Play } from 'lucide-react';
import type { Robot } from '@/lib/types';

type GalleryMedia =
  | { kind: 'image'; src: string }
  | { kind: 'video'; src: string; poster?: string };

/**
 * معرض صور/فيديو الروبوت — الصورة أو الفيديو الرئيسي على اليسار كاملة،
 * وبقية العناصر مصفوفة عمودياً على اليمين كمصغّرات، تتصفحينها بالضغط عليها.
 * الاتجاه ثابت (يسار = رئيسي، يمين = مصغّرات) بغض النظر عن لغة الموقع،
 * لأنه ترتيب بصري صرف مو نص.
 *
 * الاستخدام: بملف data/robots.ts، أضيفي مسارات الصور/الفيديو بحقل gallery:
 *   gallery: ['/robots/pepper.avif', { type: 'video', url: '/robots/pepper-clip.mp4', poster: '/robots/pepper-clip-poster.webp' }]
 * وحطي الملفات نفسها بمجلد public/robots/. هذا كل شي.
 *
 * إذا الروبوت ما عنده عناصر كافية بـ gallery، المكون ما يرندر أصلاً.
 */
export default function RobotGallery({ robot }: { robot: Robot }) {
  const media: GalleryMedia[] = (robot.gallery ?? []).flatMap((item): GalleryMedia[] => {
    if (typeof item === 'string') return [{ kind: 'image', src: item }];
    if (item.type === 'video') return [{ kind: 'video', src: item.url, poster: item.poster }];
    return [];
  });
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % media.length);
  }, [media.length]);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + media.length) % media.length);
  }, [media.length]);

  useEffect(() => {
    if (media.length < 2) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') next();
      if (e.key === 'ArrowUp') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [media.length, next, prev]);

  if (media.length < 2) return null;

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
            {media[active].kind === 'video' ? (
              <video
                key={media[active].src}
                src={media[active].src}
                poster={media[active].poster}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="h-full w-full object-contain p-6"
              />
            ) : (
              <Image
                src={media[active].src}
                alt={`${robot.name} — ${active + 1}/${media.length}`}
                fill
                sizes="(max-width: 640px) 90vw, 900px"
                className="object-contain p-6"
              />
            )}
          </motion.div>
        </AnimatePresence>

        <span className="glass-pill absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 font-mono text-[11px] text-white">
          {active + 1} / {media.length}
        </span>
      </div>

      {/* ── المصغّرات — مستطيلات كبيرة مقتصّة، عمودي يمين، قابل للتمرير ── */}
      <div className="flex gap-3 overflow-x-auto pb-1 sm:w-40 sm:flex-col sm:overflow-x-visible sm:overflow-y-auto sm:pb-0 lg:w-48">
        <button
          type="button"
          onClick={prev}
          aria-label="السابقة"
          className="glass hidden h-8 w-full shrink-0 items-center justify-center rounded-lg text-white transition hover:border-purple-300 hover:text-purple-200 sm:flex"
        >
          <ChevronUp size={16} />
        </button>

        {media.map((item, i) => (
          <button
            key={item.src + i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={item.kind === 'video' ? `عرض الفيديو ${i + 1}` : `عرض الصورة ${i + 1}`}
            aria-current={active === i}
            className={`glass relative h-24 w-32 shrink-0 overflow-hidden rounded-xl transition sm:h-28 sm:w-full lg:h-32 ${
              active === i
                ? 'border-purple-300 ring-2 ring-purple-400'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            {item.kind === 'video' ? (
              <>
                {item.poster ? (
                  <Image src={item.poster} alt="" fill sizes="192px" className="object-cover" />
                ) : (
                  <video src={item.src} className="h-full w-full object-cover" muted />
                )}
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25">
                  <Play size={22} className="fill-white text-white" />
                </span>
              </>
            ) : (
              <Image src={item.src} alt="" fill sizes="192px" className="object-cover" />
            )}
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
