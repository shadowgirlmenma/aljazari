'use client';

import { motion } from 'motion/react';
import type { RequestStatus } from '@/lib/api';

const OPTIONS: { key: RequestStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'الكل' },
  { key: 'new', label: 'جديد' },
  { key: 'contacted', label: 'تم التواصل' },
  { key: 'confirmed', label: 'مؤكد' },
  { key: 'completed', label: 'مكتمل' },
  { key: 'cancelled', label: 'ملغي' },
];

export default function StatusFilter({
  value, onChange,
}: {
  value: RequestStatus | 'all';
  onChange: (v: RequestStatus | 'all') => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {OPTIONS.map((opt) => {
        const active = value === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            className="relative rounded-full px-4 py-1.5 text-xs font-medium transition-colors"
          >
            {active && (
              <motion.span
                layoutId="status-filter-active"
                className="absolute inset-0 rounded-full bg-purple-600"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className={`relative z-10 ${active ? 'text-white' : 'text-purple-300/60 hover:text-purple-200'}`}>
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}