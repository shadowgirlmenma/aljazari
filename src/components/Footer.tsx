import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import Logo from '@/components/Logo';
import { COMPANY, CONTACT } from '@/data/company';
import type { Locale } from '@/lib/types';
import NewsletterForm from '@/components/NewsletterForm';
const SOCIAL = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/aljazari-iq/' },
  { label: 'Facebook',  href: 'https://www.facebook.com/aljazari.iq' },
  { label: 'Instagram', href: 'https://www.instagram.com/aljazari.iq/' },
  { label: ' X ', href: 'https://x.com/aljazari_iq' },
  { label: 'TikTok',   href: 'https://www.tiktok.com/@aljazari.iq' },
  { label: 'YouTube',  href: 'https://www.youtube.com/@aljazari_iq' },
] as const;

export default function Footer() {
  const t      = useTranslations('nav');
  const locale = useLocale() as Locale;
  const year   = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0414] text-purple-200/70">

      {/* نيوزليتر */}
      <div className="border-b border-purple-900/50">
        <Container className="py-14 text-center">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            {locale === 'ar'
              ? 'كن أول من يعرف آخر أخبار الجزري'
              : 'Be the first to get the latest news from Aljazari'}
          </h2>
          <NewsletterForm />
        </Container>
      </div>

      {/* روابط */}
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">

          {/* الشركة */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Logo className="w-10 text-purple-400" />
              <div>
                <p className="text-base font-semibold text-white">
                  {COMPANY.name[locale]}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-purple-400">
                  {locale === 'ar' ? 'للروبوتات والذكاء الاصطناعي' : 'ROBOTICS & AI SOLUTIONS'}
                </p>
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              {COMPANY.positioning[locale]}
            </p>
          </div>

          {/* روابط الشركة */}
          <div>
            <p className="mb-4 text-sm font-medium text-white">
              {locale === 'ar' ? 'الشركة' : 'Company'}
            </p>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/',               label: locale === 'ar' ? 'الرئيسية' : 'Home' },
                { href: '/robots',         label: t('robots') },
                { href: '/robot-solutions', label: t('robotSolutions') },
                { href: '/ai-solutions',   label: t('aiSolutions') },
                { href: '/training',       label: t('training') },
                { href: '/news',           label: t('news') },
                { href: '/about',          label: t('about') },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* قانوني + سوشيال */}
          <div>
            <p className="mb-4 text-sm font-medium text-white">
              {locale === 'ar' ? 'قانوني' : 'Legal'}
            </p>
            <ul className="space-y-3 text-sm">
              <li><Link href="/terms"   className="transition hover:text-white">{locale === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}</Link></li>
              <li><Link href="/privacy" className="transition hover:text-white">{locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link></li>
            </ul>

            <p className="mb-4 mt-8 text-sm font-medium text-white">
              {locale === 'ar' ? 'تابعونا' : 'Social'}
            </p>
            <ul className="space-y-3 text-sm">
              {SOCIAL.map(s => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* تواصل */}
          <div>
            <p className="mb-4 text-sm font-medium text-white">
              {locale === 'ar' ? 'تواصل معنا' : 'Contact'}
            </p>
            <ul className="space-y-3 text-sm">
              {CONTACT.email && (
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="transition hover:text-white">
                    {CONTACT.email}
                  </a>
                </li>
              )}
              {CONTACT.phone && (
                <li>
                  <a href={`tel:${CONTACT.phone}`} dir="ltr" className="transition hover:text-white">
                    {CONTACT.phone}
                  </a>
                </li>
              )}
              <li className="leading-relaxed">
                {CONTACT.address[locale]}
              </li>
            </ul>
          </div>
        </div>

        {/* حق النشر */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-purple-900/50 pt-8 sm:flex-row">
          <p className="font-mono text-xs">
            © {year} {COMPANY.name.en}. {locale === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
          </p>
          <p className="font-mono text-xs text-purple-400/60">
            Iraq's First Robotics Company
          </p>
        </div>
      </Container>
    </footer>
  );
}