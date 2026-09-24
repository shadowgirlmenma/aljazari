import type { Locale } from '@/lib/types';

/**
 * بلوك الشعار الموحّد (الأيقونة + كلمة "الجزري"/"ALJAZARI" + العنوان الفرعي).
 *
 * ملاحظة المراجعة (25/09/2026): كان هذا مكوّن حي (SVG + قياس عرض بالـ
 * JavaScript لضبط حجم العنوان الفرعي تلقائياً وقت التشغيل) — وطلعت مشاكل
 * محاذاة مختلفة حسب الجهاز/المتصفح. هسة الشعار بالكامل (الأيقونة + الكلمة +
 * العنوان الفرعي) صورة PNG شفافة واحدة لكل لغة، مصمّمة ومحاذاة يدوياً مرّة
 * وحدة بدقة، فتطلع نفسها بالضبط على كل جهاز بدون أي حسابات وقت التشغيل:
 * - `/public/brand/logo-ar.png`: الأيقونة مرفوعة شوي فوق كلمة "الجزري" (بدل
 *   محاذاتها بخط القاعدة)، وحجم كلمة "الجزري" مصغّر بالنسبة للأيقونة حتى
 *   تكون العلاقة بينهم متناسقة (ملاحظة 25/09).
 * - `/public/brand/logo-en.png`: "ALJAZARI" + "ROBOTICS & AI SOLUTIONS" —
 *   تباعد العنوان الفرعي letter-spacing حقيقي بين الحروف (مو مسافات فراغ
 *   يدوية بين الحروف/الكلمات).
 * كلا الصورتين بنفس أبعاد المستطيل بالضبط (1600×576) حتى يكونان متطابقتين
 * بالمحاذاة والتناسب أينما استُخدمتا.
 */

const SIZES = {
  header: 'h-11 w-auto sm:h-12',
  footer: 'h-16 w-auto sm:h-20',
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
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={isAr ? '/brand/logo-ar.png' : '/brand/logo-en.png'}
      alt="ALJAZARI — Robotics & AI Solutions"
      className={`${SIZES[size]} select-none ${className}`}
      draggable={false}
    />
  );
}
