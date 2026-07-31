'use client';

import dynamic from 'next/dynamic';

const MagicRings = dynamic(
  // use relative path to avoid alias resolution errors
  () => import('../reactbits/MagicRings'),
  { ssr: false }
);

export default function MagicRingsBackground() {
  return (
    <div className="absolute inset-0 opacity-60">
      <MagicRings
        color="#7c47e0"
        colorTwo="#4c1d80"
        ringCount={5}
        speed={0.8}
        attenuation={8}
        lineThickness={1.5}
        baseRadius={0.3}
        radiusStep={0.12}
        opacity={0.9}
        noiseAmount={0.05}
        ringGap={1.4}
        followMouse={true}
        mouseInfluence={0.15}
        parallax={0.04}
        clickBurst={true}
      />
    </div>
  );
}