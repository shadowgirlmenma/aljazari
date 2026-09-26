'use client';

import dynamic from 'next/dynamic';
import DecorBoundary from '@/components/DecorBoundary';
import { useTheme } from '@/components/ThemeProvider';

const Lightfall = dynamic(
  () => import('@/components/reactbits/Lightfall'),
  { ssr: false }
);

export default function LightfallBackground() {
  /* ملاحظة مراجعة 26/09/2026: التوهّج مصمّم بألوان غامقة تناسب الوضع الداكن
     بس — بالوضع الفاتح نطفيه بالكامل حتى يبقى القسم "صفيحة بيضاء طبيعية"
     بدون بقعة غامقة زايدة فوق خلفية فاتحة (طلب صريح من المستخدمة). */
  const { theme } = useTheme();
  if (theme === 'light') return null;

  return (
    <div className="absolute inset-0">
      <DecorBoundary>
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
      </DecorBoundary>
    </div>
  );
}