import type { LocalizedText } from '@/lib/types';

// ─────────────────────────────────────────────────────────────
// بيانات الشركة — مصدرها كتالوغ الجزري الرسمي
// ملاحظة: صُحّحت الأخطاء المطبعية الواردة بالكتالوغ (ULTRASONIC / actuators)
// ─────────────────────────────────────────────────────────────

export const COMPANY = {
  name: { ar: 'الجزري', en: 'ALJAZARI' },
  slogan: { ar: 'عصر نطمح له', en: 'The era we aspire to' },
  positioning: {
    ar: 'أول شركة عراقية متخصصة في حلول الروبوتات والذكاء الاصطناعي',
    en: 'Iraq’s first company dedicated to robotics and AI solutions',
  },
  about: {
    ar: 'شركة عراقية متخصصة في مجال الروبوتات والذكاء الاصطناعي، تقدم حلولاً مبتكرة مصممة خصيصاً لتطوير الأعمال والمؤسسات من خلال دمج التكنولوجيا الذكية، لتمكين الشركات من تحسين كفاءتها وتبسيط عملياتها.',
    en: 'An Iraqi company working in robotics and artificial intelligence, building tailored solutions that bring smart technology into businesses and institutions so they can work more efficiently and simplify their operations.',
  },
  mission: {
    ar: 'مهمتنا هي تقديم خدمات شاملة ومتقدمة في مجالات الروبوتات والذكاء الاصطناعي والأتمتة وحلول البرمجيات، مع الالتزام بأعلى معايير الجودة والابتكار لتعزيز القدرة التنافسية لعملائنا وتحقيق التنمية المستدامة في العراق.',
    en: 'To deliver complete, advanced services across robotics, artificial intelligence, automation, and software — held to the highest standards of quality and innovation, so our clients compete better and Iraq grows sustainably.',
  },
  vision: {
    ar: 'نطمح أن نكون الشريك الموثوق للأفراد والشركات والمؤسسات الحكومية في تبني التكنولوجيا الحديثة وتحقيق التميز من خلال الابتكار والجودة في تقديم الخدمات.',
    en: 'To be the partner people, companies, and government bodies trust when they adopt new technology — and to earn that trust through innovation and quality of service.',
  },
} as const;

// ═════════════════ خدمات الروبوتات ═════════════════

export interface Service {
  key: string;
  title: LocalizedText;
  description: LocalizedText;
}

export const ROBOT_SERVICES: Service[] = [
  {
    key: 'sales',
    title: { ar: 'بيع الروبوتات', en: 'Robot sales' },
    description: {
      ar: 'توفير روبوتات مخصصة حسب احتياجات المؤسسات.',
      en: 'Robots selected and configured around what your organisation actually needs.',
    },
  },
  {
    key: 'rental',
    title: { ar: 'تأجير الروبوتات', en: 'Robot rental' },
    description: {
      ar: 'حلول مرنة للمناسبات أو الاستخدام المؤقت.',
      en: 'Flexible options for events or short-term use.',
    },
  },
  {
    key: 'maintenance',
    title: { ar: 'صيانة وبرمجة', en: 'Maintenance & programming' },
    description: {
      ar: 'دعم فني كامل، من الصيانة الدورية إلى تخصيص برمجيات الروبوت.',
      en: 'Full technical support, from routine servicing to custom robot software.',
    },
  },
];

// ═════════════════ خدمات الذكاء الاصطناعي ═════════════════

