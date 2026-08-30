import LogoFull from '@/components/LogoFull';
import { AljazariWordAr, AljazariIconAr } from '@/components/LogoAr';
import type { Locale } from '@/lib/types';

/**
 * بلوك الشعار الموحّد (الأيقونة + كلمة "الجزري"/"ALJAZARI" + العنوان الفرعي)
 * — نفس القالب بالضبط بالـ Header والـ Footer، بس بحجمين مختلفين (size).
 *
 * ليش هذا الملف موجود:
 * قبل كذا كان الـ Header يرسم الشعار بطريقة (SVG مقسوم لجزئين + تمديد نص بالـ
 * text-justify)، والـ Footer يرسم شعار مختلف كلياً (أيقونة فقط + اسم الشركة كنص
 * عادي). هذا يخلي شكل العنوان مو موحّد بين مكان ومكان بالموقع. هسة الاثنين
 * يستخدمون نفس المكوّن.
 *
 * قرارات التصميم (بعد ملاحظات المراجعة):
 * - العنصر كامل (الأيقونة + الكلمة + العنوان الفرعي) صار بعرضه الطبيعي فقط
 *   inline-flex بدون أي عرض ثابت مفروض من بره (w-40 / w-44 الخ بالـ Header
 *   والـ Footer انشالت) — حتى ما تنمد الكلمة أو تطلع برة المساحة المتاحة.
 * - الأيقونة صارت أكبر نسبياً مقارنة بالكلمة (قريبة من ارتفاع الصف كامل)
 *   بدل ما تكون صغيرة بالزاوية.
 * - العربي: المسافة بين الحروف بالعنوان الفرعي عن طريق tracking حقيقي (مو
 *   تمديد بالمسافات الفارغة).
 * - الانكليزي: بدل ما نستخدم text-justify (الي كان يحط فراغات كبيرة بين
 *   الكلمات)، نستخدم font-bold + tracking (letter-spacing) واضح ومحسوس
 *   بين الحروف، مو بس بين الكلمات.
 */

const SIZES = {
  header: {
    logo: 'h-8 sm:h-9',
    iconH: 'h-[92%]',
    gap: 'gap-2',
    sub: 'mt-1.5 text-[10px] sm:text-[11px]',
  },
  footer: {
    logo: 'h-10 sm:h-12',
    iconH: 'h-[92%]',
    gap: 'gap-2.5',
    sub: 'mt-2 text-[11px] sm:text-[12px]',
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

  return (
    <div className={`inline-flex flex-col items-start leading-none ${className}`}>
      {isAr ? (
        <div dir="ltr" className={`inline-flex items-end ${s.gap} ${s.logo}`}>
          <AljazariWordAr className="h-full w-auto shrink-0" />
          <AljazariIconAr className={`${s.iconH} w-auto shrink-0`} />
        </div>
      ) : (
        <LogoFull locale="en" className={`w-auto shrink-0 ${s.logo}`} title="Aljazari" />
      )}

      <span
        dir={isAr ? 'rtl' : 'ltr'}
        className={`block whitespace-nowrap font-mono font-bold uppercase text-purple-400 opacity-80 ${s.sub} ${
          isAr ? 'tracking-[0.24em]' : 'tracking-[0.32em]'
        }`}
      >
        {isAr ? 'للروبوتات والذكاء الاصطناعي' : 'ROBOTICS & AI SOLUTIONS'}
      </span>
    </div>
  );
}
