'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Bot, GraduationCap, Users, Mail, UserCircle } from 'lucide-react';
import { toast } from 'sonner';
import { admin, type DashboardStats, ApiError } from '@/lib/api';
import { type LucideIcon } from 'lucide-react';

function StatCard({ icon: Icon, label, total, newCount, delay }: {
  icon: LucideIcon;
  label: string;
  total: number;
  newCount?: number;
  delay: number;
}) {
  return (
    <div
      style={{ animationDelay: `${delay}s` }}
      className="rounded-3xl border border-purple-500/10 bg-purple-900/10 p-5 shadow-sm backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-purple-200/80">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{total}</p>
        </div>
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/5 text-purple-300">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      {newCount !== undefined ? (
        <p className="mt-4 text-sm text-purple-300/70">
          جديد: <span className="font-semibold text-white">{newCount}</span>
        </p>
      ) : null}
    </div>
  );
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    admin.stats()
      .then(setStats)
      .catch((err) => toast.error(err instanceof ApiError ? err.message : 'تعذّر جلب الإحصائيات'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10 lg:py-12">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-semibold text-white">نظرة عامة</h1>
        <p className="mt-1 text-sm text-purple-300/60">ملخص سريع على كل نشاط الموقع</p>
      </motion.div>

      {loading ? (
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-2xl border border-purple-500/10 bg-purple-900/5"
            />
          ))}
        </div>
      ) : stats ? (
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
          <StatCard icon={MessageSquare} label="رسائل التواصل" total={stats.total_contact_messages} newCount={stats.new_contact_messages} delay={0} />
          <StatCard icon={Bot} label="طلبات الروبوتات" total={stats.total_robot_requests} newCount={stats.new_robot_requests} delay={0.05} />
          <StatCard icon={GraduationCap} label="التسجيل بالدورات" total={stats.total_enrollments} newCount={stats.new_enrollments} delay={0.1} />
          <StatCard icon={Users} label="طلبات المدرّبين" total={stats.total_trainer_applications} newCount={stats.new_trainer_applications} delay={0.15} />
          <StatCard icon={Mail} label="المشتركون بالنشرة" total={stats.total_subscribers} delay={0.2} />
          <StatCard icon={UserCircle} label="المستخدمون" total={stats.total_users} delay={0.25} />
        </div>
      ) : null}
    </div>
  );
}