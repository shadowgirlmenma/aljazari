'use client';

import { useState, useMemo, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import Logo from '@/components/Logo';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import type { Locale } from '@/lib/types';

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
};

const PAGE_SIZE = 6;

export default function NewsClient({
  title,
  subtitle,
  bannerLabel,
  readMore,
  articles,
}: {
  title: string;
  subtitle: string;
  bannerLabel: string;
  readMore: string;
  articles: Article[];
}) {
  void bannerLabel; // شيلنا شريط "قسم الأخبار والتحديثات" — بقيت البروب حتى ما نكسر الصفحة، بس ما تنعرض

  const locale = useLocale() as Locale;
  const t = useTranslations('news');
  const [activeCategory, setActiveCategory] = useState('all');
  const [page, setPage] = useState(1);

  /* استخرج التصنيفات من المقالات */
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(articles.map((a) => a.category))];
    return cats;
  }, [articles]);

  const filtered = useMemo(
    () =>
      activeCategory === 'all'
        ? articles
        : articles.filter((a) => a.category === activeCategory),
    [articles, activeCategory],
  );

  /* نرجع لأول صفحة كل ما تتغير الفلترة */
  useEffect(() => {
    setPage(1);
  }, [activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page],
  );

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(locale === 'ar' ? 'ar-IQ' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      {/* ── بانر فيديو بدون صوت، مضغوط للأنترنت الضعيف — العنوان على حافة البداية
           (يمين بالعربي، يسار بالإنجليزي) مع شرح بسيط وقصير تحته ── */}
      <div className="relative w-full overflow-hidden bg-[#120621]" style={{ height: '100svh' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/news-banner.mp4" type="video/mp4" />
        </video>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(18,6,33,0.35) 0%, rgba(18,6,33,0.6) 55%, rgba(10,4,20,0.95) 100%)',
          }}
        />

        <div className="relative z-10 flex h-full w-full flex-col justify-end px-5 pb-14 pt-20 sm:px-8 lg:px-10">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-3xl font-semibold text-white sm:text-5xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-3 max-w-xl text-sm text-purple-200/80 sm:text-base"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>

      {/* ── المحتوى ── */}
      <div className="bg-[#0a0414]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10">

          {/* فلتر التصنيفات */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm transition-all ${
                  activeCategory === cat
                    ? 'bg-purple-600 text-white'
                    : 'border border-purple-500/30 text-purple-200/60 hover:border-purple-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? t('allCategories') : cat}
              </button>
            ))}
          </div>

          {/* المقالات */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {paginated.map((article, i) => (
                <motion.article
                  key={article.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-purple-500/20 bg-purple-900/10 backdrop-blur-md transition-all hover:border-purple-400/40 hover:bg-purple-900/20"
                >
                  {/* صورة الخبر بعرض المقالة كامل بنسبة landscape — أو شعار الجزري إذا الصورة لسه ما انحطت */}
                  <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-purple-800/40 to-[#120621]">
                    {article.image ? (
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Logo className="w-14 text-purple-400/30" />
                      </div>
                    )}

                    {/* تدرج فوق الصورة */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120621]/85 to-transparent" />

                    {/* تصنيف */}
                    <span className="absolute end-3 top-3 rounded-full bg-purple-600/80 px-3 py-1 font-mono text-[10px] text-white backdrop-blur-sm">
                      {article.category}
                    </span>
                  </div>

                  {/* المحتوى */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="font-mono text-[10px] text-purple-400/70">
                      {formatDate(article.date)}
                    </div>

                    <h2 className="mt-3 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-purple-200">
                      {article.title}
                    </h2>

                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-purple-200/60">
                      {article.excerpt}
                    </p>

                    <Link
                      href={`/news/${article.slug}`}
                      className="mt-5 font-mono text-xs uppercase tracking-wider text-purple-400 transition hover:text-purple-200"
                    >
                      {readMore} →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <p className="mt-12 text-sm text-purple-200/60">
              {t('empty')}
            </p>
          )}

          {/* ── ترقيم الصفحات ── */}
          {totalPages > 1 && (
            <div className="mt-14 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label={t('prev')}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-500/30 text-purple-200 transition hover:border-purple-400 hover:text-white disabled:opacity-30 disabled:hover:border-purple-500/30 disabled:hover:text-purple-200"
              >
                {locale === 'ar' ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setPage(num)}
                  aria-current={page === num ? 'page' : undefined}
                  className={`flex h-9 w-9 items-center justify-center rounded-full font-mono text-sm transition ${
                    page === num
                      ? 'bg-purple-600 text-white'
                      : 'text-purple-200/60 hover:text-white'
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label={t('next')}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-500/30 text-purple-200 transition hover:border-purple-400 hover:text-white disabled:opacity-30 disabled:hover:border-purple-500/30 disabled:hover:text-purple-200"
              >
                {locale === 'ar' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}