'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

type StackItem = {
  title: string;
  desc: string;
  icon: string;
  /** مسار صورة اختياري — إذا ما أضيف، تظهر الأيقونة الكبيرة بدلها */
  image?: string;
};

/**
 * بديل خفيف مجاني لتأثير "Scroll Stack" — بطاقات تتكدّس وتتثبّت (sticky)
 * وهي تتصاغر وتخف شوي كل ما ظهرت البطاقة الي بعدها فوقها أثناء التمرير.
 * كل بطاقة فيها صورة/أيقونة بجانب النص. خفيفة الأداء (بدون WebGL)،
 * تعتمد فقط على position:sticky + scroll-linked transform.
 */
export default function ScrollStackSection({ items }: { items: StackItem[] }) {
  return (
    <div className="relative">
      {items.map((item, i) => (
        <StackCard key={i} item={item} index={i} total={items.length} />
      ))}
    </div>
  );
}

function StackCard({
  item,
  index,
  total,
}: {
  item: StackItem;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const isLast = index === total - 1;
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.55]);

  const topOffset = 96 + index * 18;

  return (
    <div ref={ref} className="relative" style={{ zIndex: index + 1 }}>
      <motion.div
        style={{ scale, opacity, top: topOffset }}
        className="glass-card sticky mx-auto mb-8 grid max-w-4xl gap-8 rounded-3xl p-8 sm:grid-cols-[220px_1fr] sm:p-10"
      >
        <div className="glass flex aspect-square items-center justify-center overflow-hidden rounded-2xl">
          {item.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-6xl">{item.icon}</span>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-3xl">{item.icon}</span>
          <h3 className="mt-4 text-xl font-medium text-white sm:text-2xl">
            {item.title}
          </h3>
          <p className="mt-3 leading-relaxed text-purple-200/70">{item.desc}</p>
        </div>
      </motion.div>
    </div>
  );
}
