export const languages = {
  ru: 'Русский',
  en: 'English',
  kg: 'Кыргызча',
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = 'ru';
export const supportedLanguages = Object.keys(languages) as Language[];
