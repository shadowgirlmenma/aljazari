'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ShoppingBag, KeyRound, Clock } from 'lucide-react';
import BookRobotModal from './BookRobotModal';

export default function BookRobotButton({
  robotSlug, robotName, productType,
}: {
  robotSlug: string;
  robotName: string;
  /** إذا الحقل فاضي بالبيانات، نعتبر الروبوت متوفر للإيجار والبيع (نفس افتراض RobotsGrid) */
  productType?: ('rent' | 'sale' | 'preorder')[];
}) {
  const t = useTranslations('robots');
  const [open, setOpen] = useState(false);
  const [initialType, setInitialType] = useState<'buy' | 'rent'>('rent');

  const types = productType && productType.length > 0 ? productType : ['rent', 'sale'];
  const canSale = types.includes('sale');
  const canRent = types.includes('rent');
  const preorderOnly = types.includes('preorder') && !canSale && !canRent;

  const openWith = (type: 'buy' | 'rent') => {
    setInitialType(type);
    setOpen(true);
  };

  return (
    <>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        {preorderOnly ? (
          // روبوت حجز مسبق فقط — ما يُعرض له بيع ولا إيجار، زر وحد للاهتمام بالحجز المسبق
          <button
            type="button"
            onClick={() => openWith('buy')}
            className="flex items-center justify-center gap-2.5 rounded-xl bg-purple-600 px-10 py-5 text-lg font-bold text-white shadow-lg shadow-purple-900/40 transition hover:scale-[1.03] hover:bg-purple-500 sm:text-xl"
          >
            <Clock size={22} />
            {t('preOrder')}
          </button>
        ) : (
          <>
            {canSale && (
              <button
                type="button"
                onClick={() => openWith('buy')}
                className="flex items-center justify-center gap-2.5 rounded-xl bg-purple-600 px-10 py-5 text-lg font-bold text-white shadow-lg shadow-purple-900/40 transition hover:scale-[1.03] hover:bg-purple-500 sm:text-xl"
              >
                <ShoppingBag size={22} />
                {t('forSale')}
              </button>
            )}
            {canRent && (
              <button
                type="button"
                onClick={() => openWith('rent')}
                className="glass flex items-center justify-center gap-2.5 rounded-xl border-2 border-purple-400/50 px-10 py-5 text-lg font-bold text-purple-100 transition hover:scale-[1.03] hover:border-purple-300 hover:text-white sm:text-xl"
              >
                <KeyRound size={22} />
                {t('forRent')}
              </button>
            )}
          </>
        )}
      </div>

      <BookRobotModal
        open={open}
        onClose={() => setOpen(false)}
        robotSlug={robotSlug}
        robotName={robotName}
        initialType={initialType}
        preorder={preorderOnly}
      />
    </>
  );
}
