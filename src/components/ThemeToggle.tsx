'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

/**
 * زر تبديل الوضع الداكن/الفاتح — نفس أسلوب زر تبديل اللغة (دائري، حدود
 * زجاجية شفافة) حتى يتناسق بصرياً مع باقي أزرار الهيدر.
 *
 * ملاحظة مراجعة 27/09/2026 (جولة خامسة): هذا الزر يُستخدم فقط جوه الهيدر
 * (Header.tsx، ديسكتوب + قائمة الموبايل) اللي خلفيته دايماً غامقة بكل
 * الأوضاع — فألوانه هسة HEX ثابتة (مو أصناف تتبدل مع الثيم) حتى يضل واضح
 * دايماً، نفس سبب تعديل Header.tsx بهذي الجولة (راجعي التعليق هناك).
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
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#ffffff]/15 bg-[#ffffff]/5 text-[#e9d5ff] backdrop-blur-xl transition hover:border-[#d8b4fe] hover:text-[#ffffff] ${className}`}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
