import React, { useState, useEffect, useMemo, forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GapFillProps {
  words: string[];
  fullText: string; // Полный текст с _____ для пробелов
  correctAnswers?: string[]; // Правильные ответы для подсветки
  onSubmit: (answers: Record<number, string>) => void;
  disabled?: boolean;
  showResult?: boolean; // Показывать результат
}

export const GapFill = forwardRef<HTMLDivElement, GapFillProps>(({
  words,
  fullText,
  correctAnswers,
  onSubmit,
  disabled,
  showResult,
}, ref) => {
  const [usedWords, setUsedWords] = useState<Record<number, string>>({});
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedGap, setSelectedGap] = useState<number | null>(null);

  // Стабильное перемешивание слов при первой загрузке (слова НЕ исчезают после использования)
  const shuffledWords = useMemo(() => {
    return [...words].sort(() => Math.random() - 0.5);
  }, [words.join(',')]);

  // Сброс при загрузке нового вопроса
  useEffect(() => {
    setUsedWords({});
    setSelectedWord(null);
    setSelectedGap(null);
  }, [fullText]);

  // Разбиваем текст на части по _____
  const textParts = fullText.split('_____');
  const gapCount = textParts.length - 1;

  // Правильные ответы в виде массива
  const correctAnswersList = useMemo(() => {
    if (correctAnswers) return correctAnswers;
    return [];
  }, [correctAnswers]);

  // Обработчик клика по слову — слово НЕ удаляется из списка (можно использовать многократно)
  const handleWordClick = (word: string) => {
    if (disabled) return;
    
    // Если уже выбран пробел - вставляем слово туда
    if (selectedGap !== null) {
      setUsedWords(prev => ({ ...prev, [selectedGap]: word }));
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
    
    // Если в пробеле уже есть слово - просто удаляем его (слово остаётся в списке)
    if (usedWords[gapIndex]) {
      const newUsed = { ...usedWords };
      delete newUsed[gapIndex];
      setUsedWords(newUsed);
      setSelectedGap(null);
      setSelectedWord(null);
      return;
    }
    
    // Если выбрано слово - вставляем его в этот пробел (слово НЕ удаляется из списка)
    if (selectedWord) {
      setUsedWords(prev => ({ ...prev, [gapIndex]: selectedWord }));
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

  // Проверка правильности ответа в конкретном пробеле
  const isGapCorrect = (gapIndex: number): boolean | null => {
    if (!showResult || !usedWords[gapIndex]) return null;
    if (correctAnswersList.length > gapIndex) {
      return usedWords[gapIndex].toLowerCase() === correctAnswersList[gapIndex].toLowerCase();
    }
    return null;
  };

  return (
    <div ref={ref} className="space-y-4">
      {/* Полный текст с пробелами */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="text-lg leading-loose">
          {textParts.map((part, i) => (
            <React.Fragment key={i}>
              <span className="whitespace-pre-wrap">{part}</span>
              {i < textParts.length - 1 && (
                <button
                  onClick={() => handleGapClick(i)}
                  disabled={disabled}
                  className={cn(
                    "inline-block min-w-16 mx-1 px-3 py-1 rounded-lg border-2 transition-all text-base",
                    showResult && usedWords[i]
                      ? isGapCorrect(i) === true
                        ? "border-success bg-success/20 text-success font-medium"
                        : "border-destructive bg-destructive/20 text-destructive font-medium"
                      : usedWords[i]
                        ? "border-primary bg-primary/10 text-primary font-medium cursor-pointer hover:bg-destructive/10 hover:border-destructive hover:text-destructive"
                        : selectedGap === i
                          ? "border-primary bg-primary/30 ring-2 ring-primary ring-offset-2"
                          : selectedWord
                            ? "border-primary bg-primary/20 animate-pulse cursor-pointer hover:bg-primary/30"
                            : "border-dashed border-muted-foreground/50 hover:border-primary/50 cursor-pointer"
                  )}
                  title={usedWords[i] ? "Klicken zum Entfernen" : "Klicken zum Auswählen"}
                >
                  {usedWords[i] || '___'}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Правильные ответы при показе результата */}
      {showResult && correctAnswersList.length > 0 && (
        <div className="bg-success/10 border border-success rounded-lg p-3">
          <p className="text-sm font-medium text-success mb-1">Richtige Antworten:</p>
          <p className="text-sm text-foreground">{correctAnswersList.join(', ')}</p>
        </div>
      )}

      {/* Доступные слова - всегда показываем ВСЕ слова, они не исчезают */}
      {!showResult && (
        <div>
          <p className="text-sm text-muted-foreground mb-2">Wörter:</p>
          <div className="flex flex-wrap gap-2">
            {shuffledWords.map((word, index) => (
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
      )}

      {/* Кнопка проверки */}
      {!showResult && (
        <Button
          onClick={handleSubmit}
          disabled={disabled || !allGapsFilled}
          className="w-full bg-success text-success-foreground hover:bg-success/90"
        >
          Prüfen
        </Button>
      )}
    </div>
  );
});

GapFill.displayName = 'GapFill';
