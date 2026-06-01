import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  Clock,
  Database,
  Globe2,
  Layers3,
  LockKeyhole,
  Menu,
  MessageCircle,
  MonitorCog,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  X
} from "lucide-react";
import { ChromaFlow, FilmGrain, FlutedGlass, Shader, Swirl } from "shaders/react";
import { defaultContent, partnerLogos } from "./content";
import type { Language, Lead, Post, Service, SiteContent } from "./types";

const contact = {
  phone: "+966 51 016 0212",
  phoneHref: "tel:+966510160212",
  whatsappHref: "https://wa.me/966510160212",
  email: "info@smartuniit.com",
  mapHref:
    "https://www.google.com/maps/search/Al+Aziziyah+,+Building+3554,+Street+110+Unit+7,+Al+Aziziyah+District+Riyadh+14515+-+8574+Kingdom+of+Saudi+Arabia/@24.5868667,46.7524819,14z",
  address: {
    en: "Building No. 3554, Street No. 110, Al Aziziyah District, Unit No. 7, Riyadh 14515, Additional No. 8574, Kingdom of Saudi Arabia",
    ar: "مبنى رقم 3554، شارع رقم 110، حي العزيزية، وحدة رقم 7، الرياض 14515، الرقم الإضافي 8574، المملكة العربية السعودية"
  }
};

const labels = {
  en: {
    nav: ["Services", "Solutions", "Partners", "Insights", "Contact"],
    riyadh: "in Riyadh",
    menu: "Menu",
    close: "Close",
    profile: "Download profile",
    trusted: "Trusted technology ecosystem",
    introducing: "Introducing Smart Universe",
    aboutHeading: "Strategy-led IT services for infrastructure, applications, cyber security, and growth.",
    aboutText:
      "Smart Universe helps organizations modernize their technology foundation with practical consulting, implementation, migration, support, software delivery, and measurable digital growth.",
    services: "Services",
    servicesHeading: "One partner for the systems your business runs on.",
    builder: "Solution builder",
    builderHeading: "Tell us what you need. We will shape the right engagement.",
    companySize: "Company size",
    need: "Primary need",
    urgency: "Timeline",
    recommendation: "Recommended starting point",
    process: "Delivery process",
    processHeading: "A clean execution model from discovery to support.",
    partners: "Technology partners",
    partnersHeading: "We work across the platforms your teams already trust.",
    insights: "Insights",
    insightsHeading: "Practical notes from infrastructure, security, and transformation work.",
    contact: "Start a conversation",
    contactHeading: "Bring us your business challenge. We will map the technology path.",
    name: "Full name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    service: "Service needed",
    message: "What do you want to improve?",
    submit: "Send request",
    submitted: "Thank you. Your request has been received.",
    admin: "Admin",
    viewProfile: "View company profile"
  },
  ar: {
    nav: ["الخدمات", "الحلول", "الشركاء", "المقالات", "تواصل معنا"],
    riyadh: "في الرياض",
    menu: "القائمة",
    close: "إغلاق",
    profile: "تحميل الملف التعريفي",
    trusted: "منظومة تقنية موثوقة",
    introducing: "تعرف على سمارت يونيفرس",
    aboutHeading: "خدمات تقنية استراتيجية للبنية التحتية والتطبيقات والأمن السيبراني والنمو.",
    aboutText:
      "تساعد سمارت يونيفرس المؤسسات على تحديث أساسها التقني عبر الاستشارات والتنفيذ والترحيل والدعم وتطوير البرمجيات والنمو الرقمي القابل للقياس.",
    services: "الخدمات",
    servicesHeading: "شريك واحد للأنظمة التي يعمل عليها نشاطك.",
    builder: "مصمم الحلول",
    builderHeading: "أخبرنا باحتياجك وسنقترح نقطة البداية المناسبة.",
    companySize: "حجم الشركة",
    need: "الاحتياج الأساسي",
    urgency: "المدة الزمنية",
    recommendation: "نقطة البداية المقترحة",
    process: "منهجية التنفيذ",
    processHeading: "نموذج تنفيذ واضح من الاكتشاف إلى الدعم.",
    partners: "شركاء التقنية",
    partnersHeading: "نعمل عبر المنصات التي تثق بها فرقك.",
    insights: "المقالات",
    insightsHeading: "ملاحظات عملية من أعمال البنية التحتية والأمن والتحول.",
    contact: "ابدأ الحوار",
    contactHeading: "شاركنا تحدي العمل وسنرسم المسار التقني.",
    name: "الاسم الكامل",
    company: "الشركة",
    email: "البريد الإلكتروني",
    phone: "رقم الجوال",
    service: "الخدمة المطلوبة",
    message: "ما الذي تريد تحسينه؟",
    submit: "إرسال الطلب",
    submitted: "شكرا لك. تم استلام طلبك.",
    admin: "الإدارة",
    viewProfile: "عرض الملف التعريفي"
  }
};

