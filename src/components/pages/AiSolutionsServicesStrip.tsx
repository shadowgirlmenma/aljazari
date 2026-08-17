'use client';

import { motion } from 'motion/react';

type StripItem = {
  title: string;
  desc: string;
  image?: string;
};

/**
 * أشرطة الخدمات — نفس نمط شريط "خدماتنا" بالصفحة الرئيسية (ServicesSection)،
 * بس بدل ما تكون صورة وحدة تتبدّل (كاروسيل)، كل خدمة إلها شريطها الخاص
 * ثابت: صورة كاملة العرض (strip-glow لإضاءة الحواف الماشية)، عنوان ووصف
 * فوقها يسار. الأشرطة توّالي وحدة تحت الثانية.
 */
export default function AiSolutionsServicesStrip({ items }: { items: StripItem[] }) {
  return (
    <div className="flex flex-col gap-10 sm:gap-14">
      {items.map(item => (
        <div key={item.title} className="relative left-1/2 w-screen -translate-x-1/2">
          <div className="glass-card strip-glow relative h-[62vh] w-full overflow-hidden sm:h-[75vh]">
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full select-none object-cover"
                draggable={false}
              />
            ) : null}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(9,3,20,0.88),rgba(9,3,20,0.45)_45%,rgba(9,3,20,0.15)_75%)]" />

            <div className="absolute inset-y-0 left-0 flex w-full max-w-md items-center px-8 sm:px-12 lg:px-16">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              >
                <h3 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm font-normal leading-relaxed text-purple-100/80 sm:text-base">
                  {item.desc}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
