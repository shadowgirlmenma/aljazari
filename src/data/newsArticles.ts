/**
 * قائمة مقالات الأخبار (السلاجات) — مصدر واحد يستخدمه كل من صفحة المقال
 * (generateStaticParams) وخريطة الموقع (sitemap.ts) حتى ما ننسى نحدّث مكان
 * ولا نكرر القائمة بمكانين. لو ضفتي مقال جديد، ضيفيه هنا بس.
 */
export const ARTICLES = [
  'tedx-erbil-2025',
  'itex-iraq-2025',
  'iraq-vision-2050',
  'mtu-ai-college-launch',
  'new-school-year-2025',
  'iraqi-youth-summit-2025',
  'smart-cities-forum-2025',
  'engineers-day-2025',
  'albadoor-complex-launch',
  'ai-summit-anbar-2025',
  'baghdad-beauty-connection',
  'digitization-forum-2025',
  'energy-expo-2025',
  'leap-2025-riyadh',
  'vex-competition-2025',
  'medico-2025',
  'robotics-ai-clubs-launch',
  'cutting-edge-robotics-launch',
  'first-registered-company',
] as const;
