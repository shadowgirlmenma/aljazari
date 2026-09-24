import type { CSSProperties } from 'react';

/**
 * عنوان بنفسجي مضيء (bold + glow) — كان سابقاً يرسم الحروف كـ SVG بحدود متحركة، بس ملاحظة
 * المراجعة (24/09): هذا التأثير يقلب الكتابة العربية بشكل مقلوب على بعض الأجهزة. هسة نص HTML
 * عادي (يتبع اتجاه اللغة بشكل صحيح) بنفس الاسم والواجهة حتى ما تتغير أماكن الاستخدام.
 * خصائص الحركة القديمة (strokeWidth, trigger, ...) ما تسوي شي هسة.
 */
export interface StrokeTextProps {
  text?: string;
  fontSize?: number;
  fontWeight?: number | string;
  className?: string;
  style?: CSSProperties;
  [legacy: string]: unknown;
}

export default function StrokeText({
  text = '',
  fontSize = 34,
  fontWeight = 700,
  className = '',
  style = {},
}: StrokeTextProps) {
  return (
    <span
      className={`block w-full font-bold leading-tight text-purple-300 ${className}`.trim()}
      style={{
        fontSize: `clamp(${Math.round(fontSize * 0.62)}px, 5vw, ${fontSize}px)`,
        fontWeight,
        textShadow:
          '0 0 10px rgba(167,139,250,0.65), 0 0 28px rgba(124,71,224,0.55), 0 0 56px rgba(124,71,224,0.35)',
        ...style,
      }}
    >
      {text}
    </span>
  );
}
