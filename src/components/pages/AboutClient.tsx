'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Link } from '@/i18n/navigation';
import { MapPin, Phone, Mail, Youtube, Play, Pause } from 'lucide-react';
import ScrollReveal from '@/components/reactbits/ScrollReveal';
import StarBorder from '@/components/reactbits/StarBorder';
import DotGridBackdrop from '@/components/reactbits/DotGridBackdrop';
import StrokeText from '@/components/reactbits/StrokeText';
import AboutSymbolExplainer, { SymbolMark } from '@/components/pages/AboutSymbolExplainer';

const YOUTUBE_ID = 'AugXB9-TajA';

export default function AboutClient({
  title,
  storyTitle, storyBody1, storyBody2,
  nameTitle, nameBody,
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
  nameTitle: string; nameBody: string;
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
  /* رمز الجزري بجزئية قصتنا — يضوي حرف حرف (عربي ثم إنجليزي ثم الشكل الكامل) بشكل مستمر طول الوقت */
  const STORY_SYMBOL_STEPS: Array<'left' | 'right' | 'both'> = ['left', 'right', 'both'];
  const [storySymbolStep, setStorySymbolStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setStorySymbolStep(i => (i + 1) % STORY_SYMBOL_STEPS.length);
    }, 1800);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* زر تشغيل/إيقاف زجاجي لفيديو رسالة المؤسسين */
  const foundersVideoRef = useRef<HTMLVideoElement>(null);
  const [isFoundersVideoPlaying, setIsFoundersVideoPlaying] = useState(true);
  const toggleFoundersVideo = () => {
    const video = foundersVideoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsFoundersVideoPlaying(true);
    } else {
      video.pause();
      setIsFoundersVideoPlaying(false);
    }
  };

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
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ width: 'fit-content' }}>
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
          </motion.div>
        </div>
      </div>

      {/* ── قصتنا — شريط بعرض الشاشة كامل بخلفية الموقع نفسها وإضاءة متوهجة على الحواف. رمز الجزري
           كبير بالجهة الواسعة الفارغة (الترتيب بالـ DOM: الكتابة ثم الرمز يخليه يطلع بالجهة المقابلة
           لبداية القراءة تلقائياً حسب اتجاه اللغة، مو فوق العنوان). ── */}
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <div className="strip-glow section-dark relative overflow-hidden">
          <DotGridBackdrop />
          <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:px-10 lg:px-16">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              <div>
                <div style={{ width: 'fit-content' }}>
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

              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <SymbolMark group={STORY_SYMBOL_STEPS[storySymbolStep]} className="h-48 w-auto sm:h-64" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── لماذا اسمنا الجزري — عمودين: الكتابة ثم الصورة (الترتيب بالـ DOM يتبع اتجاه اللغة تلقائياً
           عبر dir الصفحة، فتصير الصورة يمين بالإنجليزي ويسار بالعربي بدون أي شرط JS). الصورة بدون fade،
           محاطة بإطار متوهج ينبض صعوداً ونزولاً. ── */}
      <div className="relative left-1/2 w-screen -translate-x-1/2 section-dark">
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:px-10 lg:px-16">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div style={{ width: 'fit-content' }}>
                <StrokeText
                  text={nameTitle}
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
              <p className="mt-6 leading-relaxed text-purple-100/85">
                {nameBody}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="portrait-frame-glow relative overflow-hidden rounded-3xl bg-[#120621]"
              style={{ aspectRatio: '4 / 5' }}
            >
              {/* object-cover حتى تملي الإطار كامل بدون أي فراغات سوداء، حتى لو صار قص خفيف بعرض الصورة */}
              <Image
                src="/aljazari-portrait.jpg"
                alt="الجزري"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>
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

      {/* ── رسالة المؤسسين — الفيديو مال الروبوت والجزري جنب الرسالة. ترتيب الـ DOM (الفيديو ثم الكتابة)
           يخلي الفيديو يطلع على اليسار بالإنجليزي، ويتبع نفس منطق اتجاه اللغة تلقائياً بالعربي. الفيديو
           واضح بدون قص (object-contain)، ومحاط بتلاشي (vignette) خفيف بنفس لون خلفية القسم حتى ما يبين
           فرق لون بينه وبين الخلفية. ── */}
      <div className="section-dark relative overflow-hidden">
        <DotGridBackdrop />
        <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="strip-glow relative overflow-hidden rounded-3xl bg-[#120621]"
              style={{ aspectRatio: '4 / 3' }}
            >
              <video
                ref={foundersVideoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-contain"
              >
                <source src="/aljazari-name-bg.mp4" type="video/mp4" />
              </video>
              {/* تلاشي (vignette) خفيف بنفس لون خلفية القسم حتى يندمج الفيديو مع الخلفية بدون فرق لون واضح */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 78% 78% at 50% 50%, transparent 55%, #120621 100%)',
                }}
              />
              {/* زر زجاجي لتشغيل/إيقاف الفيديو */}
              <button
                type="button"
                onClick={toggleFoundersVideo}
                aria-label={isFoundersVideoPlaying ? 'إيقاف الفيديو' : 'تشغيل الفيديو'}
                className="glass-pill absolute bottom-4 flex h-11 w-11 items-center justify-center rounded-full text-white/90 transition hover:scale-105 hover:text-white active:scale-95"
                style={{ insetInlineStart: '1rem' }}
              >
                {isFoundersVideoPlaying ? (
                  <Pause size={18} fill="currentColor" />
                ) : (
                  <Play size={18} fill="currentColor" className="ms-0.5" />
                )}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div style={{ width: 'fit-content' }}>
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