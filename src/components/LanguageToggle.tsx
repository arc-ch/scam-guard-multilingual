import React from 'react';
import { Languages } from 'lucide-react';
import type { Language, Theme } from '../types';

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  theme: Theme;
}

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export function LanguageToggle({ currentLanguage, onLanguageChange, theme }: LanguageToggleProps) {
  return (
    <div className="relative group">
      <div className={`flex items-center gap-2 px-4 py-2 backdrop-blur-sm border rounded-lg cursor-pointer transition-all duration-200 ${
        theme === 'dark'
          ? 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
          : 'bg-white/80 border-gray-200 hover:bg-white text-gray-900'
      }`}>
        <Languages size={20} />
        <span className="font-medium">
          {languages.find(lang => lang.code === currentLanguage)?.flag}
          <span className="ml-2 hidden sm:inline">
            {languages.find(lang => lang.code === currentLanguage)?.name}
          </span>
        </span>
      </div>
      
      <div className={`absolute top-full right-0 mt-2 backdrop-blur-sm border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ${
        theme === 'dark'
          ? 'bg-white/10 border-white/20'
          : 'bg-white/90 border-gray-200'
      }`}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`w-full text-left px-4 py-2 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2 ${
              theme === 'dark'
                ? 'hover:bg-white/20 text-white'
                : 'hover:bg-gray-100 text-gray-900'
            } ${
              currentLanguage === lang.code 
                ? theme === 'dark' ? 'bg-white/20' : 'bg-gray-100'
                : ''
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}