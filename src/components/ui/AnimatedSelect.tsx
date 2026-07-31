'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check } from 'lucide-react';

export default function AnimatedSelect({
  options, value, onChange, placeholder = '—',
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl border border-purple-500/30 bg-purple-900/20 px-4 py-3 text-start text-sm text-white outline-none transition focus:border-purple-400"
      >
        <span className={value ? 'text-white' : 'text-purple-300/40'}>
          {value || placeholder}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-purple-400" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-purple-500/30 bg-[#1a0a2e] p-1.5 shadow-2xl"
          >
            {options.map((opt, i) => (
              <motion.li
                key={opt}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <button
                  type="button"
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-start text-sm text-purple-100 transition hover:bg-purple-800/40"
                >
                  <span>{opt}</span>
                  {value === opt && <Check size={14} className="text-purple-400" />}
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}