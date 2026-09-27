'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';

/**
 * ملاحظة مراجعة 27/09/2026 (تتمة 6): لاحظت المستخدمة إن رابط "← رجوع"
 * بصفحة تصنيف حلول الروبوتات موجود بس داخل البانر العلوي — أول ما تنزل
 * لباقي أقسام الصفحة (الفوائد، تعرّف على روبوتاتنا، القطاعات المستفيدة،
 * ليش الجزري...) ما يضل أي طريق راجع غير سكرول العودة لفوق. هذا المكوّن
 * زر "رجوع" عائم (fixed) يظهر تلقائياً أول ما تنزل الصفحة (بعد ما يختفي
 * زر البانر الأصلي من الشاشة) ويضل ظاهر وثابت بزاوية الصفحة العلوية طول
 * فترة التنقل بكل الأقسام — بكلا اللغتين لأنه يستخدم نفس ترجمة "رجوع"
 * الممررة من صفحة التصنيف. يستخدم .glass-pill (متبدل مع الثيم) لأنه هنا
 * فوق خلفيات أقسام عادية تتبع الثيم (مو فوق سكرim بانر ثابت متل الزر
 * الأصلي اللي يستخدم .glass-pill-fixed).
 */
export default function FloatingBackLink({ href, label }: { href: string; label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > window.innerHeight * 0.55);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <Link
      href={href}
      aria-label={label}
      className={`glass-pill fixed start-4 top-20 z-40 inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-sm font-bold uppercase tracking-widest text-[var(--rt-white)] shadow-lg transition-all duration-300 hover:border-purple-300 sm:start-6 sm:top-24 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
      }`}
    >
      ← {label}
    </Link>
  );
}