const processSteps = [
  {
    title: { en: "Consultation", ar: "الاستشارة" },
    text: { en: "We clarify goals, risks, users, current systems, and success measures.", ar: "نحدد الأهداف والمخاطر والمستخدمين والأنظمة الحالية ومعايير النجاح." }
  },
  {
    title: { en: "Solution Design", ar: "تصميم الحل" },
    text: { en: "Architecture, scope, timeline, commercials, and delivery plan are prepared.", ar: "نجهز البنية والنطاق والجدول والتكلفة وخطة التنفيذ." }
  },
  {
    title: { en: "Implementation", ar: "التنفيذ" },
    text: { en: "Certified engineers configure, build, migrate, integrate, and test.", ar: "يقوم المهندسون بالإعداد والبناء والترحيل والتكامل والاختبار." }
  },
  {
    title: { en: "Training & Handover", ar: "التدريب والتسليم" },
    text: { en: "Your team receives documentation, training, and operational readiness.", ar: "يتسلم فريقك التوثيق والتدريب وجاهزية التشغيل." }
  },
  {
    title: { en: "Support", ar: "الدعم" },
    text: { en: "We monitor, support, maintain, and refine the delivered environment.", ar: "نراقب وندعم ونصون ونطور البيئة المسلمة." }
  }
];

const solutionOptions = {
  sizes: ["Startup", "SMB", "Enterprise", "Government"],
  needs: ["Secure network", "Cloud migration", "Custom app", "Managed IT", "Digital growth"],
  urgency: ["This month", "This quarter", "Planning stage"]
};

const serviceIcons = [ShieldCheck, MonitorCog, Database, Layers3, BarChart3, Globe2];

function t(lang: Language, value: { en: string; ar: string }) {
  return value[lang] || value.en;
}

function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const isAdmin = window.location.pathname.startsWith("/admin");

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  useEffect(() => {
    fetch("/api/content")
      .then((response) => (response.ok ? response.json() : defaultContent))
      .then((data) => setContent(data))
      .catch(() => setContent(defaultContent));
  }, []);

  if (isAdmin) {
    return <AdminApp content={content} setContent={setContent} />;
  }

  return (
    <main className="min-h-screen bg-white text-ink">
      <Hero content={content} language={language} setLanguage={setLanguage} />
      <About content={content} language={language} />
      <Services content={content} language={language} />
      <SolutionBuilder language={language} />
      <Process language={language} />
      <Partners language={language} />
      <Insights content={content} language={language} />
      <Contact content={content} language={language} />
    </main>
  );
}

