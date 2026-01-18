import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GapFillProps {
  words: string[];
  fullText: string; // Полный текст с _____ для пробелов
  onSubmit: (answers: Record<number, string>) => void;
  disabled?: boolean;
}

export const GapFill: React.FC<GapFillProps> = ({
  words,
  fullText,
  onSubmit,
  disabled,
}) => {
  const [usedWords, setUsedWords] = useState<Record<number, string>>({});
  const [availableWords, setAvailableWords] = useState<string[]>(words);
  const [selectedGap, setSelectedGap] = useState<number | null>(null);

  // Разбиваем текст на части по _____
  const textParts = fullText.split('_____');
  const gapCount = textParts.length - 1;

  const handleGapClick = (gapIndex: number) => {
    if (disabled) return;
    
    // Если в пробеле уже есть слово - удаляем его
    if (usedWords[gapIndex]) {
      setAvailableWords(prev => [...prev, usedWords[gapIndex]]);
      const newUsed = { ...usedWords };
      delete newUsed[gapIndex];
      setUsedWords(newUsed);
      setSelectedGap(gapIndex);
    } else {
      // Выбираем пробел
      setSelectedGap(selectedGap === gapIndex ? null : gapIndex);
    }
  };

  const handleWordClick = (word: string) => {
    if (disabled || selectedGap === null) return;
    
    // Вставляем слово в выбранный пробел
    setUsedWords(prev => ({ ...prev, [selectedGap]: word }));
    setAvailableWords(prev => prev.filter(w => w !== word));
    setSelectedGap(null);
  };

  const handleSubmit = () => {
    onSubmit(usedWords);
  };

  const allGapsFilled = Array.from({ length: gapCount }, (_, i) => i).every(i => usedWords[i]);

  return (
    <div className="space-y-4">
      {/* Полный текст с пробелами */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="text-lg leading-loose">
          {textParts.map((part, i) => (
            <React.Fragment key={i}>
              <span>{part}</span>
              {i < textParts.length - 1 && (
                <button
                  onClick={() => handleGapClick(i)}
                  disabled={disabled}
                  className={cn(
                    "inline-block min-w-16 mx-1 px-3 py-1 rounded-lg border-2 transition-all",
                    usedWords[i]
                      ? "border-primary bg-primary/10 text-primary font-medium"
                      : selectedGap === i
                        ? "border-primary bg-primary/20 animate-pulse"
                        : "border-dashed border-muted-foreground/50 hover:border-primary/50"
                  )}
                >
                  {usedWords[i] || '___'}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Подсказка */}
      {selectedGap !== null && (
        <p className="text-sm text-primary font-medium animate-fade-in">
          ↓ Выберите слово для вставки в пробел {selectedGap + 1}
        </p>
      )}
      {selectedGap === null && !allGapsFilled && (
        <p className="text-sm text-muted-foreground">
          ↑ Нажмите на пробел, затем выберите слово
        </p>
      )}

      {/* Доступные слова */}
      <div>
        <p className="text-sm text-muted-foreground mb-2">Wörter:</p>
        <div className="flex flex-wrap gap-2">
          {availableWords.map((word, index) => (
            <button
              key={`${word}-${index}`}
              onClick={() => handleWordClick(word)}
              disabled={disabled || selectedGap === null}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                selectedGap !== null
                  ? "bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
                  : "bg-muted text-muted-foreground opacity-60 cursor-not-allowed"
              )}
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Кнопка проверки */}
      <Button
        onClick={handleSubmit}
        disabled={disabled || !allGapsFilled}
        className="w-full bg-success text-success-foreground hover:bg-success/90"
      >
        Prüfen
      </Button>
    </div>
  );
};