'use client';

import { AnimatePresence, motion } from 'motion/react';
import { admin } from '@/lib/api';
import { useAdminResource } from '@/hooks/useAdminResource';
import StatusFilter from '@/components/admin/StatusFilter';
import DataRow from '@/components/admin/DataRow';
import DetailField from '@/components/admin/DetailField';

export default function TrainersPage() {
  const { items, loading, filter, setFilter, updatingId, changeStatus } = useAdminResource(
    admin.trainerApplications,
    (id, status) => admin.updateStatus('trainer-applications', id, status),
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10 lg:py-12">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-semibold text-white">طلبات المدرّبين</h1>
        <p className="mt-1 text-sm text-purple-300/60">طلبات الانضمام كمدرّب</p>
      </motion.div>

      <div className="mt-6"><StatusFilter value={filter} onChange={setFilter} /></div>

      <div className="mt-6 space-y-3">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
          ))
        ) : items.length === 0 ? (
          <p className="py-10 text-center text-purple-300/50">ماكو نتائج</p>
        ) : (
          <AnimatePresence mode="popLayout">
            {items.map((t, i) => (
              <DataRow
                key={t.id} index={i} title={t.full_name} subtitle={t.specialty}
                date={t.created_at} status={t.status} updating={updatingId === t.id}
                onStatusChange={(s) => changeStatus(t.id, s)}
              >
                <DetailField label="البريد" value={t.email} href={`mailto:${t.email}`} dir="ltr" />
                <DetailField label="الهاتف" value={t.phone} href={`tel:${t.phone}`} dir="ltr" />
                <div className="sm:col-span-2">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-purple-400/50">الخبرة</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-purple-100">{t.experience}</p>
                </div>
              </DataRow>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}