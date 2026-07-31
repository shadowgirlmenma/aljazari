/**
 * علامة الجزري.
 *
 * ⚠️ هذا رسم تقريبي مبني على الشعار الموجود بالكتالوغ.
 * لما يوصلك ملف الشعار الرسمي (SVG) من الشركة، بدّلي محتوى الـ <svg>
 * هنا بس — وكل مكان بالموقع يتحدث لوحده لأن الكل يستورد من هذا الملف.
 *
 * currentColor يعني اللون يورث من العنصر الأب:
 *   <Logo className="text-white" />  أو  text-brand-700
 */
export default function Logo({
  className = '',
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 72 44"
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* الإطار الخارجي */}
      <rect
        x="2.5"
        y="2.5"
        width="67"
        height="39"
        rx="19.5"
        stroke="currentColor"
        strokeWidth="5"
      />
      {/* العينان */}
      <rect x="15" y="12" width="17" height="20" rx="8.5" fill="currentColor" />
      <rect x="40" y="12" width="17" height="20" rx="8.5" fill="currentColor" />
    </svg>
  );
}
