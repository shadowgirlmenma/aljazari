import type { MetadataRoute } from 'next';

// ⚠️ هذا ملف Next خاص يولّد /robots.txt لمحركات البحث
// ما له علاقة بـ src/data/robots.ts (بيانات روبوتات الشركة)
//
// تحديث 15/10/2026 (خطة SEO / GEO):
// ضفنا سماح صريح لزواحف الذكاء الاصطناعي (ChatGPT، Claude، Perplexity،
// Gemini، Apple...) — حتى تقرا الموقع وتذكر الجزري بإجاباتها.
// ⚠️ مهم: أي بوت إله مجموعة قواعد خاصة بيه يتجاهل قواعد '*' بالكامل،
// لهذا نكرر منع مسارات الأدمن بكل مجموعة.

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aljazari.iq').replace(/\/$/, '');

// لوحة تحكم الأدمن معطّلة حالياً بالـ middleware (تحويل تلقائي للرئيسية) —
// هذا فقط طبقة حماية إضافية حتى ما تتفهرس.
const PRIVATE_PATHS = ['/admin', '/admin/', '/ar/admin', '/en/admin'];

const AI_CRAWLERS = [
  // OpenAI — ChatGPT
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  // Anthropic — Claude
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google — Gemini و AI Overviews
  'Google-Extended',
  // Apple — Siri / Apple Intelligence
  'Applebot-Extended',
  // Microsoft — Bing / Copilot (ChatGPT search يعتمد على فهرس Bing)
  'Bingbot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: AI_CRAWLERS,
        allow: ['/', '/llms.txt'],
        disallow: PRIVATE_PATHS,
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
