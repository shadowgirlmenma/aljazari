'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export type LightboxMedia =
  | { kind: 'image'; src: string }
  | { kind: 'video'; src: string; poster?: string };

type View = { s: number; x: number; y: number };

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const RESET: View = { s: 1, x: 0, y: 0 };

/**
 * عارض الصور بملء الشاشة (Lightbox) لمعرض الروبوت — يفتح لما تدوسين على الصورة
 * الرئيسية بالمعرض (أو دبل كلك على أي مصغّرة).
 *
 * التكبير والتصغير:
 *   - ديسكتوب: عجلة الماوس (تكبّر باتجاه مكان المؤشر)، دبل كلك يكبّر/يرجع،
 *     أزرار + و − و إعادة، والسحب بالماوس يحرّك الصورة وهي مكبّرة.
 *   - موبايل/تابلت: قرصة بإصبعين (pinch) للتكبير، دبل تاب، وسحب بإصبع وحدة
 *     لتحريك الصورة المكبّرة. وإذا الصورة مو مكبّرة، السحب يمين/يسار يقلب الصورة.
 *   - كيبورد: ← → للتقليب، + و − للتكبير، Esc للإغلاق.
 *
 * ينرسم بـ portal مباشرة داخل body حتى يغطي الشاشة كلها فوق الهيدر الثابت.
 */
