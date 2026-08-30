import Image from 'next/image';
import Logo from '@/components/Logo';
import type { Robot } from '@/lib/types';

/**
 * صورة الروبوت — أو علامة الجزري إذا الصورة لسه ما انحطت.
 *
 * لإضافة صورة: حطي الملف بـ public/robots/ وبدّلي حقل image
 * بملف data/robots.ts، مثلاً: image: '/robots/pepper.png'
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
  if (robot.image) {
    /* خلفية بيضاء موحّدة + padding ثابت حتى كل صور الروبوتات (بغض النظر عن دقتها أو
       نسبة أبعادها الأصلية) تطلع بنفس المقاس والموضع بالضبط داخل الصندوق — بدون
       صور صغيرة بزاوية أو صور تملي الصندوق بشكل غير متناسق مع الباقي. */
    return (
      <div className={`relative aspect-square overflow-hidden rounded-2xl bg-white/95 ${className}`}>
        <Image
          src={robot.image}
          alt={robot.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-contain p-4"
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
