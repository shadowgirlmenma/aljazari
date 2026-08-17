import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  // هيدرز أمان أساسية على كل الصفحات — تحمي من clickjacking، sniffing نوع الملف،
  // وتسريب الـ referrer. ملاحظة: ما ضفنا Content-Security-Policy هنا لأنها تحتاج
  // مراجعة دقيقة (embeds إنستغرام/يوتيوب، خطوط جوجل) حتى ما تكسر شي بالخطأ —
  // هذي خطوة منفصلة لازم تنعمل بحذر وتُختبر قبل ما تنفعّل.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
