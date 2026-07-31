'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Scene = dynamic(() => import('./RobotScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-36 w-36 animate-pulse rounded-full bg-purple-700/30 blur-2xl" />
    </div>
  ),
});

export default function RobotCanvas({ className = '' }: { className?: string }) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);
  return (
    <div
      className={`relative ${className}`}
      role="img"
      aria-label="روبوت الجزري ثلاثي الأبعاد"
    >
      <Scene animate={!reduced} />
    </div>
  );
}
