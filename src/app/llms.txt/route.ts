import { COMPANY, CONTACT, ROBOT_SERVICES, AI_SERVICES, PARTNERS, WARRANTY } from '@/data/company';
import { PUBLISHED_ROBOTS } from '@/data/robots';
import { ROBOT_SOLUTIONS, ROBOT_SOLUTIONS_ORDER } from '@/data/robotSolutions';
import { CATEGORIES } from '@/data/taxonomy';
import enMessages from '../../../messages/en.json';
import arMessages from '../../../messages/ar.json';

/**
 * /llms.txt — ملف تعريفي بصيغة Markdown لأدوات الذكاء الاصطناعي
 * (ChatGPT، Claude، Perplexity، Gemini...) حسب المعيار المقترح بـ llmstxt.org.
 *
 * الفكرة: بدل ما البوت يحاول يفهم الشركة من صفحات مليانة حركات وتصميم،
 * نعطيه ملخص نظيف ومباشر: منو الجزري، شنو تقدم، ووين أهم الصفحات.
 *
 * الملف يتولّد تلقائياً من نفس ملفات البيانات اللي يستخدمها الموقع
 * (company.ts, robots.ts, robotSolutions.ts, taxonomy.ts) — فأي روبوت أو خدمة
 * تنضاف للموقع تظهر هنا تلقائياً بدون تعديل يدوي.
 *
 * يتولّد مرة وحدة وقت الـ build (force-static) — ما يكلف السيرفر شي.
 * الـ middleware ما يمر عليه لأن مساره فيه نقطة (llms.txt).
 */

export const dynamic = 'force-static';

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aljazari.iq').replace(/\/$/, '');

function link(title: string, path: string, desc?: string): string {
  return `- [${title}](${BASE}${path})${desc ? `: ${desc}` : ''}`;
}

