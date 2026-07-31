import { useLocale } from 'next-intl';
import RobotVisual from './RobotVisual';
import type { Locale, Robot, RobotHardware } from '@/lib/types';

/**
 * ★ التوقيع البصري للموقع — مأخوذ من كتالوغ الجزري المطبوع:
 * أجزاء الروبوت مؤشّرة بخطوط منقّطة تمتد نحو الصورة.
 *
 * الاتجاه ينقلب لوحده بين العربي والإنجليزي لأن الـ flex يتبع dir،
 * فما نحتاج نكتب تصميمين.
 *
 * التجاوب:
 *  • موبايل/آيباد → الصورة فوق، والتأشيرات قائمة تحتها (الخطوط المتقاطعة
 *    ما تشتغل بشاشة ضيقة، فنعرضها كقائمة نظيفة بدل ما نزحمها)
 *  • lg وأكبر → ثلاثة أعمدة: تأشيرات | صورة | تأشيرات
 */
export default function HardwareCallouts({ robot }: { robot: Robot }) {
  const locale = useLocale() as Locale;

  const startItems = robot.hardware.filter((h) => h.side === 'start');
  const endItems = robot.hardware.filter((h) => h.side === 'end');

  if (robot.hardware.length === 0) {
    return <RobotVisual robot={robot} priority className="mx-auto w-full max-w-sm" />;
  }

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1fr_minmax(220px,340px)_1fr] lg:gap-6">
      {/* عمود البداية — يظهر بس على الشاشات الكبيرة */}
      <ul className="hidden flex-col gap-5 lg:flex">
        {startItems.map((item, i) => (
          <CalloutRow key={i} item={item} locale={locale} align="start" />
        ))}
      </ul>

      <RobotVisual robot={robot} priority className="mx-auto w-full max-w-sm lg:max-w-none" />

      <ul className="hidden flex-col gap-5 lg:flex">
        {endItems.map((item, i) => (
          <CalloutRow key={i} item={item} locale={locale} align="end" />
        ))}
      </ul>

      {/* موبايل وآيباد — قائمة بدل التأشير */}
      <ul className="divide-brand-900/10 divide-y lg:hidden">
        {robot.hardware.map((item, i) => (
          <li key={i} className="text-ink/75 py-3 text-sm">
            {item.label[locale]}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CalloutRow({
  item,
  locale,
  align,
}: {
  item: RobotHardware;
  locale: Locale;
  align: 'start' | 'end';
}) {
  const label = (
    <span className="text-ink/80 shrink-0 text-sm leading-snug">{item.label[locale]}</span>
  );
  const line = <span aria-hidden className="leader-line text-brand-600 h-px flex-1" />;

  return (
    <li className={`flex items-center gap-3 ${align === 'start' ? 'text-end' : 'text-start'}`}>
      {align === 'start' ? (
        <>
          {label}
          {line}
        </>
      ) : (
        <>
          {line}
          {label}
        </>
      )}
    </li>
  );
}
