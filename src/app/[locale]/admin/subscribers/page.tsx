'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { admin, ApiError, type NewsletterOut } from '@/lib/api';

export default function SubscribersPage() {
  const [items, setItems] = useState<NewsletterOut[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    admin.subscribers()
      .then(setItems)
      .catch((err) => toast.error(err instanceof ApiError ? err.message : 'تعذّر التحميل'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10 lg:py-12">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-semibold text-white">المشتركون بالنشرة</h1>
        <p className="mt-1 text-sm text-purple-300/60">{items.length} مشترك</p>
      </motion.div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl border border-white/10 bg-white/5" />
          ))
        ) : (
          <AnimatePresence>
            {items.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -2 }}
className="rounded-xl border border-white/15 bg-white/[0.08] p-4 shadow-md shadow-black/15 backdrop-blur-2xl transition-all hover:border-purple-400/40 hover:bg-white/[0.14]"              >
                <p dir="ltr" className="truncate text-sm text-white">{s.email}</p>
                <p className="mt-1 font-mono text-[10px] text-purple-400/50">
                  {new Date(s.created_at).toLocaleDateString('ar-IQ')}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}