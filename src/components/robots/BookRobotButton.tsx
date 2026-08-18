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
            className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 py-4 text-base font-semibold text-white transition hover:bg-purple-500 sm:text-lg"
          >
            <Clock size={20} />
            {t('preOrder')}
          </button>
        ) : (
          <>
            {canSale && (
              <button
                type="button"
                onClick={() => openWith('buy')}
                className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 py-4 text-base font-semibold text-white transition hover:bg-purple-500 sm:text-lg"
              >
                <ShoppingBag size={20} />
                {t('forSale')}
              </button>
            )}
            {canRent && (
              <button
                type="button"
                onClick={() => openWith('rent')}
                className="glass flex items-center justify-center gap-2 rounded-xl border border-purple-400/40 px-8 py-4 text-base font-semibold text-purple-100 transition hover:border-purple-300 hover:text-white sm:text-lg"
              >
                <KeyRound size={20} />
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
