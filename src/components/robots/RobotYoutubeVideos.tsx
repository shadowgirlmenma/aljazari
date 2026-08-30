'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Youtube } from 'lucide-react';
import type { Robot } from '@/lib/types';

/** يستخرج رابط الـ embed (نسخة youtube-nocookie) من رابط فيديو يوتيوب كامل */
function youtubeEmbedSrc(url: string): string {
  const idMatch = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
  const id = idMatch ? idMatch[1] : '';
  return `https://www.youtube-nocookie.com/embed/${id}`;
}

/**
 * فيديو (فيديوهات) يوتيوب الخاصة بالروبوت — بلوك منفصل عن معرض الصور، بنفس
 * نمط ريلز إنستغرام (RobotInstagramReels): iframe يشتغل مباشرة بالموقع + رابط
 * "شاهد على يوتيوب" تحته. نفس أسلوب فيديو "من نحن" بس بنسبة 16:9.
 */
export default function RobotYoutubeVideos({ robot }: { robot: Robot }) {
  const t = useTranslations('robots');
  const videos = (robot.gallery ?? []).filter(
    (item): item is { type: 'youtube'; url: string } =>
      typeof item === 'object' && item.type === 'youtube',
  );

  if (videos.length === 0) return null;

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2">
      {videos.map((video, i) => (
        <motion.div
          key={video.url}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: i * 0.08 }}
          className="flex flex-col items-center"
        >
          <div className="glass-card strip-glow mx-auto aspect-video w-full overflow-hidden rounded-2xl">
            <iframe
              src={youtubeEmbedSrc(video.url)}
              className="h-full w-full border-0"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-pill mt-4 inline-flex items-center gap-2 px-5 py-2.5 text-sm text-white/85 transition hover:text-white"
          >
            <Youtube size={16} className="text-purple-300" />
            {t('watchOnYoutube')}
          </a>
        </motion.div>
      ))}
    </div>
  );
}
