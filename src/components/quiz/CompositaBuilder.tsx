import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CompositaBuilderProps {
  parts: string[];
  correctAnswer: string;
  onSubmit: (answer: string) => void;
  disabled?: boolean;
}

export const CompositaBuilder: React.FC<CompositaBuilderProps> = ({
  parts,
  correctAnswer,
  onSubmit,
  disabled,
}) => {
  const [selectedParts, setSelectedParts] = useState<string[]>([]);

  const addPart = (part: string) => {
    if (disabled) return;
    setSelectedParts([...selectedParts, part]);
  };

  const removeLast = () => {
    if (disabled || selectedParts.length === 0) return;
    setSelectedParts(selectedParts.slice(0, -1));
  };

  const handleSubmit = () => {
    const answer = selectedParts.join('');
    onSubmit(answer);
  };

  const composedWord = selectedParts.join('');

  return (
    <div className="space-y-4">
      {/* Composed word display */}
      <div className="bg-card rounded-xl p-6 border border-border text-center">
        <div className="text-3xl font-bold text-foreground min-h-12">
          {composedWord || (
            <span className="text-muted-foreground text-xl">Klicke auf Teile, um ein Wort zu bilden</span>
          )}
        </div>
        {selectedParts.length > 0 && (
          <button
            onClick={removeLast}
            className="mt-2 text-sm text-muted-foreground hover:text-destructive"
          >
            ← Letztes entfernen
          </button>
        )}
      </div>

      {/* Word parts */}
      <div className="flex flex-wrap gap-2 justify-center">
        {parts.map((part, index) => (
          <button
            key={`${part}-${index}`}
            onClick={() => addPart(part)}
            disabled={disabled}
            className="px-4 py-3 bg-muted text-muted-foreground rounded-lg text-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
          >
            {part}
          </button>
        ))}
      </div>

      {/* Submit button */}
      <Button
        onClick={handleSubmit}
        disabled={disabled || selectedParts.length === 0}
        className="w-full bg-success text-success-foreground hover:bg-success/90"
      >
        Prüfen
      </Button>
    </div>
  );
};
