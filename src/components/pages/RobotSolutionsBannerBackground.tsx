'use client';

import dynamic from 'next/dynamic';
import DecorBoundary from '@/components/DecorBoundary';

const Lightfall = dynamic(
  () => import('../reactbits/Lightfall'),
  { ssr: false }
);

/** خلفية بانرات صفحات "حلول الروبوتات" — توهّج بنفسجي متحرك (Lightfall من React Bits)،
 *  نفس فكرة خلفية صفحة AI Solutions بس بتأثير مختلف حتى تكون كل صفحة مميزة بهويتها */
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
