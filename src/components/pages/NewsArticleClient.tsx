'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';
import type { Locale } from '@/lib/types';

export default function NewsArticleClient({
  title, excerpt, category, date, readTime, backLabel, image,
}: {
  title: string; excerpt: string; category: string;
  date: string; readTime: string; backLabel: string;
  image?: string;
}) {
  void readTime; // شيلنا عرض دقائق القراءة من صفحة المقال
  const locale = useLocale() as Locale;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(locale === 'ar' ? 'ar-IQ' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  return (
    <article>
      {/* ── صورة/بانر بنسبة landscape كاملة العرض — أو شعار الجزري إذا الصورة لسه ما انحطت ── */}
      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-purple-900/60 to-[#120621]">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Logo className="w-24 text-purple-400/25" />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0414] via-transparent to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-8 start-6 end-6 sm:start-10"
        >
          <span className="rounded-full bg-purple-600 px-3 py-1 font-mono text-[10px] text-white">
            {category}
          </span>
        </motion.div>
      </div>

      {/* ── المحتوى ── */}
      <div className="bg-[#0a0414]">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">

          <Link
            href="/news"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-purple-400 transition hover:text-purple-200"
          >
            <ArrowRight size={14} className="rotate-180" />
            {backLabel}
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-3xl font-semibold leading-snug text-white sm:text-4xl"
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 font-mono text-xs text-purple-400/70"
          >
            {formatDate(date)}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-lg leading-relaxed text-purple-100/85"
          >
            {excerpt}
          </motion.p>

          {/* مشاركة / رجوع */}
          <div className="mt-14 border-t border-purple-900/40 pt-8">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 px-5 py-2.5 text-sm text-purple-200 transition hover:border-purple-400 hover:text-white"
            >
              <ArrowRight size={14} className="rotate-180" />
              {backLabel}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}