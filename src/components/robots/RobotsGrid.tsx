'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
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

  /** أول صورة روبوت بكل تصنيف — تُستخدم كصورة مصغّرة ببطاقة التصنيف */
  const categoryThumb = useMemo(() => {
    const map: Partial<Record<RobotCategory, string>> = {};
    for (const c of available) {
      map[c] = robots.find((r) => r.categories.includes(c) && r.image)?.image;
    }
    return map;
  }, [available, robots]);

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
      <p className="text-xs font-medium tracking-wide text-purple-300/80 uppercase">
        {t('filterBy')}
      </p>
      <div className="-mx-5 mt-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
        <div className="flex w-max gap-3 sm:w-auto sm:flex-wrap">
          <CategoryTile active={filter === 'all'} onClick={() => setFilter('all')}>
            {t('allCategories')}
          </CategoryTile>
          {available.map((category) => (
            <CategoryTile
              key={category}
              active={filter === category}
              image={categoryThumb[category]}
              onClick={() => setFilter(category)}
            >
              {CATEGORIES[category].label[locale]}
            </CategoryTile>
          ))}
        </div>
      </div>

      <div className="glass-card mt-5 flex flex-col gap-5 rounded-2xl p-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div>
          <span className="text-xs font-medium tracking-wide text-purple-300/80 uppercase">
            {t('filterBy')} — {t('productType')}
          </span>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {PRODUCT_TYPE_ORDER.map((pt) => (
              <label
                key={pt}
                className="flex cursor-pointer items-center gap-2 text-sm text-purple-100/90 select-none"
              >
                <input
                  type="checkbox"
                  checked={productTypes.has(pt)}
                  onChange={() => toggleProductType(pt)}
                  className="h-4 w-4 rounded border-purple-400/40 bg-transparent accent-purple-500"
                />
                {t(pt === 'rent' ? 'forRent' : pt === 'sale' ? 'forSale' : 'preOrder')}
              </label>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-3 text-sm text-purple-100/90 sm:shrink-0">
          <span className="text-xs font-medium tracking-wide text-purple-300/80 uppercase">
            {t('sortBy')}
          </span>
          <span className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none rounded-lg border border-purple-400/30 bg-purple-950/60 py-2 ps-3 pe-8 text-sm text-white outline-none focus:border-purple-400/60"
            >
              <option value="newest">{t('newest')}</option>
              <option value="nameAsc">{t('nameAZ')}</option>
              <option value="nameDesc">{t('nameZA')}</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-purple-300"
            />
          </span>
        </label>
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
 * بطاقة تصنيف مبسّطة — صورة مصغّرة + اسم التصنيف بخط أوضح، بدون انحناء
 * كامل (rounded-xl فقط) حسب ملاحظة "Simplify the robot category banner
 * and improve typography. No curve".
 */
function CategoryTile({
  active,
  onClick,
  image,
  children,
}: {
  active: boolean;
  onClick: () => void;
  image?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      aria-pressed={active}
      className={`flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 transition sm:min-w-[220px] ${
        active
          ? 'border-purple-400 bg-purple-600/25'
          : 'glass border-purple-500/20 hover:border-purple-400/50'
      }`}
    >
      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/95">
        {image ? (
          <Image src={image} alt="" fill sizes="48px" className="object-contain p-1" />
        ) : (
          <span className="h-full w-full bg-purple-200/70" />
        )}
      </span>
      <span className="text-start text-base font-semibold text-white">{children}</span>
    </motion.button>
  );
}
