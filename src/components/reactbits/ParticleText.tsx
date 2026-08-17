'use client';

import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';

export type ParticleTextTrigger = 'mount' | 'hover' | 'click';

export interface ParticleTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  as?: 'h1' | 'h2' | 'h3' | 'div' | 'span';
  fontSize?: number;
  fontWeight?: number | string;
  color?: string;
  particleSize?: number;
  particleDensity?: number;
  scatter?: number;
  gatherDuration?: number;
  stagger?: number;
  pointerRepel?: boolean;
  repelRadius?: number;
  glow?: boolean;
  trigger?: ParticleTextTrigger;
}

interface Particle {
  tx: number;
  ty: number;
  x: number;
  y: number;
  sx: number;
  sy: number;
  delay: number;
  driftPhase: number;
  driftAmp: number;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * تحويل نص إلى جسيمات (particles) تتجمع لترسم الحروف — مبني على مفهوم
 * React Bits's ParticleText. يعتمد على canvas: يرسم النص بشكل مخفي،
 * يقرأ شفافية البكسلات لتوليد نقاط هدف (targets)، ثم يحرك جسيمات من
 * تشتت عشوائي نحو هذه النقاط بحركة سلسة + توهج بنفسجي خفيف.
 *
 * ملاحظة مهمة: هذا التأثير يناسب نصوص قصيرة (عناوين) فقط — لأنه يعتمد
 * على أخذ عيّنة بكسل واحدة للنص كسطر واحد داخل canvas. لا يصلح لفقرات
 * طويلة (لأنها تصير صغيرة جداً أو تفيض عن الإطار)، فلذلك يُستخدم فقط
 * على العناوين وليس على النصوص التوضيحية الطويلة.
 */
export default function ParticleText({
  text,
  className = '',
  style = {},
  as = 'div',
  fontSize = 42,
  fontWeight = 700,
  color = '#e9d9ff',
  particleSize = 1.6,
  particleDensity = 2,
  scatter = 90,
  gatherDuration = 1.4,
  stagger = 0.35,
  pointerRepel = true,
  repelRadius = 70,
  glow = true,
  trigger = 'mount',
}: ParticleTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [playKey, setPlayKey] = useState(0);
  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    []
  );

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(entries => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width: Math.round(width), height: Math.round(height) });
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (trigger !== 'mount') return;
    setPlayKey(k => k + 1);
  }, [trigger, text, size.width, size.height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !size.width || !size.height) return undefined;

    let cancelled = false;

    const run = async () => {
      const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = size.width * dpr;
      canvas.height = size.height * dpr;
      canvas.style.width = `${size.width}px`;
      canvas.style.height = `${size.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const computedFont = containerRef.current
        ? window.getComputedStyle(containerRef.current).fontFamily
        : 'sans-serif';

      try {
        await document.fonts?.load(`${fontWeight} ${fontSize}px ${computedFont}`);
        await document.fonts?.ready;
      } catch {
        /* لا مشكلة لو الخط ما تحمل — نكمل بالخط الافتراضي */
      }
      if (cancelled) return;

      // عيّنة النص على canvas مخفي لتوليد نقاط الجسيمات من الشفافية
      const sample = document.createElement('canvas');
      sample.width = size.width * dpr;
      sample.height = size.height * dpr;
      const sctx = sample.getContext('2d');
      if (!sctx) return;
      sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sctx.font = `${fontWeight} ${fontSize}px ${computedFont}`;
      sctx.textAlign = 'center';
      sctx.textBaseline = 'middle';
      sctx.fillStyle = '#fff';
      sctx.fillText(text, size.width / 2, size.height / 2, size.width - 8);

      const imgData = sctx.getImageData(0, 0, sample.width, sample.height);
      const targets: { x: number; y: number }[] = [];
      const step = Math.max(1, Math.round(particleDensity * dpr));
      for (let y = 0; y < sample.height; y += step) {
        for (let x = 0; x < sample.width; x += step) {
          const alpha = imgData.data[(y * sample.width + x) * 4 + 3];
          if (alpha > 120) {
            targets.push({ x: x / dpr, y: y / dpr });
          }
        }
      }
      if (cancelled) return;

      const particles: Particle[] = targets.map((t, i) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = scatter * (0.5 + Math.random() * 0.8);
        return {
          tx: t.x,
          ty: t.y,
          x: t.x + Math.cos(angle) * dist,
          y: t.y + Math.sin(angle) * dist,
          sx: t.x + Math.cos(angle) * dist,
          sy: t.y + Math.sin(angle) * dist,
          delay: (i / Math.max(targets.length, 1)) * stagger,
          driftPhase: Math.random() * Math.PI * 2,
          driftAmp: 0.6 + Math.random() * 0.8,
        };
      });
      particlesRef.current = particles;
      startRef.current = performance.now();

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      const draw = (now: number) => {
        if (cancelled) return;
        const elapsed = (now - startRef.current) / 1000;
        ctx.clearRect(0, 0, size.width, size.height);

        if (glow) {
          ctx.shadowColor = 'rgba(167,139,250,0.85)';
          ctx.shadowBlur = 6;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillStyle = color;

        for (const p of particlesRef.current) {
          const localT = reducedMotion ? 1 : Math.min(Math.max((elapsed - p.delay) / gatherDuration, 0), 1);
          const eased = easeOutCubic(localT);
          let px = p.sx + (p.tx - p.sx) * eased;
          let py = p.sy + (p.ty - p.sy) * eased;

          if (localT >= 1) {
            const idle = elapsed * 1.2 + p.driftPhase;
            px += Math.sin(idle) * p.driftAmp * 0.5;
            py += Math.cos(idle * 0.8) * p.driftAmp * 0.5;
          }

          if (pointerRepel && pointerRef.current) {
            const dx = px - pointerRef.current.x;
            const dy = py - pointerRef.current.y;
            const d = Math.hypot(dx, dy);
            if (d < repelRadius && d > 0.001) {
              const force = (1 - d / repelRadius) * 14;
              px += (dx / d) * force;
              py += (dy / d) * force;
            }
          }

          p.x = px;
          p.y = py;
          ctx.beginPath();
          ctx.arc(px, py, particleSize, 0, Math.PI * 2);
          ctx.fill();
        }

        rafRef.current = requestAnimationFrame(draw);
      };
      rafRef.current = requestAnimationFrame(draw);
    };

    run();

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.width, size.height, playKey, text]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointerRepel) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };
  const handlePointerLeave = () => {
    pointerRef.current = null;
  };
  const handleInteract = () => {
    if (trigger === 'hover' || trigger === 'click') setPlayKey(k => k + 1);
  };

  const Tag = as;

  return (
    <Tag
      className={`relative inline-block ${className}`.trim()}
      style={style}
      onMouseEnter={trigger === 'hover' ? handleInteract : undefined}
      onClick={trigger === 'click' ? handleInteract : undefined}
    >
      <span className="sr-only">{text}</span>
      <div
        ref={containerRef}
        aria-hidden
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="pointer-events-auto min-h-[1em] w-full"
        style={{ fontSize, fontWeight }}
      >
        <canvas ref={canvasRef} className="block" />
      </div>
    </Tag>
  );
}