export const AI_SERVICES: Service[] = [
  {
    key: 'agents',
    title: {
      ar: 'وكلاء ذكاء اصطناعي لخدمة العملاء والمبيعات',
      en: 'AI agents for customer service and sales',
    },
    description: {
      ar: 'وكلاء محادثة أذكياء يشتغلون على القنوات الي يستخدمها عملاؤك فعلاً: واتساب، فيسبوك ماسنجر، والموقع الإلكتروني. يديرون الحجوزات ويعالجون الطلبات ويردون فوراً، ويحوّلون الحالات المعقدة إلى فريق الدعم المختص.',
      en: 'Conversational agents that work where your customers already are — WhatsApp, Facebook Messenger, and your website. They handle bookings, process orders, reply instantly, and pass complex cases to your support team.',
    },
  },
  {
    key: 'custom',
    title: { ar: 'حلول ذكاء اصطناعي مخصصة بالكامل', en: 'Fully custom AI solutions' },
    description: {
      ar: 'تطوير منتجات وحلول ذكاء اصطناعي مصممة خصيصاً لرفع الإنتاجية وتسريع الابتكار وتحسين الكفاءة التشغيلية داخل الشركات، تعتمد على نماذج تعلم آلي وذكاء اصطناعي توليدي متقدمة قابلة للتطوير وفق متطلبات العمل.',
      en: 'AI products built specifically for your operation — raising output, speeding up innovation, and tightening day-to-day efficiency. Built on machine learning and generative models that grow with your requirements.',
    },
  },
  {
    key: 'enterprise',
    title: { ar: 'حلول ذكاء اصطناعي مؤسسية', en: 'Enterprise AI solutions' },
    description: {
      ar: 'تصميم أنظمة ذكاء اصطناعي مؤسسية مرنة وقابلة للتوسع لأتمتة العمليات، ودعم التحليلات التنبؤية، والذكاء التكيفي، مع تكامل سلس مع أنظمة ERP وCRM والموارد البشرية والمالية وإدارة المعرفة دون التأثير على سير العمل اليومي.',
      en: 'Scalable enterprise AI that automates processes, supports predictive analytics, and adapts over time — integrating cleanly with your ERP, CRM, HR, finance, and knowledge systems without disrupting daily work.',
    },
  },
  {
    key: 'consulting',
    title: { ar: 'استشارات واستراتيجية الذكاء الاصطناعي', en: 'AI strategy & consulting' },
    description: {
      ar: 'تقييم الاحتياجات والتحديات الحالية للبيانات، تحديد نطاق حلول ووكلاء الذكاء الاصطناعي المناسبة، ووضع خارطة طريق تقنية واضحة للانتقال بسلاسة من مرحلة الفكرة إلى التنفيذ وتحقيق عائد استثماري عملي وقابل للقياس.',
      en: 'We assess your data challenges, scope the right AI solutions and agents, and lay out a clear technical roadmap that carries you from idea to deployment with a return you can measure.',
    },
  },
];

// ═════════════════ الضمان وما بعد البيع ═════════════════

export const WARRANTY = {
  headline: { ar: 'الضمان وخدمات ما بعد البيع', en: 'Warranty & after-sales' },
  summary: {
    ar: 'نلتزم بتقديم ضمان شامل لمدة 12 شهراً يغطي الروبوت والبرمجيات، لضمان استقرار التشغيل وتجربة استخدام موثوقة دون انقطاع.',
    en: 'A full 12-month warranty covering both the robot and its software, so operation stays stable and uninterrupted.',
  },
  months: 12,
  items: [
    { ar: 'دعم فني ذو أولوية وحل المشكلات بشكل سريع', en: 'Priority technical support with fast resolution' },
    { ar: 'تحديثات دورية للبرمجيات', en: 'Regular software updates' },
    { ar: 'خدمات صيانة لضمان بقاء الروبوت في أفضل حالة تشغيلية', en: 'Servicing that keeps the robot in top operating condition' },
    { ar: 'توفير قطع الغيار وإمكانية إضافة تحسينات عند الطلب', en: 'Spare parts, plus upgrades on request' },
    { ar: 'جلسات تدريبية للمستخدمين والعاملين', en: 'Training sessions for users and staff' },
  ] satisfies LocalizedText[],
};

// ═════════════════ الشركاء ═════════════════

export interface Partner {
  name: string;
  logo: string;
  url?: string;
}

// المصدر: ملف "Partners and Clients Logos" الي زودتنا فيه الشركة (٠٧-٠٨-٢٠٢٦) —
// الشعارات الحقيقية تحت عنواني Our Partners و Our clients بالضبط (تجاهلنا
// صور قسم Events لأنها مو شعارات شركاء/عملاء).
export const PARTNERS: Partner[] = [
  { name: 'Nuwa Robotics', logo: '/partners/nuwa-robotics.webp' },
  { name: 'Unitree', logo: '/partners/unitree.webp' },
  { name: 'Pudu Robotics', logo: '/partners/pudu.webp' },
  { name: 'Promobot', logo: '/partners/promobot.webp' },
  { name: 'UBTECH', logo: '/partners/ubtech.webp' },
  { name: 'Action To Action', logo: '/partners/action-to-action.webp' },
  { name: 'Alpha', logo: '/partners/alpha.webp' },
];

