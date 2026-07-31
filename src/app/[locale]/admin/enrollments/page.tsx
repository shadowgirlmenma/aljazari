'use client';

import { AnimatePresence, motion } from 'motion/react';
import { toast } from 'sonner';
import { admin, ApiError } from '@/lib/api';
import { useAdminResource } from '@/hooks/useAdminResource';
import StatusFilter from '@/components/admin/StatusFilter';
import DataRow from '@/components/admin/DataRow';
import DetailField from '@/components/admin/DetailField';

export default function EnrollmentsPage() {
  const { items, loading, filter, setFilter, updatingId, changeStatus } = useAdminResource(
    admin.enrollments,
    (id, status) => admin.updateStatus('enrollments', id, status),
  );

  const togglePayment = async (id: number, current: string) => {
    try {
      await admin.updatePayment(id, current === 'paid' ? 'awaiting' : 'paid');
      toast.success('تم تحديث حالة الدفع');
      window.location.reload();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'تعذّر التحديث');
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10 lg:py-12">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-semibold text-white">التسجيل بالدورات</h1>
        <p className="mt-1 text-sm text-purple-300/60">كل من سجّل بأي دورة تدريبية</p>
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
            {items.map((e, i) => (
              <DataRow
                key={e.id} index={i} title={`${e.course_name} — ${e.full_name}`}
                subtitle={e.delivery === 'online' ? 'أونلاين' : 'حضوري'}
                date={e.created_at} status={e.status} updating={updatingId === e.id}
                onStatusChange={(s) => changeStatus(e.id, s)}
              >
                <DetailField label="البريد" value={e.email} href={`mailto:${e.email}`} dir="ltr" />
                <DetailField label="الهاتف" value={e.phone} href={`tel:${e.phone}`} dir="ltr" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-purple-400/50">الدفع</p>
                  <button
                    type="button"
                    onClick={() => togglePayment(e.id, e.payment_status)}
                    className={`mt-1 rounded-full border px-3 py-1 text-xs transition ${
                      e.payment_status === 'paid'
                        ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-300'
                        : 'border-amber-500/30 bg-amber-500/15 text-amber-300'
                    }`}
                  >
                    {e.payment_status === 'paid' ? 'مدفوع ✓' : 'بانتظار الدفع'}
                  </button>
                </div>
              </DataRow>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}