export default function GalleryLightbox({
  media,
  index,
  name,
  onClose,
  onIndexChange,
}: {
  media: LightboxMedia[];
  index: number;
  name: string;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const isAr = useLocale() === 'ar';
  const [view, setView] = useState<View>(RESET);
  const stageRef = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchDist = useRef<number | null>(null);
  const drag = useRef<{ x: number; y: number; vx: number; vy: number; moved: boolean } | null>(null);
  const lastTap = useRef(0);

  const item = media[index];
  const isImage = item.kind === 'image';

  const go = useCallback(
    (dir: 1 | -1) => onIndexChange((index + dir + media.length) % media.length),
    [index, media.length, onIndexChange],
  );

  // كل ما تتغير الصورة نرجّع التكبير للوضع الطبيعي
  useEffect(() => setView(RESET), [index]);

  /** تكبير/تصغير باتجاه نقطة معينة على الشاشة (مكان المؤشر أو مركز الأصابع) */
  const zoomAt = useCallback((clientX: number, clientY: number, nextScale: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    setView((v) => {
      const s = Math.min(MAX_SCALE, Math.max(MIN_SCALE, nextScale));
      if (s === 1 || !rect) return RESET;
      const px = clientX - (rect.left + rect.width / 2);
      const py = clientY - (rect.top + rect.height / 2);
      const r = s / v.s;
      return { s, x: px - (px - v.x) * r, y: py - (py - v.y) * r };
    });
  }, []);

  const zoomCenter = useCallback(
    (factor: number) => {
      const rect = stageRef.current?.getBoundingClientRect();
      if (!rect) return;
      setView((v) => {
        const target = v.s * factor;
        const s = Math.min(MAX_SCALE, Math.max(MIN_SCALE, target));
        if (s === 1) return RESET;
        const r = s / v.s;
        return { s, x: v.x * r, y: v.y * r };
      });
    },
    [],
  );

  // كيبورد + قفل تمرير الصفحة وراه
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === '+' || e.key === '=') zoomCenter(1.5);
      else if (e.key === '-') zoomCenter(1 / 1.5);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [go, onClose, zoomCenter]);

  // عجلة الماوس — لازم listener غير passive حتى نمنع تمرير الصفحة
  useEffect(() => {
    const el = stageRef.current;
    if (!el || !isImage) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = Math.exp(-e.deltaY * 0.0015);
      const rect = el.getBoundingClientRect();
      setView((v) => {
        const s = Math.min(MAX_SCALE, Math.max(MIN_SCALE, v.s * factor));
        if (s === 1) return RESET;
        const px = e.clientX - (rect.left + rect.width / 2);
        const py = e.clientY - (rect.top + rect.height / 2);
        const r = s / v.s;
        return { s, x: px - (px - v.x) * r, y: py - (py - v.y) * r };
      });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [isImage]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!isImage) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) {
      drag.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y, moved: false };
    } else {
      drag.current = null;
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinchDist.current) {
        const factor = dist / pinchDist.current;
        zoomAt((a.x + b.x) / 2, (a.y + b.y) / 2, view.s * factor);
      }
      pinchDist.current = dist;
      return;
    }

    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) d.moved = true;
    if (view.s > 1) setView((v) => ({ ...v, x: d.vx + dx, y: d.vy + dy }));
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchDist.current = null;
    if (pointers.current.size > 0) return;
    drag.current = null;
    if (!d) return;

    const dx = e.clientX - d.x;
    // سحب أفقي والصورة مو مكبّرة = تقليب
    if (view.s === 1 && Math.abs(dx) > 60) {
      go(dx < 0 ? 1 : -1);
      return;
    }
    // دبل تاب / دبل كلك = تكبير أو رجوع
    if (!d.moved) {
      const now = Date.now();
      if (now - lastTap.current < 300) {
        lastTap.current = 0;
        if (view.s > 1) setView(RESET);
        else zoomAt(e.clientX, e.clientY, 2.5);
      } else {
        lastTap.current = now;
      }
    }
  };

  const zoomed = view.s > 1;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${name} — ${index + 1}/${media.length}`}
      className="fixed inset-0 z-[100] flex flex-col bg-[#0b0418]/95 text-white backdrop-blur-xl"
      dir="ltr"
    >
      {/* ── الشريط العلوي ── */}
      <div className="relative z-10 flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <span className="glass-pill rounded-full px-3 py-1 font-mono text-xs text-purple-100">
          {index + 1} / {media.length}
        </span>

        <div className="flex items-center gap-2">
          {isImage && (
            <>
              <button
                type="button"
                onClick={() => zoomCenter(1 / 1.5)}
                disabled={!zoomed}
                aria-label="تصغير"
                className="glass flex h-10 w-10 items-center justify-center rounded-full transition hover:border-purple-300 disabled:opacity-30"
              >
                <ZoomOut size={18} />
              </button>
              <span className="hidden w-12 text-center font-mono text-xs text-purple-200 sm:inline">
                {Math.round(view.s * 100)}%
              </span>
              <button
                type="button"
                onClick={() => zoomCenter(1.5)}
                disabled={view.s >= MAX_SCALE}
                aria-label="تكبير"
                className="glass flex h-10 w-10 items-center justify-center rounded-full transition hover:border-purple-300 disabled:opacity-30"
              >
                <ZoomIn size={18} />
              </button>
              <button
                type="button"
                onClick={() => setView(RESET)}
                disabled={!zoomed}
                aria-label="إرجاع الحجم الطبيعي"
                className="glass flex h-10 w-10 items-center justify-center rounded-full transition hover:border-purple-300 disabled:opacity-30"
              >
                <RotateCcw size={16} />
              </button>
            </>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="ms-2 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 transition hover:bg-purple-500"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* ── الصورة ── */}
      <div
        ref={stageRef}
        className={`relative flex-1 touch-none select-none overflow-hidden ${
          isImage ? (zoomed ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in') : ''
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.s})`,
            transition: drag.current || pointers.current.size > 1 ? 'none' : 'transform 0.2s ease-out',
          }}
        >
          {isImage ? (
            <Image
              key={item.src}
              src={item.src}
              alt={`${name} — ${index + 1}/${media.length}`}
              fill
              quality={95}
              sizes="100vw"
              draggable={false}
              className="pointer-events-none object-contain p-2 sm:p-6"
              priority
            />
          ) : (
            <video
              key={item.src}
              src={item.src}
              poster={item.poster}
              autoPlay
              loop
              playsInline
              controls
              className="h-full w-full object-contain p-2 sm:p-6"
            />
          )}
        </div>

        {media.length > 1 && !zoomed && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label="الصورة السابقة"
              className="glass absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full transition hover:border-purple-300 sm:left-6"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label="الصورة التالية"
              className="glass absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full transition hover:border-purple-300 sm:right-6"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {isImage && !zoomed && (
        <p dir={isAr ? 'rtl' : 'ltr'} className="pb-4 text-center text-[11px] text-purple-200/60">
          <span className="hidden sm:inline">
            {isAr
              ? 'عجلة الماوس أو النقر مرتين للتكبير · اسحب لتحريك الصورة · Esc للإغلاق'
              : 'Scroll or double-click to zoom · drag to pan · Esc to close'}
          </span>
          <span className="sm:hidden">
            {isAr
              ? 'قرّب بإصبعين أو انقر مرتين للتكبير · اسحب للتقليب'
              : 'Pinch or double-tap to zoom · swipe to browse'}
          </span>
        </p>
      )}
    </div>,
    document.body,
  );
}
