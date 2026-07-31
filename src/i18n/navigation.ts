import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// استوردي Link و useRouter من هنا — مو من next/link
// هيچ كل رابط يحافظ على اللغة الحالية تلقائياً
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
