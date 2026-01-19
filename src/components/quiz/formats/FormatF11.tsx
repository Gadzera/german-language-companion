// FormatF11 - Lesen: Richtig oder Falsch
// Формат для чтения текста и ответа на вопросы Richtig/Falsch

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface LesenQuestion {
  id: string;
  statement: string;
  correct_answer: 'R' | 'F';
}

interface FormatF11Props {
  readingText: string;
  questions: LesenQuestion[];
  onComplete: (score: number, total: number) => void;
}

const FormatF11: React.FC<FormatF11Props> = ({ readingText, questions, onComplete }) => {
  const [answers, setAnswers] = useState<Record<string, 'R' | 'F' | null>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});

  const handleAnswer = (questionId: string, answer: 'R' | 'F') => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    const newResults: Record<string, boolean> = {};
    let correct = 0;
    
    questions.forEach(q => {
      const isCorrect = answers[q.id] === q.correct_answer;
      newResults[q.id] = isCorrect;
      if (isCorrect) correct++;
    });
    
    setResults(newResults);
    setIsSubmitted(true);
    onComplete(correct, questions.length);
  };

  const allAnswered = questions.every(q => answers[q.id] !== undefined && answers[q.id] !== null);

  return (
    <div className="space-y-6">
      {/* Reading Text */}
      <div className="bg-muted/30 rounded-lg p-4 md:p-6 border">
        <h3 className="font-semibold text-lg mb-3 text-primary">Text:</h3>
        <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-line">
          {readingText}
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Aufgaben:</h3>
        {questions.map((q, index) => (
          <div 
            key={q.id} 
            className={`p-4 rounded-lg border transition-colors ${
              isSubmitted 
                ? results[q.id] 
                  ? 'bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-700' 
                  : 'bg-red-50 border-red-300 dark:bg-red-900/20 dark:border-red-700'
                : 'bg-card'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="font-medium text-muted-foreground min-w-[24px]">{index + 1}.</span>
              <div className="flex-1">
                <p className="mb-3">{q.statement}</p>
                <div className="flex gap-3">
                  <Button
                    variant={answers[q.id] === 'R' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleAnswer(q.id, 'R')}
                    disabled={isSubmitted}
                    className={`min-w-[80px] ${
                      isSubmitted && q.correct_answer === 'R' 
                        ? 'bg-green-500 hover:bg-green-500 text-white border-green-500' 
                        : ''
                    }`}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Richtig
                  </Button>
                  <Button
                    variant={answers[q.id] === 'F' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleAnswer(q.id, 'F')}
                    disabled={isSubmitted}
                    className={`min-w-[80px] ${
                      isSubmitted && q.correct_answer === 'F' 
                        ? 'bg-green-500 hover:bg-green-500 text-white border-green-500' 
                        : ''
                    }`}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Falsch
                  </Button>
                </div>
                {isSubmitted && !results[q.id] && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    Richtige Antwort: {q.correct_answer === 'R' ? 'Richtig' : 'Falsch'}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      {!isSubmitted && (
        <Button 
          onClick={handleSubmit} 
          disabled={!allAnswered}
          className="w-full"
          size="lg"
        >
          Prüfen
        </Button>
      )}
    </div>
  );
};

export default FormatF11;
