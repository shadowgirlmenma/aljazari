'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check } from 'lucide-react';
import type { RequestStatus } from '@/lib/api';

const STATUS_CONFIG: Record<RequestStatus, { label: string; color: string; bg: string; dot: string }> = {
  new:       { label: 'جديد',        color: 'text-blue-300',   bg: 'bg-blue-500/15 border-blue-500/30',     dot: 'bg-blue-400' },
  contacted: { label: 'تم التواصل',  color: 'text-amber-300',  bg: 'bg-amber-500/15 border-amber-500/30',   dot: 'bg-amber-400' },
  confirmed: { label: 'مؤكد',        color: 'text-purple-300', bg: 'bg-purple-500/15 border-purple-500/30', dot: 'bg-purple-400' },
  completed: { label: 'مكتمل',       color: 'text-emerald-300',bg: 'bg-emerald-500/15 border-emerald-500/30', dot: 'bg-emerald-400' },
  cancelled: { label: 'ملغي',        color: 'text-red-300',    bg: 'bg-red-500/15 border-red-500/30',       dot: 'bg-red-400' },
};

const ALL_STATUSES: RequestStatus[] = ['new', 'contacted', 'confirmed', 'completed', 'cancelled'];

export default function StatusBadge({
  status, onChange, disabled,
}: {
  status: RequestStatus;
  onChange: (s: RequestStatus) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const cfg = STATUS_CONFIG[status];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition ${cfg.bg} ${cfg.color} ${
          disabled ? 'opacity-50' : 'hover:brightness-125'
        }`}
      >
        <motion.span
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 0.4 }}
          key={status}
          className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`}
        />
        {cfg.label}
        {!disabled && (
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={12} />
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && !disabled && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute z-30 mt-2 w-40 overflow-hidden rounded-xl border border-purple-500/30 bg-[#1a0a2e] p-1.5 shadow-2xl"
          >
            {ALL_STATUSES.map((s) => {
              const c = STATUS_CONFIG[s];
              return (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => { onChange(s); setOpen(false); }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-start text-xs transition hover:bg-purple-800/40"
                  >
                    <span className={`flex items-center gap-2 ${c.color}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
                      {c.label}
                    </span>
                    {status === s && <Check size={12} className="text-purple-400" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}