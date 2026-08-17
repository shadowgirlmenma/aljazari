'use client';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Link } from '@/i18n/navigation';
import dynamic from 'next/dynamic';
import { Mail, Lock } from 'lucide-react';

const Lightfall = dynamic(
  () => import('@/components/reactbits/Lightfall'),
  { ssr: false }
);

export default function LoginClient({
  title, subtitle, emailLabel, passwordLabel,
  submitLabel, forgotLabel, noAccountLabel, signupLabel,
}: {
  title: string; subtitle: string;
  emailLabel: string; passwordLabel: string;
  submitLabel: string; forgotLabel: string;
  noAccountLabel: string; signupLabel: string;
}) {
  const [loading, setLoading] = useState(false);
  const locale = useLocale();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    /* مؤقت — يرتبط بالباكند لاحقاً */
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
  };

  return (
    <div className="relative min-h-[calc(100dvh-1px)] overflow-hidden bg-[#120621]">

      {/* ── خلفية Lightfall ── */}
      <div className="absolute inset-0">
        <Lightfall
          colors={['#bba4fc', '#7c47e0', '#4c1d80']}
          backgroundColor="#260b42"
          speed={0.4}
          streakCount={3}
          streakWidth={1}
          streakLength={1.1}
          glow={1}
          density={0.6}
          twinkle={0.8}
          zoom={3.2}
          backgroundGlow={0.5}
          opacity={0.75}
          mouseInteraction
          mouseStrength={0.5}
          mouseRadius={1}
        />
      </div>

      {/* تعتيم خفيف حتى يبين النص */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(18,6,33,0.55) 0%, rgba(18,6,33,0.92) 100%)',
        }}
      />

      {/* ── المحتوى ── */}
      <div className="relative mx-auto flex min-h-[calc(100dvh-1px)] max-w-6xl items-center px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_420px]">

          {/* الروبوت — يظهر بالديسكتوب بس */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="hidden justify-center lg:flex"
          >
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div
                aria-hidden
                className="absolute inset-0 -z-10 scale-90 rounded-full bg-purple-600/30 blur-3xl"
              />
              <Image
                src="/robots/kebbi-nobg.webp"
                alt="Kebbi"
                width={420}
                height={420}
                className="h-auto w-full drop-shadow-2xl"
                style={{
                  filter:
                    'drop-shadow(0 0 40px rgba(124,71,224,0.5)) drop-shadow(0 20px 50px rgba(76,29,128,0.4))',
                }}
              />
            </motion.div>
          </motion.div>

          {/* بطاقة الفورم */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="rounded-2xl border border-purple-500/25 bg-[#120621]/70 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10"
          >
            <h1 className="text-2xl font-semibold text-white sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 text-sm text-purple-200/70">{subtitle}</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* البريد */}
              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-purple-400">
                  {emailLabel}
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute start-4 top-1/2 -translate-y-1/2 text-purple-400/60"
                  />
                  <input
                    required
                    type="email"
                    className="w-full rounded-xl border border-purple-500/30 bg-purple-900/20 py-3 ps-11 pe-4 text-sm text-white placeholder-purple-300/40 outline-none transition focus:border-purple-400 focus:bg-purple-900/30"
                  />
                </div>
              </div>

              {/* كلمة السر */}
              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-purple-400">
                  {passwordLabel}
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute start-4 top-1/2 -translate-y-1/2 text-purple-400/60"
                  />
                  <input
                    required
                    type="password"
                    className="w-full rounded-xl border border-purple-500/30 bg-purple-900/20 py-3 ps-11 pe-4 text-sm text-white placeholder-purple-300/40 outline-none transition focus:border-purple-400 focus:bg-purple-900/30"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  href="/contact"
                  className="text-xs text-purple-400 transition hover:text-purple-200"
                >
                  {forgotLabel}
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-purple-600 py-3.5 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:opacity-60"
              >
                {loading ? '...' : submitLabel}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-purple-200/60">
              {noAccountLabel}{' '}
              <Link href="/contact" className="text-purple-300 transition hover:text-white">
                {signupLabel}
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}