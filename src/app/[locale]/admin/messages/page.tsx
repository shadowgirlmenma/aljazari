'use client';

import { AnimatePresence, motion } from 'motion/react';
import { admin } from '@/lib/api';
import { useAdminResource } from '@/hooks/useAdminResource';
import StatusFilter from '@/components/admin/StatusFilter';
import DataRow from '@/components/admin/DataRow';
import DetailField from '@/components/admin/DetailField';

export default function MessagesPage() {
  const { items, loading, filter, setFilter, updatingId, changeStatus } = useAdminResource(
    admin.contactMessages,
    (id, status) => admin.updateStatus('contact-messages', id, status),
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10 lg:py-12">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-semibold text-white">رسائل التواصل</h1>
        <p className="mt-1 text-sm text-purple-300/60">كل الرسائل المرسلة من صفحة تواصل معنا</p>
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
            {items.map((m, i) => (
              <DataRow
                key={m.id} index={i} title={m.full_name} subtitle={m.subject}
                date={m.created_at} status={m.status} updating={updatingId === m.id}
                onStatusChange={(s) => changeStatus(m.id, s)}
              >
                <DetailField label="البريد" value={m.email} href={`mailto:${m.email}`} dir="ltr" />
                <DetailField label="الهاتف" value={m.phone} href={m.phone ? `tel:${m.phone}` : undefined} dir="ltr" />
                <div className="sm:col-span-2">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-purple-400/50">الرسالة</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-purple-100">{m.message}</p>
                </div>
              </DataRow>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}