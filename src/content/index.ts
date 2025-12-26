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

