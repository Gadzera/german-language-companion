// Language context for translation support
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type TranslationLanguage = 'ru' | 'tr' | 'fa' | 'ar';

interface LanguageOption {
  code: TranslationLanguage;
  name: string;
  flag: string;
}

export const languageOptions: LanguageOption[] = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

interface LanguageContextType {
  translationLanguage: TranslationLanguage;
  setTranslationLanguage: (lang: TranslationLanguage) => void;
  getCurrentLanguage: () => LanguageOption;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [translationLanguage, setTranslationLanguage] = useState<TranslationLanguage>('ru');

  const getCurrentLanguage = () => {
    return languageOptions.find(l => l.code === translationLanguage) || languageOptions[0];
  };

  return (
    <LanguageContext.Provider value={{ translationLanguage, setTranslationLanguage, getCurrentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
