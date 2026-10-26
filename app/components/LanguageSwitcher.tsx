'use client';

import { useI18n } from '@/app/lib/i18n';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  const languages = [
    { code: 'kg', name: 'КГ', label: 'Кыргыз' },
    { code: 'ru', name: 'РУ', label: 'Русский' },
    { code: 'en', name: 'EN', label: 'English' },
  ];

  return (
    <div className="flex items-center gap-2 bg-slate-800/30 hover:bg-cyan-500/10 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg p-1 transition-all">
      <Globe size={16} className="text-cyan-400 hidden md:block" />
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as any)}
          title={lang.label}
          className={`px-2.5 py-1.5 rounded text-xs font-bold transition-all ${
            language === lang.code
              ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
}
