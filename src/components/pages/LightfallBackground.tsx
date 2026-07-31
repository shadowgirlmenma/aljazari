'use client';

import dynamic from 'next/dynamic';

const Lightfall = dynamic(
  () => import('@/components/reactbits/Lightfall'),
  { ssr: false }
);

export default function LightfallBackground() {
  return (
    <div className="absolute inset-0">
      <Lightfall
        colors={['#bba4fc', '#7c47e0', '#4c1d80']}
        backgroundColor="#260b42"
        speed={0.45}
        streakCount={3}
        streakWidth={1}
        streakLength={1.2}
        glow={1.1}
        density={0.7}
        twinkle={1}
        zoom={3}
        backgroundGlow={0.6}
        opacity={0.85}
        mouseInteraction
        mouseStrength={0.6}
        mouseRadius={1}
      />
    </div>
  );
}