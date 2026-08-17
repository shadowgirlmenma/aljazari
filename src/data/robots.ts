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
    order: 3,
    featured: true,
    image: '/robots/pepper-nobg.webp',
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
    sectors: ['healthcare', 'education', 'retail', 'malls', 'events', 'banking', 'hospitality'],
  },
  {
    slug: 'timo',
    name: 'Timo',
    brand: 'Alpha',
    categories: ['humanoid'],
    order: 8,
    featured: true,
    image: '/robots/timo-nobg.webp',
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
    sectors: ['hospitality', 'malls', 'museums', 'security', 'banking', 'events', 'enterprises', 'gaming', 'restaurants', 'showroom'],
  },
  {
    slug: 'cruzr',
    name: 'CRUZR',
    brand: 'UBTECH',
    categories: ['humanoid'],
    order: 2,
    featured: true,
    image: '/robots/cruzr-nobg.webp',
    gallery: [
      '/robots/cruzr-real-1.webp',
      '/robots/cruzr-real-2.webp',
      '/robots/cruzr-real-3.webp',
      '/robots/cruzr-real-4.webp',
      '/robots/cruzr-real-5.webp',
      '/robots/cruzr-real-6.webp',
      '/robots/cruzr-real-7.webp',
      '/robots/cruzr-real-8.webp',
    ],
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
    sectors: ['banking', 'hospitality', 'airports', 'museums', 'healthcare', 'education', 'enterprises', 'malls', 'restaurants', 'showroom'],
  },
  {
    slug: 'wnno',
    name: 'Wnno',
    brand: '',
    categories: ['humanoid'],
    order: 1,
    image: '/robots/wnno-nobg.webp',
    gallery: [
      '/robots/wnno-real-1.webp',
      { type: 'video', url: '/robots/wnno-video.mp4', poster: '/robots/wnno-video-poster.webp' },
      '/robots/wnno-real-2.webp',
      '/robots/wnno-real-3.webp',
      '/robots/wnno-real-4.webp',
      '/robots/wnno-real-5.webp',
      '/robots/wnno-real-6.webp',
      '/robots/wnno-real-7.webp',
    ],
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
    sectors: ['banking', 'malls', 'airports', 'hospitality', 'retail', 'enterprises', 'healthcare', 'showroom'],
  },

  // ══════════════════════ خدمية ══════════════════════
  {
    slug: 'bellabot-pro',
    name: 'BellaBot Pro',
    brand: 'Pudu Robotics',
    categories: ['service'],
    order: 1,
    featured: true,
    image: '/robots/bellabot-pro-nobg.webp',
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
    sectors: ['restaurants', 'hospitality', 'healthcare', 'malls', 'gaming', 'showroom', 'events'],
  },
  {
    slug: 'kittybot-pro',
    name: 'KettyBot Pro',
    brand: 'Pudu Robotics',
    categories: ['service'],
    order: 2,
    image: '/robots/kittybot-pro-nobg.webp',
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
    sectors: ['restaurants', 'hospitality', 'healthcare', 'offices', 'events', 'malls', 'showroom'],
  },
  {
    slug: 'pudubot',
    name: 'PuduBot 2',
    brand: 'Pudu Robotics',
    categories: ['service'],
    order: 3,
    image: '/robots/pudubot-nobg.webp',
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
    sectors: ['restaurants', 'hospitality', 'healthcare', 'offices', 'warehousing', 'malls', 'showroom'],
  },
  {
    slug: 'cc1-pro',
    name: 'CC1 Pro',
    brand: 'Pudu Robotics',
    categories: ['service'],
    order: 0,
    image: '/robots/cc1-pro-nobg.webp',
    gallery: [
      '/robots/cc1-pro-2.webp',
      '/robots/cc1-pro-3.webp',
      '/robots/cc1-pro-4.webp',
      '/robots/cc1-pro-5.webp',
      '/robots/cc1-pro-6.webp',
    ],
    tagline: { ar: 'روبوت تنظيف ذكي', en: 'Smart cleaning robot' },
    summary: {
      ar: 'روبوت PUDU CC1 Pro هو روبوت تنظيف مدعوم بالذكاء الاصطناعي يعمل بشكل مستقل في المساحات الكبيرة، يكتشف البقع والأوساخ تلقائياً ويضبط طرق التنظيف تلقائياً (كنس، شطف، كنس جاف، وشفط) باستخدام ذكاء اصطناعي وتنقل دقيق، ليوفّر نظافة عالية الجودة بأقل تدخل بشري.',
      en: 'The PUDU CC1 Pro is an advanced autonomous cleaning robot for large indoor spaces that intelligently detects stains and dirt, automatically adjusts cleaning actions (sweeping, scrubbing, vacuuming, and mopping), and navigates precisely using AI to deliver high-quality floor care with minimal human oversight.',
    },
    features: [
      {
        title: { ar: 'تنظيف موضعي بالذكاء الاصطناعي', en: 'AI spot scrubbing' },
        description: {
          ar: 'يتعرف على البقع بالأرضية ويزيلها باستخدام الرؤية الذكية (AI Vision).',
          en: 'Recognises stains on the floor and removes them using AI vision.',
        },
      },
      {
        title: { ar: 'التحكم بقوة التنظيف', en: 'AI cleaning intensity control' },
        description: {
          ar: 'يضبط قوة التنظيف تلقائياً حسب نوع الأرضية أو صعوبة البقعة، ويحدد الأماكن النظيفة للتحكم باستهلاك الطاقة والمياه.',
          en: 'Automatically adjusts cleaning intensity by floor type or stain difficulty, and identifies already-clean areas to save power and water.',
        },
      },
      {
        title: { ar: 'تنظيف لحظي بالذكاء الاصطناعي', en: 'Real-time AI cleaning performance detection' },
        description: {
          ar: 'كاميرا خلفية تراقب دقة التنظيف وتبني خرائط حرارية للحصول على أفضل نتيجة.',
          en: 'A rear camera monitors cleaning accuracy and builds heat maps for the best result.',
        },
      },
      {
        title: { ar: '4 في 1 للتنظيف الشامل', en: '4-in-1 versatile cleaning' },
        description: {
          ar: 'كنس، تنظيف رطب، تنظيف جاف، وشفط — كلها بروبوت واحد.',
          en: 'Sweeping, scrubbing, dust-mopping, and vacuuming — all in one robot.',
        },
      },
      {
        title: { ar: 'ملاحة VSLAM وليدار دقيقة', en: 'VSLAM + LiDAR precise navigation' },
        description: {
          ar: 'نظام ملاحة يدمج تقنية VSLAM مع الليدار للتنقل بدقة عالية بالمساحات المفتوحة والمزدحمة، ويغطي 5000–8000 م² بمعدل 1500–3000 م²/ساعة.',
          en: 'A navigation system combining VSLAM and LiDAR moves with high accuracy through open and crowded spaces, covering 5,000–8,000 m² at a rate of 1,500–3,000 m²/h.',
        },
      },
    ],
    specs: [
      { label: { ar: 'الحجم', en: 'Dimensions' }, value: '629 × 552 × 695 mm' },
      { label: { ar: 'مسار التنظيف', en: 'Cleaning path' }, value: '500 mm' },
      { label: { ar: 'مدة الشحن (0–100%)', en: 'Charging time (0–100%)' }, value: '3 h' },
      { label: { ar: 'زمن التشغيل — تنظيف رطب', en: 'Runtime — scrubbing' }, value: '5 h' },
      { label: { ar: 'زمن التشغيل — كنس', en: 'Runtime — sweeping' }, value: '5 h' },
      { label: { ar: 'زمن التشغيل — شفط', en: 'Runtime — vacuuming' }, value: '4 h' },
      { label: { ar: 'زمن التشغيل — تنظيف جاف', en: 'Runtime — dust-mopping' }, value: '9 h' },
      { label: { ar: 'حجم سلة التنظيف', en: 'Debris bin' }, value: '2.5 L / 6 L' },
      { label: { ar: 'خزان الماء النظيف', en: 'Clean-water tank' }, value: '15 L' },
      { label: { ar: 'خزان الماء المتسخ', en: 'Waste-water tank' }, value: '15 L' },
      { label: { ar: 'التغطية', en: 'Coverage' }, value: '5,000 – 8,000 m² (1,500 – 3,000 m²/h)' },
      { label: { ar: 'الملاحة', en: 'Navigation' }, value: 'VSLAM + LiDAR' },
      { label: { ar: 'الشحن التلقائي', en: 'Auto-charging' }, value: 'اختياري (محطة شحن عند الطلب)' },
    ],
    hardware: [
      { label: { ar: 'كاميرا خلفية لمراقبة الأداء', en: 'Rear performance-monitoring camera' }, side: 'start' },
      { label: { ar: 'حساس ليدار', en: 'LiDAR sensor' }, side: 'start' },
      { label: { ar: 'فرشاة كنس وشفط', en: 'Sweeping & vacuuming brush' }, side: 'start' },
      { label: { ar: 'خزانا الماء النظيف والمتسخ', en: 'Clean & waste-water tanks' }, side: 'end' },
      { label: { ar: 'وحدة تنظيف رطب', en: 'Scrubbing unit' }, side: 'end' },
      { label: { ar: 'سلة تجميع الأوساخ', en: 'Debris bin' }, side: 'end' },
    ],
    sectors: ['healthcare', 'banking', 'showroom', 'restaurants', 'enterprises', 'malls'],
  },

  // ══════════════════════ منزلية ══════════════════════
  {
    slug: 'sanbot',
    name: 'Sanbot',
    brand: 'Qihan Technology',
    categories: ['service'],
    order: 1,
    image: '/robots/sanbot-nobg.webp',
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
    sectors: ['home', 'education', 'healthcare', 'schools'],
  },

  // ══════════════════════ تعليمية ══════════════════════
  {
    slug: 'nao',
    name: 'NAO',
    brand: 'SoftBank Robotics',
    categories: ['humanoid', 'educational'],
    order: 4,
    featured: true,
    image: '/robots/nao-nobg.webp',
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
    sectors: ['education', 'healthcare', 'research', 'universities'],
  },
  {
    slug: 'kebbi',
    name: 'Kebbi Air S',
    brand: 'NUWA Robotics',
    categories: ['humanoid'],
    order: 7,
    image: '/robots/kebbi-nobg.webp',
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
    sectors: ['showroom', 'gaming'],
  },
  {
    slug: 'jetauto',
    name: 'JetAuto',
    brand: 'Hiwonder',
    categories: ['educational'],
    order: 2,
    image: '/robots/jetauto-nobg.webp',
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
    sectors: ['education', 'research', 'universities'],
  },
  {
    slug: 'jetarm',
    name: 'JetArm',
    brand: 'Hiwonder',
    categories: ['educational'],
    order: 1,
    image: '/robots/jetarm-nobg.webp',
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
    sectors: ['education', 'research', 'universities'],
  },
  {
    slug: 'ugot',
    name: 'Ugot',
    brand: 'UBTECH',
    categories: ['educational'],
    order: 4,
    image: '/robots/ugot-nobg.webp',
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
    sectors: ['education', 'research', 'universities'],
  },
  {
    slug: 'ukit',
    name: 'Ukit',
    brand: 'UBTECH',
    categories: ['educational'],
    order: 5,
    image: '/robots/ukit-nobg.webp',
    gallery: [
      '/robots/ukit-real-1.webp',
      '/robots/ukit-real-2.webp',
      '/robots/ukit-real-3.webp',
      '/robots/ukit-real-4.webp',
      '/robots/ukit-real-5.webp',
      '/robots/ukit-real-6.webp',
      '/robots/ukit-real-7.webp',
      '/robots/ukit-real-8.webp',
      '/robots/ukit-real-9.webp',
    ],
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
    sectors: ['education', 'schools'],
  },

  // ══════════════════════ رباعية ══════════════════════
  {
    slug: 'unitree-go2',
    name: 'Unitree Go2 EDU',
    brand: 'Unitree',
    categories: ['quadruped', 'educational'],
    order: 1,
    image: '/robots/unitree-go2-nobg.webp',
    gallery: [
      '/robots/unitree-go2-real-1.webp',
      '/robots/unitree-go2-real-2.webp',
      '/robots/unitree-go2-real-3.webp',
      '/robots/unitree-go2-real-4.webp',
      '/robots/unitree-go2-real-5.webp',
    ],
    tagline: { ar: 'روبوت رباعي تعليمي', en: 'Educational quadruped robot' },
    summary: {
      ar: 'روبوت رباعي الأرجل متقدم مخصص للجامعات ومختبرات الروبوتات، لتعليم الاستقلالية الواقعية والإدراك بالذكاء الاصطناعي والتنقل الذكي — منصة عملية للطلبة لبناء واختبار خوارزميات الروبوتات على جهاز حقيقي سريع وثابت.',
      en: 'An advanced quadruped robot built for universities and robotics labs to teach real-world autonomy, AI perception, and intelligent locomotion — a hands-on platform for students to build and test robotics algorithms on a fast, stable robot.',
    },
    features: [
      {
        title: { ar: 'نظام ليدار رباعي الأبعاد فائق الاتساع', en: 'Ultra-wide 4D LiDAR system' },
        description: {
          ar: 'استشعار دقيق للبيئة ووعي بكل التضاريس — مثالي لمشاريع رسم الخرائط والملاحة وكشف العوائق.',
          en: 'Accurate environmental sensing and all-terrain awareness — ideal for mapping, navigation, and obstacle-detection projects.',
        },
      },
      {
        title: { ar: 'دعم كامل لتطوير الجامعات', en: 'Developer-friendly for university projects' },
        description: {
          ar: 'SDK رسمي وتوثيق كامل من Unitree، مع دعم مفتوح المصدر لأدوات ROS لبناء سلوكيات وأنظمة تحكم مخصصة.',
          en: "Backed by Unitree's official SDK and documentation, with open-source ROS support for building custom robotics behaviours and control systems.",
        },
      },
      {
        title: { ar: 'رسم خرائط بتقنية ليدار ثلاثي الأبعاد', en: '3D LiDAR mapping' },
        description: {
          ar: 'يبني خريطة نقطية للمكان عبر ليدار L1 وتطبيق مخصص، ويحدد مساراً يتحرك خلاله الروبوت ذاتياً.',
          en: 'Builds a point-cloud map of an area using the L1 LiDAR and a dedicated app, then follows a specified path autonomously.',
        },
      },
      {
        title: { ar: 'برمجة رسومية بسيطة وذكية', en: 'Graphical programming, simple yet smarter' },
        description: {
          ar: 'تصميم البرنامج بالسحب والإفلات والربط — يسهّل على المبتدئين البدء والابتكار.',
          en: 'Design programs by simple drag, drop, and connection — easy for programming beginners to start and innovate.',
        },
      },
      {
        title: { ar: 'صورة عالية الدقة بالوقت الحقيقي', en: 'HD picture quality, real-time and stable' },
        description: {
          ar: 'تطبيق جديد لنقل الصورة عالية الدقة والمراقبة عن بُعد، مع دعم 4G وeSIM لاتصال أكثر ثباتاً.',
          en: 'A new app enables HD image transmission and real-time remote monitoring, with built-in 4G and eSIM for a more stable connection.',
        },
      },
      {
        title: { ar: 'تجنّب عوائق ذكي ودقيق', en: 'Intelligent, precise obstacle avoidance' },
        description: {
          ar: 'كشف حساس بليدار 4D من طراز L1 يرسم العالم ثلاثي الأبعاد بدقة ويتجنب العوائق تلقائياً أثناء التقدم.',
          en: 'Keen detection with the 4D LiDAR L1 accurately captures and draws the 3D world for intelligent, precise obstacle avoidance.',
        },
      },
    ],
    specs: [
      { label: { ar: 'الاستشعار', en: 'Sensing' }, value: 'Ultra-wide 4D LiDAR (L1)' },
      { label: { ar: 'الاتصال', en: 'Connectivity' }, value: 'Built-in 4G + eSIM' },
      { label: { ar: 'البرمجة', en: 'Programming' }, value: 'برمجة رسومية (Drag & Drop) + SDK رسمي + دعم ROS' },
      { label: { ar: 'التخصيص', en: 'Customisation' }, value: 'عتاد قابل للتخصيص حسب الاحتياج والميزانية' },
    ],
    hardware: [
      { label: { ar: 'ليدار L1 رباعي الأبعاد', en: '4D LiDAR (L1)' }, side: 'start' },
      { label: { ar: 'كاميرا نقل صورة HD', en: 'HD imaging camera' }, side: 'start' },
      { label: { ar: 'وحدة اتصال 4G / eSIM', en: '4G / eSIM module' }, side: 'end' },
      { label: { ar: 'أرجل رباعية عالية الثبات', en: 'High-stability quadruped legs' }, side: 'end' },
    ],
    sectors: ['research', 'security', 'events', 'education', 'universities'],
  },
  {
    slug: 'unitree-g1',
    name: 'Unitree G1 EDU',
    brand: 'Unitree',
    categories: ['humanoid', 'educational'],
    order: 5,
    productType: ['preorder'],
    image: '/robots/unitree-g1-nobg.webp',
    gallery: ['/robots/unitree-g1.webp', '/robots/unitree-g1-2.webp'],
    tagline: { ar: 'روبوت بشري تعليمي — حجز مسبق', en: 'Educational humanoid — pre-order' },
    summary: {
      ar: 'يُعد Unitree G1 روبوتًا بشريًا يعمل بالذكاء الاصطناعي، مصممًا لأغراض البحث والتطوير، ويشتهر بخفة حركته ومهارته وتحكمه المتقدم. يتميز بالتحكم الهجين في القوة والموضع للتعامل الدقيق مع الأشياء والحركات المعقدة مثل الشقلبات الخلفية، ويعمل بمعالج ثماني النواة ونماذج كبيرة موحدة (UnifoLM) لتطوير الذكاء، مع نماذج توفر ما يصل إلى 43 درجة من الحرية (DoF) وأيدٍ ماهرة اختيارية.',
      en: 'The Unitree G1 is a compact, AI-driven humanoid robot designed for research and development, known for its agility, dexterity, and advanced control — featuring force-position hybrid control for precise object handling and complex movements like backflips, powered by an 8-core CPU and unified large models (UnifoLM), with models offering up to 43 degrees of freedom (DoF) and optional dexterous hands.',
    },
    features: [
      {
        title: { ar: 'تحكم هجين بالقوة والموضع', en: 'Force-position hybrid control' },
        description: {
          ar: 'تعامل دقيق مع الأشياء وتنفيذ حركات معقدة مثل الشقلبات الخلفية.',
          en: 'Enables precise object handling and complex movements like backflips.',
        },
      },
      {
        title: { ar: 'حتى 43 درجة حرية', en: 'Up to 43 degrees of freedom' },
        description: {
          ar: 'نماذج متاحة توفر مرونة حركية عالية وأيدٍ ماهرة اختيارية.',
          en: 'Available models offer high mobility flexibility with optional dexterous hands.',
        },
      },
      {
        title: { ar: 'نماذج ذكاء موحدة (UnifoLM)', en: 'Unified large models (UnifoLM)' },
        description: {
          ar: 'معالج ثماني النواة يشغّل نماذج ذكاء متطورة لتنمية قدراته باستمرار.',
          en: 'An 8-core CPU runs advanced AI models for continuously evolving intelligence.',
        },
      },
    ],
    specs: [
      { label: { ar: 'الأبعاد (واقف)', en: 'Dimensions (stand)' }, value: '1320 × 450 × 200 mm' },
      { label: { ar: 'الأبعاد (مطوي)', en: 'Dimensions (fold)' }, value: '690 × 450 × 300 mm' },
      { label: { ar: 'الوزن (مع البطارية)', en: 'Weight (with battery)' }, value: '~35 kg+' },
      { label: { ar: 'درجات الحرية الكلية', en: 'Total degrees of freedom' }, value: '23 – 43' },
      { label: { ar: 'درجات حرية الساق الواحدة', en: 'Single leg DoF' }, value: '6' },
      { label: { ar: 'درجات حرية الذراع الواحدة', en: 'Single arm DoF' }, value: '5' },
      { label: { ar: 'اليد (اختياري)', en: 'Single hand DoF (optional)' }, value: '7 + 2 (معصم إضافي)' },
      { label: { ar: 'وحدة حوسبة إضافية', en: 'High compute module' }, value: 'NVIDIA Jetson Orin' },
      { label: { ar: 'الاستشعار', en: 'Sensing' }, value: 'Depth camera + 3D LiDAR' },
      { label: { ar: 'مصفوفة الميكروفونات', en: 'Microphone array' }, value: '4 ×' },
      { label: { ar: 'مكبر الصوت', en: 'Speaker' }, value: '5W' },
      { label: { ar: 'الاتصال اللاسلكي', en: 'Wireless' }, value: 'Wi-Fi 6 + Bluetooth 5.2' },
      { label: { ar: 'البطارية الذكية', en: 'Smart battery' }, value: '9000 mAh (قابلة للفك السريع)' },
      { label: { ar: 'زمن التشغيل', en: 'Battery life' }, value: '~2 h' },
      { label: { ar: 'الشاحن', en: 'Charger' }, value: '54V 5A' },
    ],
    hardware: [
      { label: { ar: 'كاميرا عمق + ليدار ثلاثي الأبعاد', en: 'Depth camera + 3D LiDAR' }, side: 'start' },
      { label: { ar: 'مصفوفة ميكروفونات', en: 'Microphone array' }, side: 'start' },
      { label: { ar: 'يد ماهرة اختيارية', en: 'Optional dexterous hand' }, side: 'start' },
      { label: { ar: 'بطارية قابلة للفك السريع', en: 'Quick-release battery' }, side: 'end' },
      { label: { ar: 'وحدة NVIDIA Jetson Orin', en: 'NVIDIA Jetson Orin module' }, side: 'end' },
      { label: { ar: 'مكبر صوت 5W', en: '5W speaker' }, side: 'end' },
    ],
    sectors: ['universities', 'enterprises', 'security'],
  },
  {
    slug: 'booster-t1',
    name: 'Booster T1',
    brand: 'Booster Robotics',
    categories: ['humanoid'],
    order: 6,
    image: '/robots/booster-t1-nobg.webp',
    gallery: ['/robots/booster-t1.webp', '/robots/booster-t1-2.webp'],
    tagline: { ar: 'روبوت بشري مفتوح المصدر', en: 'Open-source humanoid robot' },
    summary: {
      ar: 'يُعدّ الروبوت Booster T1، الذي طورته شركة Booster Robotics، روبوتًا بشريًا مفتوح المصدر مصممًا خصيصًا للمطورين وباحثي الروبوتات. يتيح تصميمه خفيف الوزن والمرن والمتين أداءً موثوقًا به في المهام المعقدة.',
      en: 'The Booster T1, developed by Booster Robotics, is an open-source humanoid robot built for developers and robotics researchers. Its lightweight, flexible, and durable design enables reliable performance across complex tasks.',
    },
    features: [
      {
        title: { ar: 'مصفوفة صوت دائرية', en: 'Voice module' },
        description: {
          ar: 'مصفوفة 6 ميكروفونات دائرية مع مكبر صوت.',
          en: 'Circular 6-microphone array with speaker.',
        },
      },
      {
        title: { ar: 'وحدة رؤية بكاميرا عمق', en: 'Vision module' },
        description: {
          ar: 'كاميرا عمق لإدراك البيئة المحيطة بدقة.',
          en: 'Depth camera for precise environmental perception.',
        },
      },
      {
        title: { ar: 'قوة حوسبة عالية', en: 'High computing power' },
        description: {
          ar: 'أداء ذكاء اصطناعي يصل إلى 200 TOPS.',
          en: 'Provides 200 TOPS of AI performance.',
        },
      },
      {
        title: { ar: 'مفاصل عالية العزم', en: 'High-torque joints' },
        description: {
          ar: 'عزم ذروة يصل إلى 130 نيوتن·متر مع تشفير مزدوج.',
          en: 'Peak torque of 130 N·m with dual encoders.',
        },
      },
    ],
    specs: [
      { label: { ar: 'الأبعاد (طول×عرض×ارتفاع)', en: 'Dimensions (L×W×H)' }, value: '118 × 47 × 23 cm' },
      { label: { ar: 'طول الساق', en: 'Leg length' }, value: '57 cm' },
      { label: { ar: 'طول الذراع', en: 'Arm length' }, value: '45 cm' },
      { label: { ar: 'الوزن', en: 'Weight' }, value: '~30 kg' },
      { label: { ar: 'درجات الحرية الكلية', en: 'Total degrees of freedom' }, value: '23 (قابلة للتوسعة حتى 41 مع اليد الماهرة)' },
      { label: { ar: 'أقصى عزم للمفصل', en: 'Max joint torque' }, value: '130 N·m' },
      { label: { ar: 'المعالج / وحدة الذكاء الاصطناعي', en: 'CPU / AI compute' }, value: 'Intel i7-1370P + NVIDIA AGX Orin (200 TOPS)' },
      { label: { ar: 'الاستشعار', en: 'Sensing' }, value: 'Depth camera + IMU تساعي المحاور' },
      { label: { ar: 'الصوت', en: 'Audio' }, value: 'مصفوفة 6 ميكروفونات دائرية + مكبر صوت' },
      { label: { ar: 'البطارية', en: 'Battery' }, value: '10.5 Ah — ساعتان مشي / 4 ساعات وقوف' },
      { label: { ar: 'الاتصال اللاسلكي', en: 'Wireless' }, value: 'Wi-Fi 6 + Bluetooth 5.2' },
      { label: { ar: 'منافذ التوسعة', en: 'Expansion ports' }, value: 'USB + Ethernet' },
      { label: { ar: 'الضمان', en: 'Warranty' }, value: 'سنة واحدة' },
    ],
    hardware: [
      { label: { ar: 'كاميرا عمق', en: 'Depth camera' }, side: 'start' },
      { label: { ar: 'مصفوفة ميكروفونات دائرية', en: 'Circular microphone array' }, side: 'start' },
      { label: { ar: 'وحدة NVIDIA AGX Orin', en: 'NVIDIA AGX Orin module' }, side: 'start' },
      { label: { ar: 'مفاصل عالية العزم بتشفير مزدوج', en: 'High-torque dual-encoder joints' }, side: 'end' },
      { label: { ar: 'بطارية 10.5 Ah', en: '10.5 Ah battery' }, side: 'end' },
      { label: { ar: 'منافذ USB وEthernet', en: 'USB & Ethernet ports' }, side: 'end' },
    ],
    sectors: ['universities', 'enterprises', 'security'],
  },
  {
    slug: 'sanbot-nano',
    name: 'Sanbot Nano',
    brand: 'Qihan Technology',
    categories: ['humanoid'],
    order: 9,
    image: '/robots/sanbot-nano-nobg.webp',
    tagline: { ar: 'روبوت بشري تفاعلي', en: 'Interactive humanoid robot' },
    summary: {
      ar: 'روبوت ذكي تفاعلي مصمم لمساعدة الأشخاص بأماكن مثل المدارس ورياض الأطفال والبيئات التعليمية المشابهة. يتكلم ويستمع ويتحرك ويعرض المعلومات على شاشته ويتفاعل باللمس والحساسات. بقدرات قابلة للترقية، يوفّر Sanbot Nano خدمات مثل المحادثة بالذكاء الاصطناعي وألعاب تعليمية ومكالمات الفيديو وغيرها.',
      en: 'Sanbot Nano is a smart interactive robot designed to assist people in places like schools, kindergartens, and similar education environments. It can speak, listen, move, display information on its screen, and interact through touch and sensors — with upgradeable capabilities including AI conversations, learning games, video calls, and more.',
    },
    features: [
      {
        title: { ar: 'التوافق مع Alexa', en: 'Compatible with Alexa' },
      },
      {
        title: { ar: 'مراقبة وتحكم عن بُعد', en: 'Remote monitoring and control' },
      },
      {
        title: { ar: 'مكالمات فيديو', en: 'Video call' },
      },
      {
        title: { ar: 'أنشطة ترفيهية', en: 'Entertainment activities' },
      },
      {
        title: { ar: 'بطارية طويلة الأمد', en: 'Long battery life' },
      },
      {
        title: { ar: 'شحن ذاتي تلقائي', en: 'Auto charge' },
      },
    ],
    specs: [],
    hardware: [],
    sectors: ['schools'],
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