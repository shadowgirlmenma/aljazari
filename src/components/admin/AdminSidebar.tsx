'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, usePathname } from '@/i18n/navigation';
import {
  LayoutDashboard, MessageSquare, Bot, GraduationCap,
  Users, Mail, LogOut, Menu, X,
} from 'lucide-react';
import Logo from '@/components/Logo';

const NAV = [
  { href: '/admin',                  label: 'نظرة عامة',       icon: LayoutDashboard },
  { href: '/admin/messages',         label: 'الرسائل',          icon: MessageSquare },
  { href: '/admin/robot-requests',   label: 'طلبات الروبوتات',  icon: Bot },
  { href: '/admin/enrollments',      label: 'التسجيلات',        icon: GraduationCap },
  { href: '/admin/trainers',         label: 'طلبات المدرّبين',  icon: Users },
  { href: '/admin/subscribers',      label: 'المشتركون',        icon: Mail },
] as const;

export default function AdminSidebar({ userName, onLogout }: { userName: string; onLogout: () => void }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = (
    <>
      <div className="flex items-center gap-2.5 px-6 py-6">
        <Logo className="w-8 text-purple-400" />
        <div>
          <p className="text-sm font-semibold text-white">الجزري</p>
          <p className="font-mono text-[9px] uppercase tracking-widest text-purple-400/70">لوحة التحكم</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
              <motion.div
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                  active ? 'text-white' : 'text-purple-300/60 hover:text-white'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="admin-nav-active"
                    className="absolute inset-0 rounded-xl border border-purple-400/40 bg-purple-600/25 backdrop-blur-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon size={17} className="relative z-10" />
                <span className="relative z-10">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-6 py-5">
        <p className="truncate text-xs text-purple-300/50">{userName}</p>
        <button
          type="button"
          onClick={onLogout}
          className="mt-3 flex items-center gap-2 text-sm text-purple-300/70 transition hover:text-red-400"
        >
          <LogOut size={15} />
          تسجيل الخروج
        </button>
      </div>
    </>
  );

  return (
    <>
<aside className="hidden w-64 shrink-0 flex-col border-e border-white/15 bg-white/[0.06] shadow-2xl shadow-black/30 backdrop-blur-2xl lg:flex">        {content}
      </aside>

      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed start-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-purple-300 backdrop-blur-xl lg:hidden"
      >
        <Menu size={18} />
      </button>

      {mobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
          <motion.aside
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 start-0 z-50 flex w-64 flex-col border-e border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl lg:hidden"
          >
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute end-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-purple-300"
            >
              <X size={14} />
            </button>
            {content}
          </motion.aside>
        </>
      )}
    </>
  );
}