'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import type { Robot } from '@/lib/types';

/**
 * شريط صور الروبوتات — عرض أفقي بسيط (بدون تأثير مائي أو انحناء)، يتحرك
 * يمين ويسار بالتمرير العادي.
 */
export default function RobotsShowcaseGallery({ robots }: { robots: Robot[] }) {
  const items = robots.filter((r) => r.image);

  if (items.length < 4) return null;

  return (
    <div className="glass-strong relative overflow-hidden rounded-3xl px-5 py-10 sm:px-10 sm:py-14">
      <div className="flex snap-x gap-3 overflow-x-auto pb-2 sm:gap-4">
        {items.map((robot, i) => (
          <motion.div
            key={robot.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.04 }}
            className="glass-card relative aspect-square w-24 shrink-0 snap-start overflow-hidden rounded-xl p-2 sm:w-32"
          >
            <Image
              src={robot.image}
              alt={robot.name}
              fill
              sizes="(max-width: 640px) 96px, 128px"
              className="object-contain p-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
