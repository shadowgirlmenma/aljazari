'use client';

import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

/**
 * رسمة روبوت تجريدية بخطوط فقط (line art) عائمة بحركة خفيفة —
 * تُستخدم كعنصر زخرفي داخل بطاقات "حلولنا" بصفحة AI Solutions.
 * كل روبوت "يتفاعل" (نبضة/شرارة فوق راسه) وتطفو حواليه أيقونات صغيرة
 * تعبّر عن مضمون البطاقة الي جواها.
 */
export default function FloatingLineRobot({
  delay = 0,
  className = '',
  icon: Icon,
}: {
  delay?: number;
  className?: string;
  icon?: LucideIcon;
}) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none select-none text-purple-300/30 ${className}`}
      animate={{ y: [0, -12, 0], rotate: [0, 2, 0, -2, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <div className="relative h-full w-full">
        <svg
          viewBox="0 0 100 120"
          width="100%"
          height="100%"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* هوائي */}
          <line x1="50" y1="6" x2="50" y2="16" />
          <circle cx="50" cy="4" r="3" />

          {/* الرأس */}
          <rect x="30" y="16" width="40" height="30" rx="8" />
          <circle cx="41" cy="31" r="3.2" />
          <circle cx="59" cy="31" r="3.2" />
          <path d="M42 39 q8 5 16 0" />

          {/* الرقبة */}
          <line x1="50" y1="46" x2="50" y2="54" />

          {/* الجسم */}
          <rect x="24" y="54" width="52" height="42" rx="10" />
          <circle cx="50" cy="75" r="9" />
          <line x1="50" y1="66" x2="50" y2="84" />
          <line x1="41" y1="75" x2="59" y2="75" />

          {/* الذراعان */}
          <path d="M24 62 q-14 4 -14 20" />
          <circle cx="9" cy="86" r="4" />
          <path d="M76 62 q14 4 14 20" />
          <circle cx="91" cy="86" r="4" />

          {/* الساقان */}
          <line x1="38" y1="96" x2="35" y2="114" />
          <circle cx="34" cy="117" r="3" />
          <line x1="62" y1="96" x2="65" y2="114" />
          <circle cx="66" cy="117" r="3" />
        </svg>

        {/* شرارة تفاعل فوق راس الروبوت — كإنه لاحظ إشي وحيوي مو ثابت */}
        <motion.svg
          viewBox="0 0 20 20"
          className="absolute -top-2 left-[62%] h-5 w-5 text-purple-200/70"
          fill="currentColor"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.15, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.6 }}
        >
          <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" />
        </motion.svg>

        {/* أيقونة صغيرة عائمة تمثّل مضمون البطاقة */}
        {Icon ? (
          <motion.div
            className="absolute -bottom-1 -right-2 flex h-7 w-7 items-center justify-center rounded-full border border-purple-300/40 bg-purple-950/60 text-purple-200/80"
            animate={{ y: [0, -8, 0], opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.3 }}
          >
            <Icon size={13} />
          </motion.div>
        ) : null}
        {Icon ? (
          <motion.div
            className="absolute top-2 -right-4 flex h-5 w-5 items-center justify-center rounded-full border border-purple-300/30 bg-purple-950/50 text-purple-200/60"
            animate={{ y: [0, 6, 0], opacity: [0.35, 0.75, 0.35] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: delay + 1.1 }}
          >
            <Icon size={10} />
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
}
