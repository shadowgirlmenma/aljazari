'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const COUNTRIES = [
  { code: '+964', name: 'العراق', flag: '🇮🇶', length: 10 },
  { code: '+966', name: 'السعودية', flag: '🇸🇦', length: 9 },
  { code: '+971', name: 'الإمارات', flag: '🇦🇪', length: 9 },
  { code: '+965', name: 'الكويت', flag: '🇰🇼', length: 8 },
  { code: '+974', name: 'قطر', flag: '🇶🇦', length: 8 },
  { code: '+973', name: 'البحرين', flag: '🇧🇭', length: 8 },
  { code: '+968', name: 'عُمان', flag: '🇴🇲', length: 8 },
  { code: '+962', name: 'الأردن', flag: '🇯🇴', length: 9 },
  { code: '+961', name: 'لبنان', flag: '🇱🇧', length: 8 },
  { code: '+963', name: 'سوريا', flag: '🇸🇾', length: 9 },
  { code: '+20',  name: 'مصر', flag: '🇪🇬', length: 10 },
  { code: '+90',  name: 'تركيا', flag: '🇹🇷', length: 10 },
  { code: '+1',   name: 'الولايات المتحدة', flag: '🇺🇸', length: 10 },
  { code: '+44',  name: 'بريطانيا', flag: '🇬🇧', length: 10 },
  { code: '+49',  name: 'ألمانيا', flag: '🇩🇪', length: 10 },
];

export default function PhoneInput({
  value, onChange, required, onValidityChange,
}: {
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  onValidityChange?: (valid: boolean) => void;
}) {
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [number, setNumber] = useState('');
  const [touched, setTouched] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isValid = number.length === country.length;
  const showError = touched && number.length > 0 && !isValid;

  useEffect(() => {
    onChange(`${country.code}${number}`);
    onValidityChange?.(number.length > 0 ? isValid : !required);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, number]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref}>
      <div className="flex gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-full items-center gap-1.5 rounded-xl border border-purple-500/30 bg-purple-900/20 px-3 py-3 text-sm text-white transition hover:border-purple-400"
          >
            <span>{country.flag}</span>
            <span dir="ltr" className="font-mono text-xs">{country.code}</span>
            <ChevronDown size={14} className="text-purple-400" />
          </button>

          <AnimatePresence>
            {open && (
              <motion.ul
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute z-20 mt-2 max-h-64 w-56 overflow-y-auto rounded-xl border border-purple-500/30 bg-[#1a0a2e] p-1.5 shadow-2xl"
              >
                {COUNTRIES.map((c) => (
                  <li key={c.code}>
                    <button
                      type="button"
                      onClick={() => { setCountry(c); setNumber(''); setTouched(false); setOpen(false); }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-start text-sm text-purple-100 transition hover:bg-purple-800/40"
                    >
                      <span>{c.flag}</span>
                      <span className="flex-1">{c.name}</span>
                      <span dir="ltr" className="font-mono text-xs text-purple-400">{c.code}</span>
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <input
          required={required}
          type="tel"
          dir="ltr"
          value={number}
          onChange={(e) => setNumber(e.target.value.replace(/[^\d]/g, '').slice(0, country.length))}
          onBlur={() => setTouched(true)}
          placeholder={`${country.length} أرقام`}
          className={`flex-1 rounded-xl border bg-purple-900/20 px-4 py-3 text-sm text-white placeholder-purple-300/40 outline-none transition ${
            showError
              ? 'border-red-500/60 bg-red-950/20 focus:border-red-500'
              : 'border-purple-500/30 focus:border-purple-400 focus:bg-purple-900/30'
          }`}
        />
      </div>

      <AnimatePresence>
        {showError && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-xs text-red-400"
          >
            رقم {country.name} لازم يكون {country.length} أرقام ({number.length}/{country.length})
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}