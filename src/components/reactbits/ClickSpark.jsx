'use client';
import { useRef, useEffect, useCallback } from 'react';

export default function ClickSpark({ sparkColor = '#9a6dd7', sparkSize = 10, sparkRadius = 15, sparkCount = 8, duration = 400, easing = 'ease-out', extraScale = 1.0, children }) {
  const canvasRef = useRef(null); const sparksRef = useRef([]); const startTimeRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    // ⚠️ الـ canvas مثبت (fixed) على كامل الشاشة، فحجمه الداخلي لازم يطابق
    // حجم النافذة (window) مو حجم الـ div الأب — هذا كان سبب ابتعاد الشرارة
    // عن نقطة الدوس (كان يرسم بإحداثيات viewport على قماش بحجم مختلف).
    let resizeTimeout;
    const resize = () => {
      const { innerWidth: width, innerHeight: height } = window;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };
    const handle = () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(resize, 100); };
    window.addEventListener('resize', handle);
    resize();
    return () => { window.removeEventListener('resize', handle); clearTimeout(resizeTimeout); };
  }, []);

  const easeFunc = useCallback(t => { switch (easing) { case 'linear': return t; case 'ease-in': return t*t; case 'ease-in-out': return t<0.5?2*t*t:-1+(4-2*t)*t; default: return t*(2-t); } }, [easing]);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); let animationId;
    const draw = ts => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparksRef.current = sparksRef.current.filter(s => {
        const elapsed = ts - s.startTime; if (elapsed >= duration) return false;
        const eased = easeFunc(elapsed / duration);
        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);
        const x1 = s.x + distance * Math.cos(s.angle), y1 = s.y + distance * Math.sin(s.angle);
        const x2 = s.x + (distance + lineLength) * Math.cos(s.angle), y2 = s.y + (distance + lineLength) * Math.sin(s.angle);
        ctx.strokeStyle = sparkColor; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        return true;
      });
      animationId = requestAnimationFrame(draw);
    };
    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);

  const handleClick = e => {
    // e.clientX/clientY إحداثيات نسبية للشاشة (viewport) — هسة الـ canvas
    // نفس حجم الشاشة تماماً فتتطابق الإحداثيات بدون أي فرق مقياس
    const canvas = canvasRef.current; if (!canvas) return;
    const x = e.clientX, y = e.clientY, now = performance.now();
    sparksRef.current.push(...Array.from({ length: sparkCount }, (_, i) => ({ x, y, angle: (2 * Math.PI * i) / sparkCount, startTime: now })));
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }} onClick={handleClick}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block', userSelect: 'none', position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }} />
      {children}
    </div>
  );
}