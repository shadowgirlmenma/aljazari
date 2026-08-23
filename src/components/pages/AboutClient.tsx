'use client';
import { motion } from 'motion/react';
import { Link } from '@/i18n/navigation';
import { MapPin, Phone, Mail, Youtube } from 'lucide-react';
import ScrollReveal from '@/components/reactbits/ScrollReveal';
import StarBorder from '@/components/reactbits/StarBorder';
import DotGridBackdrop from '@/components/reactbits/DotGridBackdrop';
import StrokeText from '@/components/reactbits/StrokeText';
import AboutSymbolExplainer from '@/components/pages/AboutSymbolExplainer';

const YOUTUBE_ID = 'AugXB9-TajA';

export default function AboutClient({
  title,
  storyTitle, storyBody1, storyBody2,
  videoTitle, videoWatch,
  symbolTitle, symbolSubtitle,
  symbolArabicTitle, symbolArabicDesc,
  symbolEnglishTitle, symbolEnglishDesc,
  symbolRobotTitle, symbolRobotDesc,
  foundersTitle, foundersBody1, foundersBody2, foundersBody3,
  signature, signature2,
  contactTitle, contactAddress, contactPhone, contactEmail,
  jobsTitle, jobsBody, jobsCta,
}: {
  title: string; subtitle: string;
  storyTitle: string; storyBody1: string; storyBody2: string;
  videoTitle: string; videoWatch: string;
  symbolTitle: string; symbolSubtitle: string;
  symbolArabicTitle: string; symbolArabicDesc: string;
  symbolEnglishTitle: string; symbolEnglishDesc: string;
  symbolRobotTitle: string; symbolRobotDesc: string;
  foundersTitle: string; foundersBody1: string;
  foundersBody2: string; foundersBody3: string;
  signature: string; signature2: string;
  contactTitle: string; contactAddress: string;
  contactPhone: string; contactEmail: string;
  jobsTitle: string; jobsBody: string; jobsCta: string;
}) {
  return (
    <>
   {/* ── البانر بفيديو الجزري — فيديو بدون صوت، مضغوط، بنفس أسلوب بانرات باقي الصفحات (فل سكرين) ── */}
      <div className="relative w-full overflow-hidden bg-[#120621]" style={{ height: '100svh' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/about-banner-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/about-banner.mp4" type="video/mp4" />
        </video>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(18,6,33,0.3) 0%, rgba(18,6,33,0.55) 55%, rgba(10,4,20,0.95) 100%)',
          }}
        />
        <div className="relative flex h-full w-full flex-col justify-end px-6 pb-16 pt-20 sm:px-10 lg:px-16">
          {/* h1 حقيقي حتى يفهم كوكل ان هذي صفحة "من نحن" — كان النص يترندر SVG بس بدون وسم عنونة */}
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ width: 'fit-content' }}>
            <StrokeText
              text={title}
              strokeColor="#a78bfa"
              fillColor="#ffffff"
              strokeWidth={1.6}
              drawDuration={1.6}
              fillDelay={0.15}
              stagger={0.045}
              trigger="mount"
              fillMode="wipe"
              fontSize={52}
              fontWeight={700}
              className="max-w-2xl"
            />
          </motion.h1>
        </div>
      </div>

      {/* ── قصتنا (مدمجة مع "لماذا اسمنا الجزري") — نص فقط بدون شعار أو صورة حسب طلب المراجعة،
           بعرض الشاشة كامل بخلفية الموقع نفسها وإضاءة متوهجة على الحواف. ── */}
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <div className="strip-glow section-dark relative overflow-hidden">
          <DotGridBackdrop />
          <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center sm:px-10 lg:px-16">
            <div className="mx-auto" style={{ width: 'fit-content' }}>
              <StrokeText
                text={storyTitle}
                strokeColor="#a78bfa"
                fillColor="#ffffff"
                strokeWidth={1.4}
                drawDuration={1.4}
                fillDelay={0.15}
                stagger={0.04}
                trigger="scroll"
                fillMode="wipe"
                fontSize={34}
                fontWeight={700}
              />
            </div>
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
        </div>
      </div>

      {/* ── رمز الجزري — شرح متحرك لكل جزء من الشعار، بخلفية الموقع نفسها ── */}
      <div className="relative overflow-hidden">
        <DotGridBackdrop />
        <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 text-center sm:px-8 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-center">
            <div style={{ width: 'fit-content' }}>
              <StrokeText
                text={symbolTitle}
                strokeColor="#a78bfa"
                fillColor="#ffffff"
                strokeWidth={1.4}
                drawDuration={1.4}
                fillDelay={0.15}
                stagger={0.04}
                trigger="scroll"
                fillMode="wipe"
                fontSize={34}
                fontWeight={700}
              />
            </div>
          </motion.div>
          <p className="mt-3 text-purple-200/70">{symbolSubtitle}</p>

          <div className="mt-14">
            <AboutSymbolExplainer
              steps={{
                arabicLetter: { title: symbolArabicTitle, desc: symbolArabicDesc },
                englishLetter: { title: symbolEnglishTitle, desc: symbolEnglishDesc },
                robotShape: { title: symbolRobotTitle, desc: symbolRobotDesc },
              }}
            />
          </div>
        </div>
      </div>

      {/* ── فيديو يوتيوب يشرح قصة الجزري ── */}
      <div className="section-dark relative overflow-hidden">
        <DotGridBackdrop />
        <div className="relative z-10 mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-center">
            <div style={{ width: 'fit-content' }}>
              <StrokeText
                text={videoTitle}
                strokeColor="#a78bfa"
                fillColor="#ffffff"
                strokeWidth={1.4}
                drawDuration={1.4}
                fillDelay={0.15}
                stagger={0.04}
                trigger="scroll"
                fillMode="wipe"
                fontSize={34}
                fontWeight={700}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="glass-card strip-glow mt-10 overflow-hidden rounded-2xl"
          >
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}`}
                title={videoTitle}
                className="h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </motion.div>

          <a
            href={`https://youtu.be/${YOUTUBE_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-pill mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm text-white/85 transition hover:text-white"
          >
            <Youtube size={16} className="text-purple-300" />
            {videoWatch}
          </a>
        </div>
      </div>

      {/* ── رسالة المؤسسين — نص فقط، بدون فيديو/شعار الجزري ولا الروبوت الصغير حسب طلب المراجعة. ── */}
      <div className="section-dark relative overflow-hidden">
        <DotGridBackdrop />
        <div className="relative z-10 mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mx-auto" style={{ width: 'fit-content' }}>
              <StrokeText
                text={foundersTitle}
                strokeColor="#a78bfa"
                fillColor="#ffffff"
                strokeWidth={1.4}
                drawDuration={1.4}
                fillDelay={0.15}
                stagger={0.04}
                trigger="scroll"
                fillMode="wipe"
                fontSize={34}
                fontWeight={700}
              />
            </div>
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
          </motion.div>
        </div>
      </div>

       {/* ── تواصل + وظائف ── */}
      <div className="relative overflow-hidden bg-[#0a0414]">
        <DotGridBackdrop />
        <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2">

            {/* تواصل */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div style={{ width: 'fit-content' }}>
                <StrokeText
                  text={contactTitle}
                  strokeColor="#a78bfa"
                  fillColor="#ffffff"
                  strokeWidth={1.3}
                  drawDuration={1.3}
                  fillDelay={0.15}
                  stagger={0.04}
                  trigger="scroll"
                  fillMode="wipe"
                  fontSize={30}
                  fontWeight={700}
                />
              </div>

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
              className="flex flex-col justify-center rounded-2xl border border-purple-500/20 bg-purple-900/10 p-10 backdrop-blur-md"
            >
              <div style={{ width: 'fit-content' }}>
                <StrokeText
                  text={jobsTitle}
                  strokeColor="#a78bfa"
                  fillColor="#ffffff"
                  strokeWidth={1.3}
                  drawDuration={1.3}
                  fillDelay={0.15}
                  stagger={0.04}
                  trigger="scroll"
                  fillMode="wipe"
                  fontSize={30}
                  fontWeight={700}
                />
              </div>

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