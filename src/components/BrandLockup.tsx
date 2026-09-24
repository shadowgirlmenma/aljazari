'use client';

import { useLayoutEffect, useRef } from 'react';
import LogoFull from '@/components/LogoFull';
import { AljazariWordAr, AljazariIconAr } from '@/components/LogoAr';
import type { Locale } from '@/lib/types';

/**
 * بلوك الشعار الموحّد (الأيقونة + كلمة "الجزري"/"ALJAZARI" + العنوان الفرعي)
 * — نفس القالب بالضبط بالـ Header والـ Footer، بس بحجمين مختلفين (size).
 *
 * ملاحظة المراجعة (10/09/2026): «The name of Aljazari with its subtitle ..
 * The subtitle is longer than the main title with the logo» — العنوان الفرعي كان
 * أعرض من الشعار. هسة عرض العنوان الفرعي يُضبط تلقائياً (fit) ليطابق عرض الشعار
 * بالضبط، لا أطول ولا أقصر: نقيس عرض صف الشعار ثم نحسب حجم خط العنوان الفرعي
 * بالتناسب. القياس يعاد عند تغيّر الحجم أو اللغة أو بعد تحميل الخطوط.
 *
 * - العربي: صف الأيقونة+الكلمة (SVG من `LogoAr.tsx`).
 * - الإنجليزي: `LogoFull` (SVG كامل).
 * - المسافة بين الحروف (tracking) ثابتة بوحدة em فيتناسب مع حجم الخط عند الضبط.
 */

const SIZES = {
  header: {
    logo: 'h-8 sm:h-9',
    iconH: 'h-[92%]',
    gap: 'gap-2',
    sub: 'mt-1.5',
    initialFont: 9,
  },
  footer: {
    logo: 'h-10 sm:h-12',
    iconH: 'h-[92%]',
    gap: 'gap-2.5',
    sub: 'mt-2',
    initialFont: 10,
  },
} as const;

export default function BrandLockup({
  locale,
  size = 'header',
  className = '',
}: {
  locale: Locale;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const isAr = locale === 'ar';
  const s = SIZES[size];
  const rowRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const row = rowRef.current;
    const sub = subRef.current;
    if (!row || !sub) return;

    const fit = () => {
      const target = row.getBoundingClientRect().width;
      if (!target) return;
      // نقيس العرض الطبيعي بحجم مرجعي 20px ثم نحسب الحجم المطابق لعرض الشعار
      sub.style.fontSize = '20px';
      const natural = sub.getBoundingClientRect().width;
      if (!natural) return;
      sub.style.fontSize = `${((target / natural) * 20).toFixed(2)}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(row);
    // الخطوط قد تتأخر بالتحميل فيتغير عرض النص
    if (document.fonts?.ready) document.fonts.ready.then(fit).catch(() => {});
    return () => ro.disconnect();
  }, [isAr, size]);

  return (
    <div className={`inline-flex flex-col items-start leading-none ${className}`}>
      <div ref={rowRef} className="inline-flex">
        {isAr ? (
          <div dir="ltr" className={`inline-flex items-end ${s.gap} ${s.logo}`}>
            <AljazariWordAr className="h-full w-auto shrink-0" />
            <AljazariIconAr className={`${s.iconH} w-auto shrink-0`} />
          </div>
        ) : (
          <LogoFull locale="en" className={`w-auto shrink-0 ${s.logo}`} title="Aljazari" />
        )}
      </div>

      <span
        ref={subRef}
        dir={isAr ? 'rtl' : 'ltr'}
        style={{ fontSize: s.initialFont }}
        className={`block w-max max-w-none whitespace-nowrap font-mono font-bold uppercase text-purple-400 opacity-80 ${s.sub} ${
          isAr ? 'tracking-[0.24em]' : 'tracking-[0.32em]'
        }`}
      >
        {isAr ? 'للروبوتات والذكاء الاصطناعي' : 'ROBOTICS & AI SOLUTIONS'}
      </span>
    </div>
  );
}
