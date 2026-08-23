'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import DotGridBackdrop from '@/components/reactbits/DotGridBackdrop';
import type { Locale } from '@/lib/types';

export default function LocationSection({
  locale,
  contact,
}: {
  locale: Locale;
  contact: { address: { ar: string; en: string }; phone?: string; email?: string };
}) {
  const t = useTranslations('home');
  const mapsUrl =
    'https://www.google.com/maps?q=Aljazari+Robotics+%D8%B4%D8%B1%D9%83%D8%A9+%D8%A7%D9%84%D8%AC%D8%B2%D8%B1%D9%8A+%D9%84%D9%84%D8%B1%D9%88%D8%A8%D9%88%D8%AA%D8%A7%D8%AA%D8%8C+Rubaie+St,+Baghdad,+Baghdad+Governorate+Ziyouna,+Baghdad,+10091&ftid=0x155783b189945bcd:0xbfe977aae700955d';
  const mapsEmbedUrl =
    'https://www.google.com/maps?q=Aljazari+Robotics,+Rubaie+St,+Ziyouna,+Baghdad,+Iraq&output=embed';

  return (
    <section className="section-dark relative overflow-hidden text-white">
      <DotGridBackdrop />
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-2xl font-semibold sm:text-3xl">{t('visit.title')}</h2>
            <p className="mt-3 leading-relaxed text-white/65">{t('visit.subtitle')}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/25 px-7 py-3 text-sm transition hover:border-purple-400 hover:text-purple-300"
              >
                {t('visit.directions')} ↗
              </a>
            </div>
            <p className="mt-8 text-sm text-white/50">
              {contact.address[locale]}
              {contact.phone && (
                <> · <a href={`tel:${contact.phone}`} dir="ltr" className="hover:text-white">{contact.phone}</a></>
              )}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            className="overflow-hidden rounded-2xl ring-1 ring-white/10"
          >
            <iframe
              title="موقع الجزري على الخريطة"
              src={mapsEmbedUrl}
              className="h-72 w-full grayscale lg:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
