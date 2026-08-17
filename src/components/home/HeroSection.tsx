'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import BlurText from '@/components/reactbits/BlurText';
import type { Locale } from '@/lib/types';

export default function HeroSection({ locale }: { locale: Locale }) {
  const t = useTranslations('home');
  const isRtl = locale === 'ar';
  const sectionRef = useRef<HTMLElement>(null);

  /* توهج خفيف يتبع الماوس فوق الفيديو — تفاعل بسيط بدون ما يخفي الفيديو */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 60, damping: 18, mass: 1.2 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 18, mass: 1.2 });

  const glowX = useTransform(springX, [-0.5, 0.5], [30, 70]);
  const glowY = useTransform(springY, [-0.5, 0.5], [30, 70]);
  const sectionGlowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(ellipse 55% 45% at ${x}% ${y}%, rgba(124,71,224,0.22) 0%, transparent 65%)`
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] w-full overflow-hidden bg-[#0d0818]"
    >
      {/* ── الفيديو، خلفية كاملة العرض والطول ── */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        poster="/hero-video/hero-t1-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="فيديو عرض روبوت Unitree G1"
      >
        <source src="/hero-video/hero-t1.webm" type="video/webm" />
        <source src="/hero-video/hero-t1.mp4" type="video/mp4" />
      </video>

      {/* توهج بنفسجي خفيف يتبع الماوس فوق الفيديو */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{ background: sectionGlowBackground }}
      />

      {/* تعتيم علوي خفيف — يخلي الهيدر الشفاف يبين بوضوح فوق الفيديو */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/55 via-black/10 to-transparent" />

      {/* تعتيم سفلي قوي — لقراءة النص وانتقال ناعم للقسم الي بعده */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#0d0818] via-[#0d0818]/70 to-transparent" />

      {/* ── المحتوى: نص تحت يسار + زر تحت يمين، متل الموقع المرجعي ── */}
      <div className="relative z-10 flex min-h-[92vh] flex-col justify-end px-5 pb-12 sm:px-8 lg:px-10 lg:pb-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-end justify-between gap-8 lg:flex-row lg:items-end">

          {/* ── النص — h1 حقيقي حتى يفهم كوكل موضوع الصفحة الرئيسية (كان فاضي قبل) ── */}
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <h1 className="space-y-0.5">
              <BlurText
                as="span"
                text={t('hero.line1')}
                delay={80}
                animateBy="words"
                direction="top"
                className="text-xl font-medium uppercase leading-[1.15] text-white sm:text-2xl lg:text-3xl"
              />
              <BlurText
                as="span"
                text={t('hero.line2')}
                delay={80}
                animateBy="words"
                direction="top"
                className="text-xl font-medium uppercase leading-[1.15] text-purple-300 sm:text-2xl lg:text-3xl"
              />
            </h1>
          </div>

          {/* ── زر ثانوي، أسفل يمين، متل "Full Video" بالمرجع ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="shrink-0"
          >
            <Link
              href="/robots"
              className="glass-pill inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-white transition hover:border-purple-300/50 hover:bg-white/10"
            >
              {t('hero.ctaSecondary')}
              <span aria-hidden className={isRtl ? 'scale-x-[-1]' : ''}>↗</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* سهم للأسفل */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <div className="h-8 w-px bg-gradient-to-b from-transparent to-purple-400" />
          <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
