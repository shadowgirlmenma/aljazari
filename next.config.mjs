import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  // هيدرز أمان أساسية على كل الصفحات — تحمي من clickjacking، sniffing نوع الملف،
  // وتسريب الـ referrer.
  //
  // ملاحظة 29/09/2026 — Content-Security-Policy (CSP):
  // راجعت كل مصدر خارجي فعلي بالموقع (iframes + سكربتات inline) قبل ما أكتب
  // هذي القائمة:
  //   - خرائط كوكل (ContactClient, AboutClient, LocationSection): www.google.com
  //   - فيديوهات يوتيوب (AboutClient, RobotYoutubeVideos): www.youtube-nocookie.com
  //   - ريلز إنستغرام (RobotInstagramReels): www.instagram.com
  //   - خطوط الموقع (Readex Pro, IBM Plex Mono, Space Grotesk) عبر next/font —
  //     تنحمّل وتنخزن بسيرفر الموقع نفسه وقت الـ build، ما فيها أي طلب شبكة
  //     خارجي وقت التصفح، فـ font-src 'self' كافية بدون أي دومين غوغل فونتس.
  //   - ما اكو أي سكربت طرف ثالث (Google Analytics, Meta Pixel, إعلانات...
  //     إلخ) محمّل بالموقع حالياً إطلاقاً.
  //
  // script-src فيها 'unsafe-inline' لأن الموقع فيه سكربتين inline (سكربت
  // تبديل الوضع الداكن/الفاتح بـ layout.tsx + بيانات JSON-LD لكل صفحة) —
  // تفعيل nonce/hash صارمة يحتاج تعديل بنية الـ middleware وتجربة فعلية على
  // نسخة تجريبية (preview) قبل النشر، وهذا مو متوفر حالياً بهذي الجلسة.
  // كتعويض: connect-src 'self' تمنع أي كود مزروع (XSS) من تسريب بيانات
  // الزوار لسيرفر خارجي حتى لو انحقن — وهذا أهم سيناريو ضرر بالهجمات.
  // هذا مستوى حماية جيد وواقعي الآن؛ ممكن نرفعه لاحقاً لمستوى nonce الأصرم
  // بعد ما نجرب النشر على نسخة preview فيرسيل بدون ما نخاطر بالموقع الحي.
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-src https://www.google.com https://www.youtube-nocookie.com https://www.instagram.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      'upgrade-insecure-requests',
    ].join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ];
  },
  // تحويلات لروابط قديمة من موقع Wix السابق (قبل ربط الدومين بموقعنا الجديد)
  // كانت مفهرسة بغوغل ولسا محتمل حد يوصلها من نتائج بحث قديمة أو رابط محفوظ.
  // بدل ما تطلع 404، نحوّلها تلقائياً للصفحة الرئيسية الصح — يحمي أي زائر
  // يجي من رابط قديم لحد ما يتحدث فهرس Google بالكامل (طلبنا إزالة مؤقتة
  // بـ Search Console بالإضافة لهذا، 30/09/2026).
  async redirects() {
    return [
      { source: '/en/home-ar', destination: '/en', permanent: true },
      { source: '/ar/home-ar', destination: '/ar', permanent: true },
      { source: '/home-ar', destination: '/', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);