// ═════════════════ العملاء ═════════════════

export interface Client {
  name: LocalizedText;
  logo: string;
}

export const CLIENTS: Client[] = [
  { name: { ar: 'أدرا', en: 'Adra' }, logo: '/clients/adra.webp' },
  { name: { ar: 'زوم دنت', en: 'Zoom Dent' }, logo: '/clients/zoom-dent.webp' },
  { name: { ar: 'جامعة المعارف', en: 'University of Al-Ma’arif' }, logo: '/clients/university-of-al-maarif.webp' },
  { name: { ar: 'حكاية الجمال', en: 'Hikayat Aljamal' }, logo: '/clients/hikayat-aljamal.webp' },
  { name: { ar: 'PTC', en: 'PTC Progress Group' }, logo: '/clients/ptc-progress-group.webp' },
  { name: { ar: 'B.G', en: 'B.G' }, logo: '/clients/bg.webp' },
  { name: { ar: 'الغدير', en: 'Al-Ghadeer' }, logo: '/clients/al-ghadeer.webp' },
  { name: { ar: 'الجامعة الإسلامية', en: 'The Islamic University' }, logo: '/clients/islamic-university.webp' },
  { name: { ar: 'نقابة المهندسين العراقية', en: 'Iraqi Engineers Union' }, logo: '/clients/iraqi-engineers-union.webp' },
  { name: { ar: 'مسارات العراق لتكنولوجيا المعلومات', en: 'Masarat Al-Iraq IT' }, logo: '/clients/masarat-aliraq-it.webp' },
  { name: { ar: 'منتدى المدن الذكية العراقي', en: 'Iraqi Smart Cities Forum' }, logo: '/clients/iraqi-smart-cities-forum.webp' },
  { name: { ar: 'زيارة كردستان', en: 'Visit Kurdistan' }, logo: '/clients/visit-kurdistan.webp' },
  { name: { ar: 'جيل', en: 'Jeel' }, logo: '/clients/jeel.webp' },
  { name: { ar: 'بذور بغداد', en: 'Budoor Baghdad' }, logo: '/clients/budoor-baghdad.webp' },
  { name: { ar: 'ميديكو إربيل', en: 'Medico Erbil' }, logo: '/clients/medico-erbil.webp' },
  { name: { ar: 'جامعة الفارابي', en: 'Al-Farabi University' }, logo: '/clients/alfarabi-university.webp' },
  { name: { ar: 'IDF', en: 'IDF' }, logo: '/clients/idf.webp' },
  { name: { ar: 'غرفة تجارة بغداد', en: 'Baghdad Chamber of Commerce' }, logo: '/clients/baghdad-chamber-of-commerce.webp' },
  { name: { ar: 'الكحال للعيون', en: 'Al-Kahhal Eye Center' }, logo: '/clients/alkahhal-eye-center.webp' },
  { name: { ar: 'IEE 10', en: '10th IEE' }, logo: '/clients/10th-iee.webp' },
  { name: { ar: 'VEX IQ Robotics', en: 'VEX IQ Robotics' }, logo: '/clients/vex-iq-robotics.webp' },
  { name: { ar: 'عميل', en: 'Client' }, logo: '/clients/client-q.webp' },
  { name: { ar: 'عميل', en: 'Client' }, logo: '/clients/client-15.webp' },
  { name: { ar: 'عميل', en: 'Client' }, logo: '/clients/client-20.webp' },
];

// ═════════════════ معلومات التواصل ═════════════════
// TODO: تُملأ من الشركة قبل النشر

export const CONTACT = {
  phone: '',
  whatsapp: '',
  email: '',
  address: { ar: 'شارع الرباعي، الزيونة، بغداد، العراق', en: 'Rubaie St, Ziyouna, Baghdad, Iraq' },
  social: {
    instagram: '',
    facebook: '',
    linkedin: '',
    youtube: '',
  },
};
