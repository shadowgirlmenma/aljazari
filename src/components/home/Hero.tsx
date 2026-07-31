'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Link } from '@/i18n/navigation';
import BlurText from '@/components/reactbits/BlurText';
import StarBorder from '@/components/reactbits/StarBorder';

/**
 * الـ Hero: نص يظهر كلمة كلمة (BlurText) + روبوت Kebbi يطفو صعوداً ونزولاً
 * مع توهج بنفسجي خلفه. زر CTA بإطار StarBorder المتحرك.
 */
export default function Hero({
  line1, line2, line3, sub, cta, ctaSecondary, isRtl,
}: {
  line1: string; line2: string; line3: string; sub: string;
  cta: string; ctaSecondary: string; isRtl: boolean;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.15fr_1fr] lg:px-10">
        {/* النص */}
        <div>
          <BlurText
            text={line1}
            delay={90}
            animateBy="words"
            direction="top"
            className="text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.15]"
          />
          <BlurText
            text={line2}
            delay={90}
            animateBy="words"
            direction="top"
            className="text-brand-300 mt-1 text-3xl font-semibold tracking-tight sm:text-5xl lg:text-[3.4rem] lg:leading-[1.15]"
          />
          <BlurText
            text={line3}
            delay={90}
            animateBy="words"
            direction="top"
            className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.15]"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="text-brand-200 mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
          >
            {sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <StarBorder as={Link} href="/contact" color="#b28ce6" speed="5s" thickness={2}>
              <span className="text-sm font-medium sm:text-base">{cta}</span>
            </StarBorder>
            <Link
              href="/robots"
              className="text-brand-200 rounded-full border border-white/20 px-6 py-3 text-sm transition hover:border-white/50 hover:text-white sm:text-base"
            >
              {ctaSecondary}
            </Link>
          </motion.div>
        </div>

        {/* Kebbi يطفو */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: isRtl ? -40 : 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md"
        >
          {/* توهج خلف الروبوت */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 scale-90 rounded-full opacity-60 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, var(--color-brand-500) 0%, transparent 65%)',
            }}
          />
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src="/kebbi.png"
              alt="Kebbi robot"
              width={640}
              height={640}
              priority
              className="h-auto w-full drop-shadow-2xl"
            />
          </motion.div>
          {/* ظل يتنفس مع الطفو */}
          <motion.div
            aria-hidden
            animate={{ scaleX: [1, 0.82, 1], opacity: [0.45, 0.25, 0.45] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="mx-auto mt-2 h-4 w-2/3 rounded-full bg-black/50 blur-md"
          />
        </motion.div>
      </div>
    </section>
  );
}
