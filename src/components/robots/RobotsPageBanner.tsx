'use client';

import { motion } from 'motion/react';

export default function RobotsPageBanner({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="relative w-full overflow-hidden bg-[#120621]" style={{ height: '100svh' }}>
      {/* بانر فيديو بدون صوت، مضغوط للأنترنت الضعيف — يغطي كامل عرض وطول الشاشة بدون فراغات،
          بنفس أسلوب بانرات الرئيسية/الأخبار/التدريب */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/robots-banner-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/robots-banner.mp4" type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(18,6,33,0.2) 0%, rgba(18,6,33,0.35) 55%, rgba(10,4,20,0.85) 100%)',
        }}
      />

      <div className="relative z-10 flex h-full w-full flex-col justify-end px-5 pb-12 pt-20 sm:px-8 lg:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-xl text-4xl font-semibold text-white sm:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 max-w-md text-sm text-purple-200/75 sm:text-base"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}
