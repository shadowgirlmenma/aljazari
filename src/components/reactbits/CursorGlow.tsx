'use client';

import { useEffect, useRef } from 'react';

/**
 * توهج خفيف يتبع الماوس فوق كامل الصفحة — يعطي إحساس إن السطوح الزجاجية
 * (glass / glass-card / glass-strong) بالموقع فعلاً "حية" وتتفاعل مع الضوء
 * وقت ما الماوس يتحرك فوقها، بدل ما تكون بقعة شفافة ثابتة بس.
 * طبقة وحدة خفيفة (mix-blend-mode) فوق كل شي، بدون أي تأثير على الأداء
 * أو التفاعل (pointer-events: none).
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return; // موبايل/تاتش — ما نحتاجه

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.background = `radial-gradient(260px circle at ${x}px ${y}px, rgba(196,165,255,0.08), rgba(124,71,224,0.03) 45%, transparent 70%)`;
          raf = 0;
        });
      }
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] hidden sm:block"
      style={{ mixBlendMode: 'soft-light' }}
    />
  );
}
