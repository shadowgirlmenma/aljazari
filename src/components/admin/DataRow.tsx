'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import StatusBadge from './StatusBadge';
import type { RequestStatus } from '@/lib/api';

export default function DataRow({
  title, subtitle, date, status, onStatusChange, updating, children, index,
}: {
  title: string;
  subtitle: string;
  date: string;
  status: RequestStatus;
  onStatusChange: (s: RequestStatus) => void;
  updating?: boolean;
  children: React.ReactNode;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('ar-IQ', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] shadow-lg shadow-black/20 backdrop-blur-2xl transition-all hover:border-purple-400/40 hover:bg-white/[0.14]"    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full flex-col gap-3 p-5 text-start sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-white">{title}</p>
          <p className="mt-0.5 truncate text-sm text-purple-300/60">{subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="whitespace-nowrap font-mono text-[11px] text-purple-400/50">
            {formatDate(date)}
          </span>
          <div onClick={(e) => e.stopPropagation()}>
            <StatusBadge status={status} onChange={onStatusChange} disabled={updating} />
          </div>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={16} className="text-purple-400/60" />
          </motion.span>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-purple-500/10"
          >
            <div className="grid gap-3 p-5 pt-4 sm:grid-cols-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}