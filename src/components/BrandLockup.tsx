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
 * قرارات التصميم المتعلقة بطلب توحيد الشكل:
 * - العربي: المسافة بين الحروف بالعنوان الفرعي عن طريق tracking حقيقي (مو
 *   تمديد بالمسافات الفارغة)، وصف الشعار (الأيقونة + الكلمة) وحجمه أكبر شوي
 *   من قبل بحيث عرض صف الشعار وعرض العنوان الفرعي تحته متساويين — نفس عرض
 *   "قالب" واحد، فيصير الـ padding من الجهتين متوازي.
 * - الانكليزي: بدل ما نستخدم text-justify (الي كان يحط فراغات كبيرة بين
 *   الكلمات زي ما وضحتيه بالصورة عند "&")، نستخدم tracking (letter-spacing)
 *   مع font-semibold — يعني نمدد شكل الحرف نفسه ونثخّنه شوي، بدون ما نضيف
 *   فراغ فاضي بين الكلمات.
 */

const SIZES = {
  header: {
    logo: 'h-7 sm:h-8',
    sub: 'mt-1.5 text-[9px] sm:text-[10px]',
  },
  footer: {
    logo: 'h-9 sm:h-10',
    sub: 'mt-2 text-[10px] sm:text-[11px]',
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
    <div className={`inline-flex w-full flex-col leading-none ${className}`}>
      {isAr ? (
        <div dir="ltr" className={`flex w-full items-end justify-between gap-3 ${s.logo}`}>
          <AljazariWordAr className="h-full w-auto" />
          <AljazariIconAr className="h-[78%] w-auto" />
        </div>
      ) : (
        <LogoFull locale="en" className={`w-auto ${s.logo}`} title="Aljazari" />
      )}

      <span
        dir={isAr ? 'rtl' : 'ltr'}
        className={`block w-full whitespace-nowrap font-mono uppercase text-purple-400 opacity-80 ${s.sub} ${
          isAr ? 'tracking-[0.22em]' : 'font-semibold tracking-[0.28em]'
        }`}
      >
        {isAr ? 'للروبوتات والذكاء الاصطناعي' : 'ROBOTICS & AI SOLUTIONS'}
      </span>
    </div>
  );
}
