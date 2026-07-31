import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/types';
import { PARTNERS, CLIENTS, CONTACT } from '@/data/company';

import HeroSection      from '@/components/home/HeroSection';
import AboutSection     from '@/components/home/AboutSection';
import ServicesSection  from '@/components/home/ServicesSection';
import VisionSection    from '@/components/home/VisionSection';
import JoinSection      from '@/components/home/JoinSection';
import NumbersSection   from '@/components/home/NumbersSection';
import PartnersSection  from '@/components/home/PartnersSection';
import LocationSection  from '@/components/home/LocationSection';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <HeroSection      locale={locale as Locale} />
      <AboutSection     locale={locale as Locale} />
      <ServicesSection  locale={locale as Locale} />
      <VisionSection    locale={locale as Locale} />
      <JoinSection      locale={locale as Locale} />
      <NumbersSection   locale={locale as Locale} />
      <PartnersSection  partners={PARTNERS} clients={CLIENTS} locale={locale as Locale} />
      <LocationSection  locale={locale as Locale} contact={CONTACT} />
    </main>
  );
}