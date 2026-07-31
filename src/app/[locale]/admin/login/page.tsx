'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import { Lock, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { admin, adminAuth, ApiError } from '@/lib/api';
import Logo from '@/components/Logo';

const Lightfall = dynamic(() => import('@/components/reactbits/Lightfall'), { ssr: false });

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await admin.login({ email, password });
      if (res.user.role !== 'admin') {
        toast.error('هذا الحساب ما عنده صلاحية دخول اللوحة');
        return;
      }
      adminAuth.saveToken(res.access_token);
      toast.success(`أهلاً ${res.user.full_name}`);
      router.push('/admin');
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'تعذّر الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#120621] px-5">
      <div className="absolute inset-0">
        <Lightfall
          colors={['#bba4fc', '#7c47e0', '#4c1d80']}
          backgroundColor="#260b42"
          speed={0.35}
          streakCount={2}
          density={0.5}
          twinkle={0.7}
          zoom={3.4}
          backgroundGlow={0.4}
          opacity={0.6}
          mouseInteraction
          mouseStrength={0.4}
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 45%, rgba(18,6,33,0.6) 0%, rgba(18,6,33,0.94) 100%)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm rounded-2xl border border-purple-500/25 bg-[#120621]/70 p-8 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex flex-col items-center text-center">
          <Logo className="w-12 text-purple-400" />
          <h1 className="mt-4 text-xl font-semibold text-white">لوحة تحكم الجزري</h1>
          <p className="mt-1 text-sm text-purple-300/60">دخول المدراء فقط</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="relative">
            <Mail size={16} className="absolute start-4 top-1/2 -translate-y-1/2 text-purple-400/60" />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="البريد الإلكتروني"
              className="w-full rounded-xl border border-purple-500/30 bg-purple-900/20 py-3 ps-11 pe-4 text-sm text-white placeholder-purple-300/40 outline-none transition focus:border-purple-400"
            />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute start-4 top-1/2 -translate-y-1/2 text-purple-400/60" />
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              className="w-full rounded-xl border border-purple-500/30 bg-purple-900/20 py-3 ps-11 pe-4 text-sm text-white placeholder-purple-300/40 outline-none transition focus:border-purple-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-purple-600 py-3.5 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:opacity-60"
          >
            {loading ? '...' : 'تسجيل الدخول'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}