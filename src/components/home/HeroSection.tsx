'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import BlurText from '@/components/reactbits/BlurText';
import StarBorder from '@/components/reactbits/StarBorder';
import type { Locale } from '@/lib/types';

/* نجمة صغيرة بسيطة (شرارة) — SVG خفيف بدون أي ملف خارجي */
function Sparkle({
  className = '',
  color = '#c0a0f5',
  delay = 0,
  duration = 2.4,
}: {
  className?: string;
  color?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={`pointer-events-none absolute ${className}`}
      style={{ width: 18, height: 18 }}
      initial={{ opacity: 0, scale: 0.4, rotate: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4], rotate: [0, 25, 0] }}
      transition={{ duration, repeat: Infinity, repeatDelay: 1.4, delay, ease: 'easeInOut' }}
    >
      <path
        d="M12 0 C12 6.5 13.5 10.5 24 12 C13.5 13.5 12 17.5 12 24 C12 17.5 10.5 13.5 0 12 C10.5 10.5 12 6.5 12 0 Z"
        fill={color}
      />
    </motion.svg>
  );
}

export default function HeroSection({ locale }: { locale: Locale }) {
  const t = useTranslations('home');
  const isRtl = locale === 'ar';
  const sectionRef = useRef<HTMLElement>(null);

  /* ── تتبع الماوس (طفو + ميلان خفيف بس) ── */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, { stiffness: 60, damping: 18, mass: 1.2 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 18, mass: 1.2 });

  const rotateY  = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const rotateX  = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const translateX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  /* توهج خلفية القسم — لسه يتبع الماوس (هذا ما فيه مشكلة) */
  const glowX = useTransform(springX, [-0.5, 0.5], [30, 70]);
  const glowY = useTransform(springY, [-0.5, 0.5], [30, 70]);
  const sectionGlowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(ellipse 55% 50% at ${x}% ${y}%, rgba(124,71,224,0.45) 0%, transparent 65%)`
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
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
      className="hero-gradient relative min-h-[92vh] overflow-hidden"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: sectionGlowBackground }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-5 py-16 sm:px-8 lg:min-h-[92vh] lg:grid-cols-[1.15fr_1fr] lg:px-10">

        {/* ── النص ── */}
        <div className={isRtl ? 'text-right' : 'text-left'}>
          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-purple-300"
          >
            {t('hero.sub')}
          </motion.p>

          <div className="mt-5 space-y-1">
            <BlurText
              text={t('hero.line1')}
              delay={80}
              animateBy="words"
              direction="top"
              className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-[3.4rem]"
            />
            <BlurText
              text={t('hero.line2')}
              delay={80}
              animateBy="words"
              direction="top"
              className="text-4xl font-bold leading-tight text-purple-300 sm:text-5xl lg:text-[3.4rem]"
            />
            <BlurText
              text={t('hero.line3')}
              delay={80}
              animateBy="words"
              direction="top"
              className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[3.4rem]"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <StarBorder as={Link} href="/contact" color="#a78bfa" speed="5s" thickness={2}>
              <span className="px-2 text-sm font-medium sm:text-base">
                {t('hero.cta')}
              </span>
            </StarBorder>

            <Link
              href="/robots"
              className="rounded-full border border-white/25 px-6 py-3 text-sm text-purple-200 transition hover:border-purple-400 hover:text-white"
            >
              {t('hero.ctaSecondary')} →
            </Link>
          </motion.div>
        </div>

        {/* ── Kebbi ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease: 'easeOut' }}
          className="relative mx-auto flex w-full max-w-sm items-center justify-center lg:max-w-md"
          style={{ perspective: 800 }}
        >
          {/* شرارات صغيرة تومض حوالين الروبوت — حيوية ومرح، مستقلة عن الماوس */}
          <Sparkle className="left-[8%] top-[12%]" color="#c0a0f5" delay={0} duration={2.2} />
          <Sparkle className="right-[10%] top-[22%]" color="#f5c4ff" delay={1.1} duration={2.6} />
          <Sparkle className="left-[16%] bottom-[18%]" color="#a472ec" delay={2.0} duration={2.4} />
          <Sparkle className="right-[6%] bottom-[28%]" color="#e0c3ff" delay={0.6} duration={2.8} />

          {/* توهج أرضي */}
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-1/2 h-16 w-3/4 -translate-x-1/2 rounded-full blur-2xl"
            style={{
              background: 'rgba(124,71,224,0.35)',
              scaleX: useTransform(springX, [-0.5, 0.5], [0.8, 1.2]),
            }}
          />

          {/* الروبوت — طفو + ميلان خفيف بالماوس */}
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              rotateY,
              rotateX,
              x: translateX,
              y: translateY,
              transformStyle: 'preserve-3d',
            }}
            className="relative z-10"
          >
            <Image
              src="/kebbi.png"
              alt="Kebbi — روبوت الجزري التعليمي"
              width={520}
              height={520}
              priority
              className="h-auto w-full drop-shadow-2xl"
              style={{
                filter:
                  'drop-shadow(0 0 40px rgba(124,71,224,0.55)) drop-shadow(0 20px 60px rgba(76,29,128,0.45))',
              }}
            />

            {/* لمعة تتزحلق تلقائياً عبر جسم Kebbi كل فترة — مستقلة عن الماوس بالكامل */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                WebkitMaskImage: 'url(/kebbi.png)',
                maskImage: 'url(/kebbi.png)',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                mixBlendMode: 'soft-light',
                backgroundImage:
                  'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.95) 50%, transparent 65%)',
                backgroundSize: '260% 260%',
              }}
              animate={{ backgroundPosition: ['160% -30%', '-60% 130%'] }}
              transition={{ duration: 1.3, repeat: Infinity, repeatDelay: 2.6, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* ظل يتنفّس */}
          <motion.div
            aria-hidden
            animate={{ scaleX: [1, 0.78, 1], opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-2 left-1/2 h-5 w-1/2 -translate-x-1/2 rounded-full bg-black/60 blur-lg"
          />
        </motion.div>
      </div>

      {/* سهم للأسفل */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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