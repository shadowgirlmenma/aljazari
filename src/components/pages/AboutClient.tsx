'use client';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Link } from '@/i18n/navigation';
import { MapPin, Phone, Mail } from 'lucide-react';
import ScrollReveal from '@/components/reactbits/ScrollReveal';
import CountUp from '@/components/reactbits/CountUp';
import StarBorder from '@/components/reactbits/StarBorder';

export default function AboutClient({
  title, subtitle,
  storyTitle, storyBody1, storyBody2,
  nameTitle, nameBody,
  foundersTitle, foundersBody1, foundersBody2, foundersBody3,
  signature, signature2,
  valuesTitle, values,
  contactTitle, contactAddress, contactPhone, contactEmail,
  jobsTitle, jobsBody, jobsCta,
}: {
  title: string; subtitle: string;
  storyTitle: string; storyBody1: string; storyBody2: string;
  nameTitle: string; nameBody: string;
  foundersTitle: string; foundersBody1: string;
  foundersBody2: string; foundersBody3: string;
  signature: string; signature2: string;
  valuesTitle: string; values: { title: string; desc: string }[];
  contactTitle: string; contactAddress: string;
  contactPhone: string; contactEmail: string;
  jobsTitle: string; jobsBody: string; jobsCta: string;
}) {
  const STATS: { to: number; suffix: string; prefix?: string; label: string }[] = [
    { to: 15, suffix: '+', label: 'موظف' },
    { to: 3,  suffix: '',  label: 'فرق أساسية' },
    { to: 20, suffix: '+', label: 'شريك عالمي' },
    { to: 5,  prefix: '$', suffix: 'm', label: 'رأس المال' },
  ];

  return (
    <>
   {/* ── البانر بصورة الجزري ── */}
      <div className="relative overflow-hidden bg-[#120621]" style={{ minHeight: '560px' }}>
        <Image
          src="/aljazari.avif"
          alt="الجزري"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(18,6,33,0.3) 0%, rgba(18,6,33,0.55) 55%, rgba(10,4,20,0.95) 100%)',
          }}
        />
        <div className="relative mx-auto flex min-h-[560px] max-w-6xl flex-col justify-center px-5 py-20 sm:px-8 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-purple-300"
          >
            Al-Jazari Robotics
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-4 max-w-2xl text-4xl font-semibold text-white sm:text-6xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            className="mt-4 max-w-xl leading-relaxed text-purple-100/85"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>

      {/* ── الأرقام ── */}
      <div className="bg-black">
        <div className="mx-auto max-w-6xl border-b border-purple-900/40 px-5 py-14 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-t border-purple-400/25 pt-5"
              >
                <p className="text-5xl font-light text-white">
                  <CountUp
                    to={stat.to}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2}
                  />
                </p>
                <p className="mt-2 text-sm text-purple-200/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── قصتنا ── */}
      <div className="bg-black">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_380px]">
            <div>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                {storyTitle}
              </h2>
              <ScrollReveal
                baseOpacity={0.06}
                baseRotation={1.5}
                blurStrength={4}
                textClassName="text-purple-200/80 text-lg leading-relaxed"
              >
                {storyBody1}
              </ScrollReveal>
              <p className="mt-6 leading-relaxed text-purple-200/70">
                {storyBody2}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-purple-400/20"
            >
              <Image
                src="/aljazariphoto.avif"
                alt="ابن الجزري"
                fill
                sizes="(max-width: 1024px) 90vw, 380px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120621] via-transparent to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-mono text-xs tracking-widest text-purple-100">
                  ISMAIL ALJAZARI
                  <br />
                  1136 – 1206
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    {/* ── أصل الاسم بخلفية فيديو ── */}
      <div className="relative overflow-hidden bg-[#0a0414]" style={{ minHeight: '480px' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none absolute inset-y-0 end-0 h-full w-auto max-w-[55%] object-contain opacity-90"
        >
          <source src="/aljazari-name-bg.mp4" type="video/mp4" />
        </video>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,4,20,0.35) 0%, rgba(10,4,20,0.55) 45%, rgba(10,4,20,0.92) 100%)',
          }}
        />

        <div className="relative mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-20 lg:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-lg text-2xl font-semibold text-white sm:text-3xl"
          >
            {nameTitle}
          </motion.h2>
          <p className="mt-6 max-w-lg leading-relaxed text-purple-100/85">
            {nameBody}
          </p>
        </div>
      </div>

      {/* ── قيمنا ── */}
      <div className="bg-[#120621]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            {valuesTitle}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-purple-500/20 bg-purple-900/10 p-8"
              >
                <div className="mb-4 h-px w-10 bg-purple-500" />
                <h3 className="font-semibold text-white">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-purple-200/65">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── رسالة المؤسسين ── */}
      <div className="bg-black">
        <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:px-10">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            {foundersTitle}
          </h2>
          <div className="mt-8 space-y-5 leading-relaxed text-purple-200/75">
            <p>{foundersBody1}</p>
            <p>{foundersBody2}</p>
            <p>{foundersBody3}</p>
            <p className="pt-2 text-purple-300">
              {signature}
              <br />
              <span className="font-medium text-white">{signature2}</span>
            </p>
          </div>
        </div>
      </div>

       {/* ── تواصل + وظائف ── */}
      <div className="bg-[#0a0414]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2">

            {/* تواصل */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-semibold text-white">
                {contactTitle}
              </h2>

              <ul className="mt-6 space-y-5 text-purple-200/75">
                <li className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-purple-500/30 bg-purple-900/30 text-purple-400">
                    <MapPin size={16} />
                  </span>
                  <span className="pt-1.5 leading-relaxed">
                    {contactAddress}
                  </span>
                </li>

                <li className="flex items-center gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-purple-500/30 bg-purple-900/30 text-purple-400">
                    <Phone size={16} />
                  </span>

                  <a
                    href={`tel:${contactPhone}`}
                    dir="ltr"
                    className="transition hover:text-white"
                  >
                    {contactPhone}
                  </a>
                </li>

                <li className="flex items-center gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-purple-500/30 bg-purple-900/30 text-purple-400">
                    <Mail size={16} />
                  </span>

                  <a
                    href={`mailto:${contactEmail}`}
                    className="transition hover:text-white"
                  >
                    {contactEmail}
                  </a>
                </li>
              </ul>

              <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-white/10">
                <iframe
                  title="موقع الجزري"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3336.7!2d44.3661!3d33.3152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDE5JzEwLjciTiA0NMKwMjEnNTguNiJF!5e0!3m2!1sar!2siq"
                  className="h-56 w-full grayscale"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            {/* وظائف */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="flex flex-col justify-center rounded-2xl border border-purple-500/20 bg-purple-900/10 p-10"
            >
              <h2 className="text-2xl font-semibold text-white">
                {jobsTitle}
              </h2>

              <p className="mt-4 leading-relaxed text-purple-200/70">
                {jobsBody}
              </p>

              <div className="mt-8">
                <StarBorder
                  as={Link}
                  href="/contact"
                  color="#a78bfa"
                  speed="6s"
                  thickness={2}
                >
                  <span className="text-sm font-medium">
                    {jobsCta}
                  </span>
                </StarBorder>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
          </>
  );
}