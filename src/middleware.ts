import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

/**
 * ملاحظة 29/09/2026: لوحة تحكم الأدمن (/admin) تعتمد بالكامل على باكند
 * FastAPI منفصل (شوفي src/lib/api.ts). المستخدمة قررت عدم استضافة هذا
 * الباكند حالياً (لا Render ولا Railway ولا غيره) وما تحتاج اللوحة هسة،
 * فنقطع وصول أي زائر لمسارات /admin بالإنتاج بإعادة توجيهه للرئيسية —
 * بدل ما نحذف كود اللوحة (يضل جاهز لو قررت لاحقاً تستضيف الباكند وتفعّله).
 * لإعادة التفعيل: ضيفي متغير بيئة NEXT_PUBLIC_ADMIN_ENABLED=true بإعدادات
 * Vercel (Environment Variables) وأعيدي النشر — بدونه اللوحة تبقى معطّلة.
 */
const ADMIN_ENABLED = process.env.NEXT_PUBLIC_ADMIN_ENABLED === 'true';

export default function middleware(request: NextRequest) {
  if (!ADMIN_ENABLED) {
    const pathWithoutLocale = request.nextUrl.pathname.replace(/^\/(ar|en)(?=\/|$)/, '') || '/';
    if (pathWithoutLocale === '/admin' || pathWithoutLocale.startsWith('/admin/')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // يتجاهل ملفات النظام والصور والـ API
  matcher: ['/', '/(ar|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
