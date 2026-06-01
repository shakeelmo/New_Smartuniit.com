import type { SiteContent } from "./types";

export const defaultContent: SiteContent = {
  hero: {
    eyebrow: {
      en: "Smart Universe IT - Riyadh, Saudi Arabia",
      ar: "سمارت يونيفرس لتقنية المعلومات - الرياض، المملكة العربية السعودية"
    },
    title: {
      en: "Secure infrastructure, software, and digital transformation for ambitious Saudi businesses.",
      ar: "بنية تقنية آمنة، وبرمجيات، وتحول رقمي للشركات الطموحة في المملكة."
    },
    subtitle: {
      en: "We design, secure, migrate, automate, and support the technology environments that modern organizations depend on.",
      ar: "نصمم ونؤمن وننقل ونؤتمت وندعم البيئات التقنية التي تعتمد عليها المؤسسات الحديثة."
    },
    primaryCta: { en: "Book free consultation", ar: "احجز استشارة مجانية" },
    secondaryCta: { en: "Build my solution", ar: "صمم الحل المناسب" }
  },
  stats: [
    { value: "2023", label: { en: "Established in Riyadh", ar: "تأسست في الرياض" } },
    { value: "10+", label: { en: "Integrated IT service lines", ar: "مجالات تقنية متكاملة" } },
    { value: "24/7", label: { en: "Support mindset", ar: "منهج دعم مستمر" } },
    { value: "2030", label: { en: "Aligned with Vision 2030", ar: "متوائمة مع رؤية 2030" } }
  ],
  services: [
    {
      id: "infrastructure-security",
      title: { en: "IT Infrastructure & Security", ar: "البنية التحتية والأمن السيبراني" },
      summary: {
        en: "Network security, data protection, access control, threat detection, and infrastructure optimization.",
        ar: "أمن الشبكات، حماية البيانات، التحكم بالوصول، كشف التهديدات، وتحسين البنية التحتية."
      },
      points: [
        { en: "Firewalls, VPNs, IDS/IPS and secure connectivity", ar: "جدران حماية و VPN وأنظمة كشف ومنع الاختراق" },
        { en: "Backup, disaster recovery, encryption and access control", ar: "نسخ احتياطي وتعافي وتشفير وإدارة وصول" },
        { en: "Security audits, monitoring and incident response", ar: "تدقيق أمني ومراقبة واستجابة للحوادث" }
      ]
    },
    {
      id: "professional-services",
      title: { en: "Technical Professional Services", ar: "الخدمات التقنية الاحترافية" },
      summary: {
        en: "Expert support, system integration, cloud services, infrastructure management, and process automation.",
        ar: "دعم فني، تكامل أنظمة، خدمات سحابية، إدارة بنية تحتية، وأتمتة العمليات."
      },
      points: [
        { en: "Remote and on-site troubleshooting", ar: "حل المشكلات عن بعد وفي الموقع" },
        { en: "System integration and proactive maintenance", ar: "تكامل الأنظمة والصيانة الاستباقية" },
        { en: "Cloud optimization and workflow automation", ar: "تحسين السحابة وأتمتة سير العمل" }
      ]
    },
    {
      id: "data-center-migration",
      title: { en: "Data Center & Migration", ar: "مراكز البيانات والترحيل" },
      summary: {
        en: "Data center design, virtualization, storage, backup, cloud migration, and minimal-downtime transitions.",
        ar: "تصميم مراكز البيانات، الافتراضية، التخزين، النسخ الاحتياطي، والترحيل السحابي بأقل توقف."
      },
      points: [
        { en: "Server consolidation and virtualization", ar: "دمج الخوادم والافتراضية" },
        { en: "Storage, backup and disaster recovery", ar: "التخزين والنسخ الاحتياطي والتعافي" },
        { en: "Email, server, cloud and data migration", ar: "ترحيل البريد والخوادم والسحابة والبيانات" }
      ]
    },
    {
      id: "software",
      title: { en: "Software, Web & Mobile Apps", ar: "البرمجيات والويب وتطبيقات الجوال" },
      summary: {
        en: "Custom software, enterprise apps, websites, CMS platforms, e-commerce, and Android/iOS applications.",
        ar: "برمجيات مخصصة، تطبيقات مؤسسية، مواقع، أنظمة إدارة محتوى، متاجر إلكترونية، وتطبيقات Android و iOS."
      },
      points: [
        { en: "Custom business applications and integrations", ar: "تطبيقات أعمال مخصصة وتكاملات" },
        { en: "Responsive websites and e-commerce", ar: "مواقع متجاوبة ومتاجر إلكترونية" },
        { en: "Native and cross-platform mobile apps", ar: "تطبيقات جوال أصلية ومتعددة المنصات" }
      ]
    },
    {
      id: "consultancy-analytics",
      title: { en: "Consultancy & Data Analytics", ar: "الاستشارات وتحليل البيانات" },
      summary: {
        en: "IT strategy, roadmaps, digital transformation consulting, BI dashboards, and predictive insights.",
        ar: "استراتيجية تقنية، خرائط طريق، استشارات تحول رقمي، لوحات ذكاء أعمال، وتحليلات تنبؤية."
      },
      points: [
        { en: "Technology roadmap and security assessments", ar: "خارطة طريق تقنية وتقييمات أمنية" },
        { en: "Business process optimization", ar: "تحسين إجراءات الأعمال" },
        { en: "Dashboards, visualization and forecasting", ar: "لوحات معلومات وتصوير بيانات وتنبؤ" }
      ]
    },
    {
      id: "digital-marketing",
      title: { en: "Digital Marketing", ar: "التسويق الرقمي" },
      summary: {
        en: "SEO, PPC, social media, content marketing, email campaigns, and conversion-focused digital growth.",
        ar: "تحسين محركات البحث، الإعلانات، وسائل التواصل، المحتوى، البريد الإلكتروني، ونمو رقمي يركز على التحويل."
      },
      points: [
        { en: "SEO and paid acquisition", ar: "تحسين البحث والاستحواذ المدفوع" },
        { en: "Social media and content marketing", ar: "إدارة التواصل والمحتوى" },
        { en: "Campaign reporting and conversion tracking", ar: "تقارير الحملات وتتبع التحويلات" }
      ]
    }
  ],
  posts: [
    {
      id: "cybersecurity",
      title: { en: "Why cybersecurity readiness is now an operational requirement", ar: "لماذا أصبحت الجاهزية الأمنية متطلبا تشغيليا" },
      category: { en: "Security", ar: "الأمن" },
      excerpt: {
        en: "A practical guide to protecting networks, access, endpoints and critical business data.",
        ar: "دليل عملي لحماية الشبكات والوصول والأجهزة وبيانات الأعمال الحيوية."
      },
      date: "2026-06-01"
    },
    {
      id: "migration",
      title: { en: "Cloud and mailbox migration without business disruption", ar: "ترحيل السحابة والبريد دون تعطيل الأعمال" },
      category: { en: "Migration", ar: "الترحيل" },
      excerpt: {
        en: "How to plan discovery, migration windows, backup, testing and post-go-live support.",
        ar: "كيفية تخطيط الاكتشاف ونوافذ الترحيل والنسخ والاختبار والدعم بعد الإطلاق."
      },
      date: "2026-06-01"
    }
  ],
  leadOptions: [
    "IT Infrastructure & Security",
    "Data Center & Migration",
    "Software / Web / Mobile App",
    "Technical Support / AMC",
    "Consultancy & Data Analytics",
    "Digital Marketing"
  ]
};

export const partnerLogos = [
  { name: "Microsoft", src: "/assets/partner-microsoft.jpg" },
  { name: "Cisco", src: "/assets/partner-cisco.png" },
  { name: "Fortinet", src: "/assets/partner-fortinet.png" },
  { name: "Dell", src: "/assets/partner-dell.png" },
  { name: "HP", src: "/assets/partner-hp.png" },
  { name: "Zebra", src: "/assets/partner-zebra.jpg" },
  { name: "Device42", src: "/assets/partner-device42.jpg" }
];