function Hero({
  content,
  language,
  setLanguage
}: {
  content: SiteContent;
  language: Language;
  setLanguage: (language: Language) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("");
  const copy = labels[language];

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Riyadh"
        }).format(new Date())
      );
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const navHref = ["#services", "#solutions", "#partners", "#insights", "#contact"];

  return (
    <section className="relative flex min-h-screen overflow-hidden bg-[#EEF2F6]">
      <div className="absolute inset-0 z-0 hero-grid" />
      <Shader className="absolute inset-0 z-10 h-full w-full opacity-80 pointer-events-none">
        <Swirl colorA="#ffffff" colorB="#eaf2fb" detail={1.7} />
        <ChromaFlow baseColor="#ffffff" downColor="#F26522" leftColor="#075EA8" rightColor="#2D8A69" upColor="#F26522" momentum={13} radius={3.5} />
        <FlutedGlass aberration={0.48} angle={31} frequency={8} highlight={0.12} highlightSoftness={0} lightAngle={-90} refraction={3.2} shape="rounded" softness={1} speed={0.15} />
        <FilmGrain strength={0.04} />
      </Shader>

      <div className="relative z-20 flex min-h-screen w-full flex-col">
        <header className="mx-auto w-full max-w-[1440px] p-2 sm:p-3">
          <nav className="flex items-center justify-between rounded-full bg-white/95 p-[5px] shadow-[0_8px_30px_rgba(11,27,63,0.08)] backdrop-blur">
            <div className="flex items-center gap-6">
              <a href="/" className="flex items-center gap-3 rounded-full pr-2">
                <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-slate-200">
                  <img src="/assets/smartuniit-logo.png" alt="Smart Universe" className="h-8 w-8 object-contain" />
                </span>
                <span className="hidden text-sm font-semibold tracking-tight text-smartNavy sm:block">Smart Universe</span>
              </a>
              <div className="hidden items-center gap-6 md:flex">
                {copy.nav.map((item, index) => (
                  <a key={item} href={navHref[index]} className="text-sm text-slate-900 transition-colors duration-300 hover:text-slate-500">
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <a href="/profile/smart-universe-company-profile.pdf" className="hidden text-[13px] text-slate-600 transition hover:text-smartBlue lg:block">
                {copy.profile}
              </a>
              <span className="flex items-center gap-1.5 text-[13px] text-slate-600">
                <Clock size={14} />
                {time} {copy.riyadh}
              </span>
              <button onClick={() => setLanguage(language === "en" ? "ar" : "en")} className="rounded-full border border-slate-200 px-3 py-2 text-[13px] font-semibold text-smartNavy transition hover:border-smartBlue">
                {language === "en" ? "عربي" : "English"}
              </button>
              <CtaButton href="#contact" label={content.hero.primaryCta[language]} dark />
            </div>

            <button onClick={() => setMenuOpen(true)} className="flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white md:hidden">
              <Menu size={16} />
              {copy.menu}
            </button>
          </nav>
        </header>

        <div className="flex-1" />
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
          <div className="max-w-5xl">
            <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.18em] text-smartOrange sm:mb-8">{content.hero.eyebrow[language]}</p>
            <h1 className="max-w-6xl text-[clamp(2.25rem,7vw,5.8rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-smartNavy text-balance">
              {content.hero.title[language]}
            </h1>
            <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-slate-700 sm:text-lg">{content.hero.subtitle[language]}</p>
            <div className="mt-8 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-5">
              <CtaButton href="#contact" label={content.hero.primaryCta[language]} />
              <a href="#solutions" className="group inline-flex w-fit items-center gap-3 rounded-[8px] bg-white px-4 py-3 text-sm font-semibold text-smartNavy shadow-[0_2px_10px_rgba(11,27,63,0.08)] transition hover:shadow-[0_6px_24px_rgba(11,27,63,0.14)]">
                <Sparkles className="text-smartOrange" size={20} />
                {content.hero.secondaryCta[language]}
                <span className="rounded bg-slate-950 px-2 py-1 text-[10px] uppercase tracking-wide text-white">AI-ready</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 z-50 bg-black/60 transition md:hidden ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <div className={`absolute inset-x-3 bottom-3 rounded-2xl bg-white p-5 shadow-2xl transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${menuOpen ? "translate-y-0" : "translate-y-full"}`}>
          <div className="mb-8 flex items-center justify-between">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{time} {copy.riyadh}</span>
            <button onClick={() => setMenuOpen(false)} className="rounded-full bg-slate-950 p-3 text-white">
              <X size={18} />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {copy.nav.map((item, index) => (
              <a key={item} onClick={() => setMenuOpen(false)} href={navHref[index]} className="text-[28px] font-semibold leading-8 tracking-tight text-smartNavy">
                {item}
              </a>
            ))}
          </div>
          <div className="mt-8 flex gap-3">
            <button onClick={() => setLanguage(language === "en" ? "ar" : "en")} className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-smartNavy">
              {language === "en" ? "عربي" : "English"}
            </button>
            <CtaButton href="#contact" label={content.hero.primaryCta[language]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaButton({ href, label, dark = false }: { href: string; label: string; dark?: boolean }) {
  return (
    <a href={href} className={`group inline-flex w-fit items-center rounded-full py-2 pl-5 pr-2 text-[13px] font-semibold transition ${dark ? "bg-slate-950 text-white" : "bg-smartOrange text-white hover:bg-[#e05a1a]"}`}>
      <span className="roll-text">
        <span className="roll-track">
          <span className="h-5">{label}</span>
          <span className="h-5">{label}</span>
        </span>
      </span>
      <span className={`ml-3 flex h-7 w-7 items-center justify-center rounded-full transition duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 ${dark ? "bg-white text-slate-950" : "bg-white text-smartOrange"}`}>
        <ArrowRight size={15} />
      </span>
    </a>
  );
}

function SectionBadge({ number, label }: { number: string; label: string }) {
  return (
    <div className="mb-6 flex items-center gap-3 sm:mb-8">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-smartNavy text-xs font-semibold text-white">{number}</span>
      <span className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-smartNavy">{label}</span>
    </div>
  );
}

function About({ content, language }: { content: SiteContent; language: Language }) {
  const copy = labels[language];
  return (
    <section className="overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionBadge number="1" label={copy.introducing} />
        <h2 className="max-w-5xl text-[clamp(1.7rem,4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-smartNavy text-balance">
          {copy.aboutHeading}
        </h2>
        <div className="mt-12 grid gap-6 lg:mt-20 lg:grid-cols-[1fr_0.8fr_1.15fr] lg:items-end">
          <div className="rounded-2xl bg-smartNavy p-6 text-white sm:p-8">
            <p className="text-sm uppercase tracking-[0.16em] text-blue-100">{copy.trusted}</p>
            <div className="mt-8 grid grid-cols-2 gap-5">
              {content.stats.map((stat) => (
                <div key={stat.value}>
                  <p className="text-4xl font-semibold tracking-tight">{stat.value}</p>
                  <p className="mt-2 text-sm leading-5 text-blue-100">{t(language, stat.label)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-base font-medium leading-[1.75] text-slate-700">{copy.aboutText}</p>
            <CtaButton href="#contact" label={content.hero.primaryCta[language]} />
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-2xl bg-slate-100 p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(242,101,34,0.22),transparent_34%),radial-gradient(circle_at_80%_65%,rgba(7,94,168,0.24),transparent_32%)]" />
            <div className="relative flex h-full min-h-[300px] flex-col justify-between rounded-2xl border border-white/60 bg-white/70 p-6 backdrop-blur">
              <img src="/assets/smartuniit-logo.png" alt="Smart Universe" className="h-20 w-40 object-contain object-left" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-smartOrange">Company profile</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-smartNavy">IT Infrastructure, Security, Software, Data & Growth</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="/profile/smart-universe-company-profile.pdf" className="rounded-full bg-smartNavy px-5 py-3 text-sm font-semibold text-white">{copy.viewProfile}</a>
                  <a href={contact.mapHref} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-smartNavy">Riyadh HQ</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services({ content, language }: { content: SiteContent; language: Language }) {
  const copy = labels[language];
  return (
    <section id="services" className="bg-[#F6F8FB] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionBadge number="2" label={copy.services} />
        <h2 className="max-w-4xl text-[clamp(1.75rem,5vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-smartNavy text-balance">
          {copy.servicesHeading}
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {content.services.map((service, index) => (
            <ServiceCard key={service.id} service={service} language={language} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, language, index }: { service: Service; language: Language; index: number }) {
  const Icon = serviceIcons[index % serviceIcons.length];
  return (
    <article className="group min-h-[320px] rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(11,27,63,0.12)]">
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-smartBlue">
          <Icon size={24} />
        </span>
        <span className="text-sm font-semibold text-slate-300">0{index + 1}</span>
      </div>
      <h3 className="mt-8 text-2xl font-semibold tracking-tight text-smartNavy">{t(language, service.title)}</h3>
      <p className="mt-4 text-sm leading-6 text-slate-600">{t(language, service.summary)}</p>
      <ul className="mt-6 space-y-3">
        {service.points.map((point) => (
          <li key={point.en} className="flex gap-3 text-sm leading-5 text-slate-700">
            <Check className="mt-0.5 shrink-0 text-smartGreen" size={16} />
            <span>{t(language, point)}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function SolutionBuilder({ language }: { language: Language }) {
  const copy = labels[language];
  const [size, setSize] = useState(solutionOptions.sizes[1]);
  const [need, setNeed] = useState(solutionOptions.needs[0]);
  const [urgency, setUrgency] = useState(solutionOptions.urgency[1]);
  const recommendation = useMemo(() => {
    if (need.includes("Cloud")) return "Discovery + migration roadmap + pilot migration";
    if (need.includes("Custom")) return "Product workshop + UX blueprint + MVP build plan";
    if (need.includes("Managed")) return "IT health check + SLA support proposal";
    if (need.includes("Digital")) return "Digital audit + lead-generation campaign plan";
    return "Security assessment + network hardening proposal";
  }, [need]);

  return (
    <section id="solutions" className="bg-smartNavy py-16 text-white sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
        <div>
          <SectionBadge number="3" label={copy.builder} />
          <h2 className="text-[clamp(1.75rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-balance">{copy.builderHeading}</h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-blue-100">
            {language === "en"
              ? "This quick selector turns website visitors into qualified enquiries and helps your team respond with the right offer."
              : "يساعد هذا الاختيار السريع زوار الموقع على إرسال طلبات واضحة ويساعد فريقك على الرد بالعرض المناسب."}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur sm:p-7">
          <div className="grid gap-4 sm:grid-cols-3">
            <Picker label={copy.companySize} value={size} values={solutionOptions.sizes} setValue={setSize} />
            <Picker label={copy.need} value={need} values={solutionOptions.needs} setValue={setNeed} />
            <Picker label={copy.urgency} value={urgency} values={solutionOptions.urgency} setValue={setUrgency} />
          </div>
          <div className="mt-6 rounded-2xl bg-white p-6 text-smartNavy">
            <p className="text-sm font-semibold text-smartOrange">{copy.recommendation}</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight">{recommendation}</h3>
            <div className="mt-6 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
              <span className="rounded-xl bg-slate-100 px-4 py-3">{size}</span>
              <span className="rounded-xl bg-slate-100 px-4 py-3">{need}</span>
              <span className="rounded-xl bg-slate-100 px-4 py-3">{urgency}</span>
            </div>
            <div className="mt-6">
              <CtaButton href="#contact" label={labels[language].contact} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Picker({ label, value, values, setValue }: { label: string; value: string; values: string[]; setValue: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-blue-100">{label}</span>
      <span className="relative block">
        <select value={value} onChange={(event) => setValue(event.target.value)} className="w-full appearance-none rounded-xl border border-white/10 bg-white/95 px-4 py-3 text-sm font-semibold text-smartNavy outline-none">
          {values.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-3.5 text-slate-500" size={16} />
      </span>
    </label>
  );
}

function Process({ language }: { language: Language }) {
  const copy = labels[language];
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionBadge number="4" label={copy.process} />
        <h2 className="max-w-4xl text-[clamp(1.75rem,5vw,4.2rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-smartNavy text-balance">{copy.processHeading}</h2>
        <div className="mt-12 grid gap-4 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <article key={step.title.en} className="rounded-2xl border border-slate-200 p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-smartOrange text-sm font-semibold text-white">{index + 1}</span>
              <h3 className="mt-6 text-xl font-semibold text-smartNavy">{t(language, step.title)}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{t(language, step.text)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners({ language }: { language: Language }) {
  const copy = labels[language];
  return (
    <section id="partners" className="bg-[#F6F8FB] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionBadge number="5" label={copy.partners} />
        <h2 className="max-w-4xl text-[clamp(1.75rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-smartNavy text-balance">{copy.partnersHeading}</h2>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
          {partnerLogos.map((logo) => (
            <div key={logo.name} className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <img src={logo.src} alt={logo.name} className="max-h-16 max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Insights({ content, language }: { content: SiteContent; language: Language }) {
  const copy = labels[language];
  return (
    <section id="insights" className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionBadge number="6" label={copy.insights} />
        <h2 className="max-w-4xl text-[clamp(1.75rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-smartNavy text-balance">{copy.insightsHeading}</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {content.posts.map((post) => (
            <article key={post.id} className="rounded-2xl bg-slate-50 p-6 transition hover:bg-smartNavy hover:text-white">
              <p className="text-sm font-semibold text-smartOrange">{t(language, post.category)} · {post.date}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{t(language, post.title)}</h3>
              <p className="mt-4 text-sm leading-6 opacity-75">{t(language, post.excerpt)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ content, language }: { content: SiteContent; language: Language }) {
  const copy = labels[language];
  const [lead, setLead] = useState<Lead>({ name: "", company: "", email: "", phone: "", service: content.leadOptions[0] || "", message: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    setLead((current) => ({ ...current, service: current.service || content.leadOptions[0] || "" }));
  }, [content.leadOptions]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus("");
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead)
    });
    if (response.ok) {
      setStatus(copy.submitted);
      setLead({ name: "", company: "", email: "", phone: "", service: content.leadOptions[0] || "", message: "" });
    } else {
      setStatus("Could not send right now. Please use WhatsApp or email.");
    }
  }

  return (
    <section id="contact" className="bg-smartNavy py-16 text-white sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-12">
        <div>
          <SectionBadge number="7" label={copy.contact} />
          <h2 className="text-[clamp(1.75rem,5vw,4.2rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-balance">{copy.contactHeading}</h2>
          <div className="mt-8 space-y-4 text-blue-100">
            <a href={contact.phoneHref} className="flex items-center gap-3"><Phone size={18} /> {contact.phone}</a>
            <a href={contact.whatsappHref} className="flex items-center gap-3"><MessageCircle size={18} /> WhatsApp {contact.phone}</a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-3"><Send size={18} /> {contact.email}</a>
            <a href={contact.mapHref} className="block max-w-xl leading-7 hover:text-white">{contact.address[language]}</a>
          </div>
        </div>
        <form onSubmit={submit} className="rounded-2xl bg-white p-5 text-smartNavy shadow-2xl sm:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label={copy.name} value={lead.name} onChange={(value) => setLead({ ...lead, name: value })} required />
            <Input label={copy.company} value={lead.company} onChange={(value) => setLead({ ...lead, company: value })} required />
            <Input label={copy.email} type="email" value={lead.email} onChange={(value) => setLead({ ...lead, email: value })} required />
            <Input label={copy.phone} value={lead.phone} onChange={(value) => setLead({ ...lead, phone: value })} required />
            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-semibold">{copy.service}</span>
              <select className="admin-field" value={lead.service} onChange={(event) => setLead({ ...lead, service: event.target.value })}>
                {content.leadOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-semibold">{copy.message}</span>
              <textarea className="admin-field min-h-32 resize-y" value={lead.message} onChange={(event) => setLead({ ...lead, message: event.target.value })} />
            </label>
          </div>
          <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-smartOrange px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e05a1a]">
            {copy.submit}
            <ArrowRight size={16} />
          </button>
          {status && <p className="mt-4 text-sm font-semibold text-smartGreen">{status}</p>}
        </form>
      </div>
    </section>
  );
}

function Input({ label, value, onChange, required, type = "text" }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; type?: string }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-semibold">{label}</span>
      <input className="admin-field" type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} />
    </label>
  );
}

function AdminApp({ content, setContent }: { content: SiteContent; setContent: (content: SiteContent) => void }) {
  const [token, setToken] = useState(() => localStorage.getItem("smartuniit_admin_token") || "");
  const [login, setLogin] = useState({ username: "admin", password: "" });
  const [json, setJson] = useState(JSON.stringify(content, null, 2));
  const [leads, setLeads] = useState<Lead[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setJson(JSON.stringify(content, null, 2));
  }, [content]);

  useEffect(() => {
    if (!token) return;
    fetch("/api/admin/leads", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => (response.ok ? response.json() : []))
      .then(setLeads)
      .catch(() => setLeads([]));
  }, [token]);

  async function submitLogin(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login)
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok && data.token) {
      localStorage.setItem("smartuniit_admin_token", data.token);
      setToken(data.token);
    } else {
      setMessage(data.error || "Login failed");
    }
  }

  async function saveContent() {
    setMessage("");
    try {
      const parsed = JSON.parse(json) as SiteContent;
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(parsed)
      });
      if (!response.ok) throw new Error("Save failed");
      setContent(parsed);
      setMessage("Content saved.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Invalid content JSON");
    }
  }

  function addPost() {
    const parsed = JSON.parse(json) as SiteContent;
    const post: Post = {
      id: `post-${Date.now()}`,
      title: { en: "New insight title", ar: "عنوان مقال جديد" },
      category: { en: "Company", ar: "الشركة" },
      excerpt: { en: "Write a short summary here.", ar: "اكتب ملخصا قصيرا هنا." },
      date: new Date().toISOString().slice(0, 10)
    };
    parsed.posts = [post, ...parsed.posts];
    setJson(JSON.stringify(parsed, null, 2));
  }

  if (!token) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-100 px-5">
        <form onSubmit={submitLogin} className="w-full max-w-md rounded-2xl bg-white p-7 shadow-xl">
          <img src="/assets/smartuniit-logo.png" alt="Smart Universe" className="mb-8 h-16 w-40 object-contain object-left" />
          <h1 className="text-2xl font-semibold tracking-tight text-smartNavy">Website Admin</h1>
          <p className="mt-2 text-sm text-slate-600">Manage homepage content, insights, and lead requests.</p>
          <div className="mt-6 space-y-4">
            <Input label="Username" value={login.username} onChange={(value) => setLogin({ ...login, username: value })} required />
            <Input label="Password" type="password" value={login.password} onChange={(value) => setLogin({ ...login, password: value })} required />
          </div>
          <button className="mt-6 w-full rounded-full bg-smartNavy px-5 py-3 text-sm font-semibold text-white">Login</button>
          {message && <p className="mt-4 text-sm font-semibold text-red-600">{message}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-5 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-smartNavy">Smart Universe Website Admin</h1>
            <p className="mt-2 text-sm text-slate-600">Edit bilingual site content and monitor incoming leads.</p>
          </div>
          <div className="flex gap-3">
            <a href="/" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-smartNavy">View site</a>
            <button onClick={() => { localStorage.removeItem("smartuniit_admin_token"); setToken(""); }} className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Logout</button>
          </div>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-smartNavy">Site Content JSON</h2>
              <div className="flex gap-3">
                <button onClick={addPost} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-smartNavy">Add post</button>
                <button onClick={saveContent} className="rounded-full bg-smartOrange px-4 py-2 text-sm font-semibold text-white">Save content</button>
              </div>
            </div>
            <textarea value={json} onChange={(event) => setJson(event.target.value)} className="mt-4 min-h-[680px] w-full rounded-xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs leading-5 text-slate-100 outline-none focus:ring-4 focus:ring-blue-100" spellCheck={false} />
            {message && <p className="mt-4 text-sm font-semibold text-smartGreen">{message}</p>}
          </section>
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-smartNavy">Lead Requests</h2>
            <div className="mt-4 space-y-4">
              {leads.length === 0 && <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">No leads yet.</p>}
              {leads.map((lead) => (
                <article key={lead.id} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-smartNavy">{lead.name}</h3>
                      <p className="text-sm text-slate-500">{lead.company}</p>
                    </div>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-smartBlue">{lead.service}</span>
                  </div>
                  <div className="mt-4 text-sm leading-6 text-slate-700">
                    <p>{lead.email} · {lead.phone}</p>
                    <p className="mt-2">{lead.message}</p>
                    <p className="mt-2 text-xs text-slate-400">{lead.createdAt}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
