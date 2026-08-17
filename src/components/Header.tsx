'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import LogoFull from '@/components/LogoFull';
import dynamic from 'next/dynamic';

const Lightfall = dynamic(() => import('@/components/reactbits/Lightfall'), { ssr: false });
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
  /* الهيدر يختفي (fade) وأنتِ تنزلين بالسكرول، ويرجع يظهر وأنتِ تطلعين لفوق —
     حتى ما يتراكب مع كتابة الصفحة اللي تحته وهو شفاف. */
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = () => {
      const currentY = window.scrollY;
      if (currentY <= 16) {
        setVisible(true);
      } else if (currentY > lastScrollY.current) {
        setVisible(false); // نازلة بالسكرول
      } else {
        setVisible(true); // طالعة لفوق
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* هيدر ثابت (fixed) فوق محتوى الصفحة مباشرة — بدون ما ياخذ مساحته من التخطيط،
          حتى الصور والأقسام بأول الصفحة تلتصق بحافة الصفحة تماماً والهيدر يطلع فوقها شفاف.
          يختفي بفيد وأنتِ تنزلين بالسكرول، ويرجع يظهر وأنتِ تطلعين لفوق. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-transparent bg-transparent transition-all duration-300 ${
          visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'
        }`}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">

          <Link href="/" className="flex items-center gap-2.5 text-white">
            <div className="leading-none">
              <LogoFull
                locale={locale as 'ar' | 'en'}
                className="h-6 w-auto text-white sm:h-7"
                title={locale === 'ar' ? 'الجزري' : 'Aljazari'}
              />
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.2em] text-purple-400 opacity-80">
                {locale === 'ar' ? 'حلول الروبوتات والذكاء الاصطناعي' : 'ROBOTICS & AI SOLUTIONS'}
              </span>
            </div>
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
                      ? 'text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-purple-400'
                      : 'text-purple-200/70 hover:text-white'
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <LocaleSwitcher className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-purple-200 backdrop-blur-xl transition hover:border-purple-300 hover:text-white" />

            <Link
              href="/contact"
              className="hidden rounded-full bg-purple-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-purple-500 sm:inline-flex"
            >
              {tc('bookRobot')}
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="فتح القائمة"
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 text-purple-200 backdrop-blur-xl transition hover:border-purple-300 hover:text-white lg:hidden"
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
              className="fixed inset-y-0 end-0 z-[70] flex w-[85%] max-w-sm flex-col overflow-hidden border-s border-white/15 bg-[#120621]/70 shadow-2xl backdrop-blur-2xl lg:hidden"
            >
              {/* خلفية Lightfall */}
              <div className="pointer-events-none absolute inset-0 opacity-70">
                <Lightfall
                  colors={['#bba4fc', '#7c47e0', '#4c1d80']}
                  backgroundColor="#260b42"
                  speed={0.35}
                  streakCount={2}
                  density={0.5}
                  twinkle={0.7}
                  zoom={3.2}
                  backgroundGlow={0.4}
                  opacity={0.8}
                  mouseInteraction={false}
                />
              </div>

              <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-6 py-5">
                <LogoFull locale={locale as 'ar' | 'en'} className="h-6 w-auto text-white" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="إغلاق"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-purple-200 transition hover:border-purple-300 hover:text-white"
                >
                  <X size={16} />
                </button>
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
                          className={`block border-b border-white/10 py-4 text-lg transition ${
                            active ? 'font-medium text-white' : 'text-purple-200/70 hover:text-white'
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
                className="relative z-10 border-t border-white/10 p-6"
              >
                <Link
                  href="/contact"
                  className="block rounded-full bg-purple-600 py-3.5 text-center text-sm font-medium text-white transition hover:bg-purple-500"
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