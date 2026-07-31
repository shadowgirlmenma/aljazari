'use client';

import { motion } from 'motion/react';
import ScrollReveal from '@/components/reactbits/ScrollReveal';
import TiltedCard from '@/components/reactbits/TiltedCard';
import Logo from '@/components/Logo';

type Service = { title: string; desc: string; image?: string };

/**
 * عن الجزري: النص يظهر كلمة كلمة مع السكرول (ScrollReveal بالضبط مثل الموقع الأصلي)
 * الخدمات: بطاقات TiltedCard تميل مع الماوس + تطفو بأوقات مختلفة.
 * الصور فارغة حالياً — علامة الجزري بمكانها، ومنما تنضاف الصور تنحط بـ SERVICES بالصفحة.
 */
export default function AboutServices({
  aboutEyebrow, aboutBody, aboutBody2,
  servicesEyebrow, servicesTitle, services,
}: {
  aboutEyebrow: string; aboutBody: string; aboutBody2: string;
  servicesEyebrow: string; servicesTitle: string; services: Service[];
}) {
  return (
    <section className="bg-brand-950 relative">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        {/* عن الجزري */}
        <p className="text-brand-400 border-brand-400/40 inline-block border-t pt-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          {aboutEyebrow}
        </p>
        <div className="mt-6 max-w-4xl">
          <ScrollReveal
            baseOpacity={0.08}
            baseRotation={2}
            blurStrength={6}
            textClassName="text-white text-2xl sm:text-4xl"
          >
            {aboutBody}
          </ScrollReveal>
          <p className="text-brand-200/80 mt-8 max-w-2xl text-base leading-relaxed sm:text-lg">
            {aboutBody2}
          </p>
        </div>

        {/* الخدمات */}
        <div className="mt-24">
          <p className="text-brand-400 font-mono text-[11px] tracking-[0.3em] uppercase">
            {servicesEyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{servicesTitle}</h2>

          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
              >
                {/* البطاقة تطفو ببطء، وكل وحدة بإيقاع مختلف حتى ما يكون متزامن وممل */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 5 + i * 0.7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.5,
                  }}
                >
                  <TiltedCard
                    imageSrc={service.image || ''}
                    altText={service.title}
                    containerHeight="180px"
                    containerWidth="100%"
                    imageHeight="180px"
                    imageWidth="100%"
                    rotateAmplitude={10}
                    scaleOnHover={1.08}
                    showTooltip={false}
                    placeholder={
                      <div className="from-brand-800/70 to-brand-950 ring-brand-400/25 flex h-full w-full items-center justify-center rounded-[20px] bg-gradient-to-br ring-1">
                        <Logo className="text-brand-300/50 w-16" />
                      </div>
                    }
                  />
                </motion.div>
                <h3 className="mt-5 text-lg font-semibold text-white">{service.title}</h3>
                <p className="text-brand-200/75 mt-2 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
