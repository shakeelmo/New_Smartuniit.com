export type Language = "en" | "ar";

export type Localized = {
  en: string;
  ar: string;
};

export type Service = {
  id: string;
  title: Localized;
  summary: Localized;
  points: Localized[];
};

export type Post = {
  id: string;
  title: Localized;
  category: Localized;
  excerpt: Localized;
  date: string;
};

export type SiteContent = {
  hero: {
    eyebrow: Localized;
    title: Localized;
    subtitle: Localized;
    primaryCta: Localized;
    secondaryCta: Localized;
  };
  stats: { value: string; label: Localized }[];
  services: Service[];
  posts: Post[];
  leadOptions: string[];
};

export type Lead = {
  id?: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt?: string;
};
