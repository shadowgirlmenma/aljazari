'use client';

import { motion } from 'motion/react';
import {
  Building2,
  TrendingUp, Brain, DollarSign, UserCheck,
  Eye, PenTool, Cpu, CheckCircle2, Rocket, RefreshCw,
  Briefcase, HeartPulse, Landmark, ShoppingCart, Truck, Factory,
  Zap, GraduationCap,
  type LucideIcon,
} from 'lucide-react';
import AiSolutionsBannerBackground from '@/components/pages/AiSolutionsBannerBackground';
import DotGridBackdrop from '@/components/reactbits/DotGridBackdrop';
import CustomAiProduct, { type CustomAiProductData } from '@/components/pages/CustomAiProduct';

const BENEFIT_ICONS: Record<string, LucideIcon> = {
  efficiency: TrendingUp,
  decisions: Brain,
  cost: DollarSign,
  personalization: UserCheck,
};

const PROCESS_ICONS: Record<string, LucideIcon> = {
  vision: Eye,
  design: PenTool,
  build: Cpu,
  test: CheckCircle2,
  deploy: Rocket,
  upgrade: RefreshCw,
};

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  enterprises: Briefcase,
  healthcare: HeartPulse,
  finance: Landmark,
  ecommerce: ShoppingCart,
  logistics: Truck,
  realEstate: Building2,
  manufacturing: Factory,
  energy: Zap,
  education: GraduationCap,
};

