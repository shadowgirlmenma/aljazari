'use client';

import dynamic from 'next/dynamic';
import DecorBoundary from '@/components/DecorBoundary';

const WebThreads = dynamic(
  // مسار نسبي لتفادي مشاكل alias مع dynamic import
  () => import('../reactbits/WebThreads'),
  { ssr: false }
);

/** خلفية بانر صفحة AI Solutions — خيوط متوهجة بنفسجية (WebThreads من React Bits) */
export default function AiSolutionsBannerBackground() {
  return (
    <div className="absolute inset-0">
      <DecorBoundary>
      <WebThreads
        color1="#a78bfa"
        color2="#5227FF"
        color3="#ffffff"
        speed={0.2}
        threadCount={7}
        frequency={5.0}
        spread={0.22}
        taper={1.0}
        position={0.5}
        fanMode="center"
        glow={0.02}
        falloff={0.6}
        thickness={1.1}
        brightness={0.7}
        opacity={1.0}
        mirror={true}
        shimmer={false}
        grain={true}
        grainIntensity={0.04}
        mouseInteraction={true}
        mouseStrength={0.3}
      />
      </DecorBoundary>
    </div>
  );
}
