'use client';

import dynamic from 'next/dynamic';
import DecorBoundary from '@/components/DecorBoundary';

const Lightfall = dynamic(
  () => import('../reactbits/Lightfall'),
  { ssr: false }
);

/** خلفية بانرات صفحات "حلول الروبوتات" (لما ما فيه صورة حقيقية للقطاع) — توهّج
 *  بنفسجي متحرك (Lightfall من React Bits)، نفس فكرة خلفية صفحة AI Solutions
 *  بس بتأثير مختلف حتى تكون كل صفحة مميزة بهويتها.
 *  ملاحظة مراجعة 27/09/2026 (جولة خامسة): كانت مطفية بالكامل بالوضع الفاتح، بس
 *  رجّعناها بالطلب — نفس سبب AiSolutionsBannerBackground (بانر فوق تعتيم غامق
 *  ثابت ونص بلون ثابت أصلاً، فتشغيلها بالوضعين يخلي البانر غني ومتناسق). */
export default function RobotSolutionsBannerBackground() {
  return (
    <div className="absolute inset-0">
      <DecorBoundary>
        <Lightfall
          colors={['#bba4fc', '#7c47e0', '#4c1d80']}
          backgroundColor="#120621"
          speed={0.35}
          streakCount={4}
          density={0.55}
          twinkle={0.7}
          zoom={2.8}
          mouseInteraction
          mouseStrength={0.4}
        />
      </DecorBoundary>
    </div>
  );
}
