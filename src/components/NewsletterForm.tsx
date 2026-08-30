'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { buildMailto } from '@/lib/mailto';

export default function NewsletterForm() {
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* بدون أي ربط بباكند — يفتح رابط mailto: بتطبيق البريد الافتراضي، معبّى
       تلقائياً بالبريد الإلكتروني اللي كتبته الزائرة. */
    window.location.href = buildMailto(
      locale === 'ar' ? 'الاشتراك بنشرة الجزري' : 'Aljazari newsletter subscription',
      [[locale === 'ar' ? 'البريد الإلكتروني' : 'Email', email]],
    );
    setSent(true);
    setEmail('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={locale === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}
        className="flex-1 rounded-full border border-purple-500/40 bg-purple-900/20 px-5 py-3 text-sm text-white placeholder-purple-300/50 outline-none focus:border-purple-400"
      />
      <button
        type="submit"
        className="rounded-full bg-purple-600 px-7 py-3 text-sm font-medium text-white transition hover:bg-purple-500 disabled:opacity-60"
      >
        {sent
          ? locale === 'ar'
            ? 'تم! ✓'
            : 'Done! ✓'
          : locale === 'ar'
            ? 'اشترك'
            : 'Subscribe'}
      </button>
    </form>
  );
}
