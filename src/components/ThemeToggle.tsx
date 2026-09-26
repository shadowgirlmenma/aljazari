'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

/**
 * زر تبديل الوضع الداكن/الفاتح — نفس أسلوب زر تبديل اللغة (دائري، حدود
 * زجاجية شفافة) حتى يتناسق بصرياً مع باقي أزرار الهيدر.
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}
      title={isDark ? 'الوضع الفاتح' : 'الوضع الداكن'}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-purple-200 backdrop-blur-xl transition hover:border-purple-300 hover:text-white ${className}`}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
