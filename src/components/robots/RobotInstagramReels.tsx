'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';
import type { Robot } from '@/lib/types';

/** يستخرج رابط الـ embed من رابط ريلز إنستغرام */
function instagramEmbedSrc(url: string): string {
  const clean = url.split('?')[0].replace(/\/$/, '');
  return `${clean}/embed`;
}

/**
 * ريلز إنستغرام الخاصة بالروبوت — بلوك منفصل عن معرض الصور تماماً،
 * بنفس نمط فيديو "من نحن" (iframe يشتغل مباشرة بالموقع + رابط "فتح
 * بإنستغرام" تحته). الريلزين (أو أكثر) يطلعون جنب بعض بنفس الصف.
 */
export default function RobotInstagramReels({ robot }: { robot: Robot }) {
  const t = useTranslations('robots');
  const reels = (robot.gallery ?? []).filter(
    (item): item is { type: 'instagram'; url: string } =>
      typeof item === 'object' && item.type === 'instagram',
  );

  if (reels.length === 0) return null;

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2">
      {reels.map((reel, i) => (
        <motion.div
          key={reel.url}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: i * 0.08 }}
          className="flex flex-col items-center"
        >
          <div className="glass-card strip-glow mx-auto aspect-[9/16] w-full max-w-xs overflow-hidden rounded-2xl">
            <iframe
              src={instagramEmbedSrc(reel.url)}
              className="h-full w-full border-0"
              loading="lazy"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>

          <a
            href={reel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-pill mt-4 inline-flex items-center gap-2 px-5 py-2.5 text-sm text-white/85 transition hover:text-white"
          >
            <Instagram size={16} className="text-purple-300" />
            {t('watchOnInstagram')}
          </a>
        </motion.div>
      ))}
    </div>
  );
}
