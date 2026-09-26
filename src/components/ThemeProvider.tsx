'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

/**
 * نظام الوضع الداكن/الفاتح (Dark/Light Mode) — بدون أي مكتبة خارجية (next-themes
 * وغيرها)، عشان ما نحتاج تثبيت باكج جديد. الافتراضي دايماً "داكن" (نفس هوية
 * الموقع الحالية بالضبط) — يتبدل بس لو الزائر ضغط الزر بنفسه، ويتذكر اختياره
 * بالمتصفح (localStorage) للزيارات الجاية.
 *
 * كيف يشتغل: نضيف/نشيل class="light" على <html> — كل متغيرات الألوان
 * بـ globals.css (تحت :root و.light) تتبدل تلقائياً معاها، وبيها كل
 * الأقسام والبطاقات الزجاجية بالموقع. شوفي globals.css للتفاصيل.
 */

type Theme = 'dark' | 'light';
const STORAGE_KEY = 'aljazari-theme';

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  // نقرأ الاختيار المحفوظ بعد التحميل الأول (السكربت الصغير بـ layout.tsx
  // خلا الكلاس الصحيح موجود ع <html> من أول لحظة حتى ما تصير "ومضة" لون غلط)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') setTheme(saved);
    } catch {
      /* localStorage غير متاح — نبقى على الافتراضي (داكن) */
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* تجاهل */
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme لازم تستخدم جوه ThemeProvider');
  return ctx;
}

/** السكربت المصغّر اللي يترز بأول <body> — يقرأ الاختيار المحفوظ ويطبّقه
 * قبل ما المتصفح يرسم أي شي، حتى ما تصير "ومضة" (flash) لون غلط لحظة التحميل. */
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem('${STORAGE_KEY}');if(t==='light')document.documentElement.classList.add('light');}catch(e){}`;
