import {
  HeartPulse,
  Landmark,
  Coffee,
  Warehouse,
  ShoppingBag,
  GraduationCap,
  School,
  Hotel,
  Gamepad2,
  Building2,
  Store,
  CalendarClock,
  type LucideIcon,
} from 'lucide-react';
import type { LocalizedText, SectorKey } from '@/lib/types';
import content from './robotSolutionsContent.json';

// ─────────────────────────────────────────────────────────────
// صفحات "حلول الروبوتات" — مصدرها 13 مستند قدمتها الشركة، محتوى كل قطاع
// (فوائد + روبوتات مقترحة + قطاعات تستخدمه + أسباب اختيار الجزري) محفوظ
// بملف robotSolutionsContent.json (ثنائي اللغة، منقول حرفياً من المستندات)
// ─────────────────────────────────────────────────────────────

export interface RobotSolutionBenefit {
  title: LocalizedText;
  description: LocalizedText;
}

export interface RobotSolutionRobot {
  slug: string | null;
  docName: string;
  blurb?: LocalizedText;
  whoIs?: LocalizedText[];
  whatCanDo?: LocalizedText[];
  tag?: LocalizedText;
}

export interface RobotSolutionCategory {
  sectorKey: SectorKey | null;
  title: LocalizedText;
  hook: LocalizedText;
  intro: LocalizedText;
  benefits?: RobotSolutionBenefit[];
  robots: RobotSolutionRobot[];
  industries: LocalizedText[];
  whyChoose: LocalizedText[];
}

export const ROBOT_SOLUTIONS_ORDER = [
  'healthcare',
  'banking',
  'restaurants',
  'hospitality',
  'showroom',
  'malls',
  'universities',
  'schools',
  'gaming',
  'enterprises',
  'warehousing',
  'rental',
] as const;

export type RobotSolutionSlug = (typeof ROBOT_SOLUTIONS_ORDER)[number];

export const ROBOT_SOLUTIONS = content as unknown as Record<
  RobotSolutionSlug,
  RobotSolutionCategory
>;

export const ROBOT_SOLUTION_ICONS: Record<RobotSolutionSlug, LucideIcon> = {
  healthcare: HeartPulse,
  banking: Landmark,
  restaurants: Coffee,
  hospitality: Hotel,
  showroom: Store,
  malls: ShoppingBag,
  universities: GraduationCap,
  schools: School,
  gaming: Gamepad2,
  enterprises: Building2,
  warehousing: Warehouse,
  rental: CalendarClock,
};

/** صورة بطاقة كل تصنيف — تظهر بشبكة الـ12 بطاقة بصفحة "حلول الروبوتات" الرئيسية */
export const ROBOT_SOLUTION_CARD_IMAGES: Record<RobotSolutionSlug, string> = {
  healthcare: '/robot-solutions/healthcare-card.webp',
  banking: '/robot-solutions/banking-card.webp',
  restaurants: '/robot-solutions/restaurants-card.webp',
  hospitality: '/robot-solutions/hospitality-card.webp',
  showroom: '/robot-solutions/showroom-card.webp',
  malls: '/robot-solutions/malls-card.webp',
  universities: '/robot-solutions/universities-card.webp',
  schools: '/robot-solutions/schools-card.webp',
  gaming: '/robot-solutions/gaming-card.webp',
  enterprises: '/robot-solutions/enterprises-card.webp',
  warehousing: '/robot-solutions/warehousing-card.webp',
  rental: '/robot-solutions/rental-card.webp',
};

/** صورة بانر — بس للتصنيفات اللي إلها صورة بانر مخصصة (بدل تأثير Lightfall وحده) */
export const ROBOT_SOLUTION_BANNER_IMAGES: Partial<Record<RobotSolutionSlug, string>> = {
  gaming: '/robot-solutions/gaming-banner.webp',
  restaurants: '/robot-solutions/restaurants-banner.webp',
};

/** كل التصنيفات (Sector) اللي إلها صفحة حلول مخصصة — تُستخدم لتحديد هل بادج القطاع
 *  بصفحة تفاصيل الروبوت يصير رابط لصفحة حلول محددة، أو يبقى بادج غير قابل للنقر */
export const SOLUTION_SECTOR_KEYS = new Set(
  ROBOT_SOLUTIONS_ORDER
    .map((slug) => ROBOT_SOLUTIONS[slug].sectorKey)
    .filter((k): k is SectorKey => k !== null),
);

export function getRobotSolution(slug: string): RobotSolutionCategory | undefined {
  return ROBOT_SOLUTIONS[slug as RobotSolutionSlug];
}
