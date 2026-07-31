'use client';

import { useState } from 'react';
import StarBorder from '@/components/reactbits/StarBorder';
import BookRobotModal from './BookRobotModal';

export default function BookRobotButton({
  robotSlug, robotName,
}: {
  robotSlug: string;
  robotName: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mt-8">
        <StarBorder
          as="button"
          onClick={() => setOpen(true)}
          color="#a78bfa"
          speed="5s"
          thickness={2}
        >
          <span className="px-4 text-sm font-medium sm:text-base">احجز الآن</span>
        </StarBorder>
      </div>

      <BookRobotModal
        open={open}
        onClose={() => setOpen(false)}
        robotSlug={robotSlug}
        robotName={robotName}
      />
    </>
  );
}