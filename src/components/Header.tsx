'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import BrandLockup from '@/components/BrandLockup';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/components/ThemeProvider';

const NAV = [
  { href: '/robots',          key: 'robots' },
  { href: '/robot-solutions', key: 'robotSolutions' },
  { href: '/ai-solutions',    key: 'aiSolutions' },
  { href: '/training',        key: 'training' },
  { href: '/news',            key: 'news' },
  { href: '/about',           key: 'about' },
] as const;

export default function Header() {
  const t  = useTranslations('nav');
  const tc = useTranslations('cta');
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';
  /* ملاحظة المراجعة (10/09/2026): «the titles ribbon needs a background in order to keep it
     visible even when we scroll down» — الهيدر هسة ثابت دايماً (ما يختفي بالسكرول).
     ملاحظة مراجعة 27/09/2026 (جولة خامسة): قبل هذي الجولة كان الهيدر شفاف
     بالكامل بأعلى الصفحة (قبل السكرول) ويعتمد بالكامل على لون خلفية القسم
     الي وراه — هذا صحيح لصفحات فيها بانر صورة/فيديو غامق دايماً (الرئيسية،
     Our Robots، حلول الروبوتات...)، بس غلط لصفحات هيرو بسيط بلون الثيم
     العادي (تواصل معنا، الشروط، تسجيل الدخول) اللي تصير فاتحة بالوضع
     الفاتح — نص الهيدر الفاتح الثابت يختفي فوقها. الحل: خلفية الهيدر هسة
     تينت غامق ثابت (خفيف بأعلى الصفحة، أقوى بعد السكرول) بكل الحالات — يعطي
     تباين مضمون للنص بكل صفحة ووضع، وبنفس الوقت يحقق طلب المستخدمة "الهيدر
     يضل نفس اللون البنفسجي الغامق دايماً" بالضبط. */
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* هيدر ثابت (fixed) فوق محتوى الصفحة — دايماً ظاهر، بتينت بنفسجي غامق دايماً
          (أخف بأعلى الصفحة، أقوى بعد السكرول) حتى يبقى النص واضح بكل الحالات.
          ملاحظة مراجعة 27/09/2026 (جولة خامسة): لقينا سبب حقيقي وراء مشكلة
          "نص الهيدر غير واضح بالوضع الفاتح" اللي أبلغت عنها المستخدمة: صنف
          .brand-chrome (جولة رابعة) كان يحاول يعيد تثبيت متغيرات --rt-white/
          purple-xxx على مستوى الهيدر نفسه، بس اكتشفنا (بفحص القيم الفعلية
          بالمتصفح) إن Tailwind يحسب --color-white/--color-purple-xxx مرّة
          وحدة بمستوى الصفحة كلها (:root) ويورّثها كقيمة جاهزة — إعادة تعريف
          --rt-* بمستوى أعمق (الهيدر) ما يوصل للكلاسات الجاهزة متل text-white
          أو text-purple-200/70 إطلاقاً، فيضل النص يتبع الوضع العادي (غامق
          بالوضع الفاتح) فوق خلفية الهيدر الغامقة الثابتة = تباين ضعيف/غير
          مقروء. الحل الصحيح هسة: كل نصوص/حدود الهيدر تستخدم قيم HEX ثابتة
          (Tailwind arbitrary value) بدل الأصناف المتبدلة مع الثيم — تتجاوز
          هذا التعقيد بالكامل وتضمن نص فاتح واضح بكل الأوضاع دايماً، بنفس
          النمط المستخدم أصلاً ببانرات الهيرو فوق الصور. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-[#ffffff]/10 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--bg-chrome-header)]/85 shadow-[0_8px_30px_rgba(9,3,20,0.45)]'
            : 'bg-[var(--bg-chrome-header)]/55'
        }`}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 py-4 sm:gap-0 sm:px-8 lg:px-10">

          <Link href="/" className="flex shrink-0 items-center gap-2.5 text-[#ffffff]">
            <BrandLockup locale={locale as 'ar' | 'en'} size="header" />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm transition-colors ${
                    active
                      ? 'text-[#ffffff] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-purple-400'
                      : 'text-[#e9d5ff]/70 hover:text-[#ffffff]'
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            {/* ملاحظة مراجعة 27/09/2026 (جولة رابعة): مسافة إضافية (ms-1 لليمين
                بالعربي، تلقائياً الاتجاه الصح بالإنكليزي) حول زر الدارك/لايت
                مود حتى ينفصل بصرياً عن آخر رابط بقائمة التنقل — كان ملتصق
                ومزدحم حسب ملاحظة المستخدمة.
                إصلاح 30/09/2026: shrink-0 على كل الأزرار الثابتة الحجم
                (ثيم/قائمة) حتى ما ينعصر شكلها لما تضيق الشاشة — بدل هيك
                نخلي اللي يتقلّص هو نص زر اللغة (padding/font أصغر بالموبايل)
                والشعار (BrandLockup)، مو الأزرار الدائرية. */}
            <ThemeToggle className="ms-1 shrink-0" />

            <LocaleSwitcher className="shrink-0 rounded-full border border-[#ffffff]/15 bg-[#ffffff]/5 px-2.5 py-1 text-xs text-[#e9d5ff] backdrop-blur-xl transition hover:border-[#d8b4fe] hover:text-[#ffffff] sm:px-3 sm:py-1.5 sm:text-sm" />

            <Link
              href="/contact"
              className="hidden shrink-0 rounded-full bg-purple-600 px-5 py-2 text-sm font-medium text-[#ffffff] transition hover:bg-purple-500 sm:inline-flex"
            >
              {tc('bookRobot')}
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="فتح القائمة"
              className="flex h-8 w-8 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full border border-[#ffffff]/15 bg-[#ffffff]/5 text-[#e9d5ff] backdrop-blur-xl transition hover:border-[#d8b4fe] hover:text-[#ffffff] sm:h-9 sm:w-9 lg:hidden"
            >
              <span className="h-px w-4 bg-current" />
              <span className="h-px w-4 bg-current" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className={`fixed inset-y-0 end-0 z-[70] flex w-[85%] max-w-sm flex-col overflow-hidden border-s shadow-2xl backdrop-blur-2xl lg:hidden ${
                isLight
                  ? 'border-[#4c1d80]/15 bg-[var(--bg-page)]'
                  : 'border-[#ffffff]/15 bg-[var(--bg-chrome-header)]/70'
              }`}
            >
              {/* ملاحظة مراجعة 27/09/2026 (تتمة 5): طلبت المستخدمة إن هذي القائمة
                  تحديداً (قائمة الموبايل الجانبية) تتبع الوضع الفاتح فعلياً —
                  خلفية بيضاء (`--bg-page`) وكتابة بنفسجي غامق جداً (`#1a0b33`،
                  نفس قيمة `--rt-white` بالوضع الفاتح)، عكس قرار الجولة الخامسة
                  اللي ثبّت الهيدر (الشريط العلوي وهذي القائمة) غامق دايماً بكل
                  الأوضاع. الشريط العلوي (`<header>` فوق) ما تغيّر — التعديل
                  محصور بهذي القائمة المنزلقة بس، بالضبط متل ما طلبت. */}
              <div className={`relative z-10 flex items-center justify-between border-b px-6 py-5 ${isLight ? 'border-[#4c1d80]/10' : 'border-[#ffffff]/10'}`}>
                <div className={isLight ? 'text-[#1a0b33]' : 'text-[#ffffff]'}>
                  <BrandLockup locale={locale as 'ar' | 'en'} size="header" />
                </div>
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="إغلاق"
                    className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
                      isLight
                        ? 'border-[#4c1d80]/15 bg-[#4c1d80]/5 text-[#4c1d80] hover:border-[#7c47e0] hover:text-[#1a0b33]'
                        : 'border-[#ffffff]/15 bg-[#ffffff]/5 text-[#e9d5ff] hover:border-[#d8b4fe] hover:text-[#ffffff]'
                    }`}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <nav className="relative z-10 flex-1 overflow-y-auto px-6 py-8">
                <ul className="space-y-1">
                  {NAV.map((item, i) => {
                    const active = pathname.startsWith(item.href);
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + i * 0.05, duration: 0.35 }}
                      >
                        <Link
                          href={item.href}
                          className={`block border-b py-4 text-lg transition ${
                            isLight
                              ? `border-[#4c1d80]/10 ${active ? 'font-medium text-[#1a0b33]' : 'text-[#4c1d80]/70 hover:text-[#1a0b33]'}`
                              : `border-[#ffffff]/10 ${active ? 'font-medium text-[#ffffff]' : 'text-[#e9d5ff]/70 hover:text-[#ffffff]'}`
                          }`}
                        >
                          {t(item.key)}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.35 }}
                className={`relative z-10 border-t p-6 ${isLight ? 'border-[#4c1d80]/10' : 'border-[#ffffff]/10'}`}
              >
                <Link
                  href="/contact"
                  className="block rounded-full bg-purple-600 py-3.5 text-center text-sm font-medium text-[#ffffff] transition hover:bg-purple-500"
                >
                  {tc('bookRobot')}
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}