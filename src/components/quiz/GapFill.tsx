import React, { useState, useEffect, useMemo } from 'react';
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
  const [selectedGap, setSelectedGap] = useState<number | null>(null);

  // Стабильное перемешивание слов при первой загрузке
  const shuffledWords = useMemo(() => {
    return [...words].sort(() => Math.random() - 0.5);
  }, [words.join(',')]);

  // Инициализация слов при загрузке
  useEffect(() => {
    setAvailableWords(shuffledWords);
    setUsedWords({});
    setSelectedWord(null);
    setSelectedGap(null);
  }, [shuffledWords, fullText]);

  // Разбиваем текст на части по _____
  const textParts = fullText.split('_____');
  const gapCount = textParts.length - 1;

  // Обработчик клика по слову
  const handleWordClick = (word: string) => {
    if (disabled) return;
    
    // Если уже выбран пробел - вставляем слово туда
    if (selectedGap !== null) {
      setUsedWords(prev => ({ ...prev, [selectedGap]: word }));
      setAvailableWords(prev => prev.filter(w => w !== word));
      setSelectedGap(null);
      setSelectedWord(null);
      return;
    }
    
    // Иначе просто выбираем/отменяем выбор слова
    if (selectedWord === word) {
      setSelectedWord(null);
    } else {
      setSelectedWord(word);
    }
  };

  // Обработчик клика по пробелу
  const handleGapClick = (gapIndex: number) => {
    if (disabled) return;
    
    // Если в пробеле уже есть слово - удаляем его
    if (usedWords[gapIndex]) {
      const wordToReturn = usedWords[gapIndex];
      setAvailableWords(prev => [...prev, wordToReturn]);
      const newUsed = { ...usedWords };
      delete newUsed[gapIndex];
      setUsedWords(newUsed);
      setSelectedGap(null);
      setSelectedWord(null);
      return;
    }
    
    // Если выбрано слово - вставляем его в этот пробел
    if (selectedWord) {
      setUsedWords(prev => ({ ...prev, [gapIndex]: selectedWord }));
      setAvailableWords(prev => prev.filter(w => w !== selectedWord));
      setSelectedWord(null);
      setSelectedGap(null);
      return;
    }
    
    // Иначе выбираем/отменяем пробел
    if (selectedGap === gapIndex) {
      setSelectedGap(null);
    } else {
      setSelectedGap(gapIndex);
    }
  };

  const handleSubmit = () => {
    onSubmit(usedWords);
  };

  const allGapsFilled = Array.from({ length: gapCount }, (_, i) => i).every(i => usedWords[i]);

  return (
    <div className="space-y-4">
      {/* Убраны все подсказки - без дополнительных строк */}

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
                    "inline-block min-w-16 mx-1 px-3 py-1 rounded-lg border-2 transition-all text-base",
                    usedWords[i]
                      ? "border-primary bg-primary/10 text-primary font-medium cursor-pointer hover:bg-destructive/10 hover:border-destructive hover:text-destructive"
                      : selectedGap === i
                        ? "border-primary bg-primary/30 ring-2 ring-primary ring-offset-2"
                        : selectedWord
                          ? "border-primary bg-primary/20 animate-pulse cursor-pointer hover:bg-primary/30"
                          : "border-dashed border-muted-foreground/50 hover:border-primary/50 cursor-pointer"
                  )}
                  title={usedWords[i] ? "Нажмите чтобы убрать слово" : "Нажмите чтобы выбрать пробел"}
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
                  : selectedGap !== null
                    ? "bg-muted text-foreground hover:bg-primary/20 hover:text-primary cursor-pointer animate-pulse"
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
