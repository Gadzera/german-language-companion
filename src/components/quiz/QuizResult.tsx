import React, { forwardRef } from 'react';
import { Check, X } from 'lucide-react';

interface QuizResultProps {
  isCorrect: boolean;
  correctAnswer: string;
  userAnswer: string;
  explanation?: string;
}

export const QuizResult = forwardRef<HTMLDivElement, QuizResultProps>(({
  isCorrect,
  correctAnswer,
  userAnswer,
  explanation,
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`rounded-xl p-4 ${isCorrect ? 'bg-success/10 border border-success' : 'bg-destructive/10 border border-destructive'}`}
    >
      <div className="flex items-center gap-2 mb-2">
        {isCorrect ? (
          <>
            <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
              <Check className="w-5 h-5 text-success-foreground" />
            </div>
            <span className="font-semibold text-success">Richtig!</span>
          </>
        ) : (
          <>
            <div className="w-8 h-8 rounded-full bg-destructive flex items-center justify-center">
              <X className="w-5 h-5 text-destructive-foreground" />
            </div>
            <span className="font-semibold text-destructive">Falsch</span>
          </>
        )}
      </div>
      
      {!isCorrect && (
        <div className="space-y-1 text-sm">
          <p className="text-destructive">
            <span className="font-medium">Deine Antwort:</span> {userAnswer}
          </p>
          <p className="text-success">
            <span className="font-medium">Richtig:</span> {correctAnswer}
          </p>
        </div>
      )}
      
      {explanation && (
        <p className="mt-2 text-sm text-muted-foreground">{explanation}</p>
      )}
    </div>
  );
});

QuizResult.displayName = 'QuizResult';
