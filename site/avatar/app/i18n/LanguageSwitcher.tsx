'use client';

import { useLanguage } from './useLanguage';
import { languages } from './config';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      {Object.entries(languages).map(([lang, label]) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang as any)}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
            language === lang
              ? 'bg-cyan-500 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
