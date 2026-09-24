'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

/**
 * بطاقة صورة القطاع بصفحة الحلول — تفاعلية: تميل ثلاثي الأبعاد مع حركة الماوس، ولمعة زجاجية
 * تتبع المؤشر، وشارة زجاجية بأيقونة واسم القطاع. (صور القطاعات الجديدة 24/09)
 * على الموبايل/اللمس تبقى ثابتة (بدون ميلان).
 */
export default function SectorImageCard({
  src,
  alt,
  title,
  Icon,
  position,
}: {
  src: string;
  alt: string;
  title: string;
  Icon: LucideIcon;
  position?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 160, damping: 20 });
  const sy = useSpring(py, { stiffness: 160, damping: 20 });
  const rotateY = useTransform(sx, [0, 1], [-9, 9]);
  const rotateX = useTransform(sy, [0, 1], [8, -8]);
  const glow = useTransform(
    [sx, sy],
    ([x, y]: number[]) =>
      `radial-gradient(320px circle at ${x * 100}% ${y * 100}%, rgba(196,168,255,0.28), transparent 65%)`,
  );

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div style={{ perspective: 1000 }} className="w-full">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-purple-300/25 shadow-[0_18px_60px_rgba(124,71,224,0.35)]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 90vw, 560px"
          className="object-cover"
          style={{ objectPosition: position }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(18,6,33,0.75) 0%, rgba(18,6,33,0.05) 45%, rgba(124,71,224,0.10) 100%)',
          }}
        />
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />
        <div className="absolute inset-x-4 bottom-4 flex" style={{ transform: 'translateZ(40px)' }}>
          <div className="glass flex items-center gap-3 rounded-2xl px-4 py-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600/70 text-white">
              <Icon size={18} strokeWidth={1.6} />
            </span>
            <span className="text-sm font-semibold text-white sm:text-base">{title}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