function buildLlmsTxt(): string {
  const lines: string[] = [];

  // ── العنوان والملخص ──
  lines.push(`# ${COMPANY.name.en} (${COMPANY.name.ar}) — Al-Jazari Robotics`);
  lines.push('');
  lines.push(`> ${COMPANY.positioning.en}. Based in Baghdad, Iraq. ${COMPANY.positioning.ar}، مقرها بغداد.`);
  lines.push('');
  lines.push(COMPANY.about.en);
  lines.push('');
  lines.push(COMPANY.about.ar);
  lines.push('');

  // ── حقائق أساسية ──
  lines.push('Key facts:');
  lines.push(`- Name: ${COMPANY.name.en} / ${COMPANY.name.ar} (also written Al-Jazari, AlJazari)`);
  lines.push(`- Location: ${CONTACT.address.en}`);
  lines.push('- Country served: Iraq');
  lines.push(
    `- Services: robot sales, robot rental, robot maintenance & programming, AI agents, custom and enterprise AI solutions, AI consulting, robotics training`,
  );
  lines.push(`- Robot categories: ${CATEGORIES.humanoid.label.en}, ${CATEGORIES.service.label.en}, ${CATEGORIES.educational.label.en}`);
  lines.push(`- Warranty: ${WARRANTY.summary.en}`);
  lines.push(`- Technology partners: ${PARTNERS.map((p) => p.name).join(', ')}`);
  if (CONTACT.email) lines.push(`- Email: ${CONTACT.email}`);
  if (CONTACT.phone) lines.push(`- Phone: ${CONTACT.phone}`);
  lines.push(`- Website languages: Arabic (${BASE}/ar) and English (${BASE}/en)`);
  lines.push('');

  // ── الصفحات الرئيسية ──
  lines.push('## Main pages');
  lines.push('');
  lines.push(link('Home (English)', '/en', COMPANY.positioning.en));
  lines.push(link('الرئيسية (عربي)', '/ar', COMPANY.positioning.ar));
  lines.push(link('About ALJAZARI', '/en/about', COMPANY.mission.en));
  lines.push(link('Our robots', '/en/robots', 'Full catalogue of humanoid, service, and educational robots available in Iraq'));
  lines.push(link('Robotics solutions by sector', '/en/robot-solutions', 'Robots for healthcare, banking, restaurants, hotels, malls, schools, universities, and more'));
  lines.push(link('AI solutions', '/en/ai-solutions', 'AI agents for WhatsApp, Messenger, and websites, plus custom and enterprise AI'));
  lines.push(link('Robotics training', '/en/training', `${enMessages.training.title} — ${enMessages.training.subtitle}`));
  lines.push(link('News', '/en/news', 'Company events, exhibitions, and announcements'));
  lines.push(link('Contact', '/en/contact', `Office in Baghdad — ${CONTACT.address.en}`));
  lines.push('');

  // ── خدمات الروبوتات ──
  lines.push('## Robotics services');
  lines.push('');
  for (const s of ROBOT_SERVICES) {
    lines.push(`- **${s.title.en}** (${s.title.ar}): ${s.description.en}`);
  }
  lines.push('');

  // ── خدمات الذكاء الاصطناعي ──
  lines.push('## AI solutions');
  lines.push('');
  for (const s of AI_SERVICES) {
    lines.push(`- **${s.title.en}** (${s.title.ar}): ${s.description.en}`);
  }
  lines.push('');

  // ── حلول القطاعات ──
  lines.push('## Robotics solutions by sector');
  lines.push('');
  for (const slug of ROBOT_SOLUTIONS_ORDER) {
    const sol = ROBOT_SOLUTIONS[slug];
    lines.push(link(`${sol.title.en} (${sol.title.ar})`, `/en/robot-solutions/${slug}`, sol.hook.en));
  }
  lines.push('');

  // ── الروبوتات ──
  lines.push('## Robots available in Iraq through ALJAZARI');
  lines.push('');
  for (const robot of PUBLISHED_ROBOTS) {
    const category = CATEGORIES[robot.categories[0]].label.en;
    const brand = robot.brand ? ` by ${robot.brand}` : '';
    lines.push(link(`${robot.name}${brand}`, `/en/robots/${robot.slug}`, `${category}. ${robot.summary.en}`));
  }
  lines.push('');

  // ── الأخبار ──
  const articles = Object.values(enMessages.news.articles) as { title: string }[];
  if (articles.length > 0) {
    lines.push('## Recent news and events');
    lines.push('');
    for (const a of articles) {
      lines.push(`- ${a.title}`);
    }
    lines.push(`- All news: ${BASE}/en/news`);
    lines.push('');
  }

  // ── نسخة عربية مختصرة للروابط ──
  lines.push('## Arabic pages (الصفحات العربية)');
  lines.push('');
  lines.push(link(arMessages.meta.title, '/ar'));
  lines.push(link('روبوتاتنا', '/ar/robots'));
  lines.push(link(arMessages.robotSolutions.title, '/ar/robot-solutions'));
  lines.push(link('حلول الذكاء الاصطناعي', '/ar/ai-solutions'));
  lines.push(link(arMessages.training.title, '/ar/training'));
  lines.push(link('من نحن', '/ar/about'));
  lines.push(link('تواصل معنا', '/ar/contact'));
  lines.push('');

  // ── روابط إضافية ──
  lines.push('## Optional');
  lines.push('');
  const socials = [
    ['Instagram', CONTACT.social.instagram],
    ['Facebook', CONTACT.social.facebook],
    ['LinkedIn', CONTACT.social.linkedin],
    ['YouTube', CONTACT.social.youtube],
    ['X (Twitter)', CONTACT.social.x],
    ['TikTok', CONTACT.social.tiktok],
  ].filter(([, url]) => url && url.trim() !== '');
  for (const [label, url] of socials) {
    lines.push(`- [${label}](${url})`);
  }
  if (CONTACT.mapsUrl) lines.push(`- [Office location on Google Maps](${CONTACT.mapsUrl})`);
  lines.push(`- [Sitemap](${BASE}/sitemap.xml)`);
  lines.push('');

  return lines.join('\n');
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
