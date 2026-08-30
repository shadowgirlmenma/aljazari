'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check } from 'lucide-react';
import RobotCard from './RobotCard';
import { CATEGORIES, CATEGORY_ORDER, PRODUCT_TYPE_ORDER, type ProductType } from '@/data/taxonomy';
import type { Locale, Robot, RobotCategory } from '@/lib/types';

type Filter = RobotCategory | 'all';
type SortOption = 'newest' | 'nameAsc' | 'nameDesc';

/** إذا الروبوت ما إله productType محدد بالبيانات، نعتبره متوفر للإيجار والبيع (الوضع الحالي الافتراضي) */
function typesOf(robot: Robot): ProductType[] {
  return robot.productType && robot.productType.length > 0 ? robot.productType : ['rent', 'sale'];
}

export default function RobotsGrid({ robots }: { robots: Robot[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations('robots');
  const [filter, setFilter] = useState<Filter>('all');
  const [productTypes, setProductTypes] = useState<Set<ProductType>>(new Set());
  const [sort, setSort] = useState<SortOption>('newest');

  const available = useMemo(
    () => CATEGORY_ORDER.filter((c) => robots.some((r) => r.categories.includes(c))),
    [robots],
  );

  function toggleProductType(pt: ProductType) {
    setProductTypes((prev) => {
      const next = new Set(prev);
      if (next.has(pt)) next.delete(pt);
      else next.add(pt);
      return next;
    });
  }

  const visible = useMemo(() => {
    let list = filter === 'all' ? robots : robots.filter((r) => r.categories.includes(filter));

    if (productTypes.size > 0) {
      list = list.filter((r) => typesOf(r).some((pt) => productTypes.has(pt)));
    }

    list = [...list].sort((a, b) => {
      if (sort === 'nameAsc') return a.name.localeCompare(b.name);
      if (sort === 'nameDesc') return b.name.localeCompare(a.name);
      return a.order - b.order;
    });

    return list;
  }, [robots, filter, productTypes, sort]);

  return (
    <div>
      {/* لوحة فلترة موحّدة بأسلوب حديث — بطاقة زجاجية وحدة تضم التصنيفات + نوع
          المنتج + الترتيب، بدل الأشكال المتفرقة القديمة (checkboxes ومربعات صور). */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <p className="text-xs font-medium tracking-wide text-purple-300/80 uppercase">
          {t('filterBy')}
        </p>

        <div className="-mx-4 mt-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:overflow-visible sm:px-0">
          <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
            <CategoryPill active={filter === 'all'} onClick={() => setFilter('all')}>
              {t('allCategories')}
            </CategoryPill>
            {available.map((category) => (
              <CategoryPill
                key={category}
                active={filter === category}
                onClick={() => setFilter(category)}
              >
                {CATEGORIES[category].label[locale]}
              </CategoryPill>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="me-1 text-xs font-medium tracking-wide text-purple-300/80 uppercase">
              {t('productType')}
            </span>
            {PRODUCT_TYPE_ORDER.map((pt) => (
              <ProductTypeToggle
                key={pt}
                active={productTypes.has(pt)}
                onClick={() => toggleProductType(pt)}
              >
                {t(pt === 'rent' ? 'forRent' : pt === 'sale' ? 'forSale' : 'preOrder')}
              </ProductTypeToggle>
            ))}
          </div>

          <label className="flex items-center gap-3 text-sm text-purple-100/90 sm:shrink-0">
            <span className="text-xs font-medium tracking-wide text-purple-300/80 uppercase">
              {t('sortBy')}
            </span>
            <span className="glass-pill relative rounded-full">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="appearance-none rounded-full bg-transparent py-2 ps-4 pe-9 text-sm text-white outline-none"
              >
                <option className="bg-[#1a0b2e]" value="newest">
                  {t('newest')}
                </option>
                <option className="bg-[#1a0b2e]" value="nameAsc">
                  {t('nameAZ')}
                </option>
                <option className="bg-[#1a0b2e]" value="nameDesc">
                  {t('nameZA')}
                </option>
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-purple-300"
              />
            </span>
          </label>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 text-sm text-purple-200/60">{t('empty')}</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((robot) => (
              <RobotCard key={robot.slug} robot={robot} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

/**
 * رقاقة تصنيف (pill) بأسلوب حديث — بدون أي صورة أو مربع أيقونة جنب العنوان
 * (حسب طلب المراجعة الأصلي، وهسة أيضاً مصممة كأزرار مدمجة مستديرة بالكامل
 * بدل الصناديق الكبيرة القديمة)، مع مؤشر تفعيل متحرك (layout animation)
 * ينزلق بين الرقاقة والثانية بدل ما يظهر ويختفي بشكل مفاجئ.
 */
function CategoryPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      aria-pressed={active}
      className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5 sm:py-2.5 sm:text-[15px] ${
        active ? 'text-white' : 'glass-pill text-purple-200/75 hover:text-white'
      }`}
    >
      {active && (
        <motion.span
          layoutId="activeCategoryPill"
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 shadow-[0_0_18px_rgba(124,71,224,0.55)]"
        />
      )}
      <span className="relative whitespace-nowrap">{children}</span>
    </motion.button>
  );
}

/** مفتاح تبديل نوع المنتج (For Rent / For Sale / Pre-order) — رقاقة بحد
 *  زجاجي وعلامة صح تتحرك (scale + fade) بدل مربع checkbox عادي. */
function ProductTypeToggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
        active
          ? 'border-purple-400/70 bg-purple-600/25 text-white'
          : 'glass-pill border-transparent text-purple-200/70 hover:text-white'
      }`}
    >
      <AnimatePresence initial={false}>
        {active && (
          <motion.span
            key="check"
            initial={{ scale: 0, opacity: 0, width: 0 }}
            animate={{ scale: 1, opacity: 1, width: 14 }}
            exit={{ scale: 0, opacity: 0, width: 0 }}
            transition={{ duration: 0.18 }}
            className="flex shrink-0 items-center overflow-hidden"
          >
            <Check size={14} />
          </motion.span>
        )}
      </AnimatePresence>
      <span className="whitespace-nowrap">{children}</span>
    </button>
  );
}
