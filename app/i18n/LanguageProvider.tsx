'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Language, supportedLanguages, defaultLanguage } from './config';
import { getTranslation, Translations } from './translations';
import { getLanguageCookie, setLanguageCookie } from './cookies';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Translations;
  isLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [isLoaded, setIsLoaded] = useState(false);
  const [translations, setTranslations] = useState(getTranslation(defaultLanguage));

  useEffect(() => {
    try {
      const savedLanguage = getLanguageCookie();
      
      if (savedLanguage !== defaultLanguage) {
        setLanguageState(savedLanguage);
        setTranslations(getTranslation(savedLanguage));
      }
      
      const langMap: Record<Language, string> = {
        ru: 'ru',
        en: 'en',
        kg: 'ky',
      };
      document.documentElement.lang = langMap[savedLanguage];
    } catch (error) {
      console.error('Ошибка при загрузке языка:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const setLanguage = (newLanguage: Language) => {
    if (supportedLanguages.includes(newLanguage)) {
      setLanguageState(newLanguage);
      setTranslations(getTranslation(newLanguage));
      setLanguageCookie(newLanguage);
      
      const langMap: Record<Language, string> = {
        ru: 'ru',
        en: 'en',
        kg: 'ky',
      };
      document.documentElement.lang = langMap[newLanguage];
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext должен использоваться внутри LanguageProvider');
  }
  return context;
}
