'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ShoppingBag, KeyRound } from 'lucide-react';
import BookRobotModal from './BookRobotModal';

export default function BookRobotButton({
  robotSlug, robotName,
}: {
  robotSlug: string;
  robotName: string;
}) {
  const t = useTranslations('robots');
  const [open, setOpen] = useState(false);
  const [initialType, setInitialType] = useState<'buy' | 'rent'>('rent');

  const openWith = (type: 'buy' | 'rent') => {
    setInitialType(type);
    setOpen(true);
  };

  return (
    <>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <button
          type="button"
          onClick={() => openWith('buy')}
          className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 py-4 text-base font-semibold text-white transition hover:bg-purple-500 sm:text-lg"
        >
          <ShoppingBag size={20} />
          {t('forSale')}
        </button>
        <button
          type="button"
          onClick={() => openWith('rent')}
          className="glass flex items-center justify-center gap-2 rounded-xl border border-purple-400/40 px-8 py-4 text-base font-semibold text-purple-100 transition hover:border-purple-300 hover:text-white sm:text-lg"
        >
          <KeyRound size={20} />
          {t('forRent')}
        </button>
      </div>

      <BookRobotModal
        open={open}
        onClose={() => setOpen(false)}
        robotSlug={robotSlug}
        robotName={robotName}
        initialType={initialType}
      />
    </>
  );
}
