import React from 'react';
import { useLanguage, languageOptions } from '@/contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const LanguageSelector: React.FC = () => {
  const { translationLanguage, setTranslationLanguage, getCurrentLanguage } = useLanguage();
  const current = getCurrentLanguage();

  return (
    <Select value={translationLanguage} onValueChange={(val) => setTranslationLanguage(val as any)}>
      <SelectTrigger className="w-auto gap-2 bg-card border-border">
        <span className="text-lg">{current.flag}</span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languageOptions.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <div className="flex items-center gap-2">
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
