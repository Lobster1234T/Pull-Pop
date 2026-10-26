'use client';

import { useCallback } from 'react';
import { Language, supportedLanguages } from './config';
import { t as translate, Translations } from './translations';
import { useLanguageContext } from './LanguageProvider';

/**
 * Хук для работы с языком на клиенте
 * Использует LanguageProvider для глобального управления языком
 */
export const useLanguage = () => {
  const { language, setLanguage, translations, isLoaded } = useLanguageContext();

  // Функция для получения перевода
  const t = useCallback((key: string, defaultValue?: string): string => {
    return translate(language, key, defaultValue);
  }, [language]);

  return {
    language,
    setLanguage,
    t,
    translations,
    isLoaded,
    supportedLanguages,
  };
};
