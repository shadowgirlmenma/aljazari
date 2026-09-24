'use client';
import { motion } from 'motion/react';
import { User } from 'lucide-react';
import DotGridBackdrop from '@/components/reactbits/DotGridBackdrop';
import StrokeText from '@/components/reactbits/StrokeText';

/**
 * قسم "كفاءاتنا" بصفحة "من نحن" — بطاقة المدير التنفيذي، شبكة فريق العمل (5 أشخاص)،
 * فاصل، ثم قسم "سفراء الجزري" (بانتظار الصور الحقيقية لاحقاً). لا صور شخصية متوفرة
 * حالياً فاستخدمنا Placeholder دائري زجاجي بأيقونة User (lucide) بدل الصورة —
 * قابل للاستبدال لاحقاً بـ next/image بإضافة حقل photo لـ TalentPerson.
 */

export type TalentPerson = {
  name: string;
  role: string;
  desc: string;
};

function TalentCard({
  person,
  featured = false,
  index = 0,
}: {
  person: TalentPerson;
  featured?: boolean;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className={`glass-card flex h-full flex-col items-center rounded-2xl px-6 py-8 text-center transition-all duration-500 hover:-translate-y-1 ${
        featured
          ? 'border border-purple-400/30 shadow-[0_18px_60px_rgba(124,71,224,0.25)]'
          : 'hover:border-purple-300/30'
      }`}
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-full border border-purple-400/30 bg-purple-900/30 text-purple-300 ${
          featured ? 'h-24 w-24' : 'h-20 w-20'
        }`}
      >
        <User size={featured ? 40 : 32} />
      </span>
      <h3 className={`mt-5 font-semibold text-white ${featured ? 'text-xl' : 'text-lg'}`}>
        {person.name}
      </h3>
      <p className="mt-1 text-sm font-medium text-purple-300">{person.role}</p>
      <p className="mt-3 text-sm leading-relaxed text-purple-200/70">{person.desc}</p>
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
        <div className="mt-14 flex justify-center">
          <div className="w-full max-w-xs">
            <TalentCard person={ceo} featured />
          </div>
        </div>

        {/* فريق العمل */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, i) => (
            <TalentCard key={member.name} person={member} index={i} />
          ))}
        </div>

        {/* فاصل */}
        <div className="mx-auto mt-16 h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />

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
