import { Language } from './config';
import ruMain from './locales/ru/main.json';
import enMain from './locales/en/main.json';
import kgMain from './locales/kg/main.json';

type Translations = typeof ruMain;

const translations: Record<Language, Translations> = {
  ru: ruMain,
  en: enMain,
  kg: kgMain,
};

/**
 * Получить перевод для указанного языка
 */
export const getTranslation = (language: Language): Translations => {
  return translations[language] || translations.ru;
};

/**
 * Получить значение перевода по ключу (с поддержкой вложенных ключей)
 * Пример: t('hero.title') или t('navigation.zones')
 */
export const t = (language: Language, key: string, defaultValue?: string): string => {
  const translation = getTranslation(language);
  const keys = key.split('.');
  let value: any = translation;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return defaultValue || key;
    }
  }

  return typeof value === 'string' ? value : defaultValue || key;
};

export type { Translations };
