import React, { useState, forwardRef } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface WordBuilderProps {
  availableWords: string[];
  onSubmit: (sentence: string) => void;
  disabled?: boolean;
}

export const WordBuilder = forwardRef<HTMLDivElement, WordBuilderProps>(({
  availableWords,
  onSubmit,
  disabled,
}, ref) => {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [remainingWords, setRemainingWords] = useState<string[]>(availableWords);

  const addWord = (word: string) => {
    if (disabled) return;
    setSelectedWords([...selectedWords, word]);
    const index = remainingWords.indexOf(word);
    if (index > -1) {
      const newRemaining = [...remainingWords];
      newRemaining.splice(index, 1);
      setRemainingWords(newRemaining);
    }
  };

  const removeWord = (index: number) => {
    if (disabled) return;
    const word = selectedWords[index];
    const newSelected = [...selectedWords];
    newSelected.splice(index, 1);
    setSelectedWords(newSelected);
    setRemainingWords([...remainingWords, word]);
  };

  const handleSubmit = () => {
    const sentence = selectedWords.join(' ');
    onSubmit(sentence);
  };

  const handleReset = () => {
    setSelectedWords([]);
    setRemainingWords(availableWords);
  };

  return (
    <div ref={ref} className="space-y-4">
      {/* Sentence builder area */}
      <div className="min-h-20 p-4 bg-card rounded-xl border-2 border-dashed border-primary/30">
        {selectedWords.length === 0 ? (
          <p className="text-muted-foreground text-center">Klicke auf Wörter, um den Satz zu bilden</p>
        ) : (
          <Reorder.Group
            axis="x"
            values={selectedWords}
            onReorder={setSelectedWords}
            className="flex flex-wrap gap-2"
          >
            {selectedWords.map((word, index) => (
              <Reorder.Item
                key={`${word}-${index}`}
                value={word}
                className="cursor-move"
              >
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
                >
                  {word}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeWord(index);
                    }}
                    className="ml-1 hover:bg-primary-foreground/20 rounded p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </div>

      {/* Available words */}
      <div className="flex flex-wrap gap-2">
        {remainingWords.map((word, index) => (
          <motion.button
            key={`${word}-${index}`}
            onClick={() => addWord(word)}
            disabled={disabled}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
          >
            {word}
          </motion.button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={disabled || selectedWords.length === 0}
          className="flex-1"
        >
          Zurücksetzen
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={disabled || selectedWords.length === 0}
          className="flex-1 bg-success text-success-foreground hover:bg-success/90"
        >
          Prüfen
        </Button>
      </div>
    </div>
  );
});

WordBuilder.displayName = 'WordBuilder';