function handleSpotlight(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

type NamedItem = { key: string; title: string; desc: string };
type LabeledItem = { key: string; label: string };

export default function AiSolutionsClient({
  title, solutionsHeading, solutions,
  interfaceHeading, interfaceBenefits,
  customerHeading, process,
  industriesHeading, industries,
  customProduct,
}: {
  title: string;
  solutionsHeading: string;
  solutions: NamedItem[];
  interfaceHeading: string;
  interfaceBenefits: LabeledItem[];
  customerHeading: string;
  process: LabeledItem[];
  industriesHeading: string;
  industries: NamedItem[];
  customProduct: CustomAiProductData;
}) {
  return (
    <>
      {/* ── البانر: خيوط WebThreads بنفسجية متوهجة كخلفية، بحجم الشاشة كاملة متل باقي الصفحات ── */}
      <div className="relative w-full overflow-hidden bg-[var(--bg-page)]" style={{ height: '100svh' }}>
        <AiSolutionsBannerBackground />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(18,6,33,0.25) 0%, rgba(18,6,33,0.55) 65%, rgba(10,4,20,0.9) 100%)',
          }}
        />
        {/* ملاحظة مراجعة 26/09/2026 (جولة ثانية): نص ثابت فوق تعتيم داكن ثابت. */}
        <div className="relative z-10 flex h-full flex-col items-center justify-end px-5 pb-24 text-center sm:pb-28">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-3xl font-semibold text-[#ffffff] sm:text-5xl"
          >
            {title}
          </motion.h1>
        </div>
      </div>

      {/* ── حلولنا — أربع بطاقات نصية فقط (منتج مخصص / أنظمة مؤسسية / وكلاء ذكاء اصطناعي / استشارات).
            ملاحظة المراجعة 10/09/2026: «Remove the witches for each four kind of service» —
            حذفنا الأيقونة العائمة ومربع الأيقونة من كل بطاقة، وبقت البطاقة عنوان + وصف بتصميم زجاجي. ── */}
      <div className="section-dark seam-glow relative overflow-hidden">
        <DotGridBackdrop />
        <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-3xl font-semibold text-white sm:text-4xl"
          >
            {solutionsHeading}
          </motion.h2>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {solutions.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass-card relative overflow-hidden rounded-2xl p-8"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-300/70 to-transparent"
                />
                <h3 className="relative z-10 text-xl font-medium text-white">{item.title}</h3>
                <p className="relative z-10 mt-3 leading-relaxed text-purple-200/75">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── تطوير منتجات ذكاء اصطناعي مخصّصة — نسخة حيّة من تصميم الدكتور (الكرة + المراحل الخمس) ── */}
      <div className="section-darker seam-glow relative overflow-hidden">
        <DotGridBackdrop opacity={0.35} />
        <div className="relative z-10 px-5 py-20 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
          >
            <CustomAiProduct data={customProduct} />
          </motion.div>
        </div>
      </div>

      {/* ── واجهة ذكاء اصطناعي واحدة — بنفس خلفية باقي أقسام الصفحة، بدون صورة أو خلفية مختلفة (طلب المراجعة) ── */}
      <div className="section-dark seam-glow relative overflow-hidden">
        <DotGridBackdrop />
        <div className="relative z-10 mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold leading-relaxed text-white sm:text-4xl"
          >
            {interfaceHeading}
          </motion.h2>

          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {interfaceBenefits.map((item, i) => {
              const Icon = BENEFIT_ICONS[item.key] ?? TrendingUp;
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col items-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-purple-400/30 bg-purple-900/30">
                    <Icon size={26} className="text-purple-300" />
                  </div>
                  <span className="mt-4 text-sm font-medium leading-snug text-purple-100 sm:text-base">
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── خدمة العملاء بوكلاء الذكاء الاصطناعي — عنوان + خطوات العمل الست ── */}
      <div className="section-dark seam-glow relative overflow-hidden">
        <DotGridBackdrop />
        <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-2xl font-semibold text-white sm:text-4xl"
          >
            {customerHeading}
          </motion.h2>

          <div className="mt-14 grid gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {process.map((step, i) => {
              const Icon = PROCESS_ICONS[step.key] ?? Eye;
              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.06 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-purple-400/30 bg-purple-900/30">
                    <Icon size={24} className="text-purple-300" />
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 font-mono text-[11px] font-semibold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <span className="mt-4 text-sm font-medium leading-snug text-purple-100">
                    {step.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── القطاعات التي نخدمها ── */}
      <div className="section-darker seam-glow relative overflow-hidden">
        <DotGridBackdrop />
        <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-3xl font-semibold text-white sm:text-4xl"
          >
            {industriesHeading}
          </motion.h2>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((item, i) => {
              const Icon = INDUSTRY_ICONS[item.key] ?? Briefcase;
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: (i % 3) * 0.08 }}
                  onMouseMove={handleSpotlight}
                  style={{ '--mx': '50%', '--my': '50%' } as React.CSSProperties}
                  className="group glass-card relative flex flex-col rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-300/50 hover:shadow-[0_18px_50px_rgba(124,71,224,0.35)]"
                >
                  {/* بقعة ضوء تتبع الماوس */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(280px circle at var(--mx) var(--my), rgba(167,139,250,0.25), transparent 70%)',
                    }}
                  />

                  {/* رقم القطاع كبير شفاف بالزاوية */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute end-5 top-3 font-mono text-6xl font-bold text-white/[0.05] transition-colors group-hover:text-purple-300/15"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative z-10">
                    {/* أيقونة كبيرة بحلقة متوهجة تدور عند المرور */}
                    <span className="relative flex h-16 w-16 items-center justify-center">
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-2xl border border-dashed border-purple-300/40 transition-transform duration-700 group-hover:rotate-90"
                      />
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-300/30 bg-gradient-to-br from-purple-500/40 to-purple-900/50 shadow-[0_0_24px_rgba(124,71,224,0.4)] transition-transform duration-300 group-hover:scale-110">
                        <Icon size={24} className="text-purple-100" />
                      </span>
                    </span>

                    <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-purple-200/75">{item.desc}</p>
                  </div>

                  {/* خط سفلي يتمدد عند المرور */}
                  <span
                    aria-hidden
                    className="absolute inset-x-7 bottom-0 h-0.5 origin-center scale-x-0 rounded-full bg-gradient-to-r from-transparent via-purple-300 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
