'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { Robot } from '@/lib/types';

type CircularGalleryProps = {
  items?: { image: string; text: string }[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  fontUrl?: string;
  scrollSpeed?: number;
  scrollEase?: number;
};

const CircularGallery = dynamic(
  () => import('@/components/reactbits/CircularGallery'),
  { ssr: false },
) as ComponentType<CircularGalleryProps>;

export default function RobotsShowcaseGallery({ robots }: { robots: Robot[] }) {
  const items = robots
    .filter((r) => r.image)
    .map((r) => ({ image: r.image, text: r.name }));

  if (items.length < 4) return null;

  return (
    <div className="relative h-[400px] w-full sm:h-[460px]">
      <CircularGallery
        items={items}
        bend={2}
        borderRadius={0.06}
        textColor="#e9d5ff"
        font='bold 22px "Readex Pro", sans-serif'
        scrollSpeed={1.6}
        scrollEase={0.045}
      />
    </div>
  );
}