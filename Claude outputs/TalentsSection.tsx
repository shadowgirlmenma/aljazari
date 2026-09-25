'use client';
import { motion } from 'motion/react';
import {
  Crown, Cpu, Brain, Wrench, ClipboardList, Handshake, Sparkles,
  type LucideIcon,
} from 'lucide-react';
import DotGridBackdrop from '@/components/reactbits/DotGridBackdrop';
import StrokeText from '@/components/reactbits/StrokeText';

/**
 * قسم "كفاءاتنا" بصفحة "من نحن" — بطاقة المدير التنفيذي المميزة، شبكة فريق العمل
 * التفاعلية، فاصل، ثم قسم "سفراء الجزري" (بانتظار الصور لاحقاً).
 *
 * ملاحظة المراجعة 25/09/2026: «سوي ظهور our talents بشكل احلى اكثر حسب ذوق
 * الموقع، وتفاعلي اكثر بدون مكان للصورة لانه اصلا ما راح نحط صور» — أزلنا نهائياً
 * أي عنصر دائري "فاضي" يوحي إنه مكان صورة (كان أيقونة User بدائرة)، وبدّلناه بشارة
 * أيقونة زخرفية مربّعة الزوايا تعبّر عن طبيعة الدور (لا تشبه إطار صورة شخصية إطلاقاً)،
 * وأضفنا تفاعل بقعة ضوء تتبع الماوس + ميل خفيف + توهج عند المرور، بنفس أسلوب
 * بطاقات "القطاعات التي نخدمها" بصفحة حلول الذكاء الاصطناعي حتى يكون التصميم
 * متجانس مع باقي الموقع.
 */

export type TalentPerson = {
  name: string;
  role: string;
  desc: string;
};

const MEMBER_ICONS: LucideIcon[] = [Cpu, Brain, Wrench, ClipboardList, Handshake];

function handleSpotlight(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

function MemberCard({ person, index }: { person: TalentPerson; index: number }) {
  const Icon = MEMBER_ICONS[index % MEMBER_ICONS.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -6 }}
      onMouseMove={handleSpotlight}
      style={{ '--mx': '50%', '--my': '50%' } as React.CSSProperties}
      className="group glass-card relative flex h-full flex-col overflow-hidden rounded-3xl p-7 text-start transition-all duration-300 hover:border-purple-300/50 hover:shadow-[0_18px_50px_rgba(124,71,224,0.35)]"
    >
      {/* بقعة ضوء تتبع الماوس */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(280px circle at var(--mx) var(--my), rgba(167,139,250,0.22), transparent 70%)',
        }}
      />

      {/* رقم زخرفي شفاف بالزاوية */}
      <span
        aria-hidden
        className="pointer-events-none absolute end-5 top-3 font-mono text-6xl font-bold text-white/[0.05] transition-colors group-hover:text-purple-300/15"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative z-10">
        <span className="relative flex h-14 w-14 items-center justify-center">
          <span
            aria-hidden
            className="absolute inset-0 rounded-2xl border border-dashed border-purple-300/40 transition-transform duration-700 group-hover:rotate-90"
          />
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-300/30 bg-gradient-to-br from-purple-500/40 to-purple-900/50 shadow-[0_0_20px_rgba(124,71,224,0.4)] transition-transform duration-300 group-hover:scale-110">
            <Icon size={20} className="text-purple-100" />
          </span>
        </span>

        <h3 className="mt-5 text-lg font-semibold text-white">{person.name}</h3>
        <span className="glass-pill mt-2 inline-flex w-fit px-3 py-1 text-xs font-medium text-purple-200">
          {person.role}
        </span>
        <p className="mt-3 text-sm leading-relaxed text-purple-200/70">{person.desc}</p>
      </div>

      {/* خط سفلي يتمدد عند المرور */}
      <span
        aria-hidden
        className="absolute inset-x-7 bottom-0 h-0.5 origin-center scale-x-0 rounded-full bg-gradient-to-r from-transparent via-purple-300 to-transparent transition-transform duration-500 group-hover:scale-x-100"
      />
    </motion.div>
  );
}

function CeoCard({ person }: { person: TalentPerson }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      onMouseMove={handleSpotlight}
      style={{ '--mx': '50%', '--my': '50%' } as React.CSSProperties}
      className="group relative mx-auto flex w-full max-w-3xl flex-col items-center gap-5 overflow-hidden rounded-3xl border border-purple-300/30 bg-gradient-to-br from-[#1a0b33] via-[#170a2c] to-[#0f0521] px-8 py-10 text-center shadow-[0_18px_60px_rgba(124,71,224,0.3)] transition-all duration-300 hover:border-purple-300/60 sm:flex-row sm:text-start"
    >
      {/* توهّج خلفي */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-16 start-1/3 h-64 w-64 rounded-full bg-purple-600/25 blur-[100px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(360px circle at var(--mx) var(--my), rgba(167,139,250,0.18), transparent 70%)',
        }}
      />

      <span className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center">
        <span
          aria-hidden
          className="absolute inset-0 rounded-2xl border border-dashed border-purple-300/50 transition-transform duration-700 group-hover:rotate-90"
        />
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-300/40 bg-gradient-to-br from-purple-400/50 to-purple-900/60 shadow-[0_0_30px_rgba(124,71,224,0.55)]">
          <Crown size={28} className="text-purple-100" />
        </span>
      </span>

      <div className="relative z-10">
        <h3 className="text-2xl font-semibold text-white">{person.name}</h3>
        <span className="glass-pill mt-2 inline-flex w-fit px-3.5 py-1.5 text-sm font-medium text-purple-200">
          {person.role}
        </span>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-purple-200/75 sm:mx-0">
          {person.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function TalentsSection({
  title,
  subtitle,
  ceo,
  members,
  ambassadorsTitle,
  ambassadorsCount,
  ambassadorsDesc,
  ambassadorsComingSoon,
}: {
  title: string;
  subtitle: string;
  ceo: TalentPerson;
  members: TalentPerson[];
  ambassadorsTitle: string;
  ambassadorsCount: string;
  ambassadorsDesc: string;
  ambassadorsComingSoon: string;
}) {
  return (
    <div className="section-dark relative overflow-hidden">
      <DotGridBackdrop />
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 text-center sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div style={{ width: 'fit-content' }}>
            <StrokeText
              text={title}
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
        <p className="mt-3 text-purple-200/70">{subtitle}</p>

        {/* المدير التنفيذي */}
        <div className="mt-14">
          <CeoCard person={ceo} />
        </div>

        {/* فريق العمل */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, i) => (
            <MemberCard key={member.name} person={member} index={i} />
          ))}
        </div>

        {/* فاصل زخرفي */}
        <div className="mx-auto mt-16 flex max-w-2xl items-center gap-4">
          <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-400/40" />
          <Sparkles size={16} className="shrink-0 text-purple-300/70" />
          <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-400/40" />
        </div>

        {/* سفراء الجزري */}
        <div className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div style={{ width: 'fit-content' }}>
              <StrokeText
                text={ambassadorsTitle}
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
          </motion.div>
          <p className="mt-3 font-medium text-purple-300">{ambassadorsCount}</p>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-purple-200/70">
            {ambassadorsDesc}
          </p>
          <div className="glass-pill mx-auto mt-8 inline-flex w-fit items-center gap-2 px-5 py-2.5 text-sm text-white/70">
            {ambassadorsComingSoon}
          </div>
        </div>
      </div>
    </div>
  );
}
