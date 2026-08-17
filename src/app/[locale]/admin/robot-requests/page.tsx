'use client';

import { AnimatePresence, motion } from 'motion/react';
import { admin } from '@/lib/api';
import { useAdminResource } from '@/hooks/useAdminResource';
import StatusFilter from '@/components/admin/StatusFilter';
import DataRow from '@/components/admin/DataRow';
import DetailField from '@/components/admin/DetailField';

export default function RobotRequestsPage() {
  const { items, loading, filter, setFilter, updatingId, changeStatus } = useAdminResource(
    admin.robotRequests,
    (id, status) => admin.updateStatus('robot-requests', id, status),
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10 lg:py-12">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-semibold text-white">طلبات الروبوتات</h1>
        <p className="mt-1 text-sm text-purple-300/60">طلبات الحجز والشراء من صفحات الروبوتات</p>
      </motion.div>

      <div className="mt-6"><StatusFilter value={filter} onChange={setFilter} /></div>

      <div className="mt-6 space-y-3">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
          ))
        ) : items.length === 0 ? (
          <p className="py-10 text-center text-purple-300/50">لا توجد نتائج</p>
        ) : (
          <AnimatePresence mode="popLayout">
            {items.map((r, i) => (
              <DataRow
                key={r.id} index={i} title={`${r.robot_name} — ${r.full_name}`}
                subtitle={r.request_type === 'buy' ? 'طلب شراء' : 'طلب إيجار'}
                date={r.created_at} status={r.status} updating={updatingId === r.id}
                onStatusChange={(s) => changeStatus(r.id, s)}
              >
                <DetailField label="البريد" value={r.email} href={`mailto:${r.email}`} dir="ltr" />
                <DetailField label="الهاتف" value={r.phone} href={`tel:${r.phone}`} dir="ltr" />
                <DetailField label="المؤسسة" value={r.organization} />
                {r.notes && (
                  <div className="sm:col-span-2">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-purple-400/50">ملاحظات</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-purple-100">{r.notes}</p>
                  </div>
                )}
              </DataRow>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}