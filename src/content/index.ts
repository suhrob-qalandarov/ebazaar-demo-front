import { uzContent } from './uz';
import { krContent } from './kr';
import { ruContent } from './ru';
import type { Locale } from '@/types/locale';

export const staticContent = {
  uz: uzContent,
  kr: krContent,
  ru: ruContent,
} as const;

export const getStaticContent = (locale: Locale) => staticContent[locale];

export const getNavLinks = (locale: Locale) => {
  const content = getStaticContent(locale);
  return [
    { name: content.navbar.about, path: "about" },
    { name: content.navbar.clients, path: "clients" },
    { name: content.navbar.team, path: "team" },
    { name: content.navbar.contact, path: "contact" },
  ];
};

