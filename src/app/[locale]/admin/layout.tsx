'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminBackground from '@/components/admin/AdminBackground';
import Logo from '@/components/Logo';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname.includes('/admin/login');

  useEffect(() => {
    if (!loading && !user && !isLoginPage) router.push('/admin/login');
  }, [loading, user, isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  if (loading) {
    return (
      <div className="relative min-h-[100dvh] overflow-hidden bg-[#0a0414]">
        <AdminBackground />
        <div className="relative z-10 flex min-h-[100dvh] items-center justify-center">
          <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <Logo className="w-10 text-purple-400" />
          </motion.div>
        </div>
      </div>
    );
  }

  if (!user) return null;

return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#0a0414]">
      <AdminBackground />
      <div className="relative z-10 flex h-full w-full">
        <AdminSidebar userName={user.full_name} onLogout={logout} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}