'use client';

import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

/**
 * زر تبديل اللغة.
 * يشتغل من أي صفحة ويرجّع المستخدم لنفس الصفحة باللغة الثانية:
 *   /ar/robots/pepper  ⇄  /en/robots/pepper
 * الاتجاه (RTL/LTR) يتبدل تلقائياً لأن dir محسوبة بالـ layout.
 */
export default function LocaleSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const next = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;
  const label = next === 'ar' ? 'العربية' : 'English';

  function switchTo(target: string) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error — الـ params ديناميكية حسب الصفحة (مثل slug)
        { pathname, params },
        { locale: target },
      );
    });
  }

  return (
    <button
      type="button"
      onClick={() => switchTo(next)}
      disabled={isPending}
      aria-label={next === 'ar' ? 'التبديل إلى العربية' : 'Switch to English'}
      className={`font-mono text-xs tracking-wide uppercase transition-opacity disabled:opacity-50 ${className}`}
    >
      {label}
    </button>
  );
}
