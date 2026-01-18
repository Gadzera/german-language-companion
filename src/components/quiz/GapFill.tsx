import React, { useState, useEffect } from 'react';
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
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  // Инициализация слов при загрузке
  useEffect(() => {
    setAvailableWords([...words]);
    setUsedWords({});
    setSelectedWord(null);
  }, [words, fullText]);

  // Разбиваем текст на части по _____
  const textParts = fullText.split('_____');
  const gapCount = textParts.length - 1;

  // Сначала выбираем слово, потом нажимаем на пробел
  const handleWordClick = (word: string) => {
    if (disabled) return;
    
    if (selectedWord === word) {
      // Повторный клик - отменяем выбор
      setSelectedWord(null);
    } else {
      setSelectedWord(word);
    }
  };

  const handleGapClick = (gapIndex: number) => {
    if (disabled) return;
    
    // Если в пробеле уже есть слово - удаляем его
    if (usedWords[gapIndex]) {
      const wordToReturn = usedWords[gapIndex];
      setAvailableWords(prev => [...prev, wordToReturn]);
      const newUsed = { ...usedWords };
      delete newUsed[gapIndex];
      setUsedWords(newUsed);
      return;
    }
    
    // Если выбрано слово - вставляем его в пробел
    if (selectedWord) {
      setUsedWords(prev => ({ ...prev, [gapIndex]: selectedWord }));
      setAvailableWords(prev => prev.filter(w => w !== selectedWord));
      setSelectedWord(null);
    }
  };

  const handleSubmit = () => {
    onSubmit(usedWords);
  };

  const allGapsFilled = Array.from({ length: gapCount }, (_, i) => i).every(i => usedWords[i]);

  return (
    <div className="space-y-4">
      {/* Инструкция */}
      {!selectedWord && !allGapsFilled && (
        <p className="text-sm text-muted-foreground text-center">
          ↓ Сначала выберите слово, потом нажмите на пробел
        </p>
      )}
      {selectedWord && (
        <p className="text-sm text-primary font-medium text-center animate-fade-in">
          ✓ Выбрано: <span className="font-bold">{selectedWord}</span> — теперь нажмите на пробел
        </p>
      )}

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
                    "inline-block min-w-20 mx-1 px-3 py-1 rounded-lg border-2 transition-all text-base",
                    usedWords[i]
                      ? "border-primary bg-primary/10 text-primary font-medium cursor-pointer hover:bg-destructive/10 hover:border-destructive hover:text-destructive"
                      : selectedWord
                        ? "border-primary bg-primary/20 animate-pulse cursor-pointer hover:bg-primary/30"
                        : "border-dashed border-muted-foreground/50"
                  )}
                  title={usedWords[i] ? "Нажмите чтобы убрать слово" : selectedWord ? "Нажмите чтобы вставить слово" : "Сначала выберите слово"}
                >
                  {usedWords[i] || '___'}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Доступные слова */}
      <div>
        <p className="text-sm text-muted-foreground mb-2">Wörter:</p>
        <div className="flex flex-wrap gap-2">
          {availableWords.map((word, index) => (
            <button
              key={`${word}-${index}`}
              onClick={() => handleWordClick(word)}
              disabled={disabled}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                selectedWord === word
                  ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
                  : "bg-muted text-foreground hover:bg-primary/20 hover:text-primary cursor-pointer"
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
