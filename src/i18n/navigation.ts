import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// استوردي Link و useRouter من هنا — مو من next/link
// حتى يحافظ كل رابط على اللغة الحالية تلقائياً
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
