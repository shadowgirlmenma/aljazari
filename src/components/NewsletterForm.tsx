'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';
import { api, ApiError } from '@/lib/api';

export default function NewsletterForm() {
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.subscribeNewsletter({ email });
      toast.success(res.detail);
      setEmail('');
    } catch (err) {
      toast.error(
        err instanceof ApiError
          ? err.message
          : locale === 'ar'
            ? 'تعذّر الاتصال بالخادم'
            : 'Could not reach the server'
      );
    } finally {
      setLoading(false);
    }
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
        disabled={loading}
        className="rounded-full bg-purple-600 px-7 py-3 text-sm font-medium text-white transition hover:bg-purple-500 disabled:opacity-60"
      >
        {loading ? '...' : locale === 'ar' ? 'اشترك' : 'Subscribe'}
      </button>
    </form>
  );
}