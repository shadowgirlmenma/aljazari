'use client';

import dynamic from 'next/dynamic';
import DecorBoundary from '@/components/DecorBoundary';

const ColorBends = dynamic(() => import('@/components/reactbits/ColorBends'), { ssr: false });

export default function AdminBackground() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full">
      <DecorBoundary>
        <ColorBends
          colors={['#7c47e0', '#bba4fc', '#4c1d80']}
          rotation={90}
          speed={0.15}
          scale={1.4}
          frequency={0.8}
          warpStrength={0.9}
          mouseInfluence={0.6}
          noise={0.04}
          parallax={0.3}
          iterations={2}
          intensity={1.1}
          bandWidth={5}
          transparent={false}
        />
      </DecorBoundary>
      {/* طبقة تعتيم خفيفة فقط — تخلي الألوان تبين بوضوح خلف الزجاج */}
      <div className="absolute inset-0 bg-[#0a0414]/55" />
    </div>
  );
}