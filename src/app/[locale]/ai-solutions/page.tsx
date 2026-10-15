import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import AiSolutionsClient from '../../../components/pages/AiSolutionsClient';
import JsonLd from '@/components/seo/JsonLd';
import { ORG_ID, SITE_URL, breadcrumbList, iraqArea } from '@/lib/seo';
import type { Locale, LocalizedText } from '@/lib/types';

// ─────────────────────────────────────────────────────────────
// تحديث 15/10/2026 (خطة SEO / GEO — القسم 5.1):
//  • عنوان ووصف الصفحة صاروا يحتوون الكلمات الي الناس تبحث عنها فعلاً
//    ("حلول الذكاء الاصطناعي في العراق"، "وكلاء واتساب") بدل العنوان العام
//  • بيانات Service (JSON-LD) لكل حل من الحلول الأربعة المعروضة بالصفحة،
//    مربوطة بالجزري (provider) — النصوص نفسها الظاهرة للزائر من ملفات الترجمة
//  • BreadcrumbList: الرئيسية ← حلول الذكاء الاصطناعي
// ─────────────────────────────────────────────────────────────

const SEO_TITLE: LocalizedText = {
  ar: 'حلول الذكاء الاصطناعي في العراق — وكلاء واتساب وحلول مؤسسية',
  en: 'AI Solutions in Iraq — WhatsApp AI Agents & Enterprise AI',
};

const SEO_DESCRIPTION: LocalizedText = {
  ar: 'الجزري تطوّر وكلاء ذكاء اصطناعي لخدمة العملاء والمبيعات على واتساب وماسنجر والمواقع، ومنتجات ذكاء اصطناعي مخصصة، وأنظمة مؤسسية تتكامل مع ERP وCRM، واستشارات الذكاء الاصطناعي للشركات والمؤسسات في العراق.',
  en: 'ALJAZARI builds AI agents for customer service and sales on WhatsApp, Messenger, and websites, custom AI products, enterprise AI that integrates with ERP and CRM, and AI consulting for businesses and institutions in Iraq.',
};

const SERVICE_TYPE: LocalizedText = { ar: 'الذكاء الاصطناعي', en: 'Artificial intelligence' };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale as Locale;
  return {
    title: SEO_TITLE[lang],
    description: SEO_DESCRIPTION[lang],
    alternates: {
      canonical: `/${locale}/ai-solutions`,
      languages: { ar: '/ar/ai-solutions', en: '/en/ai-solutions' },
    },
    openGraph: {
      title: SEO_TITLE[lang],
      description: SEO_DESCRIPTION[lang],
      type: 'website',
      locale: lang === 'ar' ? 'ar_IQ' : 'en_US',
      url: `/${locale}/ai-solutions`,
    },
  };
}

const SOLUTION_KEYS = ['product', 'enterprise', 'agents', 'consulting'] as const;
const BENEFIT_KEYS = ['efficiency', 'decisions', 'cost', 'personalization'] as const;
const PROCESS_KEYS = ['vision', 'design', 'build', 'test', 'deploy', 'upgrade'] as const;
const CUSTOM_STEP_KEYS = ['discover', 'design', 'develop', 'test', 'deploy'] as const;
const CUSTOM_CHIP_KEYS = ['tailored', 'innovation', 'performance'] as const;
const INDUSTRY_KEYS = [
  'enterprises', 'healthcare', 'finance', 'ecommerce', 'logistics', 'realEstate', 'manufacturing',
  'energy', 'education',
] as const;

export default async function AiSolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('aiSolutions');
  const tNav = await getTranslations('nav');
  const lang = locale as Locale;
  const pageUrl = `${SITE_URL}/${locale}/ai-solutions`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      ...SOLUTION_KEYS.map((key) => ({
        '@type': 'Service',
        '@id': `${pageUrl}#${key}`,
        name: t(`solutions.${key}.title`),
        description: t(`solutions.${key}.desc`),
        serviceType: SERVICE_TYPE[lang],
        provider: { '@id': ORG_ID },
        areaServed: iraqArea(lang),
        url: pageUrl,
      })),
      breadcrumbList([
        { name: tNav('home'), path: `/${locale}` },
        { name: tNav('aiSolutions'), path: `/${locale}/ai-solutions` },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <AiSolutionsClient
        title={t('title')}
        solutionsHeading={t('solutionsHeading')}
        solutions={SOLUTION_KEYS.map((key) => ({
          key,
          title: t(`solutions.${key}.title`),
          desc: t(`solutions.${key}.desc`),
        }))}
        interfaceHeading={t('interfaceHeading')}
        interfaceBenefits={BENEFIT_KEYS.map((key) => ({
          key,
          label: t(`interfaceBenefits.${key}`),
        }))}
        customerHeading={t('customerHeading')}
        process={PROCESS_KEYS.map((key) => ({
          key,
          label: t(`process.${key}`),
        }))}
        industriesHeading={t('industriesHeading')}
        industries={INDUSTRY_KEYS.map((key) => ({
          key,
          title: t(`industries.${key}.title`),
          desc: t(`industries.${key}.desc`),
        }))}
        customProduct={{
          tag: t('customProduct.tag'),
          title: t('solutions.product.title'),
          desc: t('solutions.product.desc'),
          chips: CUSTOM_CHIP_KEYS.map((key) => t(`customProduct.chips.${key}`)),
          footerTag: t('customProduct.footerTag'),
          steps: CUSTOM_STEP_KEYS.map((key) => ({
            key,
            title: t(`customProduct.steps.${key}.title`),
            desc: t(`customProduct.steps.${key}.desc`),
          })),
        }}
      />
    </>
  );
}
