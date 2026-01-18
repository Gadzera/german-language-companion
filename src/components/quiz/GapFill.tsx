import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface GapFillProps {
  words: string[];
  gaps: { text: string; gapIndex: number }[];
  onSubmit: (answers: Record<number, string>) => void;
  disabled?: boolean;
}

export const GapFill: React.FC<GapFillProps> = ({
  words,
  gaps,
  onSubmit,
  disabled,
}) => {
  const [usedWords, setUsedWords] = useState<Record<number, string>>({});
  const [availableWords, setAvailableWords] = useState<string[]>(words);

  const fillGap = (gapIndex: number, word: string) => {
    if (disabled) return;
    
    // If gap already has a word, return it to available
    if (usedWords[gapIndex]) {
      setAvailableWords(prev => [...prev, usedWords[gapIndex]]);
    }
    
    // Set new word
    setUsedWords(prev => ({ ...prev, [gapIndex]: word }));
    setAvailableWords(prev => prev.filter(w => w !== word));
  };

  const removeFromGap = (gapIndex: number) => {
    if (disabled || !usedWords[gapIndex]) return;
    
    setAvailableWords(prev => [...prev, usedWords[gapIndex]]);
    const newUsed = { ...usedWords };
    delete newUsed[gapIndex];
    setUsedWords(newUsed);
  };

  const handleSubmit = () => {
    onSubmit(usedWords);
  };

  const allGapsFilled = gaps.every(g => usedWords[g.gapIndex]);

  return (
    <div className="space-y-4">
      {/* Text with gaps */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="text-lg leading-relaxed">
          {gaps.map((gap, i) => (
            <span key={i}>
              {gap.text.split('_____').map((part, j, arr) => (
                <React.Fragment key={j}>
                  {part}
                  {j < arr.length - 1 && (
                    <button
                      onClick={() => usedWords[gap.gapIndex] && removeFromGap(gap.gapIndex)}
                      className={`inline-block min-w-20 mx-1 px-2 py-1 rounded border-2 ${
                        usedWords[gap.gapIndex]
                          ? 'border-primary bg-primary/10 text-primary font-medium'
                          : 'border-dashed border-muted-foreground/50'
                      }`}
                    >
                      {usedWords[gap.gapIndex] || '___'}
                    </button>
                  )}
                </React.Fragment>
              ))}
              {i < gaps.length - 1 && ' '}
            </span>
          ))}
        </div>
      </div>

      {/* Available words */}
      <div>
        <p className="text-sm text-muted-foreground mb-2">Wörter:</p>
        <div className="flex flex-wrap gap-2">
          {availableWords.map((word, index) => (
            <button
              key={`${word}-${index}`}
              onClick={() => {
                const emptyGap = gaps.find(g => !usedWords[g.gapIndex]);
                if (emptyGap) {
                  fillGap(emptyGap.gapIndex, word);
                }
              }}
              disabled={disabled}
              className="px-3 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Submit button */}
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
