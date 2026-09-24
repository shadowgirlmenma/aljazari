import Image from 'next/image';
import Logo from '@/components/Logo';
import type { Robot } from '@/lib/types';

/**
 * صورة الروبوت — أو علامة الجزري إذا الصورة لسه ما انحطت.
 *
 * التصميم (بعد ملاحظات المراجعة):
 * - الخلفية مو بيضاء بعد: لوحة زجاجية بنفسجية (glassmorphism) بنفس ألوان الموقع،
 *   بوهج بنفسجي ناعم خلف الروبوت وظل أرضي تحته، حتى يتناغم الروبوت مع باقي
 *   الموقع بدل ما يظهر كصندوق أبيض غريب.
 * - كل الروبوتات بنفس الحجم المنطقي بالضبط: نستخدم `robot.cardImage` (نسخة
 *   موحّدة: الروبوت مقصوص على حدوده الفعلية ومتوسّط بنفس المساحة داخل مربع
 *   ثابت). إذا ما وجدت نسخة موحّدة نرجع لـ `robot.image` العادية.
 * - المربع دايماً aspect-square فالبطاقات كلها بنفس القياس.
 *
 * لإضافة روبوت جديد: حطي الصورة بـ public/robots/ ثم أنشئي نسخة موحّدة
 * بـ public/robots/card/<slug>.webp (800×800 شفافة) وضيفيها بحقل cardImage.
 */
export default function RobotVisual({
  robot,
  priority = false,
  className = '',
}: {
  robot: Robot;
  priority?: boolean;
  className?: string;
}) {
  const src = robot.cardImage ?? robot.image;

  if (src) {
    return (
      <div
        className={`relative aspect-square overflow-hidden rounded-2xl border border-purple-300/25 bg-gradient-to-br from-purple-400/25 via-purple-700/25 to-purple-950/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-xl ${className}`}
      >
        {/* وهج بنفسجي ناعم خلف الروبوت */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 55% at 50% 42%, rgba(167,139,250,0.42) 0%, rgba(124,71,224,0.18) 55%, transparent 100%)',
          }}
        />
        {/* لمعة زجاجية علوية */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/3"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.10), transparent)',
          }}
        />
        {/* ظل أرضي تحت الروبوت */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[7%] left-1/2 h-[5%] w-[46%] -translate-x-1/2 rounded-full bg-black/40 blur-md"
        />
        <Image
          src={src}
          alt={robot.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="relative object-contain p-3 drop-shadow-[0_10px_18px_rgba(9,3,20,0.55)]"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={robot.name}
      className={`from-brand-800/50 to-brand-950/50 ring-brand-300/20 flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br ring-1 ${className}`}
    >
      <Logo className="text-brand-300/45 w-1/3 max-w-24" />
    </div>
  );
}
