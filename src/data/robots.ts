import type { Robot, RobotCategory } from '@/lib/types';

// ─────────────────────────────────────────────────────────────
// بيانات الروبوتات — مصدرها كتالوغ شركة الجزري الرسمي
//
// قواعد التعديل:
//  • الأسماء التجارية (Pepper, Timo…) تبقى لاتينية بالنسختين
//  • المصطلحات التقنية (LiDAR, SLAM, ROS 2, IMU) تبقى لاتينية بالنسختين
//  • القيم الرقمية تنكتب مرة وحدة بحقل value وما تتكرر
//  • تضيفين روبوت جديد؟ انسخي أي عنصر وبدّلي محتواه، والموقع كله يلتقطه تلقائياً
// ─────────────────────────────────────────────────────────────

export const ROBOTS: Robot[] = [
  // ══════════════════════ بشرية ══════════════════════
  {
    slug: 'pepper',
    name: 'Pepper',
    brand: 'SoftBank Robotics',
    categories: ['humanoid'],
    order: 1,
    featured: true,
    image: '/robots/pepper.webp',
    tagline: { ar: 'روبوت بشري', en: 'Humanoid robot' },
    summary: {
      ar: 'روبوت بشري يقرأ تعبير الوجه ويتفاعل وياه، يستقبل الزائر ويجاوب على أسئلته ويعرض المعلومات على شاشة صدره. مستخدم بالمستشفيات والمدارس وصالات الاستقبال.',
      en: 'A humanoid robot that reads facial expressions and responds to them. It greets visitors, answers questions, and shows information on its chest display — already at work in hospitals, schools, and reception halls.',
    },
    features: [
      {
        title: { ar: 'التعرف على المشاعر', en: 'Emotion recognition' },
        description: {
          ar: 'يحلل تعابير الوجه ويتابعها ويتفاعل بناءً عليها.',
          en: 'Reads and tracks facial expressions, then adapts how it responds.',
        },
      },
      {
        title: { ar: 'تفاعل صوتي', en: 'Voice interaction' },
        description: {
          ar: 'ميكروفونات ومكبرات صوت للتحدث والاستماع.',
          en: 'Microphones and speakers for listening and speaking.',
        },
      },
      {
        title: { ar: 'حركة ودوران 360°', en: '360° movement' },
        description: {
          ar: 'عجلات للحركة والدوران بزاوية كاملة.',
          en: 'Wheels that let it move and rotate a full circle.',
        },
      },
      {
        title: { ar: 'تخصيص الحركة', en: 'Custom motion' },
        description: {
          ar: 'برمجة حركات مخصصة عبر Animation Studio.',
          en: 'Build custom gestures and routines in Animation Studio.',
        },
      },
      {
        title: { ar: 'ذكاء اصطناعي', en: 'AI-powered' },
        description: {
          ar: 'خوارزميات متقدمة للتفاعل واتخاذ القرارات.',
          en: 'Advanced algorithms drive its interaction and decisions.',
        },
      },
    ],
    specs: [
      { label: { ar: 'الشاشة', en: 'Display' }, value: 'شاشة لمس عالية الجودة' },
      { label: { ar: 'الاستشعار', en: 'Sensing' }, value: '3D sensor + gyroscopes' },
      { label: { ar: 'الملاحة', en: 'Navigation' }, value: 'Laser sensor + infrared sonar' },
    ],
    hardware: [
      { label: { ar: 'مستشعر رأس', en: 'Head sensor' }, side: 'start' },
      { label: { ar: 'كاميرات', en: 'Cameras' }, side: 'start' },
      { label: { ar: 'شاشة لمس عالية الجودة', en: 'High-quality touchscreen' }, side: 'start' },
      { label: { ar: 'مستشعرات اليدين', en: 'Hand sensors' }, side: 'start' },
      { label: { ar: 'مايكروفون', en: 'Microphone' }, side: 'end' },
      { label: { ar: 'سبيكر', en: 'Speaker' }, side: 'end' },
      { label: { ar: 'مستشعر 3D', en: '3D sensor' }, side: 'end' },
      { label: { ar: 'Gyroscopes', en: 'Gyroscopes' }, side: 'end' },
      { label: { ar: 'Laser sensor', en: 'Laser sensor' }, side: 'end' },
      { label: { ar: 'سونار بالأشعة', en: 'Infrared sonar' }, side: 'end' },
    ],
    sectors: ['healthcare', 'education', 'retail', 'malls', 'events'],
  },
  {
    slug: 'timo',
    name: 'Timo',
    brand: 'Alpha',
    categories: ['humanoid'],
    order: 2,
    featured: true,
    image: '/robots/timo.webp',
    tagline: { ar: 'روبوت بشري', en: 'Humanoid robot' },
    summary: {
      ar: 'روبوت خدمة ذكي يقود الزوار بجولات إرشادية، يرحّب بيهم ويجاوب استفساراتهم، ويقدر يسوي دوريات أمنية على مدار 24 ساعة.',
      en: 'A smart service robot that leads guided tours, welcomes guests and answers their questions, and can run security patrols around the clock.',
    },
    features: [
      {
        title: { ar: 'الجولات الإرشادية', en: 'Guided tours' },
        description: {
          ar: 'يقود الزوار إلى المواقع المحددة ويشرحلهم الأماكن أثناء الزيارة.',
          en: 'Walks visitors to specific locations and explains each stop along the way.',
        },
      },
      {
        title: { ar: 'التفاعل الصوتي الذكي', en: 'Smart voice interaction' },
        description: {
          ar: 'نموذج صوتي Smartstar يتيح فهماً دلالياً طبيعياً وشخصية تفاعلية.',
          en: 'The Smartstar voice model gives it natural language understanding and a personality of its own.',
        },
      },
      {
        title: { ar: 'الترحيب الذكي', en: 'Smart greeting' },
        description: {
          ar: 'متحدث ترويجي يقلل الحاجة للموارد البشرية ويحسّن تجربة الخدمة.',
          en: 'Doubles as a promotional host, easing staffing pressure while improving the guest experience.',
        },
      },
      {
        title: { ar: 'التفاعل الترفيهي', en: 'Entertainment' },
        description: {
          ar: 'غناء وسرد قصص وألعاب لفظية وإخبار نكات.',
          en: 'Sings, tells stories and jokes, and plays word games.',
        },
      },
      {
        title: { ar: 'تجنب العقبات التلقائي', en: 'Automatic obstacle avoidance' },
        description: {
          ar: 'تكنولوجيا ليدار SLAM لتجاوز العقبات وإعادة تخطيط الطريق.',
          en: 'LiDAR SLAM lets it steer around obstacles and re-plan its route on the fly.',
        },
      },
      {
        title: { ar: 'خدمة الأمن والدوريات', en: 'Security patrols' },
        description: {
          ar: 'دوريات مجدولة على مدار 24 ساعة لاكتشاف المخاطر والتحذير منها.',
          en: 'Runs scheduled patrols 24/7, flagging hazards in the surrounding area.',
        },
      },
    ],
    specs: [
      { label: { ar: 'النموذج', en: 'Model' }, value: 'Timo AI service robot' },
      { label: { ar: 'المادة', en: 'Material' }, value: 'ABS' },
      { label: { ar: 'الوزن', en: 'Weight' }, value: '19 KG' },
      { label: { ar: 'حجم الشاشة', en: 'Screen size' }, value: '13.3 inch' },
      { label: { ar: 'السرعة', en: 'Speed' }, value: '0 – 1.2 m/s' },
      { label: { ar: 'دقة تحديد المواقع', en: 'Positioning accuracy' }, value: '±50 mm' },
      { label: { ar: 'سعة البطارية', en: 'Battery capacity' }, value: '15 Ah' },
      { label: { ar: 'زمن الشحن', en: 'Charging time' }, value: '2 – 3 h' },
      { label: { ar: 'زمن التحمل', en: 'Endurance' }, value: '≥ 10 h' },
      { label: { ar: 'طريقة التنقل', en: 'Navigation' }, value: 'Laser autonomous navigation' },
      { label: { ar: 'نظام التحكم', en: 'Control system' }, value: 'Android' },
    ],
    hardware: [
      { label: { ar: 'كاميرا واسعة الزاوية Ultra HP', en: 'Ultra HP wide-angle camera' }, side: 'start' },
      { label: { ar: 'شاشة عالية الدقة', en: 'High-resolution display' }, side: 'start' },
      { label: { ar: 'مكبر صوت عالي الدقة', en: 'High-fidelity speaker' }, side: 'start' },
      { label: { ar: 'تجنب العقبات الديناميكي Ultrasonic', en: 'Dynamic ultrasonic obstacle avoidance' }, side: 'start' },
      { label: { ar: 'هيكل توازن عالي', en: 'High-stability chassis' }, side: 'start' },
      { label: { ar: 'مصفوفة ميكروفونات', en: 'Microphone array' }, side: 'end' },
      { label: { ar: 'ذراع مرن', en: 'Flexible arm' }, side: 'end' },
      { label: { ar: 'ملاحة ليدار', en: 'LiDAR navigation' }, side: 'end' },
    ],
    sectors: ['hospitality', 'malls', 'museums', 'security', 'banking', 'events'],
  },
  {
    slug: 'cruzr',
    name: 'CRUZR',
    brand: 'UBTECH',
    categories: ['humanoid'],
    order: 3,
    featured: true,
    image: '/robots/cruzr.webp',
    tagline: { ar: 'روبوت بشري', en: 'Humanoid robot' },
    summary: {
      ar: 'روبوت بتصميم بشري بأذرع مرنة، يستقبل الزوار ويوجههم داخل المؤسسة، ويربط الفروع بمكالمات فيديو عالية الدقة عبر نظام U-Meeting.',
      en: 'A humanoid robot with smooth, flexible arms. It welcomes visitors and guides them through your building, and links branches together over HD video calls with U-Meeting.',
    },
    features: [
      {
        title: { ar: 'تفاعل متعدد الأنماط', en: 'Multi-modal interaction' },
        description: {
          ar: 'تفاعل صوتي وإيماءات وتفاعل نصي معاً.',
          en: 'Combines voice, gesture, and on-screen text in one conversation.',
        },
      },
      {
        title: { ar: 'التوجيه الذكي', en: 'Smart wayfinding' },
        description: {
          ar: 'قيادة الزوار داخل المؤسسة إلى الأقسام والمواقع المخصصة.',
          en: 'Leads visitors to the right department or desk inside your building.',
        },
      },
      {
        title: { ar: 'حماية شاملة', en: 'Full-perimeter safety' },
        description: {
          ar: 'حساسات توقف الحركة فوراً عند وجود عقبة.',
          en: 'Sensors halt movement the moment something blocks its path.',
        },
      },
      {
        title: { ar: 'شحن تلقائي', en: 'Self-charging' },
        description: {
          ar: 'يرجع لمحطة الشحن ذاتياً، وشحنة تدوم حتى 8 ساعات.',
          en: 'Returns to its dock on its own; a full charge lasts up to 8 hours.',
        },
      },
      {
        title: { ar: 'إمكانية التكامل', en: 'Open integration' },
        description: {
          ar: 'يدعم إضافة خدمات خارجية عبر واجهات برمجية مفتوحة.',
          en: 'Open APIs let you plug in your own services.',
        },
      },
      {
        title: { ar: 'إدارة مركزية', en: 'Central control' },
        description: {
          ar: 'تحكم مركزي بالخرائط والحركة والفيديو من مكان واحد.',
          en: 'Manage maps, movement, and video from a single dashboard.',
        },
      },
    ],
    specs: [
      { label: { ar: 'الشاشة', en: 'Display' }, value: '10.1 inch touchscreen' },
      { label: { ar: 'الكاميرا', en: 'Camera' }, value: '13 MP HD + depth camera' },
      { label: { ar: 'كاميرا حرارية', en: 'Thermal camera' }, value: 'مدمجة' },
      { label: { ar: 'مدى الميكروفون', en: 'Microphone range' }, value: '3 – 5 m' },
      { label: { ar: 'مكبرات الصوت', en: 'Speakers' }, value: '2 × 3 inch' },
      { label: { ar: 'زمن التشغيل', en: 'Runtime' }, value: 'حتى 8 ساعات' },
      { label: { ar: 'الملاحة', en: 'Navigation' }, value: 'LiDAR + radar' },
    ],
    hardware: [
      { label: { ar: 'كاميرا حرارية', en: 'Thermal camera' }, side: 'start' },
      { label: { ar: 'كاميرا 13mp HD', en: '13 MP HD camera' }, side: 'start' },
      { label: { ar: 'شاشة لمس عالية الوضوح 10.1 inch', en: '10.1-inch HD touchscreen' }, side: 'start' },
      { label: { ar: 'مؤشر حالة LED', en: 'LED status ring' }, side: 'start' },
      { label: { ar: 'مستشعر ultrasonic', en: 'Ultrasonic sensor' }, side: 'start' },
      { label: { ar: 'نظام الشحن التلقائي', en: 'Auto-charging system' }, side: 'start' },
      { label: { ar: 'مايكروفون يغطي 3-5 أمتار', en: 'Microphone (3–5 m range)' }, side: 'end' },
      { label: { ar: 'مستشعر TOF', en: 'TOF sensor' }, side: 'end' },
      { label: { ar: 'مكبر صوت بحجم 3 inch', en: '3-inch speaker' }, side: 'end' },
      { label: { ar: 'Depth camera', en: 'Depth camera' }, side: 'end' },
      { label: { ar: 'نظام الملاحة بالليدار والرادار', en: 'LiDAR + radar navigation' }, side: 'end' },
      { label: { ar: 'عجلتين القيادة', en: 'Drive wheels' }, side: 'end' },
    ],
    sectors: ['banking', 'hospitality', 'airports', 'museums', 'healthcare', 'education'],
  },
  {
    slug: 'wnno',
    name: 'Wnno',
    brand: '',
    categories: ['humanoid'],
    order: 4,
    image: '/robots/wnno.webp',
    tagline: { ar: 'روبوت بشري', en: 'Humanoid robot' },
    summary: {
      ar: 'روبوت بشري مجهّز للمعاملات: يتعرف على الوجوه، يطبع الإيصالات والصور، يوزّع البطاقات، ويستلم الدفع إلكترونياً — كل هذا بمكان واحد.',
      en: 'A humanoid built for transactions: it recognises faces, prints receipts and photos, dispenses cards, and takes electronic payments — all at one counter.',
    },
    features: [
      {
        title: { ar: 'التعرف على الوجوه', en: 'Face recognition' },
        description: {
          ar: 'كاميرا تعرّف وكاميرا كشف للوجه تميّز الزائر وتتفاعل معه.',
          en: 'Separate recognition and detection cameras identify each visitor and respond to them.',
        },
      },
      {
        title: { ar: 'التفاعل الصوتي', en: 'Voice interaction' },
        description: {
          ar: 'حوار طبيعي مع المستخدمين عبر مصفوفة ميكروفونات ومكبرات صوت.',
          en: 'Natural conversation through a microphone array and speakers.',
        },
      },
      {
        title: { ar: 'الطباعة والإصدار', en: 'Printing & issuing' },
        description: {
          ar: 'طابعة إيصالات وطابعة صور وموزّع بطاقات مدمجة بالجسم.',
          en: 'Receipt printer, photo printer, and card dispenser built into the body.',
        },
      },
      {
        title: { ar: 'الدفع الإلكتروني', en: 'Electronic payment' },
        description: {
          ar: 'جهاز دفع مدمج يخلي المعاملة تكتمل عند الروبوت مباشرة.',
          en: 'An onboard payment terminal closes the transaction right at the robot.',
        },
      },
      {
        title: { ar: 'الربط مع الذكاء الاصطناعي', en: 'AI integration' },
        description: {
          ar: 'إمكانية ربطه بخدمات ذكاء اصطناعي حسب حاجة المؤسسة.',
          en: 'Connects to AI services tailored to your organisation.',
        },
      },
    ],
    specs: [
      { label: { ar: 'الشاشة', en: 'Display' }, value: 'شاشة لمس تفاعلية' },
      { label: { ar: 'الكاميرات', en: 'Cameras' }, value: 'Face recognition + face detection' },
      { label: { ar: 'الملاحة', en: 'Navigation' }, value: 'LiDAR + IMU + مستشعرات عوائق' },
    ],
    hardware: [
      { label: { ar: 'مايكروفون', en: 'Microphone' }, side: 'start' },
      { label: { ar: 'مصفوفة RGB لعرض التفاعلات والعواطف', en: 'RGB array for expressions' }, side: 'start' },
      { label: { ar: 'شاشة لمس: عرض تفاعلي', en: 'Interactive touchscreen' }, side: 'start' },
      { label: { ar: 'موزع بطاقات', en: 'Card dispenser' }, side: 'start' },
      { label: { ar: 'طابعة إيصالات', en: 'Receipt printer' }, side: 'start' },
      { label: { ar: 'كاميرا البحث عن محطة شحن', en: 'Dock-finding camera' }, side: 'start' },
      { label: { ar: 'منصة الحركة', en: 'Mobile base' }, side: 'start' },
      { label: { ar: 'Face recognition camera', en: 'Face recognition camera' }, side: 'end' },
      { label: { ar: 'Face detection camera', en: 'Face detection camera' }, side: 'end' },
      { label: { ar: 'جهاز الدفع الإلكتروني', en: 'Payment terminal' }, side: 'end' },
      { label: { ar: 'مجموعة ميكروفونات', en: 'Microphone array' }, side: 'end' },
      { label: { ar: 'مكبرات صوت', en: 'Speakers' }, side: 'end' },
      { label: { ar: 'طابعة صور', en: 'Photo printer' }, side: 'end' },
      { label: { ar: 'Lidar', en: 'Lidar' }, side: 'end' },
      { label: { ar: 'مستشعرات العوائق', en: 'Obstacle sensors' }, side: 'end' },
      { label: { ar: 'عجلات القيادة', en: 'Drive wheels' }, side: 'end' },
    ],
    sectors: ['banking', 'malls', 'airports', 'hospitality', 'retail'],
  },

  // ══════════════════════ خدمية ══════════════════════
  {
    slug: 'bellabot-pro',
    name: 'BellaBot Pro',
    brand: 'Pudu Robotics',
    categories: ['service'],
    order: 1,
    featured: true,
    image: '/robots/bellabot-pro.webp',
    gallery: ['/robots/bellabot-pro.webp', '/robots/bellabot-pro-2.webp'],
    tagline: { ar: 'روبوت خدمي', en: 'Service robot' },
    summary: {
      ar: 'روبوت توصيل بشخصية محبوبة: يوصّل الطلبات للطاولة، يجمع الصحون، ويحوّل عيد ميلاد الزبون إلى لحظة احتفال بموسيقى وإضاءة.',
      en: 'A delivery robot with real personality: it runs orders to the table, clears dishes, and turns a customer’s birthday into a moment with music and lights.',
    },
    features: [
      {
        title: { ar: 'التوصيل', en: 'Delivery' },
        description: {
          ar: 'توصيل الطعام أو الأشياء من نقطة إلى أخرى.',
          en: 'Carries food or items from one point to another.',
        },
      },
      {
        title: { ar: 'التجميع', en: 'Bussing' },
        description: {
          ar: 'تجميع الصحون وإعادتها إلى المطبخ أو المخزن.',
          en: 'Collects used dishes and returns them to the kitchen.',
        },
      },
      {
        title: { ar: 'وضع عيد الميلاد', en: 'Birthday mode' },
        description: {
          ar: 'يشغّل موسيقى احتفالية أثناء توصيل الكعكة.',
          en: 'Plays a celebration track while it delivers the cake.',
        },
      },
      {
        title: { ar: 'الإرشاد', en: 'Guiding' },
        description: {
          ar: 'توجيه الضيوف أو الزبائن إلى الوجهات أو الطاولات.',
          en: 'Walks guests to their table or destination.',
        },
      },
      {
        title: { ar: 'الجولة الترويجية', en: 'Promo rounds' },
        description: {
          ar: 'يقوم بجولة حول المكان لعرض الإعلانات والتفاعل مع الزبائن.',
          en: 'Tours the floor showing promotions and engaging customers.',
        },
      },
      {
        title: { ar: 'التعرف على الأطباق', en: 'Dish detection' },
        description: {
          ar: 'خاصية تتعرف على نوع الأطباق المحمّلة.',
          en: 'Detects what has been loaded onto its trays.',
        },
      },
    ],
    specs: [
      { label: { ar: 'الشاشة', en: 'Display' }, value: 'شاشة إعلانية لعرض الصور والفيديو' },
      { label: { ar: 'البطارية', en: 'Battery' }, value: 'قابلة للاستبدال أثناء العمل' },
      { label: { ar: 'الشحن', en: 'Charging' }, value: 'شحن ذكي سريع' },
    ],
    hardware: [
      { label: { ar: 'شاشة إعلانية لعرض الصور والفيديوهات', en: 'Advertising display' }, side: 'start' },
      { label: { ar: 'خاصية التعرف على نوع الأطباق', en: 'Dish-type detection' }, side: 'end' },
    ],
    sectors: ['restaurants', 'hospitality', 'healthcare', 'malls'],
  },
  {
    slug: 'kittybot-pro',
    name: 'Kittybot Pro',
    brand: 'Pudu Robotics',
    categories: ['service'],
    order: 2,
    image: '/robots/kittybot-pro.webp',
    gallery: ['/robots/kittybot-pro.webp', '/robots/kittybot-pro-2.webp'],
    tagline: { ar: 'روبوت خدمي', en: 'Service robot' },
    summary: {
      ar: 'روبوت خدمي بستة أوضاع تشغيل، يجمع بين التوصيل والإرشاد والإعلان — شاشته تعرض عروضك وهو يتنقل بين الزبائن.',
      en: 'A service robot with six working modes that combines delivery, guiding, and advertising — its screen runs your offers while it moves among customers.',
    },
    features: [
      {
        title: { ar: 'وضع الإرشاد', en: 'Guide mode' },
        description: {
          ar: 'يوجّه الزبائن والزوار إلى الطاولات أو الغرف أو أي نقطة محددة.',
          en: 'Escorts customers to a table, a room, or any set point.',
        },
      },
      {
        title: { ar: 'وضع التوصيل', en: 'Delivery mode' },
        description: {
          ar: 'توصيل الأطعمة والمشروبات إلى الطاولات وغرف الانتظار.',
          en: 'Brings food and drinks to tables and waiting rooms.',
        },
      },
      {
        title: { ar: 'وضع التجميع', en: 'Bussing mode' },
        description: {
          ar: 'يجمع الصحون الفارغة بكفاءة دون إزعاج الزبائن أو الموظفين.',
          en: 'Clears empty dishes without getting in anyone’s way.',
        },
      },
      {
        title: { ar: 'وضع عيد الميلاد', en: 'Birthday mode' },
        description: {
          ar: 'أغانٍ مفضلة وفيديوهات على الشاشة وإضاءة احتفالية.',
          en: 'Favourite songs, on-screen video, and celebration lighting.',
        },
      },
      {
        title: { ar: 'وضع جذب العملاء', en: 'Attract mode' },
        description: {
          ar: 'يعرض المنتجات والتخفيضات على شاشته لتعزيز المبيعات.',
          en: 'Puts products and discounts on screen to lift sales.',
        },
      },
      {
        title: { ar: 'وضع الجولة', en: 'Cruise mode' },
        description: {
          ar: 'يتحرك بين نقاط محددة على الخريطة للترويج والتفاعل.',
          en: 'Moves between mapped points to promote and engage.',
        },
      },
    ],
    specs: [
      { label: { ar: 'الأبعاد', en: 'Dimensions' }, value: '435 × 450 × 1120 mm' },
      { label: { ar: 'الوزن', en: 'Weight' }, value: '38 kg' },
      { label: { ar: 'القدرة الاستيعابية', en: 'Load capacity' }, value: '30 kg' },
      { label: { ar: 'عمر البطارية', en: 'Battery life' }, value: '8 h' },
      { label: { ar: 'سعة البطارية', en: 'Battery capacity' }, value: '25.6 Ah' },
      { label: { ar: 'زمن الشحن', en: 'Charging time' }, value: '4 h' },
      { label: { ar: 'سرعة الرحلة', en: 'Travel speed' }, value: 'Max 1.2 m/s' },
      { label: { ar: 'ارتفاع تجاوز العوائق', en: 'Obstacle clearance (height)' }, value: 'Max 7 mm' },
      { label: { ar: 'عرض تجاوز العوائق', en: 'Obstacle clearance (width)' }, value: 'Max 35 mm' },
      { label: { ar: 'زاوية الصعود', en: 'Climbing angle' }, value: '5°' },
    ],
    hardware: [
      { label: { ar: 'خاصية التعرف على وجود أطباق', en: 'Tray-load detection' }, side: 'end' },
    ],
    sectors: ['restaurants', 'hospitality', 'healthcare', 'offices', 'events'],
  },
  {
    slug: 'pudubot',
    name: 'Pudubot',
    brand: 'Pudu Robotics',
    categories: ['service'],
    order: 3,
    image: '/robots/pudubot.webp',
    tagline: { ar: 'روبوت خدمي', en: 'Service robot' },
    summary: {
      ar: 'روبوت توصيل مصنوع بالكامل من سبيكة ألمنيوم بدرجة الطيران، بصوانٍ قابلة للتعديل وليدار مقاوم لأشعة الشمس — مبني للاشتغال المتواصل.',
      en: 'A delivery robot built entirely from aviation-grade aluminium, with adjustable trays and a sunlight-resistant LiDAR — made for continuous shifts.',
    },
    features: [
      {
        title: { ar: 'ليدار من الجيل الجديد', en: 'Next-generation LiDAR' },
        description: {
          ar: 'ليدار مقاوم لأشعة الشمس لتشغيل أكثر أماناً.',
          en: 'Sunlight-resistant LiDAR for safer operation in bright spaces.',
        },
      },
      {
        title: { ar: 'تحديد الموقع البصري', en: 'Visual positioning' },
        description: {
          ar: 'نظام رؤية جديد يوفر دقة أعلى بتحديد الموقع والحركة.',
          en: 'A new vision system delivers tighter positioning and movement accuracy.',
        },
      },
      {
        title: { ar: 'تجنب العوائق ثلاثي الأبعاد', en: '3D obstacle avoidance' },
        description: {
          ar: 'مستشعرات رؤية ثلاثية الأبعاد لتوصيل أكثر أماناً.',
          en: '3D vision sensors keep deliveries clear of obstacles.',
        },
      },
      {
        title: { ar: 'نظام تعليق جديد', en: 'New suspension' },
        description: {
          ar: 'يتعامل بسهولة مع المطبّات والعوائق أثناء الحركة.',
          en: 'Handles bumps and thresholds smoothly while moving.',
        },
      },
      {
        title: { ar: 'صوانٍ قابلة للتعديل', en: 'Adjustable trays' },
        description: {
          ar: 'صوانٍ معدنية قابلة للتعديل لتناسب مختلف الاستخدامات.',
          en: 'Metal trays adjust to fit whatever you need to carry.',
        },
      },
      {
        title: { ar: 'شريط إضاءة تفاعلي', en: 'Interactive light strip' },
        description: {
          ar: 'تعليمات تشغيل أوضح وأسهل للمستخدم.',
          en: 'Makes its status readable at a glance.',
        },
      },
    ],
    specs: [
      { label: { ar: 'الأبعاد', en: 'Dimensions' }, value: '516 × 500 × 1288 mm' },
      { label: { ar: 'الوزن', en: 'Weight' }, value: 'PD1 – 35 kg / PD6 – 40 kg' },
      { label: { ar: 'المواد', en: 'Materials' }, value: 'ABS / Aviation-grade aluminium alloy' },
      { label: { ar: 'زمن الشحن', en: 'Charging time' }, value: '4 h' },
      { label: { ar: 'عمر البطارية', en: 'Battery life' }, value: '10 – 24 h (قابلة للاستبدال)' },
      { label: { ar: 'السرعة الآمنة', en: 'Safety speed' }, value: '0.5 – 1.2 m/s' },
      { label: { ar: 'زاوية الصعود', en: 'Climbing angle' }, value: '< 5°' },
      { label: { ar: 'الحمولة', en: 'Load capacity' }, value: 'Max 30 kg — PD1: 13 kg/tray, PD6: 10 kg/tray' },
      { label: { ar: 'طريقة تحديد الموقع', en: 'Positioning method' }, value: 'Marker positioning' },
      { label: { ar: 'أقصى ارتفاع سقف', en: 'Max ceiling height' }, value: '8 m' },
    ],
    hardware: [
      { label: { ar: 'شاشة LCD', en: 'LCD screen' }, side: 'start' },
      { label: { ar: 'أطباق التوصيل', en: 'Delivery trays' }, side: 'start' },
      { label: { ar: 'حساس LiDAR الأساسي', en: 'Primary LiDAR' }, side: 'start' },
      { label: { ar: 'حساس رؤية عميق', en: 'Depth vision sensor' }, side: 'start' },
      { label: { ar: 'حساس LiDAR ثانوي', en: 'Secondary LiDAR' }, side: 'start' },
      { label: { ar: 'حساس الرؤية العلوي', en: 'Top vision sensor' }, side: 'end' },
      { label: { ar: 'شريط ضوئي', en: 'Light strip' }, side: 'end' },
      { label: { ar: 'منفذ Type C', en: 'Type-C port' }, side: 'end' },
      { label: { ar: 'عجلات مساعدة', en: 'Auxiliary wheels' }, side: 'end' },
      { label: { ar: 'عجلات الحركة', en: 'Drive wheels' }, side: 'end' },
    ],
    sectors: ['restaurants', 'hospitality', 'healthcare', 'offices'],
  },

  // ══════════════════════ منزلية ══════════════════════
  {
    slug: 'sanbot',
    name: 'Sanbot',
    brand: 'Qihan Technology',
    categories: ['service'],
    order: 1,
    image: '/robots/sanbot.webp',
    tagline: { ar: 'روبوت خدمي', en: 'Service robot' },
    summary: {
      ar: 'مساعد منزلي ذكي يدعم Alexa: يراقب البيت، يجري مكالمات مرئية، يشغّل الموسيقى، ويلعب مع الأطفال ألعاب تفاعلية.',
      en: 'A smart home companion with Alexa support: it keeps an eye on the house, makes video calls, plays music, and runs interactive games with the kids.',
    },
    features: [
      {
        title: { ar: 'تحكم صوتي', en: 'Voice control' },
        description: {
          ar: 'أوامر صوتية للتحكم بالروبوت وبالأجهزة المنزلية.',
          en: 'Voice commands control the robot and connected home devices.',
        },
      },
      {
        title: { ar: 'مكالمات مرئية وصوتية', en: 'Video & voice calls' },
        description: {
          ar: 'تواصل مع العائلة بالصوت والصورة من أي مكان.',
          en: 'Stay in touch with family by voice or video from anywhere.',
        },
      },
      {
        title: { ar: 'مراقبة المنزل عن بُعد', en: 'Remote home monitoring' },
        description: {
          ar: 'متابعة البيت عن بُعد عبر كاميراته وحساساته.',
          en: 'Check on the house remotely through its cameras and sensors.',
        },
      },
      {
        title: { ar: 'ترفيه عائلي', en: 'Family entertainment' },
        description: {
          ar: 'تشغيل الموسيقى وألعاب تفاعلية للأطفال.',
          en: 'Plays music and runs interactive games for children.',
        },
      },
      {
        title: { ar: 'متجر تطبيقات', en: 'App store' },
        description: {
          ar: 'تطبيقات إضافية تتوسع بقدرات الروبوت.',
          en: 'Extra apps extend what the robot can do.',
        },
      },
    ],
    specs: [
      { label: { ar: 'الشاشة', en: 'Display' }, value: '10 inch touchscreen' },
      { label: { ar: 'الكاميرا', en: 'Camera' }, value: '8.0 MP HD' },
      { label: { ar: 'كاميرات RGB', en: 'RGB cameras' }, value: '10 ×' },
      { label: { ar: 'الاستشعار', en: 'Sensing' }, value: '3D sensor + PIR + IR' },
      { label: { ar: 'الحركة', en: 'Movement' }, value: 'عجلات ثلاثية + ذراع متحركة' },
      { label: { ar: 'المساعد الصوتي', en: 'Voice assistant' }, value: 'Alexa' },
    ],
    hardware: [
      { label: { ar: 'كاميرا RGB ×10 وحساس 3D', en: '10 × RGB camera + 3D sensor' }, side: 'start' },
      { label: { ar: 'مايكروفون', en: 'Microphone' }, side: 'start' },
      { label: { ar: 'ذراع متحركة', en: 'Articulated arm' }, side: 'start' },
      { label: { ar: 'حساس أشعة تحت الحمراء', en: 'Infrared sensor' }, side: 'start' },
      { label: { ar: 'عجلات ثلاثية', en: 'Three-wheel base' }, side: 'start' },
      { label: { ar: 'حساس لمس', en: 'Touch sensor' }, side: 'end' },
      { label: { ar: 'ضوء كشاف', en: 'Spotlight' }, side: 'end' },
      { label: { ar: 'شاشة لمس 10 inch', en: '10-inch touchscreen' }, side: 'end' },
      { label: { ar: 'كاميرا 8.0 MP HD', en: '8.0 MP HD camera' }, side: 'end' },
      { label: { ar: 'حساس PIR', en: 'PIR sensor' }, side: 'end' },
      { label: { ar: 'حساس تخطي العوائق', en: 'Obstacle-crossing sensor' }, side: 'end' },
    ],
    sectors: ['home', 'education', 'healthcare'],
  },

  // ══════════════════════ تعليمية ══════════════════════
  {
    slug: 'nao',
    name: 'NAO',
    brand: 'SoftBank Robotics',
    categories: ['educational'],
    order: 1,
    featured: true,
    image: '/robots/nao.webp',
    tagline: { ar: 'روبوت تعليمي', en: 'Educational robot' },
    summary: {
      ar: 'روبوت بشري صغير بمفاصل كاملة، يمشي ويتكلم ويتعرف على الوجوه والمشاعر. يُستخدم بتعليم اللغات، وبمساعدة أطفال التوحد على تحسين مهارات التواصل، وبأبحاث تحليل السلوك.',
      en: 'A small fully articulated humanoid that walks, talks, and reads faces and emotions. It teaches languages, helps children with autism build communication skills, and supports behavioural research.',
    },
    features: [
      {
        title: { ar: 'التعرف على الوجه والصوت', en: 'Face & voice recognition' },
        description: {
          ar: 'يميّز الوجوه والأصوات ويتتبعها أثناء الحركة.',
          en: 'Identifies and tracks faces and voices as it moves.',
        },
      },
      {
        title: { ar: 'التعرف على المشاعر', en: 'Emotion recognition' },
        description: {
          ar: 'يقرأ المشاعر ويحلل الحركات البشرية.',
          en: 'Reads emotions and analyses human movement.',
        },
      },
      {
        title: { ar: 'دعم أطفال التوحد', en: 'Support for children with autism' },
        description: {
          ar: 'يساعد الأطفال المصابين بالتوحد على تحسين مهارات التواصل.',
          en: 'Helps children on the autism spectrum build communication skills.',
        },
      },
      {
        title: { ar: 'دعم نفسي بالمستشفيات', en: 'Companion care' },
        description: {
          ar: 'يعمل كروبوت دعم نفسي لكبار السن والمرضى.',
          en: 'Acts as a companion for elderly patients and hospital stays.',
        },
      },
      {
        title: { ar: 'سهل البرمجة', en: 'Easy to program' },
        description: {
          ar: 'يمكن تخصيص برمجته لإنشاء دروس تفاعلية وأغراض مختلفة.',
          en: 'Program it to build interactive lessons or your own use cases.',
        },
      },
      {
        title: { ar: 'Cloud Store', en: 'Cloud Store' },
        description: {
          ar: 'يحتوي على تطبيقات جاهزة للروبوت مع إمكانية التحكم عن بُعد.',
          en: 'Ready-made robot apps, plus remote control.',
        },
      },
    ],
    specs: [
      { label: { ar: 'الكاميرات', en: 'Cameras' }, value: '2 ×' },
      { label: { ar: 'الميكروفونات', en: 'Microphones' }, value: 'أمامية وخلفية وجانبية' },
      { label: { ar: 'الاستشعار', en: 'Sensing' }, value: '2 × sonar / ultrasonic + حساسات لمس' },
      { label: { ar: 'المفاصل', en: 'Joints' }, value: 'رأس، عرقوب، معصم، ورك، ركبة، كاحل' },
      { label: { ar: 'اليدين', en: 'Hands' }, value: 'أصابع متحركة' },
    ],
    hardware: [
      { label: { ar: 'حساسات اللمس', en: 'Touch sensors' }, side: 'start' },
      { label: { ar: 'مكبرات الصوت وسماعات الأذن', en: 'Speakers & ear units' }, side: 'start' },
      { label: { ar: 'مفصل الرأس', en: 'Head joint' }, side: 'start' },
      { label: { ar: 'زر التشغيل', en: 'Power button' }, side: 'start' },
      { label: { ar: 'مفصل الورك', en: 'Hip joint' }, side: 'start' },
      { label: { ar: 'يد بأصابع متحركة', en: 'Articulated fingers' }, side: 'start' },
      { label: { ar: 'مفصل الكاحل', en: 'Ankle joint' }, side: 'start' },
      { label: { ar: 'مصدّات حماية', en: 'Bumpers' }, side: 'start' },
      { label: { ar: 'ميكروفونات أمامية وخلفية', en: 'Front & rear microphones' }, side: 'end' },
      { label: { ar: 'كاميرتان', en: '2 × camera' }, side: 'end' },
      { label: { ar: 'الميكروفونات الجانبية', en: 'Side microphones' }, side: 'end' },
      { label: { ar: 'حساسات سونار / فوق صوتية', en: 'Sonar / ultrasonic sensors' }, side: 'end' },
      { label: { ar: 'مفصل العرقوب', en: 'Elbow joint' }, side: 'end' },
      { label: { ar: 'البطارية', en: 'Battery' }, side: 'end' },
      { label: { ar: 'مفصل المعصم', en: 'Wrist joint' }, side: 'end' },
      { label: { ar: 'مفصل الركبة', en: 'Knee joint' }, side: 'end' },
    ],
    sectors: ['education', 'healthcare', 'research'],
  },
  {
    slug: 'kebbi',
    name: 'Kebbi',
    brand: 'NUWA Robotics',
    categories: ['educational'],
    order: 2,
    image: '/robots/kebbi.webp',
    gallery: [
      '/robots/kebbi-1.avif',
      '/robots/kebbi-2.avif',
      '/robots/kebbi-3.avif',
      '/robots/kebbi-4.avif',
      '/robots/kebbi-5.avif',
      { type: 'instagram', url: 'https://www.instagram.com/reel/Dbp9IoSoZn6/' },
      { type: 'instagram', url: 'https://www.instagram.com/reel/DaQM0Sto23e/' },
    ],
    tagline: { ar: 'روبوت تعليمي', en: 'Educational robot' },
    summary: {
      ar: 'روبوت تعليمي صغير بتعابير وجه متحركة، يتكلم ويستمع ويرد بذكاء. يدعم لغة Scratch ويمكن ربطه بـ ChatGPT وتطبيقات IoT.',
      en: 'A compact classroom robot with animated facial expressions that listens, talks, and answers. It supports Scratch and connects to ChatGPT and IoT applications.',
    },
    features: [
      {
        title: { ar: 'تعابير وجه ديناميكية', en: 'Dynamic expressions' },
        description: {
          ar: 'تعابير تتحرك بشكل ديناميكي تخلي المحادثة أكثر واقعية.',
          en: 'Animated expressions make conversation feel real.',
        },
      },
      {
        title: { ar: 'فهم متقدم للغة', en: 'Advanced language understanding' },
        description: {
          ar: 'تحليل الكلام والعبارات المعقدة والرد بذكاء.',
          en: 'Parses complex speech and phrasing, then replies intelligently.',
        },
      },
      {
        title: { ar: 'الربط مع ChatGPT وIoT', en: 'ChatGPT & IoT' },
        description: {
          ar: 'إمكانية ربطه مع ChatGPT وتطبيقات IoT والتعلم العميق.',
          en: 'Connects to ChatGPT, IoT apps, and deep-learning services.',
        },
      },
      {
        title: { ar: 'برمجة بـ Scratch', en: 'Scratch programming' },
        description: {
          ar: 'يدعم لغة Scratch بواجهة مستخدم مرنة وسلسة.',
          en: 'Supports Scratch through a clean, friendly interface.',
        },
      },
      {
        title: { ar: 'التعرف على الوجوه والأشياء', en: 'Face & object recognition' },
        description: {
          ar: 'كاميرات مدمجة للتعرف على الوجوه والتفاعل معها.',
          en: 'Built-in cameras recognise faces and objects and react to them.',
        },
      },
    ],
    specs: [
      { label: { ar: 'وقت التشغيل', en: 'Runtime' }, value: '2 – 4 h' },
      { label: { ar: 'وقت الشحن', en: 'Charging time' }, value: '2 – 3 h' },
      { label: { ar: 'المحركات', en: 'Servos' }, value: '12 servo motors' },
      { label: { ar: 'الصوت', en: 'Audio' }, value: 'صوت محيطي' },
      { label: { ar: 'الشاشة', en: 'Display' }, value: '7 inch touchscreen' },
      { label: { ar: 'اللغات', en: 'Languages' }, value: 'ENG' },
      { label: { ar: 'الحجم', en: 'Dimensions' }, value: '31 × 30 × 16 cm' },
      { label: { ar: 'الوزن', en: 'Weight' }, value: '2.5 kg' },
      { label: { ar: 'الاتصال', en: 'Connectivity' }, value: 'Wi-Fi + Bluetooth' },
    ],
    hardware: [
      { label: { ar: 'زر التشغيل (الطاقة)', en: 'Power button' }, side: 'start' },
      { label: { ar: 'فتحة بطاقة micro SD', en: 'micro SD slot' }, side: 'start' },
      { label: { ar: 'كاميرا', en: 'Camera' }, side: 'start' },
      { label: { ar: 'مؤشر LED للاستماع', en: 'Listening LED' }, side: 'start' },
      { label: { ar: 'لوحة اللمس', en: 'Touch panel' }, side: 'start' },
      { label: { ar: 'حساس PIR', en: 'PIR sensor' }, side: 'start' },
      { label: { ar: 'حساس IR للهبوط', en: 'IR drop sensor' }, side: 'start' },
      { label: { ar: 'منطقة اللمس (الرأس)', en: 'Touch zone — head' }, side: 'end' },
      { label: { ar: 'الأذن', en: 'Ear' }, side: 'end' },
      { label: { ar: 'ميكروفون', en: 'Microphone' }, side: 'end' },
      { label: { ar: 'منطقة اللمس (الخدين)', en: 'Touch zone — cheeks' }, side: 'end' },
      { label: { ar: 'منفذ الشحن', en: 'Charging port' }, side: 'end' },
      { label: { ar: 'مكبرات الصوت', en: 'Speakers' }, side: 'end' },
    ],
    sectors: ['education'],
  },
  {
    slug: 'jetauto',
    name: 'JetAuto',
    brand: 'Hiwonder',
    categories: ['educational'],
    order: 3,
    image: '/robots/jetauto.webp',
    tagline: { ar: 'روبوت تعليمي', en: 'Educational robot' },
    summary: {
      ar: 'منصة روبوتية ذكية لتعلم وتطوير ROS، مزودة بمعالج Jetson NVIDIA وليدار وكاميرا عمق ثلاثية الأبعاد. تدعم رسم الخرائط SLAM وتخطيط المسار.',
      en: 'A robotics platform for learning and developing with ROS, powered by an NVIDIA Jetson with LiDAR and a 3D depth camera. It handles SLAM mapping and path planning.',
    },
    features: [
      {
        title: { ar: 'برمجة بـ ROS 2 و ROS', en: 'ROS 2 & ROS' },
        description: {
          ar: 'قابل للبرمجة بالكامل مع ROS 2 و ROS و C++ و Python.',
          en: 'Fully programmable with ROS 2, ROS, C++, and Python.',
        },
      },
      {
        title: { ar: 'رسم الخرائط SLAM', en: 'SLAM mapping' },
        description: {
          ar: 'يدعم رسم الخرائط وتخطيط المسار والملاحة الذاتية.',
          en: 'Supports mapping, path planning, and autonomous navigation.',
        },
      },
      {
        title: { ar: 'الرؤية الحاسوبية', en: 'Computer vision' },
        description: {
          ar: 'تكامل مع نماذج الذكاء الاصطناعي المتقدمة لتطبيقات الرؤية.',
          en: 'Integrates with modern AI models for vision applications.',
        },
      },
      {
        title: { ar: 'حركة omni بعجلات ميكانوم', en: 'Mecanum omni-drive' },
        description: {
          ar: 'أربع عجلات ميكانوم تتيح الحركة بكل الاتجاهات.',
          en: 'Four mecanum wheels give it movement in any direction.',
        },
      },
      {
        title: { ar: 'مخصص للمختبرات الجامعية', en: 'Built for university labs' },
        description: {
          ar: 'مناسب لطلبة الجامعات والدراسات العليا وبرامج أبحاث الذكاء الاصطناعي.',
          en: 'Suits undergraduate labs, postgraduate work, and AI research programmes.',
        },
      },
    ],
    specs: [
      { label: { ar: 'المعالج', en: 'Compute' }, value: 'Jetson Nano mini PC' },
      { label: { ar: 'الشاشة', en: 'Display' }, value: 'LCD 7 inch' },
      { label: { ar: 'الكاميرا', en: 'Camera' }, value: '3D depth camera' },
      { label: { ar: 'الاستشعار', en: 'Sensing' }, value: 'LiDAR + IMU' },
      { label: { ar: 'الميكروفونات', en: 'Microphones' }, value: '6 ×' },
      { label: { ar: 'العجلات', en: 'Wheels' }, value: '4 × mecanum' },
      { label: { ar: 'المحركات', en: 'Motors' }, value: '4 × محركات تروس بإنكودر' },
      { label: { ar: 'المتحكم', en: 'Controller' }, value: 'mini STM32' },
      { label: { ar: 'البطارية', en: 'Battery' }, value: 'Li-ion 11.1 V 6000 mAh' },
      { label: { ar: 'الهيكل', en: 'Chassis' }, value: 'حامل معدني مؤكسد' },
    ],
    hardware: [
      { label: { ar: 'كاميرا Depth 3D', en: '3D depth camera' }, side: 'start' },
      { label: { ar: 'سيرفو ذكي', en: 'Smart servo' }, side: 'start' },
      { label: { ar: 'جيتسون نانو', en: 'Jetson Nano' }, side: 'start' },
      { label: { ar: 'حساس LiDAR', en: 'LiDAR sensor' }, side: 'start' },
      { label: { ar: 'حامل معدني مؤكسد', en: 'Anodised metal frame' }, side: 'start' },
      { label: { ar: 'محركات تروس مزودة بإنكودر ×4', en: '4 × encoder gear motors' }, side: 'start' },
      { label: { ar: 'شاشة LCD 7 inch', en: 'LCD 7 inch' }, side: 'end' },
      { label: { ar: 'مصفوفة ميكروفونات ×6', en: '6 × microphone array' }, side: 'end' },
      { label: { ar: 'وحدة Jetson Nano mini PC', en: 'Jetson Nano mini PC' }, side: 'end' },
      { label: { ar: 'عجلات ميكانوم ×4', en: '4 × mecanum wheels' }, side: 'end' },
      { label: { ar: 'بطارية ليثيوم 11.1V 6000 mAh', en: 'Li-ion 11.1 V 6000 mAh' }, side: 'end' },
      { label: { ar: 'متحكم mini STM32', en: 'mini STM32 controller' }, side: 'end' },
    ],
    sectors: ['education', 'research'],
  },
  {
    slug: 'jetarm',
    name: 'JetArm',
    brand: 'Hiwonder',
    categories: ['educational'],
    order: 4,
    image: '/robots/jetarm.webp',
    tagline: { ar: 'ذراع روبوتية تعليمية', en: 'Educational robotic arm' },
    summary: {
      ar: 'ذراع روبوتية بمعالج Jetson NVIDIA وكاميرا عمق عالية الدقة، تدعم مهام الالتقاط والوضع وتخطيط المسارات. مصممة لمختبرات الروبوتات الجامعية والدراسات العليا.',
      en: 'A robotic arm with an NVIDIA Jetson and a high-precision depth camera, built for pick-and-place tasks and trajectory planning in university robotics labs.',
    },
    features: [
      {
        title: { ar: 'مهام الالتقاط والوضع', en: 'Pick & place' },
        description: {
          ar: 'يدعم مهام الرؤية بالذكاء الاصطناعي وتنفيذ المسارات وتجارب الأتمتة.',
          en: 'Supports AI vision tasks, trajectory execution, and automation experiments.',
        },
      },
      {
        title: { ar: 'تعلّم الحركيات', en: 'Kinematics' },
        description: {
          ar: 'يعلّم مفاهيم الروبوتات الصناعية مثل الحركيات وتخطيط الحركة وأنظمة التحكم.',
          en: 'Teaches industrial robotics concepts: kinematics, motion planning, control systems.',
        },
      },
      {
        title: { ar: 'قابل للبرمجة بالكامل', en: 'Fully programmable' },
        description: {
          ar: 'برمجة بـ Python و C++ و ROS 2 بتصميم معياري قابل للتطوير.',
          en: 'Program in Python, C++, and ROS 2 on a modular, extensible design.',
        },
      },
      {
        title: { ar: 'كاميرا عمق عالية الدقة', en: 'High-precision depth camera' },
        description: {
          ar: 'دمج بيانات RGB والعمق لتحديد موقع الأجسام بدقة في بيئات ثلاثية الأبعاد.',
          en: 'Fuses RGB and depth data to locate objects precisely in 3D space.',
        },
      },
      {
        title: { ar: 'أداء حوسبي عالٍ', en: 'High compute performance' },
        description: {
          ar: 'معالج Jetson NVIDIA يشغّل خوارزميات الذكاء الاصطناعي والرؤية بالوقت الحقيقي.',
          en: 'The NVIDIA Jetson runs AI and vision algorithms in real time.',
        },
      },
    ],
    specs: [
      { label: { ar: 'المعالج', en: 'Compute' }, value: 'Jetson Nano mini PC' },
      { label: { ar: 'الشاشة', en: 'Display' }, value: 'LCD 7 inch' },
      { label: { ar: 'الكاميرا', en: 'Camera' }, value: '3D depth camera' },
      { label: { ar: 'المحركات', en: 'Servos' }, value: 'Bus Servo ذكي' },
      { label: { ar: 'المتحكم', en: 'Controller' }, value: 'mini STM32' },
      { label: { ar: 'المنافذ', en: 'Ports' }, value: 'USB HUB' },
      { label: { ar: 'الهيكل', en: 'Frame' }, value: 'هيكل معدني + قاعدة متحركة' },
    ],
    hardware: [
      { label: { ar: 'كاميرا Depth 3D', en: '3D depth camera' }, side: 'start' },
      { label: { ar: 'ذراع / مقبض ميكانيكي', en: 'Mechanical gripper' }, side: 'start' },
      { label: { ar: 'هيكل معدني', en: 'Metal frame' }, side: 'start' },
      { label: { ar: 'مكبر صوت', en: 'Speaker' }, side: 'start' },
      { label: { ar: 'سيرفو ذكي Bus Servo', en: 'Bus Servo' }, side: 'start' },
      { label: { ar: 'قاعدة متحركة', en: 'Rotating base' }, side: 'start' },
      { label: { ar: 'مجموعة ميكروفونات دائرية', en: 'Circular microphone array' }, side: 'end' },
      { label: { ar: 'وحدة Jetson Nano mini PC', en: 'Jetson Nano mini PC' }, side: 'end' },
      { label: { ar: 'شاشة LCD 7 inch', en: 'LCD 7 inch' }, side: 'end' },
      { label: { ar: 'منافذ USB HUB', en: 'USB HUB' }, side: 'end' },
      { label: { ar: 'متحكم mini STM32', en: 'mini STM32 controller' }, side: 'end' },
      { label: { ar: 'قاعدة معدنية', en: 'Metal base plate' }, side: 'end' },
    ],
    sectors: ['education', 'research'],
  },
  {
    slug: 'ugot',
    name: 'Ugot',
    brand: 'UBTECH',
    categories: ['educational'],
    order: 5,
    image: '/robots/ugot.webp',
    tagline: { ar: 'روبوت تعليمي', en: 'Educational robot' },
    summary: {
      ar: 'روبوت تعليمي معياري يتركّب بأكثر من شكل — سيارة، ذراع، أو روبوت متحرك. يدعم البرمجة البلوكية و Python، ويتعرف على الأشياء والوجوه والإيماءات.',
      en: 'A modular educational robot you can rebuild into different forms — a rover, an arm, a walker. It supports block-based programming and Python, and recognises objects, faces, and gestures.',
    },
    features: [
      {
        title: { ar: 'تصميم معياري', en: 'Modular design' },
        description: {
          ar: 'وحدات قابلة للتركيب بأشكال مختلفة حسب المشروع.',
          en: 'Snap-together modules reshape it for each project.',
        },
      },
      {
        title: { ar: 'برمجة بلوكية و Python', en: 'Blocks & Python' },
        description: {
          ar: 'يبدأ الطالب بالبرمجة البلوكية وينتقل تدريجياً إلى Python.',
          en: 'Students start with blocks and move up to Python.',
        },
      },
      {
        title: { ar: 'التعرف على الأشياء والوجوه', en: 'Object & face recognition' },
        description: {
          ar: 'يتعرف على الأجسام والوجوه والإيماءات ويتفاعل معها.',
          en: 'Recognises objects, faces, and gestures, and reacts to them.',
        },
      },
      {
        title: { ar: 'مناسب لطلبة الجامعات', en: 'For university students' },
        description: {
          ar: 'مناسب لطلبة الجامعات والتخصصات الهندسية.',
          en: 'Fits university-level and engineering coursework.',
        },
      },
    ],
    specs: [],
    hardware: [],
    sectors: ['education', 'research'],
  },
  {
    slug: 'ukit',
    name: 'Ukit',
    brand: 'UBTECH',
    categories: ['educational'],
    order: 6,
    image: '/robots/ukit.webp',
    tagline: { ar: 'روبوت تعليمي', en: 'Educational robot' },
    summary: {
      ar: 'مجموعة تركيب تعليمية للمراحل المتوسطة والثانوية: الطالب يركّب الروبوت بيده ويبرمجه بالبرمجة البلوكية، ويتعلم أساسيات الذكاء الاصطناعي والروبوتات.',
      en: 'A build-it-yourself kit for middle and high school: students assemble the robot by hand, program it with blocks, and pick up the basics of AI and robotics.',
    },
    features: [
      {
        title: { ar: 'مثالي للمرحلة المتوسطة والثانوية', en: 'Ideal for middle & high school' },
      },
      {
        title: { ar: 'سهل التركيب والفك', en: 'Easy to assemble and take apart' },
      },
      {
        title: { ar: 'أساسيات الذكاء الاصطناعي والروبوتات', en: 'Foundations of AI and robotics' },
      },
      {
        title: { ar: 'سهل البرمجة بالبرمجة البلوكية', en: 'Simple block-based programming' },
      },
    ],
    specs: [],
    hardware: [],
    sectors: ['education'],
  },

  // ══════════════════════ رباعية ══════════════════════
  {
    slug: 'unitree',
    name: 'Unitree',
    brand: 'Unitree',
    categories: ['quadruped'],
    order: 1,
    draft: true, // ← ينتظر مواصفات من الشركة (ظهر بغلاف الكتالوغ بدون صفحة تفاصيل)
    image: '/robots/unitree.avif',
    tagline: { ar: 'روبوت رباعي', en: 'Quadruped robot' },
    summary: {
      ar: 'روبوت رباعي الأرجل يمشي على أرض غير مستوية، يُستخدم بالتفتيش والمسح والعروض الميدانية.',
      en: 'A four-legged robot that walks over uneven ground, used for inspection, mapping, and field demonstrations.',
    },
    features: [],
    specs: [],
    hardware: [],
    sectors: ['research', 'security', 'events', 'education'],
  },
];

// ─────────────────────────────────────────────────────────────
// دوال مساعدة — تستخدمها الصفحات
// ─────────────────────────────────────────────────────────────

/** كل الروبوتات الجاهزة للعرض، مرتبة حسب التصنيف ثم الترتيب */
export const PUBLISHED_ROBOTS = ROBOTS.filter((r) => !r.draft);

export function getRobot(slug: string): Robot | undefined {
  return ROBOTS.find((r) => r.slug === slug);
}

export function getRobotsByCategory(category: RobotCategory): Robot[] {
  return ROBOTS.filter((r) => r.categories.includes(category)).sort((a, b) => a.order - b.order);
}

export function getFeaturedRobots(): Robot[] {
  return ROBOTS.filter((r) => r.featured);
}

/** لتوليد صفحات /robots/[slug] بشكل ستاتيكي */
export function getAllRobotSlugs(): string[] {
  return ROBOTS.map((r) => r.slug);
}